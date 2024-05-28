import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://lms-be-free.ap-southeast-2.elasticbeanstalk.com/api/auth/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
