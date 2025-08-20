import React from "react";
import "../../scss/components/_seat.scss";
import seat from "../../assets/seat.png";
import { useState, useEffect } from "react";
import { getMovieShowTime } from "../../service/cinema.api";
import { managerBooking, bookingticket } from "../../service/sticket.api";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import numeral from "numeral";
export default function Seat() {
  const { register, handleSubmit } = useForm();
  const param = useParams();
const naviagte = useNavigate();
  const [stateTheaer, setSateTheaer] = useState({
    TheaerSystem: "",
    TheaerComplex: null,
    Theaer: null,
  });
  const [value, setvalue] = useState({
    maLichChieu: stateTheaer?.Theaer,
    danhSachVe: [],
  });
const userName = JSON.parse(localStorage.getItem('accessToken'));
  const [modalSeat, setModalSeat] = useState(false);
const [detail, setDetail] = useState(false);
  const { data: MovieShowTime } = useQuery({
    queryKey: ["showtime-movie", param.maphim * 1],
    queryFn: () => getMovieShowTime(param.maphim * 1),
  });
  const { data: ListSeat } = useQuery({
    queryKey: ["listSeat", stateTheaer.Theaer],
    queryFn: () => managerBooking(stateTheaer.Theaer),
    enabled: !!stateTheaer.Theaer,
  });

  // const { data: addTime } = useQuery({
  //   queryKey: ["listSeat", value],
  //   queryFn: () => bookingticket(value),
  //   enabled: !!sendValueAddST,
  // });
   const { mutate, isPadding } = useMutation({
    mutationFn: (value) => bookingticket(value),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  // useEffect(() => {
  //   console.log(value);

  // }, [value]);
  const [currentPageSeat, setCurrentPageSeat] = useState(1);
  const [colorArrSeat, setcolorArrSeat] = useState([]);
  let numberPageSeat = 0;

  const reanderSeat = () => {
    const totalSeats = ListSeat?.danhSachGhe.length || 0;
    if (totalSeats === 0) return null;

    const seatsPerPage = 32;
    numberPageSeat = Math.ceil(totalSeats / seatsPerPage);

    // Tính số ghế ở trang hiện tại
    const startIndex = (currentPageSeat - 1) * seatsPerPage;
    const endIndex =
      currentPageSeat === numberPageSeat
        ? totalSeats
        : currentPageSeat * seatsPerPage;

    if (!ListSeat?.danhSachGhe) return null;

    return ListSeat.danhSachGhe
      .slice(startIndex, endIndex)
      .map((chooseSeat, i) => {
        const numberSeat = startIndex + i + 1; // Số ghế thực tế trên toàn bộ danh sách
        const isSelected = colorArrSeat.includes(numberSeat);

        return (
          <div key={numberSeat} className="imgSeat">
            <img
              src={seat}
              alt="Ghế đặt"
              className={`${isSelected ? "invert " : ""} ${
                chooseSeat.loaiGhe === "Thuong" ? "" : "hue-rotate-90"
              } ${
                chooseSeat.taiKhoanNguoiDat != null
                  ? "grayscale  pointer-events-none cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                const isSelectedSeat = value.danhSachVe.some(
                  (seat) => seat.maGhe === chooseSeat.maGhe
                );
                // console.log(isSelectedSeat);

                if (isSelectedSeat) {
                  setvalue({
                    ...value,
                    danhSachVe: value.danhSachVe.filter(
                      (seat) => seat.maGhe !== chooseSeat.maGhe
                    ),
                  });
                } else {
                  setvalue({
                    ...value,
                    danhSachVe: [
                      ...value.danhSachVe,
                      {
                        maGhe: value.danhSachVe.some((maghe) => {
                          return maghe.maGhe == chooseSeat.maGhe;
                        })
                          ? 0
                          : chooseSeat.maGhe,
                        giaVe: chooseSeat.giaVe,
                      },
                    ],
                  });
                }

                setcolorArrSeat((prev) =>
                  prev.includes(numberSeat)
                    ? prev.filter((seatNum) => seatNum !== numberSeat)
                    : [...prev, numberSeat]
                );
              }}
            />
            <p className="indexSeat">{numberSeat}</p>
          </div>
        );
      });
  };

  const renderCurrentSeat = () => {
    return (
      <div className="currentSeat">
        {Array.from({ length: numberPageSeat }, (_, index) => {
          return (
            <div
              key={index}
              className={
                currentPageSeat === index + 1
                  ? "pageSeat checkCurrentSeat"
                  : "pageSeat"
              }
            ></div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <div className="seatMain">
        <div className="seat">
          <h1 className="uppercase text-center text-white font-extrabold text-4xl">
            Choose your seat
          </h1>
        </div>
        <div className="seatFillter ">
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <form>
            <div>
              <label htmlFor="">Chọn hệ thống rạp</label>
              <select
                defaultValue=""
                name="maHeThongRap"
                className="theaerSystem"
                {...register("maHeThongRap", {
                  onChange: (e) => {
                    setSateTheaer({
                      ...stateTheaer,
                      TheaerSystem: e.target.value,
                    });
                  },
                })}
              >
                <option value="" disabled>
                  Chọn hệ thống rạp
                </option>
                {MovieShowTime
                  ? MovieShowTime.map((film, index) => {
                      return (
                        <option key={index} value={film.maHeThongRap}>
                          {film?.tenHeThongRap}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
          </form>
          <div>
            <label htmlFor="">Chọn cụm rạp </label>
            <select
              defaultValue=""
              className="theaerComplex"
              {...register("maCumRap", {
                onChange: (e) => {
                  setSateTheaer({
                    ...stateTheaer,
                    TheaerComplex: e.target.value,
                  });
                },
              })}
            >
              <option value="" disabled>
                Chọn cụm rạp
              </option>
              {MovieShowTime
                ? MovieShowTime.map((system) => {
                    return system.maHeThongRap == stateTheaer.TheaerSystem
                      ? system.cumRapChieu.map((complex, index) => {
                          return (
                            <option key={index} value={complex.maCumRap}>
                              {complex?.tenCumRap}
                            </option>
                          );
                        })
                      : "";
                  })
                : ""}
            </select>
          </div>
          <div>
            <label htmlFor="">Chọn giờ chiếu</label>
            <select
              defaultValue=""
              className="theaer"
              {...register("maRap", {
                onChange: (e) => {
                  setSateTheaer({
                    ...stateTheaer,
                    Theaer: e.target.value,
                  });
                  setModalSeat(!modalSeat);
                  setvalue({
                    ...value,
                    maLichChieu: e.target.value * 1,
                  });
                },
              })}
            >
              <option value="" disabled>
                Chọn giờ chiếu
              </option>
              {MovieShowTime
                ? MovieShowTime.map((system) => {
                    return system.cumRapChieu.map((complex) => {
                      return complex.maCumRap == stateTheaer.TheaerComplex
                        ? complex.lichChieuPhim.map((showtime, index) => {
                            return (
                              <option key={index} value={showtime.maLichChieu}>
                                {format(showtime.ngayChieuGioChieu, "HH:mm") +
                                  "_" +
                                  format(
                                    showtime.ngayChieuGioChieu,
                                    "dd/MM/yyyy"
                                  )}
                              </option>
                            );
                          })
                        : "";
                    });
                  })
                : ""}
            </select>
          </div>
          <button
            className=" border rounded-md "
            onClick={() => setModalSeat(true)}
            type="submit"
          >
            Chọn ghế
          </button>
        </div>
        {detail ? <div className="bg-gray-900 mt-5  text-white px-6 py-10 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-white text-center py-5 text-4xl font-extrabold uppercase">
            Thông tin đặt vé
          </h1>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Họ tên người dùng:</span>
              <span>{userName?.hoTen}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Cụm rạp:</span>
              <span>
                {MovieShowTime
                  ? MovieShowTime.map((system) => {
                      return system.maHeThongRap == stateTheaer.TheaerSystem
                        ? system.cumRapChieu.map((complex) => {
                            return complex.maCumRap == stateTheaer.TheaerComplex
                              ? `${complex.tenCumRap}`
                              : "";
                          })
                        : "";
                    })
                  : ""}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Tên rạp:</span>
              <span>{ListSeat?.thongTinPhim?.tenRap}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Tên phim:</span>
              <span>{ListSeat?.thongTinPhim?.tenPhim}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Giờ chiếu:</span>
              <span>
                {ListSeat?.thongTinPhim?.gioChieu +
                  " - " +
                  ListSeat?.thongTinPhim?.ngayChieu}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">Ghế đã đặt:</span>
              <span>
                {value.danhSachVe.map((ticket) => {
                  return ListSeat?.danhSachGhe.map((seat) => {
                    return ticket.maGhe == seat.maGhe ? `${seat.tenGhe}, ` : "";
                  });
                }) || "Chưa chọn"}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold pt-4">
              <span>Tổng tiền:</span>
              <span>
                {/* numeral(1000).format('0,0'); */}
                {numeral(
                  value.danhSachVe.reduce((total, ticket) => {
                    const item = ListSeat?.danhSachGhe.find((seat) => {
                      return ticket.maGhe == seat.maGhe;
                    });
                    return total + item?.giaVe;
                  }, 0)
                ).format("0,0")}
              </span>
            </div>
            <div className="flex justify-center">
              <button
                className="text-xl font-bold bg-amber-300 p-3 rounded-md mt-5"
                onClick={() =>{
                  {userName?.hoTen ? mutate(value) : naviagte('/login')}
                  } }
              >
                Đặt vé
              </button>
            </div>
          </div>
        </div> : ''}
      </div>
      <div
        className={
          modalSeat
            ? "fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            : "hidden"
        }
      >
        <div className="bg-white modal rounded-xl shadow-lg  flex flex-col  relative">
          {/* Nút đóng (X) */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setModalSeat(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Tiêu đề */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-center ">Chọn ghế ngồi</h2>
            <div className="flex mt-2 ">
              <img src={seat} alt="" className="" width={"40"} height={"30"} />
              <p>Ghế trống</p>
              <img
                src={seat}
                alt=""
                className="hue-rotate-90"
                width={"40"}
                height={"30"}
              />
              <p>Ghế Vip</p>
              <img
                src={seat}
                alt=""
                className="grayscale"
                width={"40"}
                height={"30"}
              />
              <p>Ghế đã đặt</p>
            </div>
          </div>

          {/* Khu vực ghế */}
          <div className="seatNumber ">
            {currentPageSeat !== 1 ? (
              <i
                className="fa-solid fa-caret-left caret"
                onClick={() => setCurrentPageSeat(currentPageSeat - 1)}
              ></i>
            ) : (
              ""
            )}
            {/* Hình ảnh ghế */}
            {reanderSeat()}
            {renderCurrentSeat()}
            {currentPageSeat === numberPageSeat ? (
              ""
            ) : (
              <i
                className="fa-solid fa-caret-right caret"
                onClick={() => setCurrentPageSeat(currentPageSeat + 1)}
              ></i>
            )}
          </div>

          {/* Nút xác nhận */}
          <div className="p-4 confirmSeat border-t border-gray-200 flex justify-center">
            <button
          onClick={() => {setModalSeat(false);setDetail(true)}}
              className="px-6 py-2 bg-[#151515] text-white rounded hover:bg-blue-700"
            >
              Xác nhận đặt vé
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
