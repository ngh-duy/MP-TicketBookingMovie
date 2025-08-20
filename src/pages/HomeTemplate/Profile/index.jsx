import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileInfo() {
  const navigate = useNavigate()
  const initial = useMemo(() => ({
    taiKhoan: 'nguyenvana',
    hoTen: 'Nguyễn Văn A',
    email: 'vana@example.com',
    soDT: '0901234567',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }), [])
  const [user, setUser] = useState(initial)
  const [active, setActive] = useState('profile')
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ hoTen: user.hoTen, email: user.email, soDT: user.soDT })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.hoTen || form.hoTen.trim().length < 2) next.hoTen = 'Họ tên tối thiểu 2 ký tự'
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRx.test(form.email)) next.email = 'Email không hợp lệ'
    const phoneRx = /^0\d{9,10}$/
    if (!form.soDT || !phoneRx.test(form.soDT)) next.soDT = 'Số điện thoại bắt đầu bằng 0 và 10-11 số'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    setErrors({})
    setUser((u) => ({ ...u, ...form }))
    setEdit(false)
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <aside className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:col-span-1">
          <nav className="space-y-2">
            <button
              className={`w-full rounded px-3 py-2 text-left text-sm ${active === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              onClick={() => setActive('profile')}
            >
              Profile
            </button>
            <button
              className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
              onClick={() => navigate('/login')}
            >
              Đăng xuất
            </button>
          </nav>
        </aside>

        <section className="md:col-span-3">
          {active === 'profile' ? (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user.hoTen}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
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
                    <button onClick={() => setEdit(true)} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Edit</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Họ tên</label>
                    <input name="hoTen" value={form.hoTen} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    {errors.hoTen ? (<small className="text-red-600">{errors.hoTen}</small>) : null}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    {errors.email ? (<small className="text-red-600">{errors.email}</small>) : null}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">Số điện thoại</label>
                    <input name="soDT" value={form.soDT} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    {errors.soDT ? (<small className="text-red-600">{errors.soDT}</small>) : null}
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={() => { setEdit(false); setForm({ hoTen: user.hoTen, email: user.email, soDT: user.soDT }) }} className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Hủy</button>
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Lưu</button>
                  </div>
                </form>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}
