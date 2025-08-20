import React from "react";
import { useEffect } from "react";
import "../../../scss/components/_newFilm.scss";
import { getListMoviePagination } from "../../../service/movie.api";
import { useQuery } from "@tanstack/react-query";
import CardMovie from "../../_components/cardMovie";
export default function NewFilm({ number, currentPage }) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-movie-pagination", currentPage],
    queryFn: () => getListMoviePagination(currentPage, 25),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const lismoviePagination = data?.items;
  const pageNumberMovie = data?.totalPages;
  number(pageNumberMovie, currentPage);
  return (
    <div className="listCardNewFilm ">
      <div className="groupCardNewFilm ">
        {lismoviePagination?.map((film) => {
          return <CardMovie film={film} />;
        })}
      </div>
    </div>
  );
}
