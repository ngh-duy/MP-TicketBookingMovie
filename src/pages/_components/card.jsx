import { useState, useRef, useEffect } from "react";
import "../../scss/components/_card.scss";
import CardMovie from "./cardMovie";
import { getListMoviePagination } from "../../service/movie.api";
import { useQuery } from "@tanstack/react-query";

export default function Card() {
  const [stateStatusCroll, setStateStatusCroll] = useState(0);
  const scrollRef = useRef(null);
  const { data } = useQuery({
    queryKey: ["listMovie-DC"],
    queryFn: () => getListMoviePagination(2, 15),
  });
  const arrMovie = data?.items;
  const nextRef = () => {
    setStateStatusCroll(stateStatusCroll + 1);
    return scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
  };

  const preRef = () => {
    setStateStatusCroll(stateStatusCroll - 1);
    return scrollRef.current.scrollBy({ left: -180, behavior: "smooth" });
  };
  return (
    <div className="listCard ">
      <div className="groupCard" ref={scrollRef}>
        {arrMovie?.map((film) => {
          return <CardMovie film={film} />;
        })}
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
