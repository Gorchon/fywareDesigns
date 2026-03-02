import { useState, useRef, useEffect } from 'react'

function CodeModal({ onConfirm, onClose }) {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = useRef([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const handleChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      setDigits(text.split(''))
      refs.current[5]?.focus()
    }
    e.preventDefault()
  }

  const isComplete = digits.every(d => d !== '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <div className="page-enter glass rounded-3xl p-8 w-80 shadow-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.15)' }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Introducir código</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className="text-white/50 text-sm mb-6 text-center">
          Ingresa el código de 6 dígitos enviado a tu dispositivo
        </p>

        {/* OTP inputs */}
        <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-10 h-12 text-center text-xl font-bold text-white rounded-xl outline-none transition-all duration-150"
              style={{
                background: d ? 'rgba(251,146,60,0.2)' : 'rgba(255,255,255,0.07)',
                border: d ? '1.5px solid rgba(251,146,60,0.6)' : '1px solid rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => isComplete && onConfirm()}
          className="btn-primary w-full py-3 text-sm font-semibold"
          style={{ opacity: isComplete ? 1 : 0.35, cursor: isComplete ? 'pointer' : 'not-allowed' }}>
          Verificar código
        </button>
      </div>
    </div>
  )
}

export default function Verification({ onNext }) {
  const [showModal, setShowModal] = useState(false)
  const [resent, setResent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleResend = () => {
    if (countdown > 0) return
    setResent(true)
    setCountdown(30)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <>
      {showModal && (
        <CodeModal onConfirm={() => { setShowModal(false); onNext() }} onClose={() => setShowModal(false)} />
      )}

      <div className="page-enter relative flex flex-col items-center justify-center min-h-screen w-full px-6">

        {/* Ambient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full opacity-12 blur-3xl"
            style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="glass rounded-3xl p-10 shadow-2xl"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)' }}>

            {/* Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-pulse"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="5" y="11" width="18" height="13" rx="3" stroke="white" strokeWidth="1.8"/>
                    <path d="M9 11V8a5 5 0 0110 0v3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="14" cy="17.5" r="2" fill="white"/>
                    <path d="M14 19.5v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="absolute -inset-2 rounded-2xl opacity-30 blur-md"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} />
              </div>

              <h2 className="text-white text-2xl font-bold mb-1">Verificación</h2>
              <p className="text-white/45 text-sm text-center leading-relaxed">
                Hemos enviado un código de seguridad<br />a tu dispositivo registrado
              </p>
            </div>

            {/* Visual code display (decorative) */}
            <div className="glass-orange rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-400/60" />
                <span className="text-white/40 text-xs tracking-wider uppercase">Código pendiente</span>
              </div>
              <div className="flex gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <div key={i}
                    className="w-9 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400/40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary w-full py-3.5 text-sm font-semibold tracking-wide mb-4">
              Confirmar código
            </button>

            {/* Resend */}
            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-white/30 text-sm">
                  Reenviar en{' '}
                  <span className="text-orange-400/70 font-semibold">{countdown}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-orange-400/70 hover:text-orange-400 text-sm transition-colors underline underline-offset-2 cursor-pointer bg-transparent border-none">
                  {resent ? '✓ Código reenviado' : 'Reenviar código'}
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-white/20 text-xs mt-4 tracking-wider">
            FYWARE VR TRAINING PLATFORM v2.4
          </p>
        </div>
      </div>
    </>
  )
}
