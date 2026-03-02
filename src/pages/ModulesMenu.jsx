import { useState } from 'react'

const modules = [
  {
    id: 'basic',
    label: 'Instalación Básica',
    desc: 'Fundamentos de montaje',
    progress: 100,
    status: 'completed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="11" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2" y="12" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="11" y="12" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: 'wiring',
    label: 'Cableado Seguro',
    desc: 'Normas NOM-001-SEDE',
    progress: 68,
    status: 'active',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10c0-3.866 3.134-7 7-7s7 3.134 7 7M10 3v2M10 15v2M3 10H1M19 10h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 12.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'ground',
    label: 'Puesta a tierra',
    desc: 'Seguridad eléctrica',
    progress: 45,
    status: 'active',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v8M6 10h8M7 13h6M8.5 16h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'advanced',
    label: 'Simulación Avanzada',
    desc: 'Escenarios complejos',
    progress: 12,
    status: 'active',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.4 5H18l-4.2 3 1.6 5-5.4-3.6L4.6 15l1.6-5L2 7h5.6L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'Soporte de Instalación',
    desc: 'Anclajes y estructuras',
    progress: 0,
    status: 'locked',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v16M4 8l6-6 6 6M4 18h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'config',
    label: 'Configuración de Paneles',
    desc: 'Optimización y ajuste',
    progress: 0,
    status: 'locked',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.22 3.22l2.12 2.12M14.66 14.66l2.12 2.12M3.22 16.78l2.12-2.12M14.66 5.34l2.12-2.12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const statusConfig = {
  completed: { color: '#4ade80', bg: 'rgba(34,197,94,0.12)',    border: 'rgba(34,197,94,0.3)' },
  active:    { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',   border: 'rgba(251,146,60,0.3)' },
  locked:    { color: 'rgba(255,255,255,0.25)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' },
}

export default function ModulesMenu({ onBack, onModuleSelect }) {
  const [hovered, setHovered]   = useState(null)
  const [selected, setSelected] = useState('wiring')
  const [launching, setLaunching] = useState(null)

  const completedCount = modules.filter(m => m.status === 'completed').length
  const totalProgress  = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)

  const handleModuleClick = (mod) => {
    if (mod.status === 'locked') return
    setSelected(mod.id)
    setLaunching(mod.id)
    setTimeout(() => {
      setLaunching(null)
      if (onModuleSelect) onModuleSelect(mod.id)
    }, 600)
  }

  return (
    <div className="page-enter relative flex items-center justify-center min-h-screen w-full px-6 py-8">

      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full opacity-12 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
      </div>

      <div className="relative w-full max-w-2xl">

        {/* Header */}
        <div className="glass rounded-3xl px-8 py-5 mb-4 flex items-center justify-between"
          style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="4" fill="white"/>
                {[0,45,90,135,180,225,270,315].map((deg, i) => (
                  <line key={i}
                    x1={11 + 6 * Math.cos((deg * Math.PI) / 180)}
                    y1={11 + 6 * Math.sin((deg * Math.PI) / 180)}
                    x2={11 + 9 * Math.cos((deg * Math.PI) / 180)}
                    y2={11 + 9 * Math.sin((deg * Math.PI) / 180)}
                    stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                ))}
              </svg>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight">Menú</h1>
              <p className="text-white/40 text-xs">Módulos de capacitación · Selecciona uno para iniciar</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-white/40 text-xs tracking-wider uppercase mb-1">Progreso global</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${totalProgress}%`, background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                </div>
                <span className="text-orange-400 font-bold text-sm">{totalProgress}%</span>
              </div>
            </div>
            <div className="glass-dark rounded-2xl px-3 py-2 text-center">
              <p className="text-xl font-bold text-gradient">{completedCount}/{modules.length}</p>
              <p className="text-white/40 text-xs">Hechos</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="glass rounded-3xl p-4 shadow-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
          <div className="flex flex-col gap-1.5">
            {modules.map(mod => {
              const sc = statusConfig[mod.status]
              const isSelected = selected === mod.id
              const isHov = hovered === mod.id
              const isLocked = mod.status === 'locked'
              const isLaunching = launching === mod.id

              return (
                <button key={mod.id}
                  onClick={() => handleModuleClick(mod)}
                  onMouseEnter={() => setHovered(mod.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full text-left transition-all duration-200"
                  style={{ cursor: isLocked ? 'not-allowed' : 'pointer', opacity: isLocked ? 0.45 : 1 }}>

                  <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200"
                    style={{
                      background: isLaunching
                        ? 'rgba(251,146,60,0.22)'
                        : isSelected
                          ? 'rgba(251,146,60,0.14)'
                          : isHov && !isLocked ? 'rgba(255,255,255,0.05)' : 'transparent',
                      border: isSelected || isLaunching
                        ? '1px solid rgba(251,146,60,0.4)'
                        : '1px solid transparent',
                      transform: isLaunching ? 'scale(0.99)' : 'scale(1)',
                    }}>

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: isSelected ? 'linear-gradient(135deg, #f97316, #fbbf24)' : sc.bg,
                        border: `1px solid ${sc.border}`,
                        color: isSelected ? 'white' : sc.color,
                      }}>
                      {mod.icon}
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm">{mod.label}</span>
                        {isLocked && (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                            <path d="M4 5V3.5a2 2 0 014 0V5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                          </svg>
                        )}
                        {isLaunching && (
                          <span className="text-xs font-medium" style={{ color: '#fb923c' }}>Abriendo…</span>
                        )}
                      </div>
                      <p className="text-white/40 text-xs truncate">{mod.desc}</p>
                    </div>

                    {/* Progress */}
                    {!isLocked && (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-1 w-20 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${mod.progress}%`,
                              background: mod.status === 'completed'
                                ? 'linear-gradient(90deg,#4ade80,#22c55e)'
                                : 'linear-gradient(90deg,#f97316,#fbbf24)',
                            }} />
                        </div>
                        <span className="text-xs font-semibold w-8 text-right" style={{ color: sc.color }}>
                          {mod.progress}%
                        </span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
                      style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                      {mod.status === 'completed' ? '✓' : mod.status === 'active' ? '▶' : '🔒'}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer actions */}
          <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/60 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al HUD
            </button>
            <button
              onClick={() => handleModuleClick(modules.find(m => m.id === selected))}
              disabled={modules.find(m => m.id === selected)?.status === 'locked'}
              className="btn-primary flex-1 py-3 text-sm font-semibold">
              Abrir módulo seleccionado
            </button>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-4 tracking-wider">FYWARE VR TRAINING PLATFORM v2.4</p>
      </div>
    </div>
  )
}
