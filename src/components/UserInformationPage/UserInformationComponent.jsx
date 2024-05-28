import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assesets/images/defaultAvatar.jpg";
import InputField from "../../layout/InputField";
import ChangePassword from "./Components/ChangePassword";
import ButtonV2 from "../../layout/ButtonV2";
import { Radio } from "antd";
import { sendRequest } from "../../services/sendRequest";
import { AUTH_API, USER_DETAIL_API } from "../../services/constants";
import { customToast } from "../../customToast";
import { getErrorMessage } from "../../utils/utils";
import { transformData } from "./utils/transform";
import {
  DATE_FORMAT,
  parseDatePayload,
  parseDateToString,
} from "../../utils/dateFormat";
import dayjs from "dayjs";
import InputDatePicker from "../../layout/DatePicker";
import usePopupStore from "../../stores/usePopupStore";
import * as yup from "yup";
import { EMAIL_VALIDATION, PHONE_VALIDATION } from "../../utils/constants";
import { useFormik } from "formik";
import ErrorMessage from "../../layout/ErrorMessage";
import InputFieldUpload from "../../layout/InputFieldUpload";

const UserInfomationComponent = () => {
  const gender = [
    {
      label: "Nam",
      value: true,
    },
    {
      label: "Nữ",
      value: false,
    },
  ];

  const validationSchema = yup.object({
    firstName: yup.string("Nhập họ").required("Hãy nhập họ của bạn."),
    lastName: yup.string("Nhập tên").required("Hãy nhập tên của bạn."),
    email: yup
      .string("Nhập email")
      .matches(EMAIL_VALIDATION, "Email không hợp lệ.")
      .required("Hãy nhập email của bạn."),
    phoneNumber: yup
      .string("Nhập số điện thoại")
      .matches(PHONE_VALIDATION, "Số điện thoại không hợp lệ.")
      .required("Hãy nhập số điện thoại của bạn."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSaveInfor(values);
    },
  });

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [userDetail, setUserDetail] = useState({});
  const handleOnChange = (e) => {
    setUserDetail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      handleOpenLoading();
      try {
        const dataResponse = await sendRequest({
          endpoint: USER_DETAIL_API.USER_DETAIL,
          method: "GET",
        });
        setUserDetail(transformData(dataResponse?.data?.object));
        formik.setValues(transformData(dataResponse?.data?.object));
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSaveInfor = async (formValues) => {
    handleOpenLoading();
    try {
      await sendRequest({
        endpoint: AUTH_API.EDIT_PROFILE,
        method: "PUT",
        data: {
          ...formValues,
          dob: parseDatePayload(userDetail?.dob),
          gender: userDetail?.gender,
          imageUrl: userDetail?.imageUrl,
        },
      });
      customToast({
        type: "success",
        message: "Cập nhật thông tin thành công",
      });
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };

  return (
    <>
      <div className="pt-[200px]">
        <div className="max-w-[1400px] mx-auto flex flex-wrap shadow-2xl flex-col sm:flex-row">
          <div
            className="flex-1 px-[20px] py-[10px]"
            style={{
              border: "1px solid #969AA0",
            }}
          >
            <h3 className="mb-[20px]">Thông tin tài khoản</h3>
            <div className="flex flex-col sm:flex-row gap-5">
              <div>
                <img
                  src={userDetail?.imageUrl ?? defaultAvatar}
                  alt="avatar"
                  className="w-[100px] h-[100px] rounded-full"
                />
                <InputFieldUpload
                  endpoint="/api/user/edit-avatar"
                  method="PUT"
                  setDataChange={(value) => {
                    setUserDetail((prev) => ({ ...prev, imageUrl: value }));
                  }}
                />
              </div>
              <div className="w-[94%]">
                <InputField
                  label="Họ"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.errors.firstName && (
                  <ErrorMessage> {formik.errors.firstName}</ErrorMessage>
                )}
                <InputField
                  label="Tên"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.errors.lastName && (
                  <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
                )}
              </div>
            </div>
            <div>
              <div>
                <p className="w-[100%] mb-[5px]">Ngày sinh</p>
                <div className="flex gap-8">
                  <InputDatePicker
                    value={dayjs(
                      userDetail?.dob ?? null,
                      DATE_FORMAT.dateFormat
                    )}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("day");
                    }}
                    name="dob"
                    format={DATE_FORMAT.dateFormat}
                    placeholder="Date of birth"
                    onChange={(e) => {
                      setUserDetail((prev) => ({
                        ...prev,
                        dob: parseDateToString(e?.$d),
                      }));
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="w-[100%] mb-[5px]">Giới tính</p>
                <Radio.Group
                  value={userDetail?.gender}
                  name="gender"
                  onChange={handleOnChange}
                >
                  {gender?.map?.((el) => (
                    <Radio value={el?.value}>{el?.label}</Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-center mb-[30px]">
              <ButtonV2 onClick={formik.handleSubmit} type="submit">
                Lưu
              </ButtonV2>
            </div>
          </div>
          <div
            className="flex-1 px-[20px] py-[10px]"
            style={{
              border: "1px solid #969AA0",
            }}
          >
            <h3 className="mb-[20px]">Số điện thoại & email</h3>
            <InputField
              label="Số điện thoại"
              type="string"
              value={formik.values.phoneNumber}
              name="phoneNumber"
              onChange={formik.handleChange}
            />
            {formik.errors.phoneNumber && (
              <ErrorMessage>{formik.errors.phoneNumber}</ErrorMessage>
            )}
            <InputField
              label="Email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfomationComponent;
