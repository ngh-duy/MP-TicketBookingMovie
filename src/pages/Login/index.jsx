import React from "react";
import "../../scss/pages/_login.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../service/auth.api";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Toast from "../_components/Toast";
export default function Login() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const { mutate, isPadding } = useMutation({
    mutationFn: (value) => login(value),
    onSuccess: (data) => {
      // console.log(data);
      localStorage.setItem("accessToken", JSON.stringify(data));
      setToast({ type: 'success', message: 'Đăng nhập thành công' });
      setTimeout(() => {
        if (data.maLoaiNguoiDung == "QuanTri") {
          navigate("/admin");
        } else if (data.maLoaiNguoiDung == "KhachHang") {
          navigate('/');
        }
      }, 900);
    },
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <section className="login">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login Page</h1>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="taiKhoan"
              {...register("taiKhoan", { required: 'Vui lòng nhập tài khoản', minLength: { value: 3, message: 'Tài khoản tối thiểu 3 ký tự' } })}
            />
            <label htmlFor="taiKhoan">Tài khoản</label>
            {errors.taiKhoan ? (<small className="text-red-600">{errors.taiKhoan.message}</small>) : null}
          </div>
          <div className="input-group">
            <input
              type={eye ? "text" : "password"}
              id="password"
              name="matKhau"
              {...register("matKhau", { required: 'Vui lòng nhập mật khẩu', minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' } })}
            />
            <label htmlFor="matKhau">Mật khẩu</label>
            <i
              onClick={() => setEye(!eye)}
              className={`fa-regular ${eye ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
            {errors.matKhau ? (<small className="text-red-600">{errors.matKhau.message}</small>) : null}
          </div>
          <div className="checkPassword">
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Ghi nhớ</label>
            </div>
            <a href="">Quên mật khẩu?</a>
          </div>
          <button type="submit">Đăng nhập</button>
          <div className="registerAccount">
            <p>Don't have an account?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </form>
      </div>
      {toast ? (<Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />) : null}
    </section>
  );
}
