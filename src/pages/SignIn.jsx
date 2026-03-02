import { useState } from 'react'

const companies = [
  'Fyware Energy',
  'SolarTech México',
  'Energía Renovable SA',
  'GreenPower Corp',
  'Tecnosol CDMX',
  'Otra empresa',
]

export default function SignIn({ onNext }) {
  const [techId, setTechId] = useState('')
  const [company, setCompany] = useState('')
  const [focused, setFocused] = useState(null)

  const canProceed = techId.trim().length >= 3 && company !== ''

  return (
    <div className="page-enter relative flex flex-col items-center justify-center min-h-screen w-full px-6">

      {/* Background ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fb923c, transparent)' }} />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-sm float-anim">
        <div className="glass rounded-3xl p-10 shadow-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)' }}>

          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-10">
            {/* Solar icon */}
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-pulse"
                style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
              <div className="absolute -inset-2 rounded-2xl opacity-30 blur-md"
                style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} />
            </div>

            <h1 className="text-gradient text-5xl font-bold tracking-tight mb-1">Fyware</h1>
            <p className="text-white/50 text-sm font-light tracking-[0.2em] uppercase">
              Prepared for reality
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Tech ID input */}
            <div className="relative">
              <label className="block text-white/60 text-xs font-medium mb-1.5 tracking-wider uppercase pl-1">
                ID Técnico
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400/70">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={techId}
                  onChange={e => setTechId(e.target.value)}
                  onFocus={() => setFocused('id')}
                  onBlur={() => setFocused(null)}
                  placeholder="ej. TEC-2024-001"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    background: focused === 'id'
                      ? 'rgba(251,146,60,0.12)'
                      : 'rgba(255,255,255,0.06)',
                    border: focused === 'id'
                      ? '1px solid rgba(251,146,60,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: focused === 'id' ? '0 0 0 3px rgba(251,146,60,0.1)' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Company dropdown */}
            <div className="relative">
              <label className="block text-white/60 text-xs font-medium mb-1.5 tracking-wider uppercase pl-1">
                Empresa
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400/70">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <select
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-8 py-3 rounded-2xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    background: focused === 'company'
                      ? 'rgba(251,146,60,0.12)'
                      : 'rgba(255,255,255,0.06)',
                    border: focused === 'company'
                      ? '1px solid rgba(251,146,60,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: company ? 'white' : 'rgba(255,255,255,0.25)',
                    boxShadow: focused === 'company' ? '0 0 0 3px rgba(251,146,60,0.1)' : 'none'
                  }}
                >
                  <option value="" disabled style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.4)' }}>
                    Selecciona tu empresa
                  </option>
                  {companies.map(c => (
                    <option key={c} value={c} style={{ background: '#1a1a2e', color: 'white' }}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-3">
              <button
                onClick={() => canProceed && onNext()}
                className="btn-primary w-full py-3.5 text-sm font-semibold tracking-wide"
                style={{
                  opacity: canProceed ? 1 : 0.35,
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                }}
              >
                Acceder al entorno
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/25 text-xs mt-6">
            Al continuar aceptas los{' '}
            <span className="text-orange-400/60 cursor-pointer hover:text-orange-400 transition-colors">
              Términos de uso
            </span>
          </p>
        </div>

        {/* Bottom label */}
        <p className="text-center text-white/20 text-xs mt-4 tracking-wider">
          FYWARE VR TRAINING PLATFORM v2.4
        </p>
      </div>
    </div>
  )
}
