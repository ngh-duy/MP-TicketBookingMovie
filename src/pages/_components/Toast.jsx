import React, { useEffect } from 'react'

export default function Toast({ type = 'success', message = '', onClose, duration = 2500 }) {
  useEffect(() => {
    const id = setTimeout(() => onClose && onClose(), duration)
    return () => clearTimeout(id)
  }, [duration, onClose])

  const color = type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-yellow-500' : 'bg-green-600'

  return (
    <div className={`pointer-events-auto fixed right-4 top-4 z-[1000] rounded text-white shadow-lg ${color}`} role="status" aria-live="polite">
      <div className="px-4 py-3 flex items-center gap-3">
        <span className="text-sm">{message}</span>
        <button className="/ml-2 rounded bg-white/20 px-2 text-xs" onClick={onClose}>Đóng</button>
      </div>
    </div>
  )
}


