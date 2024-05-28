import React, { useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import AdminLayout from "../../layout/AdminLayout";
import { useLocation } from "react-router";
import TitlePage from "../../layout/TitlePage";
import ErrorMessage from "../../layout/ErrorMessage";
import InputField from "../../layout/InputField";
import * as yup from "yup";
import { useFormik } from "formik";
import ButtonV2 from "../../layout/ButtonV2";
import InputFieldUpload from "../../layout/InputFieldUpload";
import usePopupStore from "../../stores/usePopupStore";
import { handleSubmitAuthor } from "./api";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";

const EmployeeCreateAuthor = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Hãy nhập tên tác giả")
      .required("Tên tác giả không được để trống")
      .trim("Tên tác giả không được có khoảng trống"),
    imageUrl: yup
      .string("Ảnh tác giả không được để trống")
      .required("Ảnh tác giả không được để trống"),
    description: yup
      .string("Hãy nhập thông tin tác giả")
      .required("Thông tin tác giả không được để trống")
      .trim("Thông tin tác giả không được có khoảng trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitAuthor({
        formData: values,
        isDetail,
        handleCloseLoading,
        handleOpenLoading,
        setTriggerReload,
      });
    },
  });
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const location = useLocation();
  const isDetail = useMemo(() => {
    return location?.pathname?.includes("detail");
  }, [location?.pathname]);
  const [triggerReload, setTriggerReload] = useState(false);
  useEffect(() => {
    const idSearch = getObjectSearch(location?.search)?.id;
    const fetchData = async () => {
      if (idSearch) {
        handleOpenLoading();
        try {
          const dataResponse = await sendRequest({
            method: "POST",
            endpoint: `/api/author/detail?id=${idSearch}&index-page=1`,
          });
          formik.setValues(dataResponse?.data?.data?.authorDetail);
        } catch (error) {
          customToast({
            type: "error",
            message: getErrorMessage(error),
          });
        } finally {
          handleCloseLoading();
        }
      }
    };
    fetchData();
  }, [getObjectSearch(location?.search)?.id, triggerReload]);
  return (
    <>
      <AdminLayout>
        <TitlePage title={isDetail ? "Chỉnh sửa tác giả" : "Thêm tác giả"} />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên tác giả"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <ErrorMessage> {formik.errors.name}</ErrorMessage>
          )}
          <p className="w-[100%] mb-[5px]">Thông tin tác giả</p>
          <Input.TextArea
            name="description"
            value={formik.values.description}
            style={{ height: 120 }}
            onChange={formik.handleChange}
          />
          {formik.errors.description && (
            <ErrorMessage> {formik.errors.description}</ErrorMessage>
          )}
          {formik?.values?.imageUrl && (
            <img
              className="mx-auto object-cover"
              src={formik?.values?.imageUrl}
              alt="img-book"
            />
          )}
          <InputFieldUpload
            className="mt-[10px]"
            label="Hình ảnh tác giả"
            name="imageUrl"
            setDataChange={(value) => {
              formik.setValues((prev) => ({ ...prev, imageUrl: value }));
            }}
          />
          {formik.errors.imageUrl && (
            <ErrorMessage> {formik.errors.imageUrl}</ErrorMessage>
          )}
          <div className="w-[100%] flex justify-center gap-5 mt-10">
            {isDetail ? (
              <>
                <ButtonV2 onClick={formik.handleSubmit} type="submit">
                  Lưu
                </ButtonV2>
              </>
            ) : (
              <ButtonV2 onClick={formik.handleSubmit} type="submit">
                Thêm
              </ButtonV2>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EmployeeCreateAuthor;
