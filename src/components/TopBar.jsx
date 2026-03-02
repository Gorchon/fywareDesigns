import { useState, useEffect } from 'react'

const WifiIcon = ({ strength = 3 }) => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M8 9.5C8.828 9.5 9.5 10.172 9.5 11S8.828 12.5 8 12.5 6.5 11.828 6.5 11 7.172 9.5 8 9.5z"
      fill={strength >= 1 ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.2)'} />
    <path d="M4.2 7.4C5.2 6.4 6.55 5.8 8 5.8s2.8.6 3.8 1.6"
      stroke={strength >= 2 ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.2)'}
      strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M1.6 4.8C3.15 3.25 5.47 2.3 8 2.3s4.85.95 6.4 2.5"
      stroke={strength >= 3 ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.2)'}
      strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
)

const BatteryIcon = ({ level = 87 }) => {
  const color = level > 20 ? 'rgba(134,239,172,0.9)' : 'rgba(248,113,113,0.9)'
  const width = Math.max(2, (level / 100) * 18)
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
      <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      <rect x="2" y="2" width={width} height="8" rx="1.5" fill={color}/>
      <path d="M21.5 4v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function TopBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatTime = (d) =>
    d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

  const formatDate = (d) =>
    d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2"
      style={{ height: '38px' }}>
      {/* Date left */}
      <div className="glass rounded-full px-3 py-1">
        <span className="text-white/70 text-xs font-medium tracking-wide capitalize">
          {formatDate(time)}
        </span>
      </div>

      {/* Time center */}
      <div className="glass rounded-full px-4 py-1">
        <span className="text-white font-semibold text-sm tracking-widest">
          {formatTime(time)}
        </span>
      </div>

      {/* Status right */}
      <div className="glass rounded-full px-3 py-1 flex items-center gap-3">
        <WifiIcon strength={3} />
        <div className="flex items-center gap-1">
          <BatteryIcon level={87} />
          <span className="text-white/70 text-xs font-medium">87%</span>
        </div>
      </div>
    </div>
  )
}
