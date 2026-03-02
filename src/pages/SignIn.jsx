import { useState } from 'react'

const companies = [
  'Fyware Energy',
  'SolarTech México',
  'Energía Renovable SA',
  'GreenPower Corp',
  'Tecnosol CDMX',
  'Otra empresa',
]

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-medium mb-1.5 tracking-wider uppercase pl-1">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function SignIn({ onNext }) {
  const [techId, setTechId] = useState('')
  const [company, setCompany] = useState('')
  const [focused, setFocused] = useState(null)

  const canProceed = techId.trim().length >= 3 && company !== ''

  const inputBase = (isFocused) => ({
    background: isFocused ? 'rgba(251,146,60,0.12)' : 'rgba(255,255,255,0.06)',
    border: isFocused ? '1px solid rgba(251,146,60,0.5)' : '1px solid rgba(255,255,255,0.08)',
    boxShadow: isFocused ? '0 0 0 3px rgba(251,146,60,0.1)' : 'none',
  })

  return (
    <div className="page-enter relative flex flex-col items-center justify-center min-h-screen w-full px-6">

      {/* Ambient orbs */}
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

          {/* Brand */}
          <div className="flex flex-col items-center mb-10">
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
            <p className="text-white/50 text-sm font-light tracking-[0.2em] uppercase">Prepared for reality</p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            {/* ID Técnico */}
            <FormField label="ID Técnico">
              {/* Icon sits outside the input flow; input gets enough padding */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 z-10 flex-shrink-0 pointer-events-none"
                  style={{ color: focused === 'id' ? 'rgba(251,146,60,0.9)' : 'rgba(251,146,60,0.6)', transition: 'color 0.2s' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  type="text"
                  value={techId}
                  onChange={e => setTechId(e.target.value)}
                  onFocus={() => setFocused('id')}
                  onBlur={() => setFocused(null)}
                  placeholder="ej. TEC-2024-001"
                  className="w-full rounded-2xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    ...inputBase(focused === 'id'),
                  }}
                />
              </div>
            </FormField>

            {/* Empresa */}
            <FormField label="Empresa">
              <div className="relative flex items-center">
                <span className="absolute left-3.5 z-10 flex-shrink-0 pointer-events-none"
                  style={{ color: focused === 'company' ? 'rgba(251,146,60,0.9)' : 'rgba(251,146,60,0.6)', transition: 'color 0.2s' }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                <select
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                  className="w-full rounded-2xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    paddingLeft: '2.5rem',
                    paddingRight: '2rem',
                    color: company ? 'white' : 'rgba(255,255,255,0.3)',
                    ...inputBase(focused === 'company'),
                  }}
                >
                  <option value="" disabled style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.4)' }}>
                    Selecciona tu empresa
                  </option>
                  {companies.map(c => (
                    <option key={c} value={c} style={{ background: '#1a1a2e', color: 'white' }}>{c}</option>
                  ))}
                </select>
                {/* Custom chevron */}
                <span className="absolute right-3.5 z-10 pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.35)', transition: 'transform 0.2s',
                    transform: focused === 'company' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </FormField>

            {/* Submit */}
            <div className="pt-3">
              <button
                onClick={() => canProceed && onNext()}
                className="btn-primary w-full py-3.5 text-sm font-semibold tracking-wide"
                style={{ opacity: canProceed ? 1 : 0.35, cursor: canProceed ? 'pointer' : 'not-allowed' }}>
                Acceder al entorno
              </button>
            </div>
          </div>

          <p className="text-center text-white/25 text-xs mt-6">
            Al continuar aceptas los{' '}
            <span className="text-orange-400/60 cursor-pointer hover:text-orange-400 transition-colors">
              Términos de uso
            </span>
          </p>
        </div>

        <p className="text-center text-white/20 text-xs mt-4 tracking-wider">
          FYWARE VR TRAINING PLATFORM v2.4
        </p>
      </div>
    </div>
  )
}
