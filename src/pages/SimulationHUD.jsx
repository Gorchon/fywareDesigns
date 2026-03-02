import { useState, useEffect } from 'react'

const notifications = [
  { id: 1, type: 'success', text: 'Conexión correcta', icon: '✓' },
  { id: 2, type: 'error', text: 'Error de cableado', icon: '✕' },
  { id: 3, type: 'success', text: 'Panel anclado', icon: '✓' },
  { id: 4, type: 'warning', text: 'Verificar tensión', icon: '⚠' },
]

function Notif({ notif, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(notif.id), 3500)
    return () => clearTimeout(t)
  }, [notif.id, onRemove])

  const colors = {
    success: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', icon: '#4ade80', text: '#86efac' },
    error:   { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.4)',  icon: '#f87171', text: '#fca5a5' },
    warning: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', icon: '#fbbf24', text: '#fde68a' },
  }
  const c = colors[notif.type]

  return (
    <div className="page-enter flex items-center gap-3 px-4 py-3 rounded-2xl mb-2"
      style={{ background: c.bg, border: `1px solid ${c.border}`, backdropFilter: 'blur(12px)', minWidth: '200px' }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{ background: c.border, color: c.icon }}>
        {notif.icon}
      </div>
      <span className="text-sm font-medium" style={{ color: c.text }}>{notif.text}</span>
    </div>
  )
}

export default function SimulationHUD({ onNext }) {
  const [progress, setProgress] = useState(5)
  const [activeNotifs, setActiveNotifs] = useState([])
  const [notifIdx, setNotifIdx] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [panelPos, setPanelPos] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)

  // Auto-show notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const n = notifications[notifIdx % notifications.length]
      setActiveNotifs(prev => [...prev, { ...n, id: Date.now() }])
      setNotifIdx(i => i + 1)
      setProgress(p => Math.min(p + 3, 100))
    }, 4000)
    return () => clearInterval(interval)
  }, [notifIdx])

  const removeNotif = (id) => setActiveNotifs(prev => prev.filter(n => n.id !== id))

  // Simple drag simulation
  const handleMouseMove = (e) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    setPanelPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div className="relative w-full h-screen overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}>

      {/* Rooftop background simulation */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e3a5f 100%)',
        }}>
        {/* Sky gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(251,146,60,0.08) 0%, rgba(251,191,36,0.05) 20%, transparent 50%)'
        }} />
        {/* Roof surface */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: 'linear-gradient(180deg, #374151, #1f2937)', borderTop: '2px solid rgba(255,255,255,0.05)' }}>
          {/* Roof tiles pattern */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute h-full"
              style={{ left: `${i * 12.5}%`, width: '12.5%', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
              {[...Array(4)].map((_, j) => (
                <div key={j} className="absolute w-full"
                  style={{ top: `${j * 25}%`, height: '25%', background: j % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'transparent' }} />
              ))}
            </div>
          ))}
        </div>

        {/* Solar panels grid on roof */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2" style={{ transform: 'translateX(-50%) perspective(600px) rotateX(25deg)' }}>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i}
                className="rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  width: '60px', height: '44px',
                  background: i === 2 || i === 5 ? 'rgba(249,115,22,0.3)' : 'rgba(30,58,138,0.7)',
                  border: i === 2 || i === 5 ? '1.5px solid rgba(249,115,22,0.6)' : '1px solid rgba(59,130,246,0.4)',
                  boxShadow: i === 2 || i === 5 ? '0 0 12px rgba(249,115,22,0.3)' : 'none'
                }}>
                <div className="grid grid-cols-3 gap-0.5 p-1 w-full h-full">
                  {[...Array(9)].map((_, j) => (
                    <div key={j} className="rounded-sm opacity-60"
                      style={{ background: i === 2 || i === 5 ? 'rgba(249,115,22,0.5)' : 'rgba(96,165,250,0.4)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draggable panel */}
        <div
          className="absolute cursor-grab active:cursor-grabbing transition-all duration-75"
          style={{
            left: `${panelPos.x}%`,
            top: `${panelPos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseDown={() => setIsDragging(true)}>
          <div className="rounded-xl p-0.5"
            style={{
              width: '70px', height: '52px',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.4), rgba(251,191,36,0.3))',
              border: '2px solid rgba(251,146,60,0.6)',
              boxShadow: '0 0 20px rgba(251,146,60,0.4)',
            }}>
            <div className="w-full h-full rounded-lg grid grid-cols-3 gap-0.5 p-1">
              {[...Array(9)].map((_, j) => (
                <div key={j} className="rounded-sm" style={{ background: 'rgba(251,146,60,0.5)' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
      </div>

      {/* ==================== HUD OVERLAYS ==================== */}

      {/* TOP LEFT - Tools panel */}
      <div className="absolute top-14 left-4">
        <div className="glass rounded-2xl p-3"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <p className="text-white/40 text-xs tracking-wider uppercase mb-2.5 text-center">Herramientas</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Taladro', icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4l-8 8M10 3l5 5-2 2-5-5 2-2zM3 12l3 3-4 1 1-4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )},
              { label: 'Cables', icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9c0-3.314 2.686-6 6-6s6 2.686 6 6M9 3v2M3 9H1M17 9h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9 11v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              )},
              { label: 'Guantes', icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6 14V8M8 14V6M10 14V7M12 14V8M14 10v4H4v-4l2-4V3.5a1 1 0 012 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )},
            ].map((tool) => (
              <button key={tool.label}
                className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 group"
                style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,146,60,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,146,60,0.1)'}>
                <span className="text-orange-400">{tool.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Security indicators */}
        <div className="glass rounded-2xl p-3 mt-3"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <p className="text-white/40 text-xs tracking-wider uppercase mb-2.5 text-center">Seguridad</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Eléctrico', color: '#fbbf24', icon: '⚡' },
              { label: 'Riesgo', color: '#f87171', icon: '⚠' },
              { label: 'Calor', color: '#fb923c', icon: '🌡' },
            ].map((alert) => (
              <div key={alert.label}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl"
                style={{ background: `${alert.color}18`, border: `1px solid ${alert.color}40` }}>
                <span className="text-sm">{alert.icon}</span>
                <span className="text-xs font-medium" style={{ color: `${alert.color}cc` }}>{alert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP RIGHT - Progress */}
      <div className="absolute top-14 right-4">
        <div className="glass rounded-2xl px-4 py-3"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)', minWidth: '160px' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs tracking-wider uppercase">Progreso</span>
            <span className="text-orange-400 font-bold text-sm">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
          </div>
          <p className="text-white/30 text-xs">Paso 1 de 12</p>
        </div>

        {/* Compass mini */}
        <div className="glass rounded-2xl p-3 mt-3 flex flex-col items-center"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)', minWidth: '70px' }}>
          <div className="relative w-10 h-10">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <circle cx="20" cy="20" r="14" stroke="rgba(251,146,60,0.2)" strokeWidth="1"/>
              <path d="M20 6l2.5 9h-5L20 6z" fill="rgba(249,115,22,0.8)"/>
              <path d="M20 34l-2.5-9h5L20 34z" fill="rgba(255,255,255,0.3)"/>
              <circle cx="20" cy="20" r="2" fill="rgba(251,191,36,0.8)"/>
              <text x="20" y="4" textAnchor="middle" fontSize="6" fill="rgba(251,146,60,0.8)" fontWeight="bold">N</text>
            </svg>
          </div>
          <span className="text-white/30 text-xs mt-1">Norte</span>
        </div>
      </div>

      {/* CENTER - Floating guide */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-6">

          {/* Drop zone */}
          <div className="relative">
            <div className="rounded-3xl flex items-center justify-center"
              style={{
                width: '200px', height: '140px',
                background: 'rgba(251,146,60,0.06)',
                border: '2px dashed rgba(251,146,60,0.4)',
                boxShadow: '0 0 30px rgba(251,146,60,0.1)',
              }}>
              <div className="flex flex-col items-center gap-2 text-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4v16M8 12l8 8 8-8" stroke="rgba(251,146,60,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 24h24" stroke="rgba(251,146,60,0.3)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-orange-400/60 text-xs font-medium text-center leading-tight px-4">
                  Arrastra los paneles<br />y colócalos aquí
                </p>
              </div>
            </div>
            {/* Corner anchors */}
            {[
              'top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3`}>
                <div className="w-full h-full" style={{
                  borderTop: i < 2 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                  borderBottom: i >= 2 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                  borderLeft: i % 2 === 0 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                  borderRight: i % 2 === 1 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                  borderRadius: i === 0 ? '3px 0 0 0' : i === 1 ? '0 3px 0 0' : i === 2 ? '0 0 0 3px' : '0 0 3px 0',
                }} />
              </div>
            ))}
          </div>

          {/* Virtual hands */}
          <div className="flex gap-8">
            {[false, true].map((isRight) => (
              <div key={isRight.toString()} className="float-anim" style={{ animationDelay: isRight ? '0.5s' : '0s' }}>
                <svg width="48" height="64" viewBox="0 0 48 64" fill="none"
                  style={{ transform: isRight ? 'scaleX(-1)' : 'scaleX(1)' }}>
                  {/* Palm */}
                  <rect x="10" y="32" width="28" height="24" rx="6" fill="rgba(251,146,60,0.15)" stroke="rgba(251,146,60,0.5)" strokeWidth="1.2"/>
                  {/* Fingers */}
                  {[8,14,20,26,33].map((x, i) => (
                    <rect key={i} x={x} y={i === 4 ? 38 : 18} width="7" height={i === 4 ? 12 : 16} rx="3.5"
                      fill="rgba(251,146,60,0.12)" stroke="rgba(251,146,60,0.4)" strokeWidth="1.2"/>
                  ))}
                  {/* Glow */}
                  <ellipse cx="24" cy="56" rx="16" ry="4" fill="rgba(251,146,60,0.1)"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT - Controls */}
      <div className="absolute bottom-6 left-4 flex gap-2">
        {[
          { label: 'Ayuda', icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M6 6.5C6 5.4 6.9 4.5 8 4.5s2 .9 2 2c0 1.5-2 2-2 2.5M8 12v-.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )},
          { label: 'Config', icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )},
          { label: 'Menú', icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          ), onClick: onNext },
        ].map((btn) => (
          <button key={btn.label}
            onClick={btn.onClick}
            className="glass flex items-center gap-2 px-4 py-2.5 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10"
            style={{ fontSize: '12px', fontWeight: 500 }}>
            <span className="text-white/60">{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS - floating right side */}
      <div className="absolute right-4 bottom-24 flex flex-col items-end">
        {activeNotifs.map(n => (
          <Notif key={n.id} notif={n} onRemove={removeNotif} />
        ))}
      </div>

      {/* Crosshair center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-80px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="1.5" fill="rgba(251,146,60,0.5)"/>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="rgba(251,146,60,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
