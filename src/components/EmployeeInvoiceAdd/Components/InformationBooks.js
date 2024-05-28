import { AutoComplete, Input } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { sendRequest } from "../../../services/sendRequest";
import { SEARCH_API } from "../../../services/constants";
import { Table } from "antd";
import { TableInvoiceAddConfig } from "../config/TableInvoiceAddConfig";
import { customToast } from "../../../customToast";
import dayjs from "dayjs";
import {formatCurrency} from "../../../utils/utils";

const dateFormat = "YYYY-MM-DD";

const InformationBooks = forwardRef((props, ref) => {
  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState([]);
  const [bookSelected, setBookSelected] = useState({ data: [] });
  const [total, setTotal] = useState(0)

  const handleSearch = async (value) => {
    setKeyword(value);
    // if (!value) return [];
    let result = [];
    try {
      const res = await sendRequest({
        method: "POST",
        endpoint: SEARCH_API.FILL_SEARCH,
        data: {
          searchText: value,
        },
      });
      result = res?.data?.data?.listBook ?? [];
    } catch (e) {
      console.log("e ", e);
    } finally {
    }

    const _options = [];

    result.forEach((item) => {
      _options.push({
        value: item.bookId,
        data: item,
        label: (
          <div className="flex items-center w-full">
            <img src={item.imageUrl} className="w-8 h-12 object-cover mr-2" />
            <div className="h-full flex-1">
              {/*<div className="truncate text-xs text-white bg-zinc-300 w-fit px-1 rounded mb-2">*/}
              {/*  {item.departments*/}
              {/*    ?.map((el) => el?.name.toLowerCase())*/}
              {/*    ?.join(", ")}*/}
              {/*</div>*/}
              <div className="truncate max-w-lg leading-none mb-1">
                {item.title}
              </div>
              <div className="text-xs text-gray-400 mb-1">
                {item.authors?.map((el) => el?.name)?.join(", ")}
              </div>
            </div>
            <div className="ml-auto">{item.copies_available}</div>
          </div>
        ),
      });
    });

    setOptions(_options);
  };
  const onSelect = (value) => {
    const hasSelect = bookSelected.data.some((item) => item.bookId === value);

    if (hasSelect) {
      customToast({
        type: "warning",
        message: "Cuốn sách đã được chọn trước đó",
      });
      return;
    }

    const itemSelect = options.find((item) => item.value === value).data;
    itemSelect.quantity = 1;
    itemSelect.checkoutDate = dayjs();
    itemSelect.returnDate = dayjs().add(7, "day");
    itemSelect.dateBetween = 7;

    setBookSelected({ data: [...bookSelected.data, ...[itemSelect]] });
  };

  const onRemove = (id) => {
    const _bookSelected = bookSelected.data.filter((item) => item.bookId !== id)
    setBookSelected({ data: _bookSelected});
  };

  const updateQuantity = (index, value) => {
    bookSelected.data[index].quantity = value;
    setBookSelected({ data: bookSelected.data });
  };

  const updateBorrowedTime = (index, ...ags) => {
    const [checkoutDate, returnDate] = ags[0];
    bookSelected.data[index].checkoutDate = checkoutDate;
    bookSelected.data[index].returnDate = returnDate;
    bookSelected.data[index].dateBetween = dayjs(returnDate).diff(
      dayjs(checkoutDate),
      "day"
    );
    setBookSelected({ data: bookSelected.data });
  };

  const buildOderData = () => {
    return bookSelected.data.map((item) => ({
      cartItemId: 0, // TODO
      bookId: item.bookId,
      quantity: item.quantity,
      codeVoucher: "",
      checkoutDate: item.checkoutDate.format(dateFormat),
      returnDate: item.returnDate.format(dateFormat),
    }));
  };

  useImperativeHandle(ref, () => ({
    getOrderData: () => buildOderData(),
  }));

  useEffect(() => {
    handleSearch("").then();
    return () => {};
  }, []);

  useEffect(() => {
    if(!bookSelected.data.length) return setTotal(0)

    const _total = bookSelected.data.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity * item.dateBetween;
      return acc + itemTotal;
    }, 0)

    setTotal(_total)
  }, [bookSelected]);

  return (
    <>
      <div className="mb-2">Tìm kiếm theo tên sách</div>
      <AutoComplete
        value={keyword}
        popupMatchSelectWidth={650}
        style={{ width: 650 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        className="mb-6"
      >
        <Input size="large" placeholder="Nhập để tìm kiếm" />
      </AutoComplete>
      {/*<pre>{bookSelected}</pre>*/}
      <Table
        rowKey="bookId"
        dataSource={bookSelected.data}
        columns={TableInvoiceAddConfig(
          onRemove,
          updateQuantity,
          updateBorrowedTime
        )}
        pagination={false}
        scroll={{ y: 400 }}
      />
      <div className="mt-4 text-lg w-full flex px-4">
        <div>Tổng</div>
        <div className="ml-auto w-40">
          { formatCurrency(total) }
        </div>
      </div>
    </>
  );
});

export default InformationBooks;
