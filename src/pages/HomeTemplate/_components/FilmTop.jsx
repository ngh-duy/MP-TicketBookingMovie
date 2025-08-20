import React from "react";
import "../../../scss/components/_filmTop.scss";
import film6 from "../../../assets/film6.jpg";
import film1 from "../../../assets/film1.jpg";
import film2 from "../../../assets/film2.jpg";
import film3 from "../../../assets/film3.jpg";
import film4 from "../../../assets/film4.jpg";
import film5 from "../../../assets/film5.jpg";
export default function FilmTop() {
  const arrImg = [
    {
      src: film1,
      name: "Nghịch ái - Yêu phải tình địch",
      eye: 17800,
      point: "9.5/10",
    },
    { src: film2, name: "Sự tái sinh của ngôi sao", eye: 25000, point: "9/10" },
    {
      src: film3,
      name: "Ta chính là ngài Khun xin đẹp nhất",
      eye: 15200,
      point: "8.75/10",
    },
    { src: film4, name: "Chỉ riêng mình bạn", eye: 9800, point: "8.5/10" },
    { src: film5, name: "Lời hẹn ước linh hồn", eye: 12400, point: "8.5/10" },
    { src: film6, name: "Canh bạc ái tình hư ảo", eye: 8700, point: "8/10" },
  ];

  const renderFilmTop = () => {
    return arrImg.map((film,index) => {
      return (
          <div key={film.src} className={`film film-${index+1}`} style={{'--content' : `"${index+1}"`}}>
            <div className="titleMovieTop ">
              <h1>{film.name}</h1>
              <div className="evaluatePointFilm">
                <span><i className="fa-regular fa-star"></i> {film.point}</span>
                <p>
                  <i className="fa-regular fa-eye">
                    <span>{film.eye}</span>
                  </i>
                </p>
              </div>
            </div>
            <div  className="imgTop">
              <img src={film.src} alt="" />
              <div className="bg"></div>
            </div>
          </div>
      );
    });
  };
  return (
    <div className="content-filmTop">
      <h1>PHIM TOP</h1>
      <div className="movie-top">{renderFilmTop()}</div>
    </div>
  );
}
