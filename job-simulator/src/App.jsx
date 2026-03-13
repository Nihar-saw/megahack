import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GapAnalysisPage } from './pages/GapAnalysisPage';
import { CareerPage } from './pages/CareerPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { IndustryInsightsPage } from './pages/IndustryInsightsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/gap-analysis" element={<GapAnalysisPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/insights" element={<IndustryInsightsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
