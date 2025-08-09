import React from "react";
import { NavLink } from "react-router-dom";
import "../../../scss/layouts/_header.scss";
import { useState } from "react";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [itemMenu, setItemMenu] = useState({
    menuItemTheLoai:false,
    menuItemQuocGia: false,
    menuItemNam:false
  })
  return (
    <header>
      <div className="header-content">
        <div className="header-group">
          <div className="logo">
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
          </div>
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
        <div className="search">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        {openMenu ? (
          <div className="groupMenu">
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
              </li>
              <li>
                Quốc gia
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
              </li>
              <li>Phim Reels</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <nav>
        <ul>
          <li>Trang chủ</li>
          <li onClick={()=>setItemMenu({...itemMenu,menuItemTheLoai:true, menuItemQuocGia:false, menuItemNam:false})}>
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
          </li>
          <li onClick={()=>setItemMenu({...itemMenu,menuItemTheLoai:false, menuItemQuocGia:true, menuItemNam:false})}>
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
          </li>
          <li onClick={()=>setItemMenu({...itemMenu,menuItemTheLoai:false, menuItemQuocGia:false, menuItemNam:true})}>
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
          </li>
          <li>Phim Reels</li>
        </ul>
      </nav>
      <div className="menuItem">
        {itemMenu.menuItemTheLoai ? <div className="menuItemTheLoai ">
          <ul>
            <li>Tình cảm</li>
            <li>Kinh dị</li>
            <li>Bi kịch</li>
            <li>Học đường</li>
            <li>Pháp sư</li>
            <li>Xuyên không</li>
          </ul>
        </div> : ''}
        {itemMenu.menuItemQuocGia ? <div className="menuItemQuocGia ">
          <ul>
            <li>Tình cảm</li>
            <li>Kinh dị</li>
            <li>Bi kịch</li>
            <li>Học đường</li>
            <li>Pháp sư</li>
            <li>Xuyên không</li>
          </ul>
        </div> : ''}
        {itemMenu.menuItemNam ? <div className="menuItemNam ">
          <ul>
            <li>Tình cảm</li>
            <li>Kinh dị</li>
            <li>Bi kịch</li>
            <li>Học đường</li>
            <li>Pháp sư</li>
            <li>Xuyên không</li>
          </ul>
        </div> : ''}
      </div>
    </header>
  );
}
