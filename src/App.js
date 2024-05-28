import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "../src/components/new/Content";
import NotFound from "./components/404/NotFound";
import About from "./components/About/About";
import BookDetailPage from "./components/BookDetailPage";
import Borrow from "./components/Borrow/Borrow";
import CartPage from "./components/CartPage";
import ChangePasswordComponent from "./components/ChangePassword/ChangePasswordComponent";
import Email from "./components/Contact/Email";
import Favorite from "./components/Favorite/Favorite";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LoginComponent from "./components/Login/LoginComponent";
import Main from "./components/Main";
import SearchBooksPage from "./components/SearchBook";
import Services from "./components/ServicesBook/Services";
import Signcomponent from "./components/Signup/Signcomponent";
import UserInfomation from "./components/UserInformationPage";
import { ConfigRoutes } from "./routes/routes";
import ResetPassword from "./components/ResetPassword";
import Otp from "./components/Otp/Otp";
import usePopupStore from "./stores/usePopupStore";
import useAuthStore from "./stores/useAuthStore";
import { sendRequest } from "./services/sendRequest";
import { Spin } from "antd";
import { LOGIN_API } from "./services/constants";
import Condition from "./components/ContentFooter/Condition";
import Policy from "./components/ContentFooter/Policy";
import ReturnPolicy from "./components/ContentFooter/ReturnPolicy";

function App() {
  const { openLoadingPopup, handleOpenLoading, handleCloseLoading } =
    usePopupStore();
  const { setUser } = useAuthStore();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       handleOpenLoading();
  //       const user = await sendRequest({
  //         method: "GET",
  //         endpoint: LOGIN_API.GET_USER_PROFILE,
  //       });
  //       setUser(user?.data?.object);
  //     } catch (error) {
  //     } finally {
  //       handleCloseLoading();
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <>
      <Spin spinning={openLoadingPopup} delay={500} size="large">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/home" element={<Main />}></Route>
          <Route path="/facebook" element={<Content />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
          <Route path="/borrow" element={<Borrow />}></Route>
          <Route path="/twitter" element={<Content />}></Route>
          <Route path="/instagram" element={<Content />}></Route>
          <Route path="/github" element={<Content />}></Route>
          <Route path="/pages" element={<Content />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/contact" element={<Email />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/signup" element={<Signcomponent />}></Route>
          <Route path="/forgot" element={<ForgotPassword />}></Route>
          <Route path="/profile" element={<UserInfomation />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/condition" element={<Condition />}></Route>
          <Route path="/policy" element={<Policy />}></Route>
          <Route path="/returnPolicy" element={<ReturnPolicy />}></Route>
          <Route
            path="/api/auth/confirm-forgot-password"
            element={<Otp />}
          ></Route>
          <Route
            path="/changepassword"
            element={<ChangePasswordComponent />}
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
          <Route
            path="/link-to-your-privacy-policy"
            element={<Content />}
          ></Route>
          <Route path="/search-book-page" element={<SearchBooksPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/book-detail" element={<BookDetailPage />}></Route>
          {ConfigRoutes?.map?.((el) => (
            <Route path={el?.path} element={el?.page} />
          ))}
        </Routes>
      </Spin>
      <ToastContainer />
    </>
  );
}

export default App;
