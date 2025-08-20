import React from "react";
import "../../../scss/layouts/_home.scss";
import Carousel from "../_components/Carousel";
import Card from "../../_components/card";
import FilmTop from "../_components/FilmTop";
import NewFilm from "../_components/NewFilm";
import { useState } from "react";

export default function Home() {
  const [numberPage, setNumberPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const numberPageMovie = (number, currentPage) => {
    setNumberPage(number);
    setCurrentPage(currentPage);
  };

  return (
    <>
      <Carousel />
      <main>
        <div className="groupContent">
          {/* phim đề cử  */}
          <section className="content">
            <div className="title">
              <h1>Phim đề cử</h1>
              <i className="fa-solid fa-square-plus"></i>
            </div>
            <div className="cardFilm">
              <Card />
            </div>
          </section>
          {/* Phim mới cập nhật  */}
          <section className="content">
            <div className="title">
              <h1>Phim mới cập nhật</h1>
              <i className="fa-solid fa-square-plus"></i>
            </div>
            <div className="cardFilm">
              <NewFilm number={numberPageMovie} currentPage={currentPage} />
            </div>
            <nav className="pagination">
              <i className={currentPage===1 ? 'hidden': 'fa-solid fa-angles-left'}></i>
              <p>
                {Array.from({ length: numberPage }, (_, index) => {
                  return (
                    <span
                      className={
                        currentPage === index + 1 ? "text-blue-800" : ""
                      }
                      onClick={()=>setCurrentPage(index+1)}
                    >
                      {index + 1}
                    </span>
                  );
                })}
              </p>
              <i className={currentPage===numberPage ? 'hidden':'fa-solid fa-angles-right'}  onClick={()=>setCurrentPage(currentPage+1)}></i>
            </nav>
          </section>
          {/* phim theo năm  */}
          <section className="content">
            <div className="title">
              <h1>Phim theo năm</h1>
              <div className="groupYear">
                <span className="bg-indigo-700">2025</span>
                <span>2024</span>
                <span>2023</span>
                <span>2022</span>
                <span>2021</span>
                <span>2019</span>
                <span>2018</span>
                <span>2017</span>
                <span>2016</span>
              </div>
              <i className="fa-solid fa-square-plus"></i>
            </div>
            <div className="cardFilm">
              <Card />
            </div>
          </section>
        </div>

        <article>
          <FilmTop />
        </article>
      </main>
    </>
  );
}
