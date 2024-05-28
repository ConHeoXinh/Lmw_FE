import axios from "axios";

const BOOK_URL = "http://localhost:8080/api/book";
const AUTH_URL = "http://localhost:8080/api/auth";
// const BOOK_URL = "http://lms-be-free.ap-southeast-2.elasticbeanstalk.com/api/book";
// const AUTH_URL = "http://lms-be-free.ap-southeast-2.elasticbeanstalk.com/api/auth";

class apiconfig {
  // Method to get all books from our api or database
  getAllBook() {
    return axios.get(BOOK_URL).then((response) => response.data);
  }
  getBookFavoriteByUserId() {
    return axios.get(`${BOOK_URL}/favorite`);
  }
  saveBook(Data) {
    return axios.post(BOOK_URL, Data);
  }
  updateBook(id, Data) {
    return axios.put(`${BOOK_URL}/${id}`, Data);
  }
  getByIdBook(id) {
    return axios.get(`${BOOK_URL}/${id}`);
  }
  deleteBookFavorite(id) {
    return axios.delete(`${BOOK_URL}/remove-favorite?book-id=${id}`);
  }
  register(Data) {
    return axios.post(`${AUTH_URL}/signup`, Data);
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  forgotPassword(email) {
    return axios.get(`${AUTH_URL}/forgot-password?email=${email}`);
  }
  confirmForgotPassword(otp) {
    return axios.get(`${AUTH_URL}/confirm-forgot-password?otp=${otp}`);
  }
  resetPassword(Data) {
    return axios.put(`${AUTH_URL}/reset-password`, Data);
  }
}

export default new apiconfig();
