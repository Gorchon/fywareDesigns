import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import SignIn from './pages/SignIn'
import Verification from './pages/Verification'
import Tutorial from './pages/Tutorial'
import SimulationHUD from './pages/SimulationHUD'
import ModulesMenu from './pages/ModulesMenu'
import ModuleDetail from './pages/ModuleDetail'
import './index.css'

// Pages where the top bar is visible
const TOPBAR_PAGES = new Set(['signin', 'verification', 'tutorial', 'modules', 'module-detail'])

// Pages used for the dot indicator (module-detail maps to 'modules')
const NAV_PAGES = ['signin', 'verification', 'tutorial', 'simulation', 'modules']

function PageWrapper({ children, pageKey }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [pageKey])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
      transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
      width: '100%',
      height: '100%',
    }}>
      {children}
    </div>
  )
}

export default function App() {
  const [page, setPage]                   = useState('signin')
  const [selectedModule, setSelectedModule] = useState(null)

  const navigate = (target, options = {}) => {
    if (options.moduleId !== undefined) setSelectedModule(options.moduleId)
    setPage(target)
  }

  const showTopBar  = TOPBAR_PAGES.has(page)
  const activeDot   = page === 'module-detail' ? 'modules' : page

  const bgStyle = page === 'simulation'
    ? {}
    : {
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 30%, #12100e 60%, #0d0a08 100%)',
      }

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={bgStyle}>

      {/* Global ambient gradients */}
      {page !== 'simulation' && (
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(251,146,60,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(251,191,36,0.04) 0%, transparent 50%),
              radial-gradient(circle at 60% 10%, rgba(249,115,22,0.03) 0%, transparent 40%)
            `,
          }} />
      )}

      {/* Top bar */}
      {showTopBar && <TopBar />}

      {/* Page content */}
      <div className="w-full h-full" style={{ paddingTop: showTopBar ? '38px' : 0 }}>
        <PageWrapper pageKey={page}>

          {page === 'signin' && (
            <SignIn onNext={() => navigate('verification')} />
          )}

          {page === 'verification' && (
            <Verification onNext={() => navigate('tutorial')} />
          )}

          {page === 'tutorial' && (
            <Tutorial onNext={() => navigate('simulation')} />
          )}

          {page === 'simulation' && (
            <SimulationHUD onNext={() => navigate('modules')} />
          )}

          {page === 'modules' && (
            <ModulesMenu
              onBack={() => navigate('simulation')}
              onModuleSelect={(id) => navigate('module-detail', { moduleId: id })}
            />
          )}

          {page === 'module-detail' && selectedModule && (
            <ModuleDetail
              moduleId={selectedModule}
              onBack={() => navigate('modules')}
              onStartVR={() => navigate('simulation')}
            />
          )}

        </PageWrapper>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-none">
        {NAV_PAGES.map(p => (
          <div key={p}
            className="rounded-full transition-all duration-300"
            style={{
              width: p === activeDot ? '20px' : '6px',
              height: '6px',
              background: p === activeDot
                ? 'rgba(251,146,60,0.85)'
                : 'rgba(255,255,255,0.2)',
            }} />
        ))}
      </div>
    </div>
  )
}
