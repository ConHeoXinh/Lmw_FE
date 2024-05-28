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
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
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
      text: "Doanh thu",
    },
  },
};

const yearOptions = [
  { value: 2020 },
  { value: 2021 },
  { value: 2022 },
  { value: 2023 },
  { value: 2024 },
];

const AdminRevenuePage = () => {
  const [searchData, setSearchData] = useState(yearOptions?.[4]);
  const [data, setData] = useState();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        handleOpenLoading();
        const res = await sendRequest({
          method: "POST",
          endpoint: "/api/admin/dashboard/filter",
          data: {
            checkoutDate: `${searchData?.value}-01-01`,
            returnDate: `${searchData?.value}-12-31`,
          },
        });
        const data = res?.data?.data?.dashboardList;
        setData(data);
      } catch (error) {
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [searchData]);
  const labelsMonth = genLabelMonths();
  const dataRender = {
    labels: genLabelMonths()?.map((el) => el.label),
    datasets: [
      {
        label: "Tổng đơn hàng",
        data: labelsMonth.map((el) => {
          return data?.find?.((ele) => ele?.month === el?.month)?.totalOrder;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng tiền",
        data: labelsMonth.map((el) => {
          return data?.find?.((ele) => ele?.month === el?.month)?.totalPrice;
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

export default AdminRevenuePage;
