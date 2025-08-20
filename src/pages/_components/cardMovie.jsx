import React from "react";
import "../../scss/components/_cardMovie.scss";
import { NavLink } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {setMovieDetail} from '../../store/MovieDetail'
export default function CardMovie(props) {
    const dispatch = useDispatch();
    const {film} = props;
    const handleOnclick = ()=>{
        console.log(film);
        dispatch(setMovieDetail(film));
    }
  return (
    <NavLink to={`booking/${film.maPhim}`} onClick={handleOnclick}>
      <div key={film.hinhAnh} className="cardItem">
        <img src={film.hinhAnh} alt="" />
        <h1>{film.tenPhim}</h1>
      </div>
    </NavLink>
  );
}
