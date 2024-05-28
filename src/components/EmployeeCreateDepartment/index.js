import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useLocation } from "react-router";
import TitlePage from "../../layout/TitlePage";
import ErrorMessage from "../../layout/ErrorMessage";
import InputField from "../../layout/InputField";
import * as yup from "yup";
import { useFormik } from "formik";
import ButtonV2 from "../../layout/ButtonV2";
import usePopupStore from "../../stores/usePopupStore";
import { handleSubmitDeparment } from "./api";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";

const EmployeeCreateDepartment = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Hãy nhập tên danh mục")
      .required("Tên danh mục không được để trống")
      .trim("Tên danh mục không được có khoảng trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitDeparment({
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
            method: "GET",
            endpoint: "/api/department/detail",
            params: { id: idSearch },
          });
          formik.setValues(dataResponse?.data?.data?.departmentDetail);
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
        <TitlePage title={isDetail ? "Chỉnh sửa danh mục" : "Thêm danh mục"} />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên danh mục"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <ErrorMessage> {formik.errors.name}</ErrorMessage>
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

export default EmployeeCreateDepartment;
