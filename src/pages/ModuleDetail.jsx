import { useState, useEffect } from 'react'
import Footer from '../components/Footer'

const MODULE_DATA = {
  basic: {
    title: 'Instalación Básica',
    subtitle: 'Montaje de estructura y paneles fotovoltaicos',
    color: '#4ade80', colorDim: 'rgba(34,197,94,0.12)', colorBorder: 'rgba(34,197,94,0.3)',
    duration: '45 min', difficulty: 'Principiante',
    tools: ['Taladro', 'Guantes'],
    steps: [
      { id: 1, title: 'Inspección del tejado', desc: 'Verificar carga estructural y pendiente mínima', done: true },
      { id: 2, title: 'Instalación de rieles', desc: 'Montaje de perfil de aluminio L-foot y flashings', done: true },
      { id: 3, title: 'Colocación de módulos', desc: 'Anclaje y nivelación de paneles solares', done: true },
      { id: 4, title: 'Torque final', desc: 'Apriete según especificaciones del fabricante', done: true },
    ],
  },
  wiring: {
    title: 'Cableado Seguro',
    subtitle: 'Normas NOM-001-SEDE y buenas prácticas',
    color: '#fb923c', colorDim: 'rgba(251,146,60,0.12)', colorBorder: 'rgba(251,146,60,0.3)',
    duration: '60 min', difficulty: 'Intermedio',
    tools: ['Cables', 'Guantes'],
    steps: [
      { id: 1, title: 'Identificación de conductores', desc: 'Calibre AWG 10 para strings fotovoltaicos', done: true },
      { id: 2, title: 'Conexión en serie', desc: 'Configuración de string fotovoltaico 8S1P', done: false, active: true },
      { id: 3, title: 'Canalización y conduit', desc: 'Protección mecánica de conductores', done: false },
      { id: 4, title: 'Prueba de continuidad', desc: 'Verificación con multímetro FLUKE', done: false },
    ],
  },
  ground: {
    title: 'Puesta a tierra',
    subtitle: 'Seguridad eléctrica y equipotencialidad',
    color: '#60a5fa', colorDim: 'rgba(96,165,250,0.12)', colorBorder: 'rgba(96,165,250,0.3)',
    duration: '50 min', difficulty: 'Intermedio',
    tools: ['Cables', 'Guantes'],
    steps: [
      { id: 1, title: 'Identificación de masas', desc: 'Marcos, rieles y estructura metálica', done: true },
      { id: 2, title: 'Red de equipotencialidad', desc: 'Conexión de todos los elementos metálicos', done: false, active: true },
      { id: 3, title: 'Electrodo de tierra', desc: 'Varilla cooperweld enterrada en suelo', done: false },
      { id: 4, title: 'Medición de resistencia', desc: 'Verificar < 25 Ω con telurómetro', done: false },
    ],
  },
  advanced: {
    title: 'Simulación Avanzada',
    subtitle: 'Escenarios de falla y respuesta de emergencia',
    color: '#c084fc', colorDim: 'rgba(192,132,252,0.12)', colorBorder: 'rgba(192,132,252,0.3)',
    duration: '90 min', difficulty: 'Avanzado',
    tools: ['Taladro', 'Cables', 'Guantes'],
    steps: [
      { id: 1, title: 'Falla eléctrica', desc: 'Diagnóstico y aislamiento de arco eléctrico', done: false, active: true },
      { id: 2, title: 'Panel dañado por granizo', desc: 'Evaluación y reemplazo seguro', done: false },
      { id: 3, title: 'Sobrecalentamiento de inversor', desc: 'Procedimiento de apagado de emergencia', done: false },
      { id: 4, title: 'Evaluación bajo RETIE', desc: 'Cumplimiento de normas colombianas', done: false },
    ],
  },
  support: {
    title: 'Soporte de Instalación',
    subtitle: 'Anclajes, estructuras y sistemas de soporte',
    color: '#94a3b8', colorDim: 'rgba(148,163,184,0.08)', colorBorder: 'rgba(148,163,184,0.2)',
    duration: '40 min', difficulty: 'Principiante',
    tools: ['Taladro'],
    steps: [
      { id: 1, title: 'Tipos de anclaje', desc: 'Hook, L-foot y flashings para tejado inclinado' },
      { id: 2, title: 'Cálculo de carga viento', desc: 'Norma ASCE 7-22 para cargas laterales' },
      { id: 3, title: 'Sistema ballast', desc: 'Tejado plano sin perforación' },
      { id: 4, title: 'Inspección post-instalación', desc: 'Checklist de certificación Fyware' },
    ],
  },
  config: {
    title: 'Configuración de Paneles',
    subtitle: 'Optimización, puesta en marcha y monitoreo',
    color: '#94a3b8', colorDim: 'rgba(148,163,184,0.08)', colorBorder: 'rgba(148,163,184,0.2)',
    duration: '55 min', difficulty: 'Avanzado',
    tools: ['Cables'],
    steps: [
      { id: 1, title: 'Parámetros I-V del panel', desc: 'Lectura de Isc, Voc, Pmpp en STC' },
      { id: 2, title: 'Configuración del inversor', desc: 'Programación de parámetros de red' },
      { id: 3, title: 'Monitoreo SCADA', desc: 'Integración con plataforma Fyware Cloud' },
      { id: 4, title: 'Commissioning final', desc: 'Pruebas de rendimiento y entrega técnica' },
    ],
  },
}

const TOOL_ICONS = {
  Taladro: (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
      <path d="M14 4l-8 8M10 3l5 5-2 2-5-5 2-2zM3 12l3 3-4 1 1-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Cables: (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
      <path d="M3 9c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Guantes: (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
      <path d="M6 14V8M8 14V6M10 14V7M12 14V8M14 10v4H4v-4l2-4V3.5a1 1 0 012 0V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen({ progress, title }) {
  return (
    <div className="page-enter flex flex-col items-center justify-center min-h-screen w-full px-6">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
      </div>

      <div className="relative w-full max-w-xs text-center">
        {/* Pulsing logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center glow-pulse"
              style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}>
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="6" fill="white"/>
                {[0,45,90,135,180,225,270,315].map((deg, i) => (
                  <line key={i}
                    x1={16 + 9 * Math.cos((deg * Math.PI) / 180)}
                    y1={16 + 9 * Math.sin((deg * Math.PI) / 180)}
                    x2={16 + 13 * Math.cos((deg * Math.PI) / 180)}
                    y2={16 + 13 * Math.sin((deg * Math.PI) / 180)}
                    stroke="white" strokeWidth="2" strokeLinecap="round"/>
                ))}
              </svg>
            </div>
            <div className="absolute -inset-3 rounded-2xl opacity-30 blur-xl"
              style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} />
          </div>
        </div>

        <h2 className="text-white font-bold text-xl mb-1">Preparando entorno VR</h2>
        <p className="text-white/40 text-sm mb-8 truncate px-4">{title}</p>

        {/* Progress bar */}
        <div className="glass rounded-2xl p-5"
          style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs tracking-wider">Cargando módulo</span>
            <span className="text-orange-400 font-bold text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                boxShadow: '0 0 10px rgba(251,146,60,0.5)',
              }} />
          </div>
          <div className="flex justify-between mt-3">
            {['Recursos', 'Escena 3D', 'Física', 'Listo'].map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: progress >= (i + 1) * 25 ? '#fbbf24' : 'rgba(255,255,255,0.15)' }} />
                <span className="text-xs" style={{ color: progress >= (i + 1) * 25 ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.2)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Module content ────────────────────────────────────────────────────────────
function ModuleContent({ data, onBack, onStartVR }) {
  const [completedSteps, setCompletedSteps] = useState(
    new Set(data.steps.filter(s => s.done).map(s => s.id))
  )

  const toggleStep = (id) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const doneCount  = completedSteps.size
  const totalSteps = data.steps.length
  const pct        = Math.round((doneCount / totalSteps) * 100)

  return (
    <div className="page-enter relative flex items-center justify-center min-h-screen w-full px-6 py-6">

      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-12 blur-3xl"
          style={{ background: `radial-gradient(circle, ${data.color}, transparent)` }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-08 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
      </div>

      <div className="relative w-full max-w-lg">

        {/* Header */}
        <div className="glass rounded-3xl px-7 py-5 mb-4"
          style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${data.color}40, ${data.color}20)`, border: `1.5px solid ${data.colorBorder}` }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="4" fill={data.color} opacity="0.8"/>
                  {[0,45,90,135,180,225,270,315].map((deg, i) => (
                    <line key={i}
                      x1={11 + 6 * Math.cos((deg * Math.PI) / 180)}
                      y1={11 + 6 * Math.sin((deg * Math.PI) / 180)}
                      x2={11 + 9 * Math.cos((deg * Math.PI) / 180)}
                      y2={11 + 9 * Math.sin((deg * Math.PI) / 180)}
                      stroke={data.color} strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"/>
                  ))}
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-white text-xl font-bold leading-tight">{data.title}</h1>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: data.colorDim, color: data.color, border: `1px solid ${data.colorBorder}` }}>
                    {data.difficulty}
                  </span>
                </div>
                <p className="text-white/40 text-xs">{data.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                <path d="M7 4v3l2 1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-white/50 text-xs">{data.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v4M7 9v4M1 7h4M9 7h4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-white/50 text-xs">{totalSteps} pasos</span>
            </div>
            {/* Tools */}
            <div className="flex items-center gap-2 ml-auto">
              {data.tools.map(tool => (
                <span key={tool} className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs"
                  style={{ background: 'rgba(251,146,60,0.1)', color: 'rgba(251,146,60,0.7)', border: '1px solid rgba(251,146,60,0.2)' }}>
                  {TOOL_ICONS[tool]}
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="glass rounded-3xl p-5 mb-4 shadow-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)' }}>

          <div className="flex items-center justify-between mb-4">
            <span className="text-white/50 text-xs tracking-wider uppercase font-medium">Pasos del módulo</span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${data.color}, ${data.color}99)` }} />
              </div>
              <span className="text-xs font-bold" style={{ color: data.color }}>{pct}%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {data.steps.map((step, idx) => {
              const isDone    = completedSteps.has(step.id)
              const isActive  = step.active && !isDone

              return (
                <button key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className="w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200"
                  style={{
                    background: isDone
                      ? `${data.colorDim}`
                      : isActive
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(255,255,255,0.02)',
                    border: isDone
                      ? `1px solid ${data.colorBorder}`
                      : isActive
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid transparent',
                  }}>

                  {/* Step number / check */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{
                      background: isDone ? data.color : 'rgba(255,255,255,0.06)',
                      border: isDone ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                    {isDone ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span className="text-xs font-semibold text-white/40">{idx + 1}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight"
                      style={{ color: isDone ? data.color : 'white', textDecoration: isDone ? 'none' : 'none' }}>
                      {step.title}
                    </p>
                    <p className="text-xs text-white/35 mt-0.5 truncate">{step.desc}</p>
                  </div>

                  {/* Active badge */}
                  {isActive && (
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.3)' }}>
                      Actual
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onBack}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium text-white/60 hover:text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver al Menú
          </button>
          <button onClick={onStartVR}
            className="btn-primary flex-1 py-3.5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="5" width="14" height="8" rx="3" stroke="white" strokeWidth="1.4"/>
              <rect x="5.5" y="7" width="3" height="4" rx="1" fill="white" opacity="0.7"/>
              <rect x="9.5" y="7" width="3" height="4" rx="1" fill="white" opacity="0.7"/>
            </svg>
            Iniciar en VR
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}

// ── Entry point ───────────────────────────────────────────────────────────────
export default function ModuleDetail({ moduleId, onBack, onStartVR }) {
  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded, setLoaded]             = useState(false)

  const data = MODULE_DATA[moduleId]

  useEffect(() => {
    setLoadProgress(0)
    setLoaded(false)
    let current = 0
    const id = setInterval(() => {
      current += 3 + Math.random() * 5
      if (current >= 100) {
        setLoadProgress(100)
        clearInterval(id)
        setTimeout(() => setLoaded(true), 350)
      } else {
        setLoadProgress(current)
      }
    }, 55)
    return () => clearInterval(id)
  }, [moduleId])

  if (!data) return null

  return loaded
    ? <ModuleContent data={data} onBack={onBack} onStartVR={onStartVR} />
    : <LoadingScreen progress={loadProgress} title={data.title} />
}
