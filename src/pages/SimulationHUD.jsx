import { useCallback, useEffect, useState } from 'react'

// ── Tool definitions ──────────────────────────────────────────────────────────
const TOOLS = [
  {
    id: 'drill', label: 'Taladro',
    instruction: 'Apunta al punto ×  marcado y presiona para perforar el anclaje',
    color: '#fb923c',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M14 4l-8 8M10 3l5 5-2 2-5-5 2-2zM3 12l3 3-4 1 1-4z"
          stroke={active ? '#fb923c' : 'currentColor'}
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'cable', label: 'Cables',
    instruction: 'Conecta + al + y − al − siguiendo el diagrama de colores',
    color: '#fbbf24',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9c0-3.314 2.686-6 6-6s6 2.686 6 6M9 3v2M3 9H1M17 9h-2"
          stroke={active ? '#fbbf24' : 'currentColor'} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="2" stroke={active ? '#fbbf24' : 'currentColor'} strokeWidth="1.4"/>
        <path d="M9 11v4" stroke={active ? '#fbbf24' : 'currentColor'} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'glove', label: 'Guantes',
    instruction: 'Protección activa — puedes manipular componentes eléctricos con seguridad',
    color: '#4ade80',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M6 14V8M8 14V6M10 14V7M12 14V8M14 10v4H4v-4l2-4V3.5a1 1 0 012 0V6"
          stroke={active ? '#4ade80' : 'currentColor'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const BASE_NOTIFS = [
  { type: 'success', text: 'Conexión correcta', icon: '✓' },
  { type: 'error',   text: 'Error de cableado', icon: '✕' },
  { type: 'success', text: 'Panel anclado',      icon: '✓' },
  { type: 'warning', text: 'Verificar tensión',  icon: '⚠' },
]

const NOTIF_COLORS = {
  success: { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.4)',  icon: '#4ade80', text: '#86efac' },
  error:   { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.4)',  icon: '#f87171', text: '#fca5a5' },
  warning: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', icon: '#fbbf24', text: '#fde68a' },
}

// ── 3D VR Hand ─────────────────────────────────────────────────────────────────
function VRHand3D({ glowColor = '#fb923c', isRight = false }) {
  const u = isRight ? 'R' : 'L'
  return (
    <svg width="110" height="165" viewBox="0 0 110 165" fill="none"
      style={{
        transform: isRight ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0 0 14px ${glowColor}66) drop-shadow(0 6px 20px rgba(0,0,0,0.85))`,
        overflow: 'visible',
      }}>
      <defs>
        <linearGradient id={`f${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#08080f"/>
          <stop offset="28%"  stopColor="#16162a"/>
          <stop offset="55%"  stopColor={glowColor} stopOpacity="0.26"/>
          <stop offset="78%"  stopColor="#16162a"/>
          <stop offset="100%" stopColor="#08080f"/>
        </linearGradient>
        <linearGradient id={`p${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#06060e"/>
          <stop offset="22%"  stopColor="#12122a"/>
          <stop offset="50%"  stopColor={glowColor} stopOpacity="0.16"/>
          <stop offset="78%"  stopColor="#12122a"/>
          <stop offset="100%" stopColor="#06060e"/>
        </linearGradient>
        <linearGradient id={`m${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white"/>
          <stop offset="62%"  stopColor="white"/>
          <stop offset="100%" stopColor="black"/>
        </linearGradient>
        <mask id={`k${u}`}>
          <rect width="110" height="165" fill={`url(#m${u})`}/>
        </mask>
      </defs>

      <g mask={`url(#k${u})`}>
        {/* Palm */}
        <rect x="15" y="68" width="80" height="76" rx="16"
          fill={`url(#p${u})`}
          stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.2"/>
        <ellipse cx="55" cy="83" rx="22" ry="9"
          fill="white" fillOpacity="0.05"/>
        <path d="M20 83 C32 77 44 74 55 73 C66 74 78 77 90 83"
          stroke={glowColor} strokeOpacity="0.22" strokeWidth="1.1" fill="none"/>

        {/* Index */}
        <rect x="21" y="17" width="16" height="56" rx="8"
          fill={`url(#f${u})`}
          stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.1"/>
        <ellipse cx="29" cy="23" rx="5" ry="3.5"
          fill="white" fillOpacity="0.19"/>
        <path d="M23 57 Q29 55 37 57"
          stroke={glowColor} strokeOpacity="0.26" strokeWidth="0.85" fill="none"/>

        {/* Middle */}
        <rect x="41" y="6" width="16" height="67" rx="8"
          fill={`url(#f${u})`}
          stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.1"/>
        <ellipse cx="49" cy="12" rx="5" ry="3.5"
          fill="white" fillOpacity="0.19"/>
        <path d="M43 57 Q49 55 57 57"
          stroke={glowColor} strokeOpacity="0.26" strokeWidth="0.85" fill="none"/>

        {/* Ring */}
        <rect x="61" y="11" width="16" height="62" rx="8"
          fill={`url(#f${u})`}
          stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.1"/>
        <ellipse cx="69" cy="17" rx="5" ry="3.5"
          fill="white" fillOpacity="0.19"/>
        <path d="M63 57 Q69 55 77 57"
          stroke={glowColor} strokeOpacity="0.26" strokeWidth="0.85" fill="none"/>

        {/* Pinky */}
        <rect x="80" y="24" width="13" height="49" rx="6.5"
          fill={`url(#f${u})`}
          stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.1"/>
        <ellipse cx="86.5" cy="30" rx="4" ry="3"
          fill="white" fillOpacity="0.16"/>
        <path d="M82 57 Q86.5 55 93 57"
          stroke={glowColor} strokeOpacity="0.26" strokeWidth="0.85" fill="none"/>

        {/* Thumb */}
        <g transform="rotate(-28, 15, 88)">
          <rect x="5" y="71" width="15" height="36" rx="7.5"
            fill={`url(#f${u})`}
            stroke={glowColor} strokeOpacity="0.42" strokeWidth="1.1"/>
          <ellipse cx="12.5" cy="77" rx="4.5" ry="3.5"
            fill="white" fillOpacity="0.15"/>
        </g>

        {/* Wrist */}
        <rect x="22" y="140" width="66" height="32" rx="9"
          fill={`url(#p${u})`}
          stroke={glowColor} strokeOpacity="0.22" strokeWidth="1"/>
      </g>
    </svg>
  )
}

// ── Notification pill ─────────────────────────────────────────────────────────
function Notif({ notif, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(notif.id), 3500)
    return () => clearTimeout(t)
  }, [notif.id, onRemove])
  const c = NOTIF_COLORS[notif.type]
  return (
    <div className="page-enter flex items-center gap-3 px-4 py-2.5 rounded-2xl mb-2"
      style={{ background: c.bg, border: `1px solid ${c.border}`, backdropFilter: 'blur(12px)', minWidth: '200px' }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ background: c.border, color: c.icon }}>{notif.icon}</div>
      <span className="text-sm font-medium" style={{ color: c.text }}>{notif.text}</span>
    </div>
  )
}

// ── Help Modal ────────────────────────────────────────────────────────────────
function HelpModal({ onClose }) {
  const sections = [
    {
      title: 'Movimiento de cabeza', color: '#fb923c',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      tips: ['Mira directamente a los objetos para seleccionarlos', 'Gira lentamente para explorar el entorno 360°'],
    },
    {
      title: 'Gestos con manos', color: '#fbbf24',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 14V8M8 14V6M10 14V7M12 14V8M14 10v4H4v-4l2-4V3.5a1 1 0 012 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      tips: ['Palma abierta: seleccionar objeto', 'Puño cerrado: agarrar y mover', 'Pellizco índice-pulgar: activar herramienta'],
    },
    {
      title: 'Comandos de voz', color: '#60a5fa',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v9M6 5.5C6 3.567 7.343 2 9 2s3 1.567 3 3.5V9c0 1.933-1.343 3.5-3 3.5S6 10.933 6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M3 10c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      tips: ['"Ayuda" → abre este panel de soporte', '"Siguiente" → avanza al siguiente paso', '"Repetir" → repite la instrucción actual', '"Salir" → vuelve al menú principal'],
    },
    {
      title: 'Soporte Fyware', color: '#c084fc',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M7 7.5C7 6.4 7.9 5.5 9 5.5s2 .9 2 2c0 1.5-2 2-2 2.5M9 13v-.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      tips: ['+52 55 1234-5678', 'soporte@fyware.mx', 'Chat en vivo disponible 24/7'],
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="page-enter glass rounded-3xl p-7 w-full max-w-lg mx-4 shadow-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)' }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.4"/>
                <path d="M7 7.5C7 6.4 7.9 5.5 9 5.5s2 .9 2 2c0 1.5-2 2-2 2.5M9 13v-.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Centro de Ayuda</h2>
              <p className="text-white/40 text-xs">Guía de controles VR</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {sections.map(sec => (
            <div key={sec.title} className="rounded-2xl p-4"
              style={{ background: `${sec.color}0f`, border: `1px solid ${sec.color}25` }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: sec.color }}>{sec.icon}</span>
                <span className="text-white font-semibold text-xs">{sec.title}</span>
              </div>
              <ul className="space-y-1.5">
                {sec.tips.map((tip, i) => (
                  <li key={i} className="text-xs flex items-start gap-1.5"
                    style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="mt-0.5 shrink-0" style={{ color: `${sec.color}99` }}>·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-primary w-full py-3 text-sm font-semibold mt-5">
          Entendido
        </button>
      </div>
    </div>
  )
}

// ── Settings sub-components (module-level to avoid re-creation on each render) ─
function Toggle({ val, onChange }) {
  return (
    <button onClick={() => onChange(!val)}
      className="relative w-10 h-5 rounded-full transition-all duration-200"
      style={{ background: val ? 'linear-gradient(90deg,#f97316,#fbbf24)' : 'rgba(255,255,255,0.1)' }}>
      <span className="absolute top-0.5 rounded-full w-4 h-4 bg-white transition-all duration-200 shadow"
        style={{ left: val ? '22px' : '2px' }} />
    </button>
  )
}

function BtnGroup({ options, value, onChange }) {
  return (
    <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className="flex-1 py-1.5 text-xs font-medium transition-all duration-150"
          style={{
            background: value === opt.value ? 'rgba(251,146,60,0.25)' : 'transparent',
            color: value === opt.value ? '#fb923c' : 'rgba(255,255,255,0.4)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <span className="text-white/60 text-sm">{label}</span>
      {children}
    </div>
  )
}

// ── Settings Modal ────────────────────────────────────────────────────────────
function SettingsModal({ onClose }) {
  const [settings, setSettings] = useState({
    textSize: 'normal',
    contrast: false,
    captions: true,
    volume: 75,
    narration: true,
    effects: true,
    sensitivity: 'normal',
  })
  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}>
      <div className="page-enter glass rounded-3xl p-7 w-full max-w-sm mx-4 shadow-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)' }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)' }}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="2.5" stroke="white" strokeWidth="1.4"/>
                <path d="M9 1v2M9 15v2M1 9h2M15 9h2M2.93 2.93l1.41 1.41M13.66 13.66l1.41 1.41M2.93 15.07l1.41-1.41M13.66 4.34l1.41-1.41"
                  stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Configuración</h2>
              <p className="text-white/40 text-xs">Preferencias del visor</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Accesibilidad */}
        <p className="text-orange-400/60 text-xs tracking-wider uppercase font-semibold mb-1">Accesibilidad</p>
        <div className="glass-dark rounded-2xl px-4 mb-4">
          <Row label="Tamaño de texto">
            <BtnGroup
              value={settings.textSize}
              onChange={v => set('textSize', v)}
              options={[{ label: 'S', value: 'small' }, { label: 'M', value: 'normal' }, { label: 'L', value: 'large' }]}
            />
          </Row>
          <Row label="Alto contraste"><Toggle val={settings.contrast} onChange={v => set('contrast', v)} /></Row>
          <Row label="Subtítulos"><Toggle val={settings.captions} onChange={v => set('captions', v)} /></Row>
        </div>

        {/* Audio */}
        <p className="text-orange-400/60 text-xs tracking-wider uppercase font-semibold mb-1">Audio</p>
        <div className="glass-dark rounded-2xl px-4 mb-4">
          <Row label="Volumen">
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="100" value={settings.volume}
                onChange={e => set('volume', +e.target.value)}
                className="w-24 h-1 rounded appearance-none cursor-pointer"
                style={{ accentColor: '#f97316' }}/>
              <span className="text-orange-400/80 text-xs w-7 text-right">{settings.volume}</span>
            </div>
          </Row>
          <Row label="Narración en vivo"><Toggle val={settings.narration} onChange={v => set('narration', v)} /></Row>
          <Row label="Efectos de sonido"><Toggle val={settings.effects} onChange={v => set('effects', v)} /></Row>
        </div>

        {/* Calibración */}
        <p className="text-orange-400/60 text-xs tracking-wider uppercase font-semibold mb-1">Calibración del visor</p>
        <div className="glass-dark rounded-2xl px-4 mb-5">
          <Row label="Sensibilidad">
            <BtnGroup
              value={settings.sensitivity}
              onChange={v => set('sensitivity', v)}
              options={[{ label: 'Baja', value: 'low' }, { label: 'Normal', value: 'normal' }, { label: 'Alta', value: 'high' }]}
            />
          </Row>
          <div className="py-2.5">
            <button className="w-full py-2 rounded-xl text-xs font-semibold text-orange-400/80 transition-all hover:text-orange-400"
              style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}>
              Reiniciar calibración
            </button>
          </div>
        </div>

        <button onClick={onClose} className="btn-primary w-full py-3 text-sm font-semibold">
          Guardar cambios
        </button>
      </div>
    </div>
  )
}

// ── Main HUD ──────────────────────────────────────────────────────────────────
export default function SimulationHUD({ onNext }) {
  const [activeTool, setActiveTool]   = useState(null)
  const [showHelp, setShowHelp]       = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [progress, setProgress]       = useState(5)
  const [activeNotifs, setActiveNotifs] = useState([])
  const [notifIdx, setNotifIdx]       = useState(0)
  const [panelPos, setPanelPos]       = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging]   = useState(false)

  // Periodic environment feedback
  useEffect(() => {
    const id = setInterval(() => {
      const n = BASE_NOTIFS[notifIdx % BASE_NOTIFS.length]
      setActiveNotifs(prev => [...prev, { ...n, id: Date.now() }])
      setNotifIdx(i => i + 1)
      setProgress(p => Math.min(p + 3, 100))
    }, 4500)
    return () => clearInterval(id)
  }, [notifIdx])

  const removeNotif = useCallback((id) => setActiveNotifs(prev => prev.filter(n => n.id !== id)), [])

  const handleToolClick = (toolId) => {
    if (activeTool === toolId) {
      setActiveTool(null)
      return
    }
    setActiveTool(toolId)
    const tool = TOOLS.find(t => t.id === toolId)
    // Add tool-selection notification
    setActiveNotifs(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      text: `${tool.label} seleccionado`,
      icon: '✓',
    }])
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    setPanelPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const activeTD = activeTool ? TOOLS.find(t => t.id === activeTool) : null

  return (
    <>
      {showHelp     && <HelpModal     onClose={() => setShowHelp(false)} />}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <div className="relative w-full h-screen overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}>

        {/* ── Scene background ── */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e3a5f 100%)' }}>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(251,146,60,0.08) 0%, rgba(251,191,36,0.05) 20%, transparent 50%)'
          }} />
          {/* Roof */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{ background: 'linear-gradient(180deg, #374151, #1f2937)', borderTop: '2px solid rgba(255,255,255,0.05)' }}>
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

          {/* Fixed solar panels grid */}
          <div className="absolute bottom-1/3 left-1/2"
            style={{ transform: 'translateX(-50%) perspective(600px) rotateX(25deg)' }}>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-lg transition-all duration-300"
                  style={{
                    width: '60px', height: '44px',
                    background: i === 2 || i === 5 ? 'rgba(249,115,22,0.3)' : 'rgba(30,58,138,0.7)',
                    border: i === 2 || i === 5 ? '1.5px solid rgba(249,115,22,0.6)' : '1px solid rgba(59,130,246,0.4)',
                    boxShadow: i === 2 || i === 5 ? '0 0 12px rgba(249,115,22,0.3)' : 'none',
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
          <div className="absolute cursor-grab active:cursor-grabbing"
            style={{ left: `${panelPos.x}%`, top: `${panelPos.y}%`, transform: 'translate(-50%, -50%)' }}
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

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-5"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
        </div>

        {/* ── TOP LEFT: Tools + Security ── */}
        <div className="absolute top-4 left-4 flex flex-col gap-3">
          {/* Tools */}
          <div className="glass rounded-2xl p-3"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <p className="text-white/40 text-xs tracking-wider uppercase mb-2.5 text-center">Herramientas</p>
            <div className="flex flex-col gap-2">
              {TOOLS.map(tool => {
                const isActive = activeTool === tool.id
                return (
                  <button key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    title={tool.label}
                    className="w-10 h-10 rounded-xl flex flex-col items-center justify-center transition-all duration-200"
                    style={{
                      background: isActive
                        ? `${tool.color}28`
                        : 'rgba(251,146,60,0.08)',
                      border: isActive
                        ? `1.5px solid ${tool.color}80`
                        : '1px solid rgba(251,146,60,0.18)',
                      boxShadow: isActive ? `0 0 14px ${tool.color}40` : 'none',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}>
                    <span style={{ color: isActive ? tool.color : 'rgba(251,146,60,0.6)' }}>
                      {tool.icon(isActive)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Security */}
          <div className="glass rounded-2xl p-3"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <p className="text-white/40 text-xs tracking-wider uppercase mb-2.5 text-center">Seguridad</p>
            {[
              { label: 'Eléctrico', color: '#fbbf24', icon: '⚡' },
              { label: 'Riesgo',    color: '#f87171', icon: '⚠' },
              { label: 'Calor',     color: '#fb923c', icon: '🌡' },
            ].map(a => (
              <div key={a.label} className="flex items-center gap-2 px-2 py-1.5 rounded-xl mb-1.5 last:mb-0"
                style={{ background: `${a.color}18`, border: `1px solid ${a.color}40` }}>
                <span className="text-sm">{a.icon}</span>
                <span className="text-xs font-medium" style={{ color: `${a.color}cc` }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOP RIGHT: Progress + Compass ── */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
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

          <div className="glass rounded-2xl p-3 flex flex-col items-center"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <circle cx="20" cy="20" r="14" stroke="rgba(251,146,60,0.2)" strokeWidth="1"/>
              <path d="M20 6l2.5 9h-5L20 6z" fill="rgba(249,115,22,0.8)"/>
              <path d="M20 34l-2.5-9h5L20 34z" fill="rgba(255,255,255,0.3)"/>
              <circle cx="20" cy="20" r="2" fill="rgba(251,191,36,0.8)"/>
              <text x="20" y="4" textAnchor="middle" fontSize="6" fill="rgba(251,146,60,0.8)" fontWeight="bold">N</text>
            </svg>
            <span className="text-white/30 text-xs mt-1">Norte</span>
          </div>
        </div>

        {/* ── CENTER: Drop zone + hands ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            {/* Drop zone — shows tool instruction when a tool is active */}
            <div className="relative">
              <div className="rounded-3xl flex items-center justify-center"
                style={{
                  width: '220px', height: '140px',
                  background: activeTD ? `${activeTD.color}0a` : 'rgba(251,146,60,0.06)',
                  border: `2px dashed ${activeTD ? `${activeTD.color}60` : 'rgba(251,146,60,0.4)'}`,
                  boxShadow: activeTD ? `0 0 30px ${activeTD.color}20` : '0 0 30px rgba(251,146,60,0.1)',
                  transition: 'all 0.3s',
                }}>
                <div className="flex flex-col items-center gap-2 text-center px-4">
                  {activeTD ? (
                    <>
                      <span className="text-2xl"
                        style={{ filter: `drop-shadow(0 0 6px ${activeTD.color})` }}>
                        {activeTD.id === 'drill' ? '🔩' : activeTD.id === 'cable' ? '⚡' : '🧤'}
                      </span>
                      <p className="text-xs font-medium leading-snug"
                        style={{ color: `${activeTD.color}cc` }}>
                        {activeTD.instruction}
                      </p>
                    </>
                  ) : (
                    <>
                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <path d="M16 4v16M8 12l8 8 8-8" stroke="rgba(251,146,60,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 24h24" stroke="rgba(251,146,60,0.3)" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <p className="text-orange-400/60 text-xs font-medium leading-tight">
                        Arrastra los paneles<br />y colócalos aquí
                      </p>
                    </>
                  )}
                </div>
              </div>
              {/* Corner anchors */}
              {['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3`}>
                  <div className="w-full h-full" style={{
                    borderTop:    i < 2  ? '2px solid rgba(251,146,60,0.6)' : 'none',
                    borderBottom: i >= 2 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                    borderLeft:   i % 2 === 0 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                    borderRight:  i % 2 === 1 ? '2px solid rgba(251,146,60,0.6)' : 'none',
                  }} />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── VR Hands ── */}
        <div style={{
          position: 'absolute', bottom: '-35px', left: '8%',
          transform: 'rotate(6deg)',
          animation: 'vrHandFloat 3.5s ease-in-out infinite',
          pointerEvents: 'none', zIndex: 3,
        }}>
          <VRHand3D glowColor={activeTD?.color ?? '#fb923c'} isRight={false} />
        </div>
        <div style={{
          position: 'absolute', bottom: '-35px', right: '8%',
          transform: 'rotate(-6deg)',
          animation: 'vrHandFloat 3.5s ease-in-out 0.85s infinite',
          pointerEvents: 'none', zIndex: 3,
        }}>
          <VRHand3D glowColor={activeTD?.color ?? '#fb923c'} isRight={true} />
        </div>

        {/* ── BOTTOM LEFT: Controls ── */}
        <div className="absolute bottom-6 left-4 flex gap-2">
          <button onClick={() => setShowHelp(true)}
            className="glass flex items-center gap-2 px-4 py-2.5 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10"
            style={{ fontSize: '12px', fontWeight: 500 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M6 6.5C6 5.4 6.9 4.5 8 4.5s2 .9 2 2c0 1.5-2 2-2 2.5M8 12v-.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Ayuda
          </button>
          <button onClick={() => setShowSettings(true)}
            className="glass flex items-center gap-2 px-4 py-2.5 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10"
            style={{ fontSize: '12px', fontWeight: 500 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Config
          </button>
          <button onClick={onNext}
            className="glass flex items-center gap-2 px-4 py-2.5 rounded-full text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10"
            style={{ fontSize: '12px', fontWeight: 500 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Menú
          </button>
        </div>

        {/* Active tool label (bottom center) */}
        {activeTD && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `${activeTD.color}18`,
                border: `1px solid ${activeTD.color}50`,
                backdropFilter: 'blur(12px)',
              }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeTD.color }} />
              <span className="text-xs font-semibold" style={{ color: activeTD.color }}>
                {activeTD.label} activo
              </span>
              <button onClick={() => setActiveTool(null)}
                className="ml-1 text-xs opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: activeTD.color }}>✕</button>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="absolute right-4 bottom-24 flex flex-col items-end">
          {activeNotifs.map(n => (
            <Notif key={n.id} notif={n} onRemove={removeNotif} />
          ))}
        </div>

        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-80px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="1.5" fill="rgba(251,146,60,0.5)"/>
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="rgba(251,146,60,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </>
  )
}
