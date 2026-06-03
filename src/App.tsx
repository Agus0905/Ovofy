import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { LandingPage } from './pages/LandingPage'
import { CourseCatalog } from './pages/CourseCatalog'
import { CourseDetail } from './pages/CourseDetail'
import { UniversityComparator } from './pages/UniversityComparator'
import { VocationalQuiz } from './pages/VocationalQuiz'
import { StudentDashboard } from './pages/StudentDashboard'
import { UniversityPortal } from './pages/UniversityPortal'
import { ProfessorPortal } from './pages/ProfessorPortal'
import { AdminPanel } from './pages/AdminPanel'
import { PublicProfile } from './pages/PublicProfile'
import { HowItWorks } from './pages/HowItWorks'
import { CompleteProfile } from './pages/CompleteProfile'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import { AuthModal } from './components/auth/AuthModal'

function AppRoutes() {
  const { profile } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const location = useLocation()

  // Removed mock progress calculation that was causing issues for other roles
  const progress = 0

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream dark:bg-[#0f0e0c] dark:text-[#f5f0e8] transition-colors duration-300">
      {/* Global Progress Bar - Only visible for students if progress > 0 */}
      {profile?.role === 'student' && progress > 0 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-[#1a1814] z-50">
          <div
            className="h-full bg-amber transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <Navbar onOpenAuth={openAuthModal} />
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              {/* Public routes */}
              <Route path="/" element={<LandingPage openAuthModal={openAuthModal} />} />
              <Route path="/catalogo" element={<CourseCatalog />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/curso/:id" element={<CourseDetail />} />
              <Route path="/comparar" element={<UniversityComparator />} />
              <Route path="/quiz" element={<VocationalQuiz />} />
              <Route path="/perfil/:userId" element={<PublicProfile />} />
              <Route path="/completar-perfil" element={<CompleteProfile />} />
              
              {/* Protected routes */}
              <Route 
                path="/perfil" 
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/universidad" 
                element={
                  <ProtectedRoute requiredRole="university">
                    <UniversityPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profesor" 
                element={
                  <ProtectedRoute requiredRole="professor">
                    <ProfessorPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/completar-perfil" 
                element={
                  <ProtectedRoute>
                    <CompleteProfile />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect based on role */}
              <Route 
                path="/dashboard" 
                element={
                  profile ? (
                    profile.role === 'student' ? <Navigate to="/perfil" /> :
                    profile.role === 'university' ? <Navigate to="/universidad" /> :
                    profile.role === 'professor' ? <Navigate to="/profesor" /> :
                    profile.role === 'admin' ? <Navigate to="/admin" /> :
                    <Navigate to="/" />
                  ) : <Navigate to="/" />
                } 
              />
              
              {/* 404 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}

function App() {
  useEffect(() => {
    const saved = localStorage.getItem('ovofy_theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
