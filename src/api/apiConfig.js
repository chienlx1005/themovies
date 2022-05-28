const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "325a14cb965f88b7dedb8e57cdefd5a2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
