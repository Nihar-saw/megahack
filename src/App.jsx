import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GapAnalysisPage } from './pages/GapAnalysisPage';
import { CareerPage } from './pages/CareerPage';
import { IndustryInsightsPage } from './pages/IndustryInsightsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AIInterviewPage } from './pages/AIInterviewPage';
import './App.css';

// Protected route: redirect to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 4v4m0 8v4M4 12h4m8 0h4"/>
            </svg>
          </div>
          <p className="text-slate-500 font-bold tracking-widest text-sm uppercase">Loading JobSim...</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/gap-analysis" element={<ProtectedRoute><GapAnalysisPage /></ProtectedRoute>} />
      <Route path="/career" element={<ProtectedRoute><CareerPage /></ProtectedRoute>} />
      <Route path="/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
      <Route path="/interview" element={<ProtectedRoute><AIInterviewPage /></ProtectedRoute>} />
      <Route path="/insights" element={<ProtectedRoute><IndustryInsightsPage /></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
