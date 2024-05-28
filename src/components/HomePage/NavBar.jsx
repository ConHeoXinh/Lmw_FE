import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../customHooks/useLogout";
import Button from "../../layout/Button";
import useAuthStore from "../../stores/useAuthStore";
import useSearchStore from "../../stores/useSearchStore";

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const { user, setUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { searchData, setSearchData } = useSearchStore();
  const [searchDataNavBar, setSearchDataNavbar] = useState(searchData?.title);

  const handleChange = () => {
    setMenu(!menu);
  };
  const { handleLogout } = useLogout();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  useEffect(() => {
    setSearchData(location?.state?.title);
  }, []);
  return (
    <div className="fixed w-full bg-[#1B3764] text-white z-50">
      <div className="flex items-center justify-between px-5 lg:px-32 py-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold mr-6">
            LMS
          </Link>
          <a className="mr-4">
            <AiFillFacebook size={30} />
          </a>
          <a className="mr-4">
            <AiFillTwitterSquare size={30} />
          </a>
          <a href="" className="mr-4">
            <AiFillInstagram size={30} />
          </a>
        </div>

        <nav className="hidden lg:flex items-center">
          <Link to="/home" className="mx-3 hover:text-blue-300">
            Trang chủ
          </Link>
          <Link to="/search-book-page" className="mx-3 hover:text-blue-300">
            Tìm kiếm sách
          </Link>
          <Link to="/about" className="mx-3 hover:text-blue-300">
            Về chúng tôi
          </Link>
          <Link to="/services" className="mx-3 hover:text-blue-300">
            Dịch vụ
          </Link>
          {/* <Link to="/contact" className="mx-3 hover:text-blue-300">
            Liên hệ
          </Link> */}
          <div className="flex items-center ml-3">
            <button className="ml-3" onClick={handleSearchClick}>
              <AiOutlineSearch size={22} />
            </button>

            {isEmpty(user) ? (
              <Link to="/login" className="ml-3">
                <AiOutlineShoppingCart size={22} />
              </Link>
            ) : (
              <Link to="/cart" className="ml-3">
                <AiOutlineShoppingCart size={22} />
              </Link>
            )}

            {isSearchVisible && (
              <div className="absolute top-14 right-32 bg-white p-2 border border-gray-300 rounded mt-2 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 ml-2 px-2 py-1 rounded text-black"
                  value={searchDataNavBar}
                  onChange={(e) => setSearchDataNavbar(e.target.value)}
                />
                <button className="text-black">
                  <AiOutlineSearch
                    size={22}
                    onClick={() => {
                      setSearchData({ title: searchDataNavBar });
                      navigate(`/search-book-page`);
                    }}
                  />
                </button>
              </div>
            )}
          </div>

          {isEmpty(user) ? (
            <Link to="/login" className="ml-3">
              <Button title="Đăng nhập" />
            </Link>
          ) : (
            <div className="ml-3">
              <div
                className="group-item cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user?.username}
                {isDropdownOpen && (
                  <div className="absolute top-14 right-32 bg-white p-2 rounded mt-2 text-black border-solid border">
                    <ul>
                      <li>
                        <Link to="/profile">Thông tin cá nhân</Link>
                      </li>
                      <li className="border border-black"></li>
                      <li>
                        <button onClick={handleLogout}>Đăng xuất</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        <div className="block lg:hidden" onClick={handleChange}>
          <AiOutlineMenu size={30} />
        </div>
      </div>

      <div className={`lg:hidden ${menu ? "block" : "hidden"}`}>
        <Link to="/" className="block py-2 px-4 hover:text-blue-300">
          Trang chủ
        </Link>
        {/* <Link to="/about" className="block py-2 px-4 hover:text-blue-300">
          Danh sách
        </Link> */}
        <Link
          to="/search-book-page"
          className="block py-2 px-4 hover:text-blue-300"
        >
          Tìm kiếm sách
        </Link>
        <Link to="/courses" className="block py-2 px-4 hover:text-blue-300">
          Về chúng tôi
        </Link>
        <Link to="/reviews" className="block py-2 px-4 hover:text-blue-300">
          Dịch vụ
        </Link>
        {/* <Link to="/contact" className="block py-2 px-4 hover:text-blue-300">
          Liên hệ
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
