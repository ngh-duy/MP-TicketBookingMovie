import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../_components/loading'
import { getListMovie } from '../../../service/movie.api'
import { getListUser } from '../../../service/user.api'
import { getCenimaSystem } from '../../../service/cinema.api'

export default function Dashboard() {
  const {
    data: movies,
    isLoading: loadingMovies,
  } = useQuery({ queryKey: ['dash-movies'], queryFn: () => getListMovie() })

  const {
    data: users,
    isLoading: loadingUsers,
  } = useQuery({ queryKey: ['dash-users'], queryFn: () => getListUser('GP01') })

  const {
    data: cinemas,
    isLoading: loadingCinemas,
  } = useQuery({ queryKey: ['dash-cinemas'], queryFn: () => getCenimaSystem() })

  const isLoading = loadingMovies || loadingUsers || loadingCinemas

  const kpis = useMemo(() => {
    return {
      totalMovies: Array.isArray(movies) ? movies.length : 0,
      totalUsers: Array.isArray(users) ? users.length : 0,
      totalCinemas: Array.isArray(cinemas) ? cinemas.length : 0,
    }
  }, [movies, users, cinemas])

  const userTypeDist = useMemo(() => {
    const result = { KhachHang: 0, QuanTri: 0 }
    if (Array.isArray(users)) {
      users.forEach((u) => {
        if (u.maLoaiNguoiDung === 'QuanTri') result.QuanTri += 1
        else result.KhachHang += 1
      })
    }
    const total = result.KhachHang + result.QuanTri || 1
    return {
      ...result,
      percentKhach: Math.round((result.KhachHang / total) * 100),
      percentQuanTri: Math.round((result.QuanTri / total) * 100),
    }
  }, [users])

  const moviesByYear = useMemo(() => {
    const map = new Map()
    if (Array.isArray(movies)) {
      movies.forEach((m) => {
        if (!m.ngayKhoiChieu) return
        const year = new Date(m.ngayKhoiChieu).getFullYear()
        if (!Number.isFinite(year)) return
        map.set(year, (map.get(year) || 0) + 1)
      })
    }
    const entries = Array.from(map.entries()).sort((a, b) => a[0] - b[0])
    const last = entries.slice(-6)
    const maxVal = Math.max(1, ...last.map(([, v]) => v))
    return { points: last, maxVal }
  }, [movies])

  const pieStyle = useMemo(() => {
    const a = userTypeDist.percentKhach
    const b = 100 - a
    return {
      background: `conic-gradient(#3b82f6 0 ${a}%, #22c55e ${a}% 100%)`,
    }
  }, [userTypeDist])

  return (
    <div className="p-4">
      {isLoading ? <Loading /> : null}

      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Tổng quan</h2>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard
          label="Tổng phim"
          value={kpis.totalMovies}
          color="blue"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              <path fill="currentColor" d="M21 3a1 1 0 0 0-1 1v2h-2V4a1 1 0 1 0-2 0v1H8V4a1 1 0 1 0-2 0v2H4V4a1 1 0 0 0-2 0v16a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0v-1h8v1a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1M6 15H4v-2h2zm0-4H4V9h2zm0-4H4V5h2zm12 12H6V13h12zm0-6H6V7h12zm2 2h-2v-2h2zm0-4h-2V9h2zm0-4h-2V5h2z"/>
            </svg>
          }
        />
        <KpiCard
          label="Tổng rạp"
          value={kpis.totalCinemas}
          color="emerald"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              <path fill="currentColor" d="M12 2L2 7v2h20V7zm7 6v9h3v2H2v-2h3V8zM7 8v9h10V8z"/>
            </svg>
          }
        />
        <KpiCard
          label="Tổng người dùng"
          value={kpis.totalUsers}
          color="violet"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m-7 8a7 7 0 0 1 14 0v2H5z"/>
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 lg:col-span-2">
          <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Phim theo năm (6 năm gần nhất)</h3>
          <BarChart data={moviesByYear.points} maxVal={moviesByYear.maxVal} />
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Tỉ lệ loại người dùng</h3>
          <div className="flex items-center gap-4">
            <div className="h-36 w-36 rounded-full" style={pieStyle} />
            <div className="text-sm">
              <Legend color="#3b82f6" label={`Khách hàng (${userTypeDist.percentKhach}%)`} />
              <Legend color="#22c55e" label={`Quản trị (${userTypeDist.percentQuanTri}%)`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ label, value, icon, color = 'blue' }) {
  const accents = {
    blue: 'from-blue-600/15 to-blue-600/0 text-blue-600',
    emerald: 'from-emerald-600/15 to-emerald-600/0 text-emerald-600',
    violet: 'from-violet-600/15 to-violet-600/0 text-violet-600',
  }
  const accent = accents[color] || accents.blue
  const numberFormat = (n) => new Intl.NumberFormat('vi-VN').format(n ?? 0)
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent}`} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{numberFormat(value)}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${accent.split(' ').at(-1)} bg-gray-100 dark:bg-gray-700`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function BarChart({ data, maxVal }) {
  if (!data?.length) {
    return <p className="text-sm text-gray-500">Không có dữ liệu</p>
  }
  return (
    <div className="flex h-56 items-end gap-3">
      {data.map(([year, count]) => {
        const height = Math.max(4, Math.round((count / maxVal) * 100))
        return (
          <div key={year} className="flex h-full flex-1 flex-col items-center justify-end">
            <div className="w-8 rounded-t bg-blue-600" style={{ height: `${height}%` }} />
            <span className="mt-2 text-xs text-gray-600 dark:text-gray-300">{year}</span>
            <span className="text-xs font-medium text-gray-900 dark:text-white">{count}</span>
          </div>
        )
      })}
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: color }} />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </div>
  )
}
