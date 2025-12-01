import axios from "axios";

const api = axios.create({
  baseURL: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = async (userData) => {
  const { data } = await api.post("/users/register", userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/users/login", credentials);
  return data;
};

export const getUserProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const getAllBooks = async () => {
  const { data } = await api.get("/books");
  return data;
};

export const getBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const getReservations = async () => {
  const { data } = await api.get("/reservations");
  return data;
};

export const reserveBook = async (bookId) => {
  const { data } = await api.post("/reservations", { bookId });
  return data;
};

export const returnBook = async (reservationId) => {
  await api.delete(`/reservations/${reservationId}`);
};
