import api from "./api";
const getListTypeUser = async () => {
  try {
    const res = await api.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getListUser = async (MaNhom) => {
  try {
    const res = await api.get(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MaNhom}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getListUserPagination = async (MaNhom, soTrang, soPhanTuTrenTrang) => {
  try {
    const res = await api.get(
      `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${MaNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const searchUser = async (MaNhom, tuKhoa) => {
  try {
    const res = await api.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${MaNhom}&tuKhoa=${tuKhoa}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getInfoAccount = async () => {
  try {
    const res = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const getInfoUser = async (taiKhoan) => {
  try {
    const res = await api.post(
      `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const addUser = async (value) => {
  try {
    const res = await api.post("api/QuanLyNguoiDung/ThemNguoiDung",value);
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const updateUser = async (value)=>{
    try {
        const res = await api.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, value);
        return res.data;
    } catch (error) {
        return error;
    }
}
const deleteUser = async (TaiKhoan)=>{
    try {
        const res = await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`);
        return res.data;
    } catch (error) {
        return error;
    }
}
export {
  getListTypeUser,
  getListUser,
  getListUserPagination,
  searchUser,
  getInfoAccount,
  getInfoUser,
  addUser,
  updateUser,
  deleteUser
};
