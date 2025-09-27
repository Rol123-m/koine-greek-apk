import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './data/auth'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import StudentDashboard from './pages/Student/Dashboard'
import StudentGame from './pages/Student/Game'
import StudentProfile from './pages/Student/Profile'
import ProfessorDashboard from './pages/Professor/Dashboard'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import './index.css'
// Añade esta importación
import Achievements from './pages/Student/Achievements';

// Añade esta ruta dentro de <Routes>


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/game/:week" element={<StudentGame />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
              <Route path="/student/achievements" element={<Achievements />} />
              
              {/* Ruta de fallback para páginas no encontradas */}
              <Route path="*" element={
                <div className="container">
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Página no encontrada</h2>
                    <p>La página que buscas no existe.</p>
                    <a href="/" className="btn btn-primary">Volver al inicio</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App