import { Form, Input } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle } from "react";
import {EMAIL_VALIDATION, PHONE_VALIDATION} from "../../../utils/constants";

const InformationForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  const formValues = (values) => {
    return new Promise((resolve) => {
      form.validateFields()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          resolve(false)
        })
    })
  };

  useImperativeHandle(ref, () => ({
    formValues,
  }));

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="firstName"
          label="Họ"
          rules={[{ required: true, message: "Cần nhập đầy đủ thông tin!" }]}
        >
          <Input
            size="large"
            prefix={
              <UserOutlined className="site-form-item-icon text-gray-300" />
            }
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Tên"
          rules={[{ required: true, message: "Cần nhập đầy đủ thông tin!" }]}
        >
          <Input
            size="large"
            prefix={
              <UserOutlined className="site-form-item-icon text-gray-300" />
            }
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Cần nhập đầy đủ thông tin!" },
            { pattern: PHONE_VALIDATION, message: "Số điện thoại không đúng định dạng"}
          ]}
        >
          <Input
            size="large"
            prefix={
              <PhoneOutlined className="site-form-item-icon text-gray-300" />
            }
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Cần nhập đầy đủ thông tin!" },
            { pattern: EMAIL_VALIDATION, message: "Email không đúng định dạng"}
          ]}
        >
          <Input
            size="large"
            prefix={
              <MailOutlined className="site-form-item-icon text-gray-300" />
            }
          />
        </Form.Item>
      </Form>
    </>
  );
});

export default InformationForm;
