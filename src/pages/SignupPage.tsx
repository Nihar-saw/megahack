import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-mesh-light flex flex-col items-center justify-center p-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-12 border border-slate-100">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 group hover:scale-110 transition-transform">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-3">Create Account</h1>
            <p className="text-slate-500 font-medium">Start your journey to industry readiness</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <Input placeholder="John Doe" className="px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <Input type="email" placeholder="name@example.com" className="px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <Input type="password" placeholder="Min. 8 characters" className="px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" />
            </div>

            <p className="text-[11px] text-slate-400 text-center font-medium leading-relaxed">
              By signing up, you agree to our <span className="text-indigo-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>.
            </p>

            <Link to="/dashboard" className="block">
              <Button className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-200 transition-all active:scale-95">
                Create Account
              </Button>
            </Link>
          </form>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 font-bold">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
