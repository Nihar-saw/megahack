import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import { DashboardPage } from './pages/DashboardPage';
import { AssessmentPage } from './pages/AssessmentPage';

import { CareerPage } from './pages/CareerPage';
import { GapAnalysisPage } from './pages/GapAnalysisPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { IndustryInsightsPage } from './pages/IndustryInsightsPage';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />

        {/* Protected Routes (Wrapped in MainLayout) */}
        <Route path="/dashboard" element={<MainLayout><PageWrapper><DashboardPage /></PageWrapper></MainLayout>} />
        <Route path="/assessment" element={<MainLayout><PageWrapper><AssessmentPage /></PageWrapper></MainLayout>} />
        <Route path="/career" element={<MainLayout><PageWrapper><CareerPage /></PageWrapper></MainLayout>} />
        <Route path="/gap-analysis" element={<MainLayout><PageWrapper><GapAnalysisPage /></PageWrapper></MainLayout>} />
        <Route path="/portfolio" element={<MainLayout><PageWrapper><PortfolioPage /></PageWrapper></MainLayout>} />
        <Route path="/insights" element={<MainLayout><PageWrapper><IndustryInsightsPage /></PageWrapper></MainLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
