import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiconfig from "../../services/apiconfig";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Suggest = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [trustedData, setTrustedData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiconfig.getAllBook();
        if (Array.isArray(response.data.bookRecommend)) {
          setTrustedData(response.data.bookRecommend);
        } else {
          console.error("Data received is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [location]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDivClick = (item) => {
    location.pathname = `/book-detail`;
    navigate(`/book-detail?id=${item?.id}`);
  };

  return (
    <div className="w-full bg-[#FFF8F2]">
      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h2 className="pt-8 text-3xl font-semibold text-center text-cyan-950">
            Sách dành cho bạn
          </h2>
        </div>
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {trustedData.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex bg-white flex-col rounded-xl shadow-2xl ${hoveredIndex === index
                  ? "transform scale-110 transition-all duration-300"
                  : ""
                  }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDivClick(item)}
              >
                <div className="flex flex-col justify-center w-full p-8 text-center">
                  <div className="w-full mx-auto mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="mx-auto max-w-[180px] object-cover h-full max-h-[150px]"
                    />
                  </div>
                  <h3 className="my-6 text-2xl font-bold text-black">
                    {item.title.length > 13
                      ? `${item.title.slice(0, 13) + "..."}`
                      : item.title}
                  </h3>
                  <p className="flex-grow mt-5 mb-4 text-lightText text-start text-slate-400">
                    {item.description.length > 45
                      ? `${item.description.slice(0, 45) + "..."}`
                      : item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default Suggest;
