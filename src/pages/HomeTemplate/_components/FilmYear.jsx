import React from "react";
import { useState, useRef } from "react";
import "../../../scss/components/_filmYear.scss";
import film6 from "../../../assets/film6.jpg";
import film7 from "../../../assets/film7.jpg";
import film8 from "../../../assets/film8.jpeg";
import film9 from "../../../assets/film9.jpg";
import film10 from "../../../assets/film10.png";
import film11 from "../../../assets/film11.jpg";
import film12 from "../../../assets/film12.jpg";
import film13 from "../../../assets/film13.jpg";
import film14 from "../../../assets/film14.jpg";
import film15 from "../../../assets/film15.jpg";
import film5 from "../../../assets/film5.jpg";
import film4 from "../../../assets/film4.jpg";
import { NavLink } from "react-router-dom";
// import data from '../../../data.json'

export default function FilmYear() {
  const [stateStatusCroll, setStateStatusCroll] = useState(0);
  const scrollRef = useRef(null);

  
  const arrImg = [
    { src: film4, name: "Chỉ riêng mình bạn" },
    { src: film5, name: "Tình yêu trọn gói" },
    { src: film6, name: "Tỏa nắng" },
    { src: film7, name: "Phải lòng cún con" },
    { src: film8, name: "Khemjira - Phải sống tốt" },
    { src: film9, name: "Hẹn ước mùa thu" },
    { src: film10, name: "Lá thư gửi em" },
    { src: film11, name: "Nắng chiều bên em" },
    { src: film12, name: "Trọn đời bên nhau" },
    { src: film13, name: "Yêu từ cái nhìn đầu tiên" },
    { src: film14, name: "Chạm vào tim anh" },
    { src: film15, name: "Một thoáng yêu thương" },
  ];
  const nextRef = () => {
    setStateStatusCroll(stateStatusCroll + 1);
    return scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
  };
  const preRef = () => {
    setStateStatusCroll(stateStatusCroll - 1);
    return scrollRef.current.scrollBy({ left: -180, behavior: "smooth" });
  };
  const renderListFilm = () => {
    return arrImg.map((film) => {
      return (
        <div key={film.src} className="cardItem">
          <img src={film.src} alt="" />
          <h1>{film.name}</h1>
          <NavLink  to="booking">
            <div className="bg-year"></div>
          </NavLink>
        </div>
      );
    });
  };
  return (
    <div className="listCardFilmYear ">
      <div className="groupCardFilmYear" ref={scrollRef}>
        {renderListFilm()}
      </div>
      <div className="groupButtonCroll">
        {stateStatusCroll !== 0 ? (
          <button className="pre" onClick={preRef}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        ) : (
          ""
        )}
        <button className="next" onClick={nextRef}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
