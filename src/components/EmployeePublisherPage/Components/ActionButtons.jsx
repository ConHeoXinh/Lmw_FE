import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";
import { useNavigate } from "react-router";
import { DEFINE_ROUTES } from "../../../routes/MenuEmployee";

const ActionButtons = ({ handleOpen, setMessagePopup, ...props }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap gap-5">
        <ButtonV2
          onClick={() => {
            navigate(
              `${DEFINE_ROUTES.EMPLOYEE_PUBLISHER_DETAIL}?id=${props?.record?.id}`
            );
          }}
        >
          Sửa
        </ButtonV2>
      </div>
    </>
  );
};

export default ActionButtons;
