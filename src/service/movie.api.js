import api from "./api";

const getListMovie = async () => {
  try {
    const listMovie = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    return listMovie.data.content;
  } catch (error) {
    console.log(error);
  }
};
const getListMoviePagination = async (soTrang, soPhanTuTrenTrang) => {
  try {
    const res = await api.get(
      `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getBannerMovie = async ()=>{
  try {
    const res = await api.get('QuanLyPhim/LayDanhSachBanner');
    return res.data.content;
  } catch (error) {
    return error;
  }
}
const getMovieByMaPhim = async(maPhim) =>{
  try {
    const res = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    return res.data.content;
  } catch (error) {
    return error;
  }
}
export { getListMovie, getListMoviePagination ,getBannerMovie, getMovieByMaPhim};
