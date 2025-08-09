import React from "react";
import "../../scss/pages/_register.scss";
import { useState } from "react";

export default function Register() {
    const [eye, setEye] = useState(false);
  return (
   <section className="register">
      <div className="register-container">
        <form action="submit">
          <h1>Register Page</h1>
          <div className="input-group">
            <input type="text" id="username" name="taiKhoan" required />
            <label htmlFor="taiKhoan">Tài khoản</label>
          </div>
          <div className="input-group">
            <input type="text" id="hoTen" name="hoTen" required />
            <label htmlFor="hoTen">Họ tên</label>
          </div>
           <div className="input-group">
            <input type="text" id="email" name="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="text" id="soDt" name="soDt" required />
            <label htmlFor="soDt">Số điện thoại</label>
          </div>
          <div className="input-group">
            <input
              type={eye ? "text" : "password"}
              id="password"
              name="matKhau"
              required
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
              <label htmlFor="">Đồng ý điều khoản</label>
            </div>
            
          </div>
          <button type="submit">Đăng ký</button>
          <div className="registerAccount">
            <p>Alreadly an account?</p>
            <a href="">Register</a>
          </div>
        </form>
      </div>
    </section>
  );
}
