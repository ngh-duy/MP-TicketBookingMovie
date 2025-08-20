import React, { useMemo, useState } from 'react'

export default function Profile() {
  const initial = useMemo(() => ({
    taiKhoan: 'nguyenvana',
    hoTen: 'Nguyễn Văn A',
    email: 'vana@example.com',
    soDT: '0901234567',
    maLoaiNguoiDung: 'KhachHang',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }), [])
  const [user, setUser] = useState(initial)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ hoTen: user.hoTen, email: user.email, soDT: user.soDT })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }
  const handleSave = (e) => {
    e.preventDefault()
    setUser((u) => ({ ...u, ...form }))
    setEdit(false)
  }

  return (
    <div className="p-4">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.hoTen}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            <span className="mt-1 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
              {user.maLoaiNguoiDung === 'QuanTri' ? 'Quản trị' : 'Khách hàng'}
            </span>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {!edit ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-gray-500">Tài khoản</p>
              <p className="text-gray-900 dark:text-white">{user.taiKhoan}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Số điện thoại</p>
              <p className="text-gray-900 dark:text-white">{user.soDT}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Họ tên</p>
              <p className="text-gray-900 dark:text-white">{user.hoTen}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={() => setEdit(true)} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Chỉnh sửa</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Họ tên</label>
              <input name="hoTen" value={form.hoTen} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Số điện thoại</label>
              <input name="soDT" value={form.soDT} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => { setEdit(false); setForm({ hoTen: user.hoTen, email: user.email, soDT: user.soDT }) }} className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Hủy</button>
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Lưu</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
