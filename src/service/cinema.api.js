import api from "./api";

const getCenimaSystem = async () => {
  try {
    const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getCenimaClusterSystem = async (maHeThongRap) => {
  try {
    const res = await api(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getCenimaShowTime = async (maHeThongRap, maNhom) => {
  try {
    const res = await api.get(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`
    );
    return res.data.content[0].lstCumRap[0].danhSachPhim;
  } catch (error) {
    return error;
  }
};
const getMovieShowTime = async (MaPhim) => {
  try {
    const res = await api.get(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${MaPhim}`
    );
    return res.data.content.heThongRapChieu;
  } catch (error) {
    return error;
  }
};
const postAddMovie = async (frValue) => {
  try {
    const res = await api.post("QuanLyPhim/ThemPhimUploadHinh", frValue);
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const UpdateMovie = async (frValue) => {
  try {
    const res = await api.post("QuanLyPhim/CapNhatPhimUpload", frValue);
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const deleteMovie = async (MaPhim)=>{
    try {
        const res = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`);
        return res;
    } catch (error) {
        return error;
    }
}
export {
  getCenimaSystem,
  getCenimaClusterSystem,
  getCenimaShowTime,
  getMovieShowTime,
  postAddMovie,
  UpdateMovie,
  deleteMovie
}
