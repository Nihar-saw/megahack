import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-mesh-light overflow-x-hidden selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-8 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Target className="w-6 h-6 text-white" />
          </div>
          JobSim
        </h1>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Features</a>
          <a href="#benefits" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Benefits</a>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <Link to="/login">
            <Button variant="ghost" className="font-semibold text-slate-600">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="px-8 py-6 rounded-2xl shadow-xl shadow-indigo-200 font-bold">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100 shadow-sm animate-pulse">
              <span>🚀</span> Elevate Your Career Readiness
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] mb-10 tracking-tight">
              Simulate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Future</span> Industry Role.
            </h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-xl font-medium">
              Understand industry expectations, evaluate your skills, and estimate your market value with our AI-driven simulation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/signup">
                <Button size="lg" className="px-12 py-7 rounded-2xl shadow-2xl shadow-indigo-200 group text-lg font-bold transition-all hover:scale-105 active:scale-95">
                  Assess My Skills <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="px-12 py-7 rounded-2xl border-2 hover:bg-slate-50 text-lg font-bold transition-all hover:scale-105 active:scale-95">
                  Explore Market Value
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="relative glass-card p-4 rounded-[3rem] overflow-hidden shadow-2xl border-white/40">
              <img
                src="/src/assets/hero.png"
                alt="Career Path Illustration"
                className="w-full h-auto rounded-[2.5rem] shadow-inner floating"
              />
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 animate-bounce duration-3000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ready for Hire</div>
                    <div className="text-sm font-black text-slate-900">Skill Level: Expert</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-black mb-2">50k+</div>
              <div className="text-slate-400 font-medium">Assessments Taken</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">92%</div>
              <div className="text-slate-400 font-medium">Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">120+</div>
              <div className="text-slate-400 font-medium">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">$85k</div>
              <div className="text-slate-400 font-medium">Avg. Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Core Platform Features</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Everything you need to bridge the gap between education and industry.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-white" />}
              iconBg="bg-indigo-600"
              title="Market Value Estimator"
              description="Get an accurate range of what you should be earning based on your current skill set and industry trends."
            />
            <FeatureCard
              icon={<Cpu className="w-10 h-10 text-white" />}
              iconBg="bg-violet-600"
              title="Skill Gap Analysis"
              description="Compare your skills with actual JD requirements from top-tier tech companies and get learning paths."
            />
            <FeatureCard
              icon={<Target className="w-10 h-10 text-white" />}
              iconBg="bg-blue-600"
              title="Interactive Simulations"
              description="Test your knowledge with real-world industry scenarios and validated practical assessments."
            />
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 px-8 text-center bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">JobSim</span>
          </div>
          <p className="text-slate-500 font-medium">© 2026 JobSim. Redefining industry readiness for the next generation.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, iconBg, title, description }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -12, scale: 1.02 }}
    className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:bg-white transition-all cursor-default"
  >
    <div className={`w-20 h-20 ${iconBg} rounded-3xl flex items-center justify-center mb-8 shadow-xl`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-6">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
  </motion.div>
);
