import axios from "axios";

const api = axios.create({
  baseURL: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
});

export default api;
