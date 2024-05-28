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
import { handleSubmitPublisher } from "./api";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";

const EmployeeCreatePublisher = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Hãy nhập tên nhà xuất bản")
      .required("Tên nhà xuất bản không được để trống")
      .trim("Tên nhà xuất bản không được có khoảng trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitPublisher({
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
            endpoint: `/api/publisher/detail?id=${idSearch}&index-page=1`,
          });
          formik.setValues({
            name: dataResponse?.data?.data?.publisherDetail,
            id: idSearch,
          });
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
        <TitlePage
          title={isDetail ? "Chỉnh sửa nhà xuất bản" : "Thêm nhà xuất bản"}
        />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên nhà xuất bản"
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

export default EmployeeCreatePublisher;
