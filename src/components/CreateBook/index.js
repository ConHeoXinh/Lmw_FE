import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TitlePage from "../../layout/TitlePage";
import InputField from "../../layout/InputField";
import InputFieldUpload from "../../layout/InputFieldUpload";
import { useLocation } from "react-router";
import History from "../../layout/History";
import useHandleEmpBook from "./customHook/useHandleEmpBook";
import { getObjectSearch } from "../../utils/utils";
import { Input } from "antd";
import SelectField from "../../layout/SelectField";
import * as yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../../layout/ErrorMessage";
import ButtonV2 from "../../layout/ButtonV2";
import MessagePopup from "../../layout/MessagePopup";
import { handleCreateBook, handleUpdateBook } from "./api/api";
import usePopupStore from "../../stores/usePopupStore";

const initialValuesBook = {
  title: "",
  description: "",
  authors: [],
  departments: [],
  publisher: "",
  price: "",
  copies_available: "",
  language: "",
  page: "",
};
const CreateBook = () => {
  const validationSchema = yup.object({
    title: yup.string("Nhập tiêu đề.").required("Tiêu đề không được để trống."),
    imageUrl: yup.string().required("Hãy chọn ảnh"),
    description: yup
      .string("Nhập mô tả.")
      .max(1000, "Mô tả quá dài.")
      .required("Mô tả không được để trống."),
    authors: yup
      .array()
      .of(yup.string().required("Tác giả không được để trống.")),
    departments: yup
      .array()
      .of(yup.string().required("Danh mục không được để trống.")),
    publisher: yup
      .string("Nhập nhà xuất bản.")
      .required("Nhà xuất bản không được để trống."),
    language: yup
      .string("Chọn ngôn ngữ.")
      .required("Ngôn ngữ không được để trống."),
    price: yup
      .string("Nhập giá tiền.")
      .required("Giá tiền không được để trống."),
    copies_available: yup
      .string("Nhập bản sao.")
      .required("Bản sao không được để trống."),
    page: yup
      .string("Nhập số trang.")
      .required("Số trang không được để trống."),
  });

  const formik = useFormik({
    initialValues: initialValuesBook,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      !isDetail
        ? handleCreateBook({
          formData: values,
          handleOpenLoading,
          handleCloseLoading,
        })
        : handleUpdateBook({
          handleOpenLoading,
          handleCloseLoading,
          formData: values,
          setTriggerReload,
        });
    },
  });
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const location = useLocation();
  const isDetail = useMemo(() => {
    return location?.pathname?.includes("detail");
  }, [location?.pathname]);
  const { loadData, loadInitData } = useHandleEmpBook({
    isDetail,
    id: getObjectSearch(location?.search)?.id,
    initialValuesBook,
  });
  const [initData, setInitData] = useState({});
  const [triggerReload, setTriggerReload] = useState(false);
  const handleSelectChange = (e, fieldName) =>
    formik.setValues((prev) => ({ ...prev, [fieldName]: e }));
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const dataResponse = await Promise.allSettled([
        loadData(),
        loadInitData(),
      ]);
      const [formData, initData] = dataResponse?.map?.((el) => el?.value);
      setInitData(initData);
      isDetail && formik.setValues(formData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getObjectSearch(location?.search)?.id, triggerReload]);
  return (
    <>
      <AdminLayout>
        <TitlePage title={isDetail ? "Cập nhật sách" : "Thêm sách"} />
        <div
          className="w-[500px] mx-auto rounded-[10px] shadow-2xl min-h-[80vh] p-[20px]"
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <InputField
            label="Tên sách"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && (
            <ErrorMessage> {formik.errors.title}</ErrorMessage>
          )}
          <SelectField
            allowClear
            label="Nhà xuất bản"
            name="publisher"
            value={formik.values.publisher}
            options={initData?.listPublisher}
            onChange={(e) => handleSelectChange(e, "publisher")}
          />
          {formik.errors.publisher && (
            <ErrorMessage> {formik.errors.publisher}</ErrorMessage>
          )}
          <SelectField
            mode="multiple"
            allowClear
            label="Tác giả"
            name="authors"
            value={formik.values.authors}
            options={initData?.listAuthor}
            onChange={(e) => handleSelectChange(e, "authors")}
          />
          {formik.errors.authors && (
            <ErrorMessage> {formik.errors.authors}</ErrorMessage>
          )}
          <SelectField
            mode="multiple"
            allowClear
            label="Mục"
            name="departments"
            value={formik.values.departments}
            options={initData?.listDepartment}
            onChange={(e) => handleSelectChange(e, "departments")}
          />
          {formik.errors.departments && (
            <ErrorMessage> {formik.errors.departments}</ErrorMessage>
          )}
          <InputField
            label="Giá"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && (
            <ErrorMessage> {formik.errors.price}</ErrorMessage>
          )}
          <SelectField
            name="language"
            label="Ngôn ngữ"
            allowClear
            value={formik.values.language}
            options={[
              {
                label: "Tiếng việt",
                value: "vietnamese",
              },
              {
                label: "English",
                value: "english",
              },
            ]}
            onChange={(e) => handleSelectChange(e, "language")}
          />
          {formik.errors.language && (
            <ErrorMessage> {formik.errors.language}</ErrorMessage>
          )}
          {formik?.values?.imageUrl && (
            <img
              className="object-cover mx-auto"
              src={formik?.values?.imageUrl}
              alt="img-book"
            />
          )}
          <InputFieldUpload
            label="Hình ảnh"
            name="Image"
            setDataChange={(value) => {
              formik.setValues((prev) => ({ ...prev, imageUrl: value }));
            }}
          />
          {formik.errors.imageUrl && (
            <ErrorMessage> {formik.errors.imageUrl}</ErrorMessage>
          )}
          <InputField
            label="Bản sao"
            name="copies_available"
            value={formik.values.copies_available}
            type="number"
            onChange={formik.handleChange}
          />
          {formik.errors.copies_available && (
            <ErrorMessage> {formik.errors.copies_available}</ErrorMessage>
          )}
          <InputField
            label="Số trang"
            name="page"
            value={formik.values.page}
            type="number"
            onChange={formik.handleChange}
          />
          {formik.errors.page && (
            <ErrorMessage> {formik.errors.page}</ErrorMessage>
          )}
          <div className="flex items-start mb-2">
            <div className="flex items-center h-5">
              <input
                className="w-4 h-4 bg-gray-700 border border-gray-300 border-gray-600 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 focus:ring-primary-600 ring-offset-gray-800"
                type="checkbox"
                aria-describedby="forUserCheckbox"
                id="forUserCheckbox"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-300 text-gray-500">
                Sách dành cho thành viên
              </label>
            </div>
          </div>
          <p className="w-[100%] mb-[5px]">Giới thiệu</p>
          <Input.TextArea
            name="description"
            value={formik.values.description}
            style={{ height: 120 }}
            onChange={formik.handleChange}
          />
          {formik.errors.description && (
            <ErrorMessage> {formik.errors.description}</ErrorMessage>
          )}
          <div className="w-[100%] flex justify-center gap-5 mt-10">
            {isDetail ? (
              <>
                <ButtonV2 onClick={formik.handleSubmit}>Lưu</ButtonV2>
                <ButtonV2 type="danger">Vô hiệu</ButtonV2>
              </>
            ) : (
              <ButtonV2 onClick={formik.handleSubmit}>Thêm</ButtonV2>
            )}
          </div>
          <MessagePopup
            open={open}
            handleCancel={handleCancel}
            message="Thêm thành công!"
          ></MessagePopup>
        </div>
        {isDetail && <History />}
      </AdminLayout>
    </>
  );
};

export default CreateBook;
