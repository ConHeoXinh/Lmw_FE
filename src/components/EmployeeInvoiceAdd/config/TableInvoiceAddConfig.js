import React from "react";
import { DatePicker, InputNumber, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {formatCurrency} from "../../../utils/utils";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

export const TableInvoiceAddConfig = (onRemove, updateQuantity, updateBorrowedTime) => {
  return [
    {
      dataIndex: "title",
      title: "Tên sách",
      width: "25%",
      render: (_, item) => (
        <div className="flex items-center w-full">
          <img src={item.imageUrl} className="w-7 h-10 object-cover mr-2" />
          <div className="h-full">
            <div className="line-clamp-2" title={item.title}>
              {item.title}
            </div>
            <div className="text-xs text-gray-400 mb-1">
              {item.authors?.map((el) => el?.name)?.join(", ")}
            </div>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "quantity",
      title: "Số lượng",
      width: "12%",
      render: (text, record, index) => (
        <InputNumber
          defaultValue={text}
          min={1}
          max={record.copies_available}
          onChange={(value) => {
            updateQuantity(index, value);
          }}
        />
      ),
    },
    {
      dataIndex: "date",
      title: "Ngày mượn",
      width: "28%",
      render: (_, record, index) => (
        <RangePicker
          defaultValue={[record.checkoutDate, record.returnDate]}
          format={dateFormat}
          disabledDate={(current) => current && current < dayjs().subtract(1, 'day')}
          allowClear={false}
          onChange={(...ags) => updateBorrowedTime(index, ...ags) }
        />
      ),
    },
    {
      dataIndex: "price",
      title: "Đơn giá/Ngày",
      width: "12%",
      render: (_, record) => <span>{formatCurrency(record?.price)}</span>,
    },
    {
      dataIndex: "price",
      title: "Tổng tiền",
      width: "13%",
      render: (text, record) => <span>{formatCurrency(text * record.quantity * record.dateBetween)}</span>
    },
    {
      dataIndex: "bookId",
      title: "",
      width: "5%",
      render: (text) => (
        <>
          <Popconfirm
            placement="topLeft"
            title="Xác nhận"
            description="Xác nhận xoá cuốn sách ra khỏi đơn?"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => {
              onRemove(text);
            }}
          >
            <DeleteOutlined className="text-gray-400 hover:text-red-500" />
          </Popconfirm>
        </>
      ),
    },
  ];
};
