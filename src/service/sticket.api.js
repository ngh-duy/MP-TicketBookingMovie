import api from "./api";
const bookingticket = async (value)=>{
    try {
        const res = await api.post('QuanLyDatVe/DatVe', value);
        return res.data;
    } catch (error) {
        return error;
    }
}
const managerBooking = async (MaLichChieu)=>{
    try {
        const res = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`);
        return res.data.content;
    } catch (error) {
        return error;
    }
}
const addShowTime = async (value)=>{
    try {
        const res = await api.post(`QuanLyDatVe/TaoLichChieu`, value);
        return res.data;
    } catch (error) {
        return error;
    }
}
export {bookingticket, managerBooking, addShowTime}