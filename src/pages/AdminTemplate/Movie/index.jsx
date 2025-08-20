import React from "react";
import { useState } from "react";
import "../../../scss/components/_movie.scss";
import { format } from "date-fns";
import { getListMoviePagination } from "../../../service/movie.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../_components/loading";
import { useForm } from "react-hook-form";
import { deleteMovie } from "../../../service/cinema.api";
import Toast from "../../_components/Toast";
export default function Movie() {
  const [isModal, setIsModal] = useState(false);
  const {register} = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 15;
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(null);
  const { mutate: removeMovie } = useMutation({
    mutationFn: (maPhim) => deleteMovie(maPhim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-movie"] });
      setToast({ type: 'success', message: 'Xóa phim thành công' });
    },
    onError: () => {
      setToast({ type: 'error', message: 'Xóa phim thất bại' });
    }
  });
  // call API get listMovie with pagination
  const { data: listMovie, isLoading } = useQuery({
    queryKey: ["list-movie", currentPage, MOVIES_PER_PAGE],
    queryFn: () => getListMoviePagination(currentPage, MOVIES_PER_PAGE),
  });

  const renderListMovie = () => {
    if (isLoading) return <Loading />;
    const items = listMovie?.items || [];
    return items.map((movie) => {
      return (
        <tr
          key={movie.maPhim}
          className="bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate w-20"
          >
            {movie.tenPhim}
          </th>
          <td className="px-6 py-4">
            {movie.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), "dd/MM/yyyy") : ""}
          </td>
          <td className="px-6 py-4">
            {movie.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
          </td>
          <td className="px-6 py-4">{movie.danhGia}</td>
          <td className="px-6 py-4 text-right">
            <button
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
              onClick={() => setIsModal(true)}
            >
              Edit
            </button>
            <button
              className="font-medium text-red-600 hover:underline"
              onClick={() => {
                if (confirm(`Bạn có chắc muốn xóa phim "${movie.tenPhim}"?`)) {
                  removeMovie(movie.maPhim);
                }
              }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };
  const totalPages = listMovie?.totalPages || Math.ceil((listMovie?.count || 0) / MOVIES_PER_PAGE) || 1;

  return (
    <>
      <div className=" flex justify-end p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <button className=" " onClick={() => setIsModal(true)}>
          Thêm phim mới
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-[40%]">
                Tên phim
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Ngày khởi chiếu
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Trạng thái
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Đánh giá
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderListMovie()}</tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <button
            className="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <div className="inline-flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1.5 text-sm rounded border ${
                  currentPage === page
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
      {isModal ? (
        <div>
          <div className="modal z-100 absolute">
            <h1>Thêm phim mới</h1>
            <div className="modalForm">
              <form >
                <div className="groupInput">
                  <div className="formInput">
                    <input type="text" required name="tenPhim" {...register('tenPhim')}/>
                    <label htmlFor="tenPhim">Tên phim</label>
                  </div>
                  <div className="formInput invisible">
                    <input type="text" required name="biDanh" />
                    <label htmlFor="biDanh">Bí danh</label>
                  </div>
                </div>
                <div className="groupInput transform translate-y-4">
                  <div className="formInput">
                    <input type="text" required name="trailer" {...register('trailer')}/>
                    <label htmlFor="trailer">Trailer</label>
                  </div>
                  <div className="formInput">
                    <input
                      type="file"
                      className="inputFile"
                      required
                      name="hinhAnh"
                    />
                    {/* <label htmlFor="hinhAnh">Bí danh</label> */}
                  </div>
                </div>
                <div className="groupInput ">
                  <div className="formInput">
                    <textarea
                      type="text"
                      rows="100"
                      maxLength={2000}
                      required
                      name="moTa"
                      {...register('moTa')}
                    />
                    <label htmlFor="trailer" className="moTa">
                      Mô tả
                    </label>
                  </div>
                  <div className="formImg">
                    {/* <label htmlFor="hinhAnh">Bí danh</label> */}
                  </div>
                </div>
                <div className="groupInput ">
                  <div className="formInput absolute ml-15 transform -translate-y-13 -left-3 w-full ">
                    <input
                      type="date"
                      required
                      name="ngayKhoiChieu"
                      className="transform ml-0"
                                    {...register('ngayKhoiChieu')}
                    />
                    <label htmlFor="ngayKhoiChieu" className="dateLabel">
                      Ngày khởi chiếu
                    </label>
                  </div>
                </div>
                <div className="groupInput transform -translate-y-9">
                  <div className="formInput">
                    <input type="number" required name="danhGia" {...register('danhGia')}/>
                    <label htmlFor="danhGia">Đánh giá</label>
                  </div>
                  <div className="formInput mb-0  ">
                    <div className="flex justify-between items-center flex-wrap">
                      <input
                        type="radio"
                        name="trangThai"
                        id="dangChieu"
                        className="mr-1.5"
                        {...register('dangChieu')}
                      />
                      <label
                        htmlFor="dangChieu"
                        className="text-[16px] font-[300]"
                      >
                        {" "}
                        Đang chiếu
                      </label>
                      <input
                        type="radio"
                        name="trangThai"
                        id="sapChieu"
                        className="ml-5 mr-1.5"
                      />
                      <label
                        htmlFor="sapChieu"
                        className="text-[16px] font-[300]"
                      >
                        {" "}
                        Sắp chiếu
                      </label>
                    </div>
                    {/* <label htmlFor="biDanh">Trạng thái</label> */}
                  </div>
                </div>
                <div className=" flex justify-start left-0 items-center ml-12 transform -translate-y-7">
                  <input
                    type="checkbox"
                    className="appearance-none border-black mr-2 "
                  />
                  <label htmlFor="">Hot</label>
                </div>
              </form>
            </div>

            <button type="submit">Thêm</button>
          </div>
          <div className="background" onClick={() => setIsModal(false)}></div>
        </div>
      ) : (
        ""
      )}
      {toast ? (<Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />) : null}
    </>
  );
}
