import React from "react";
import { useSelector } from "react-redux";
import "../../../scss/components/_booking.scss";
import Seat from "../../_components/seat";
import { useState } from "react";
import { getMovieByMaPhim } from "../../../service/movie.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
export default function BookingMovie() {
  const [state, setState] = useState(false);
  const param = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieDetail"],
    queryFn: () => getMovieByMaPhim(param.maphim),
  });
// console.log(param);


  // const movie = useSelector((state) => {
  //   return state.MovieReducer.movieDetail;
  // });
  // console.log(movie.name);

  return (
    <>
     {data ?  <section className="titleDetail flex justify-between h-full">
        <div className=" title w-full  text-white  ">
          <h1 className="movieName text-5xl font-bold pl-14">
            {data?.tenPhim}
          </h1>
          <p className=" ">{data?.moTa}</p>
          <article className="flex">
            <div>
              <p>Thể Loại</p>
              <span>Tình cảm</span>
              <p>Trạng thái</p>
              <span>{data?.dangChieu ? "Đang chiếu" : "Sắp chiếu"}</span>
              <p>Năm phát hành</p>
              <span>{format(data?.ngayKhoiChieu, "yyyy")}</span>
            </div>
            <div>
              <p>Ngày chiếu</p>
              <span>{format(data?.ngayKhoiChieu, "dd/MM/yyyy")}</span>
              <p>Thời lượng</p>
              <span>1h30'</span>
              <p>Đánh giá</p>
              <span>{data?.danhGia}/10</span>
            </div>
          </article>
        </div>
        <div className="imgDetail h-full right-0">
          <img src={data?.hinhAnh} width={"100%"} height={"100%"} alt="" />
        </div>
        <div className="iconPlayer" onClick={() => setState(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="play-circle"
          >
            <path
              fill="#86DB86"
              d="M16,10.27,11,7.38A2,2,0,0,0,8,9.11v5.78a2,2,0,0,0,1,1.73,2,2,0,0,0,2,0l5-2.89a2,2,0,0,0,0-3.46ZM15,12l-5,2.89V9.11L15,12ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            ></path>
          </svg>
        </div>
        <div
          className={state ? "overlay" : "hidden"}
          onClick={() => setState(false)}
        >
          <div className="trailer">
            <iframe
              width="700"
              height="500"
              src={data?.trailer.replace('watch',"embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>: ''}
      {/* choose your seat  */}
      <section>
        <div>
          <Seat />
        </div>
      </section>
    </>
  );
}
