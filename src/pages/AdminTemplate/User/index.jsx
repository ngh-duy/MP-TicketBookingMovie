import React, { useMemo, useState } from 'react';

export default function User() {
  const initialUsers = useMemo(() => {
    const base = [
      { taiKhoan: 'nguyenvana', hoTen: 'Nguyễn Văn A', email: 'vana@example.com', soDT: '0901234567', maLoaiNguoiDung: 'KhachHang' },
      { taiKhoan: 'tranthib', hoTen: 'Trần Thị B', email: 'thib@example.com', soDT: '0912345678', maLoaiNguoiDung: 'KhachHang' },
      { taiKhoan: 'lehuuc', hoTen: 'Lê Hữu C', email: 'huuc@example.com', soDT: '0923456789', maLoaiNguoiDung: 'QuanTri' },
      { taiKhoan: 'phamthid', hoTen: 'Phạm Thị D', email: 'thid@example.com', soDT: '0934567890', maLoaiNguoiDung: 'KhachHang' },
      { taiKhoan: 'dangvant', hoTen: 'Đặng Văn T', email: 'vant@example.com', soDT: '0945678901', maLoaiNguoiDung: 'KhachHang' },
    ];
    const extra = Array.from({ length: 40 }, (_, i) => ({
      taiKhoan: `user${i + 1}`,
      hoTen: `Người Dùng ${i + 1}`,
      email: `user${i + 1}@example.com`,
      soDT: `09${(1234567 + i).toString().padStart(8, '0')}`,
      maLoaiNguoiDung: (i + 1) % 5 === 0 ? 'QuanTri' : 'KhachHang',
    }));
    return [...base, ...extra];
  }, []);
  const [users, setUsers] = useState(initialUsers);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({
    taiKhoan: '12312214123123',
    hoTen: '',
    email: '',
    soDT: '',
    matKhau: '',
    maLoaiNguoiDung: '',
  });
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 15;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / USERS_PER_PAGE);
  const pageStartIndex = (currentPage - 1) * USERS_PER_PAGE;
  const pageEndIndex = pageStartIndex + USERS_PER_PAGE;
  const usersInPage = users.slice(pageStartIndex, pageEndIndex);

  const renderRows = () => {
    return usersInPage.map((user, index) => (
      <tr key={user.taiKhoan || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap">{pageStartIndex + index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.hoTen}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.soDT}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.maLoaiNguoiDung}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button
            className="font-medium text-blue-600 hover:underline mr-3"
            onClick={() => {
              setForm({
                taiKhoan: user.taiKhoan,
                hoTen: user.hoTen || '',
                email: user.email || '',
                soDT: user.soDT || '',
                matKhau: '',
                maLoaiNguoiDung: user.maLoaiNguoiDung || '',
              });
              setIsEditOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="font-medium text-red-600 hover:underline"
            onClick={() => alert(`Xóa: ${user.taiKhoan}`)}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.hoTen || form.hoTen.trim().length < 2) {
      nextErrors.hoTen = 'Họ tên tối thiểu 2 ký tự';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      nextErrors.email = 'Email không hợp lệ';
    }
    const phoneRegex = /^0\d{9,10}$/;
    if (!form.soDT || !phoneRegex.test(form.soDT)) {
      nextErrors.soDT = 'Số điện thoại phải bắt đầu bằng 0 và dài 10-11 số';
    }
    if (!form.maLoaiNguoiDung) {
      nextErrors.maLoaiNguoiDung = 'Vui lòng chọn loại người dùng';
    }
    if (form.matKhau && form.matKhau.length < 6) {
      nextErrors.matKhau = 'Mật khẩu tối thiểu 6 ký tự (để trống nếu không đổi)';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setUsers((prev) =>
      prev.map((u) =>
        u.taiKhoan === form.taiKhoan
          ? { ...u, hoTen: form.hoTen, email: form.email, soDT: form.soDT, maLoaiNguoiDung: form.maLoaiNguoiDung }
          : u
      )
    );
    setIsEditOpen(false);
  };

  

  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Danh sách người dùng</h2>
        <span className="text-sm text-gray-600 dark:text-gray-300">Hiển thị {Math.min(pageEndIndex, totalItems)}/{totalItems}</span>
      </div>
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-[8%]">STT</th>
            <th scope="col" className="px-6 py-3 w-[24%]">Họ tên</th>
            <th scope="col" className="px-6 py-3 w-[28%]">Email</th>
            <th scope="col" className="px-6 py-3 w-[18%]">Số ĐT</th>
            <th scope="col" className="px-6 py-3 w-[14%]">Loại người dùng</th>
            <th scope="col" className="px-6 py-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
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
      {isEditOpen ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsEditOpen(false)}></div>
            <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Chỉnh sửa người dùng</h2>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="taiKhoan" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tài khoản</label>
                  <input id="taiKhoan" type="text" name="taiKhoan" value={form.taiKhoan} readOnly required className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="maLoaiNguoiDung" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loại người dùng</label>
                  <select id="maLoaiNguoiDung" name="maLoaiNguoiDung" value={form.maLoaiNguoiDung} onChange={handleChange} required aria-invalid={!!errors.maLoaiNguoiDung} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option value="">-- Chọn loại --</option>
                    <option value="KhachHang">Khách hàng</option>
                    <option value="QuanTri">Quản trị</option>
                  </select>
                  {errors.maLoaiNguoiDung ? (<small className="text-red-600">{errors.maLoaiNguoiDung}</small>) : null}
                </div>
                <div>
                  <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Họ tên</label>
                  <input id="hoTen" type="text" name="hoTen" value={form.hoTen} onChange={handleChange} required aria-invalid={!!errors.hoTen} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  {errors.hoTen ? (<small className="text-red-600">{errors.hoTen}</small>) : null}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required aria-invalid={!!errors.email} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  {errors.email ? (<small className="text-red-600">{errors.email}</small>) : null}
                </div>
                <div>
                  <label htmlFor="soDT" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số điện thoại</label>
                  <input id="soDT" type="tel" name="soDT" value={form.soDT} onChange={handleChange} required aria-invalid={!!errors.soDT} pattern="0\d{9,10}" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  {errors.soDT ? (<small className="text-red-600">{errors.soDT}</small>) : null}
                </div>
                <div>
                  <label htmlFor="matKhau" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
                  <input id="matKhau" type="password" name="matKhau" value={form.matKhau} onChange={handleChange} aria-invalid={!!errors.matKhau} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                  {errors.matKhau ? (<small className="text-red-600">{errors.matKhau}</small>) : null}
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                  <button type="button" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => setIsEditOpen(false)}>Hủy</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
