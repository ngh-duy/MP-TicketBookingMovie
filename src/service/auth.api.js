import api from "./api";

const login = async (value) => {
  try {
    const res = await api.post("QuanLyNguoiDung/DangNhap", value);
    return res.data.content;
  } catch (error) {
    return error;
  }
};
const registerAuth = async (value) => {
  try {
    const res = await api.post("QuanLyNguoiDung/DangKy", value);
    return res.data.content;
  } catch (error) {
    return error;
  }
};
export { login, registerAuth };
