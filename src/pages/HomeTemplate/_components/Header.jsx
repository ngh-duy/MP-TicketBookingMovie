import React from "react";
import { NavLink } from "react-router-dom";
import "../../../scss/layouts/_header.scss";
import { useState } from "react";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [itemMenu, setItemMenu] = useState({
    menuItemTheLoai: false,
    menuItemQuocGia: false,
    menuItemNam: false,
  });
  const [active, setActive] = useState({
    theLoai: "",
    quocGia: "",
    nam: "",
  });
const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  return (
    <header>
      <div className="header-content">
        <div className="header-group">
          <NavLink to='/' className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="film"
            >
              <path
                fill="#FFFFFF"
                d="M21,2a1,1,0,0,0-1,1V5H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V5H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V19H6v2a1,1,0,0,0,2,0V20h8v1a1,1,0,0,0,2,0V19h2v2a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM6,17H4V15H6Zm0-4H4V11H6ZM6,9H4V7H6Zm10,9H8V13h8Zm0-7H8V6h8Zm4,6H18V15h2Zm0-4H18V11h2Zm0-4H18V7h2Z"
              ></path>
            </svg>
            <span>HDVietsub</span>
          </NavLink>
          <div className="menu">
            <svg
              onClick={() => setOpenMenu(!openMenu)}
              xmlns="http://www.w3.org/2000/svg"
              // enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              id="bars"
            >
              <path
                fill="#FFFFFF"
                d="M20,11H4c-0.6,0-1,0.4-1,1s0.4,1,1,1h16c0.6,0,1-0.4,1-1S20.6,11,20,11z M4,8h16c0.6,0,1-0.4,1-1s-0.4-1-1-1H4C3.4,6,3,6.4,3,7S3.4,8,4,8z M20,16H4c-0.6,0-1,0.4-1,1s0.4,1,1,1h16c0.6,0,1-0.4,1-1S20.6,16,20,16z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="search flex items-center">
          <input
            type="search"
            name="search"
            id="search"
            width={"100%"}
            placeholder="Search..."
          />
          {accessToken ?  <NavLink to='/profile' className=""><i class="fa-solid fa-user-secret" style={{color: '#ffffff',fontSize:'200%'}}></i></NavLink> : <NavLink to='/login'><span className=" text-white text-xl font-medium px-3">Login</span></NavLink>}
        </div>
        
        {openMenu ? (
          <div className="groupMenu">
            <ul>
              <li>
                <h1>Trang chủ</h1>
              </li>
              <li
                onClick={() => {
                  setActive({ theLoai: "bg-[#363636]", quocGia: "", nam: "" });
                  setItemMenu({
                    ...itemMenu,
                    menuItemTheLoai: !itemMenu.menuItemTheLoai,
                    menuItemQuocGia: false,
                    menuItemNam: false,
                  });
                }}
              >
                <h1 className={active.theLoai}>Thể loại</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="angle-down"
                >
                  <path
                    fill="#FFFFFF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
                  ></path>
                </svg>
              </li>
              <ul className={itemMenu.menuItemTheLoai ? "" : "hidden"}>
                <li>Tình cảm</li>
                <li>Kinh dị</li>
                <li>Bi kịch</li>
                <li>Học đường</li>
                <li>Pháp sư</li>
                <li>Xuyên không</li>
              </ul>
              <li
                onClick={() => {
                  setActive({ theLoai: "", quocGia: "bg-[#363636]", nam: "" });
                  setItemMenu({
                    ...itemMenu,
                    menuItemTheLoai: false,
                    menuItemQuocGia: !itemMenu.menuItemQuocGia,
                    menuItemNam: false,
                  });
                }}
              >
                <h1 className={active.quocGia}>Quốc gia</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="angle-down"
                >
                  <path
                    fill="#FFFFFF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
                  ></path>
                </svg>
              </li>
              <ul className={itemMenu.menuItemQuocGia ? "" : "hidden"}>
                <li>Việt Nam</li>
                <li>Thái Lan</li>
                <li>HongKong</li>
                <li>Đài Loan</li>
                <li>Nhật Bản</li>
                <li>Hàn Quốc</li>
                <li>Trung Quốc</li>
              </ul>
              <li
                onClick={() => {
                  setActive({ theLoai: "", quocGia: "", nam: "bg-[#363636]" });
                  setItemMenu({
                    ...itemMenu,
                    menuItemTheLoai: false,
                    menuItemQuocGia: false,
                    menuItemNam: !itemMenu.menuItemNam,
                  });
                }}
              >
                <h1 className={active.nam}> Phim theo năm</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="angle-down"
                >
                  <path
                    fill="#FFFFFF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
                  ></path>
                </svg>
              </li>
              <ul className={itemMenu.menuItemNam ? "" : "hidden"}>
                <li>2025</li>
                <li>2024</li>
                <li>2023</li>
                <li>2022</li>
                <li>2021</li>
                <li>2020</li>
                <li>2019</li>
                <li>2018</li>
                <li>2017</li>
                <li>2016</li>
              </ul>
              <li>
                <h1>Phim Reels</h1>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <nav >
        <ul>
          <li>Trang chủ</li>
          <li>
            Thể loại
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="angle-down"
            >
              <path
                fill="#FFFFFF"
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
            <ul className="submenu">
              <li>Tình cảm</li>
              <li>Kinh dị</li>
              <li>Bi kịch</li>
              <li>Học đường</li>
              <li>Pháp sư</li>
              <li>Xuyên không</li>
            </ul>
          </li>
          <li>
            Quốc gia{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="angle-down"
            >
              <path
                fill="#FFFFFF"
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
            <ul className="submenu">
              <li>Việt Nam</li>
              <li>Thái Lan</li>
              <li>HongKong</li>
              <li>Đài Loan</li>
              <li>Nhật Bản</li>
              <li>Hàn Quốc</li>
              <li>Trung Quốc</li>
            </ul>
          </li>
          <li>
            Phim theo năm
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="angle-down"
            >
              <path
                fill="#FFFFFF"
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
            <ul className="submenu">
              <li>2025</li>
              <li>2024</li>
              <li>2023</li>
              <li>2022</li>
              <li>2021</li>
              <li>2020</li>
              <li>2019</li>
              <li>2018</li>
              <li>2017</li>
              <li>2016</li>
            </ul>
          </li>
          <li>Phim Reels</li>
        </ul>
        
      </nav>
      {/* Submenu desktop hiển thị khi hover (đã chuyển thành nested ul ở mỗi li) */}
    </header>
  );
}
