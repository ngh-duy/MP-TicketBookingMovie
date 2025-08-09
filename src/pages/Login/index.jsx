import React from "react";
import "../../scss/pages/_login.scss";
import { useState } from "react";

export default function Login() {
  const [eye, setEye] = useState(false);

  return (
    <section className="login">
      <div className="login-container">
        <form action="submit">
          <h1>Login Page</h1>
          <div className="input-group">
            <input type="text" id="username" name="taiKhoan" required />
            <label htmlFor="taiKhoan">Tài khoản</label>
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
              <label htmlFor="">Ghi nhớ</label>
            </div>
            <a href="">Quên mật khẩu?</a>
          </div>
          <button type="submit">Đăng nhập</button>
          <div className="registerAccount">
            <p>Don't have an account?</p>
            <a href="">Register</a>
          </div>
        </form>
      </div>
    </section>
  );
}
