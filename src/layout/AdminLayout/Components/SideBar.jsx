import React from "react";
import defaultAvatar from "../../../assesets/images/defaultAvatar.jpg";
import { MenuEmployee } from "../../../routes/MenuEmployee";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import useLogout from "../../../customHooks/useLogout";
import { MenuAdmin } from "../../../routes/MenuAdmin";
import { USER_ROLE } from "../../../Roles";

const SideBar = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  return (
    <>
      <div className="w-[15%] overflow-auto h-full">
        <div className="px-[25px] py-[10px] flex flex-wrap gap-10 bg-[#1B3764] items-center">
          <img
            src={defaultAvatar}
            className="w-[50px] h-[50px] rounded-[50%]"
            alt="avatar"
          />
          <span className="text-white font-bold">{user?.username}</span>
        </div>
        <div className="mt-[20px]">
          {(user?.roles === USER_ROLE.ROLE_EMPLOYEE
            ? MenuEmployee
            : MenuAdmin
          )?.map?.((el) => (
            <>
              <Link
                className={`block no-underline cursor-pointer py-[15px] text-center bg-[#1B3764]  font-bold mb-[15px] ${
                  location?.pathname?.includes(el?.activePath)
                    ? "text-white"
                    : "opacity-50 text-gray-400"
                }`}
                to={el?.path}
              >
                {el?.title}
              </Link>
            </>
          ))}
          <Link
            className={`block no-underline cursor-pointer py-[15px] text-center bg-[#1B3764]  font-bold mb-[15px] opacity-50 text-gray-400`}
            to="/login"
            onClick={handleLogout}
          >
            Đăng xuất
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
