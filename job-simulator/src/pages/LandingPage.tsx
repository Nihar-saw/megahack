import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Cpu, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Target className="w-6 h-6 text-white" />
          </div>
          JobSim
        </h1>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">Features</a>
          <a href="#benefits" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">Benefits</a>
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="shadow-xl">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
              🚀 Elevate Your Career Readiness
            </div>
            <h2 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Simulate Your <span className="text-indigo-600">Future</span> Industry Role.
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
              Understand industry expectations, evaluate your skills, and estimate your market value with our AI-driven simulation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="px-10 py-5 rounded-2xl shadow-2xl shadow-indigo-200 group">
                  Assess My Skills <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-10 py-5 rounded-2xl border-2">
                Explore Market Value
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-3xl" />
            <img 
              src="/src/assets/hero.png" 
              alt="Career Path Illustration" 
              className="relative w-full h-auto rounded-[2.5rem] shadow-2xl floating"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Platform Features</h2>
            <p className="text-slate-600">Everything you need to launch a successful career.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-indigo-600" />}
              title="Market Value Estimator"
              description="Get an accurate range of what you should be earning based on your current skill set."
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-indigo-600" />}
              title="Skill Gap Analysis"
              description="Compare your skills with actual JD requirements from top-tier tech companies."
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-indigo-600" />}
              title="Interactive Assessments"
              description="Test your theoretical and practical knowledge with industry-validated quizzes."
            />
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 px-8 text-center text-slate-500">
        <p>© 2026 JobSim. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -8 }}
    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);
