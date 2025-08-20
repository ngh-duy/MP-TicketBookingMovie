import "../../scss/pages/_register.scss";
import { useState } from "react";
import { registerAuth } from "../../service/auth.api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
export default function Register() {
  const [eye, setEye] = useState(false);
  const {register,handleSubmit,formState: { errors }} = useForm();
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
            <input type="text" id="username" name="taiKhoan" {...register('taiKhoan', { required: 'Tài khoản là bắt buộc', minLength: { value: 3, message: 'Tài khoản phải có ít nhất 3 ký tự' } })}/>
            <label htmlFor="taiKhoan">Tài khoản</label>
            {errors.taiKhoan && <span className="error-message">{errors.taiKhoan.message}</span>}
          </div>
          <div className="input-group">
            <input type="text" id="hoTen" name="hoTen" {...register('hoTen', { required: 'Họ tên là bắt buộc', minLength: { value: 2, message: 'Họ tên phải có ít nhất 2 ký tự' } })}/>
            <label htmlFor="hoTen">Họ tên</label>
            {errors.hoTen && <span className="error-message">{errors.hoTen.message}</span>}
          </div>
          <div className="input-group">
            <input type="email" id="email" name="email" {...register('email', { required: 'Email là bắt buộc', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email không hợp lệ' } })}/>
            <label htmlFor="email">Email</label>
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="input-group">
            <input type="text" id="soDt" name="soDt" {...register('soDt', { required: 'Số điện thoại là bắt buộc', pattern: { value: /^0[0-9]{9,10}$/, message: 'Số điện thoại phải bắt đầu bằng 0 và có 10-11 số' } })}/>
            <label htmlFor="soDt">Số điện thoại</label>
            {errors.soDt && <span className="error-message">{errors.soDt.message}</span>}
          </div>
          <div className="input-group">
            <input
              type={eye ? "text" : "password"}
              id="password"
              name="matKhau"
              {...register('matKhau', { required: 'Mật khẩu là bắt buộc', minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' } })}
            />
            <label htmlFor="matKhau">Mật khẩu</label>
            {errors.matKhau && <span className="error-message">{errors.matKhau.message}</span>}
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
