import { useState } from 'react'

const tutorialSteps = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1.8"/>
        <path d="M16 10v6l4 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Orientación espacial',
    desc: 'Mueve tu cabeza suavemente para explorar el entorno 360°. El sistema detecta tus movimientos en tiempo real.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M12 20l-4-4 4-4M20 12l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16h16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Interacción con objetos',
    desc: 'Extiende tu mano hacia los objetos virtuales. Un halo naranja indica que el objeto está seleccionable.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 22l4-12 4 12M12 18h8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Comandos de voz',
    desc: 'Di "Ayuda" para pausar y mostrar el menú de soporte. Di "Siguiente" para avanzar en los pasos.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 16a8 8 0 1116 0 8 8 0 01-16 0zM16 12v4l3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Evaluación de progreso',
    desc: 'Cada acción correcta suma puntos. Los errores se registran para el informe final de la sesión.',
  },
]

export default function Tutorial({ onNext }) {
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)

  const progress = ((step + 1) / tutorialSteps.length) * 100

  if (!started) {
    return (
      <div className="page-enter relative flex flex-col items-center justify-center min-h-screen w-full px-6">
        {/* Ambient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-12 blur-3xl"
            style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
        </div>

        <div className="relative w-full max-w-md">
          <div className="glass rounded-3xl p-10 shadow-2xl text-center"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)' }}>

            {/* VR Headset illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center float-anim"
                  style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.15))', border: '1.5px solid rgba(251,146,60,0.3)' }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                    {/* VR headset shape */}
                    <rect x="6" y="16" width="40" height="22" rx="8" stroke="rgba(251,191,36,0.8)" strokeWidth="1.8"/>
                    <rect x="16" y="20" width="8" height="10" rx="3" fill="rgba(249,115,22,0.5)" stroke="rgba(251,191,36,0.6)" strokeWidth="1"/>
                    <rect x="28" y="20" width="8" height="10" rx="3" fill="rgba(249,115,22,0.5)" stroke="rgba(251,191,36,0.6)" strokeWidth="1"/>
                    <path d="M14 38v2a2 2 0 004 0v-2M34 38v2a2 2 0 004 0v-2" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 26h3M43 26h3" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="26" cy="26" r="2" fill="rgba(251,191,36,0.4)"/>
                  </svg>
                </div>
                <div className="absolute -inset-3 rounded-3xl opacity-20 blur-lg"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} />
              </div>
            </div>

            <div className="mb-2">
              <span className="text-orange-400/70 text-xs tracking-[0.25em] uppercase font-medium">Fase pretotipo</span>
            </div>
            <h2 className="text-white text-3xl font-bold mb-3 leading-tight">
              Tutorial de uso VR
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Aprende a navegar la capacitación antes de comenzar. Este tutorial te guiará por las interacciones básicas del entorno virtual.
            </p>

            {/* Steps preview */}
            <div className="glass-dark rounded-2xl p-4 mb-8 text-left">
              <p className="text-white/40 text-xs tracking-wider uppercase mb-3">Contenido del tutorial</p>
              <div className="space-y-2">
                {tutorialSteps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(251,191,36,0.3))', border: '1px solid rgba(251,146,60,0.3)' }}>
                      <span className="text-orange-300/80">{i + 1}</span>
                    </div>
                    <span className="text-white/60 text-sm">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setStarted(true)} className="btn-primary w-full py-4 text-base font-semibold tracking-wide">
              Comenzar Tutorial
            </button>

            <p className="text-white/25 text-xs mt-4">
              El tutorial es obligatorio para continuar
            </p>
          </div>
        </div>
      </div>
    )
  }

  const current = tutorialSteps[step]
  const isLast = step === tutorialSteps.length - 1

  return (
    <div className="page-enter relative flex flex-col items-center justify-center min-h-screen w-full px-6">
      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-xs tracking-wider">Tutorial</span>
            <span className="text-orange-400/70 text-xs font-semibold">{step + 1} / {tutorialSteps.length}</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
          </div>
        </div>

        <div className="glass rounded-3xl p-10 shadow-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)' }}>

          {/* Step icon */}
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center glow-pulse"
                style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}>
                {current.icon}
              </div>
              <div className="absolute -inset-2 rounded-2xl opacity-25 blur-md"
                style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} />
            </div>
          </div>

          {/* Step indicator dots */}
          <div className="flex gap-2 justify-center mb-6">
            {tutorialSteps.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? '20px' : '6px',
                  height: '6px',
                  background: i === step
                    ? 'linear-gradient(90deg, #f97316, #fbbf24)'
                    : i < step
                      ? 'rgba(251,146,60,0.5)'
                      : 'rgba(255,255,255,0.15)'
                }} />
            ))}
          </div>

          <h3 className="text-white text-2xl font-bold text-center mb-3">{current.title}</h3>
          <p className="text-white/55 text-sm text-center leading-relaxed mb-8">{current.desc}</p>

          {/* Navigation */}
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3.5 rounded-full text-sm font-semibold text-white/60 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                ← Anterior
              </button>
            )}
            <button
              onClick={() => isLast ? onNext() : setStep(s => s + 1)}
              className="btn-primary flex-1 py-3.5 text-sm font-semibold tracking-wide">
              {isLast ? 'Iniciar simulación' : 'Siguiente →'}
            </button>
          </div>

          {/* No skip note */}
          <p className="text-center text-white/20 text-xs mt-5">
            El tutorial debe completarse íntegramente
          </p>
        </div>
      </div>
    </div>
  )
}
