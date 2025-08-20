import React from "react";
import "../../scss/pages/_login.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../service/auth.api";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
export default function Login() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPadding } = useMutation({
    mutationFn: (value) => login(value),
    onSuccess: (data) => {
      // console.log(data);
      localStorage.setItem("accessToken", JSON.stringify(data));
      if (data.maLoaiNguoiDung == "QuanTri") {
        navigate("/admin");
      } else if (data.maLoaiNguoiDung == "KhachHang") {
        navigate('/');
      }
    },
  });
  const { register, handleSubmit } = useForm();
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
              required
              {...register("taiKhoan")}
            />
            <label htmlFor="taiKhoan">Tài khoản</label>
          </div>
          <div className="input-group">
            <input
              type={eye ? "text" : "password"}
              id="password"
              name="matKhau"
              required
              {...register("matKhau")}
            />
            <label htmlFor="matKhau">Mật khẩu</label>
            <i
              onClick={() => setEye(!eye)}
              className={`fa-regular ${eye ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
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
    </section>
  );
}
