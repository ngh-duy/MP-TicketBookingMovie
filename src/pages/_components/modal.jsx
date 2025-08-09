import React from "react";
import { useState } from "react";
import "../../scss/components/_modal.scss";

export default function Modal() {
  const [modal, setModal] = useState(true);
  return (
    <>
      {modal ? (
        <>
          <dialog className="modal " open>
            <h1>Đăng ký thành công</h1>
            <hr />
            <p>Chúc mừng! Tài khoản của bạn đã được tạo thành công.  
    Hãy đăng nhập để bắt đầu trải nghiệm ngay.</p>
    <hr />
            <button onClick={()=>setModal(false)}>Xác nhận</button>
          </dialog>
          <div className="background"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
