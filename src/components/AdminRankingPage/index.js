import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import AdminLayout from "../../layout/AdminLayout";
import { random } from "lodash";
import { Select } from "antd";
import { genLabelMonths } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import usePopupStore from "../../stores/usePopupStore";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Xếp hạng sách",
    },
  },
};

const labels = genLabelMonths();
const data = {
  labels,
  datasets: [
    {
      label: "Nhập",
      data: labels.map(() => random(0, 1000)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Xuất bán",
      data: labels.map(() => random(0, 1000)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const yearOptions = [
  { value: 2020 },
  { value: 2021 },
  { value: 2022 },
  { value: 2023 },
  { value: 2024 },
];

const AdminRankingPage = () => {
  const [searchData, setSearchData] = useState(yearOptions?.[4]);
  const [data, setData] = useState();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        handleOpenLoading();
        const res = await sendRequest({
          method: "POST",
          endpoint: "/api/admin/ranking-book/filter",
          data: {
            checkoutDate: `${searchData?.value}-01-01`,
            returnDate: `${searchData?.value}-12-31`,
          },
        });
        const data = res?.data?.data?.bookRankingList;
        setData(data);
      } catch (error) {
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [searchData]);

  const labelsMonth = data?.map((el) => el?.title);
  const dataRender = {
    labels: labelsMonth,
    datasets: [
      {
        label: "Số lượng",
        data: labelsMonth?.map((el) => {
          return data?.find?.((ele) => ele?.title === el)?.quantity;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng tiền",
        data: labelsMonth?.map((el) => {
          return data?.find?.((ele) => ele?.title === el)?.totalPrice;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <AdminLayout>
      <div className="flex justify-end">
        <Select
          className="w-50"
          value={searchData}
          options={yearOptions}
          labelInValue
          onChange={(e) => setSearchData(e)}
        ></Select>
      </div>
      <Bar options={options} data={dataRender} />
    </AdminLayout>
  );
};

export default AdminRankingPage;
