import React, { useEffect, useState, useRef } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./HeroSlide.scss";
import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

function HeroSlide() {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      //   console.log("getmovie");
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        // const response = await axios.get(
        //   "https://api.themoviedb.org/3/movie/550?api_key=325a14cb965f88b7dedb8e57cdefd5a2",
        //   params
        // );
        setMovieItems(response.results);
        // console.log(response.results);
      } catch {
        // console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <div className="hero-slide">
        <Swiper
          modules={Autoplay}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          //   autoplay={{ delay: 2000 }}
        >
          {movieItems.map((item, i) => {
            return (
              <>
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <HeroSlideItem
                      item={item}
                      className={`${isActive ? "active" : ""}`}
                    />
                  )}
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
        {movieItems.map((item, i) => (
          <TrailerModal key={i} item={item} />
        ))}
      </div>
    </>
  );
}

const HeroSlideItem = (props) => {
  const navigation = useNavigate();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  //   console.log(background);

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content > iframe").innerHTML = "No trailer";
    }
    modal.classList.toggle("active");
  };
  return (
    <>
      <div
        className={`hero-slide__item ${props.className}`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="hero-slide__item__content container">
          <div className="hero-slide__item__content__info">
            <h2 className="title">{item.title}</h2>
            <div className="overview">{item.overview}</div>
            <div className="btns">
              <Button
                className=""
                onClick={() => navigation(`/movie/${item.id}`)}
              >
                Watch now
              </Button>
              <OutlineButton className="" onClick={() => setModalActive()}>
                Watch trailer
              </OutlineButton>
            </div>
          </div>
          <div className="hero-slide__item__content__poster">
            <img src={apiConfig.w500Image(item.poster_path)} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <>
      <Modal active={false} id={`modal_${item.id}`}>
        <ModalContent onClose={() => onClose()}>
          <iframe
            ref={iframeRef}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
        </ModalContent>
      </Modal>
    </>
  );
};
export default HeroSlide;
