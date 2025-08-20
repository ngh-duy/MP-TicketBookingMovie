import "../../scss/pages/_register.scss";
import { useState } from "react";
import { registerAuth } from "../../service/auth.api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
export default function Register() {
  const [eye, setEye] = useState(false);
  const {register,handleSubmit} = useForm();
  const { mutate, isPendding } = useMutation({
    mutationFn: (value) => registerAuth(value),
    onSuccess: (res) => {
      console.log(res);
    },
  });
  const onsubmit = (data) => {
    mutate(data);
    console.log(data);
  };
  return (
    <section className="register">
      <div className="register-container">
        <form onSubmit={handleSubmit(onsubmit)}>
          <h1>Register Page</h1>
          <div className="input-group">
            <input type="text" id="username" name="taiKhoan" required {...register('taiKhoan')}/>
            <label htmlFor="taiKhoan">Tài khoản</label>
          </div>
          <div className="input-group">
            <input type="text" id="hoTen" name="hoTen" required {...register('hoTen')}/>
            <label htmlFor="hoTen">Họ tên</label>
          </div>
          <div className="input-group">
            <input type="text" id="email" name="email" required {...register('email')}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="text" id="soDt" name="soDt" required {...register('soDt')}/>
            <label htmlFor="soDt">Số điện thoại</label>
          </div>
          <div className="input-group">
            <input
              type={eye ? "text" : "password"}
              id="password"
              name="matKhau"
              required
              {...register('matKhau')}
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
            <NavLink to="/login">Login</NavLink>
          </div>
        </form>
      </div>
    </section>
  );
}
