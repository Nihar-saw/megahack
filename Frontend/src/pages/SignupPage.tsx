import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-mesh">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2">Start your journey to industry readiness</p>
          </div>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input 
              label="Full Name"
              type="text"
              placeholder="John Doe"
              required
            />
            <Input 
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              required
            />
            <Input 
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              required
            />
            <div className="text-xs text-slate-500">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </div>
            <Link to="/dashboard">
              <Button className="w-full" size="lg">Create Account</Button>
            </Link>
          </form>
        </div>
        <p className="text-center mt-8 text-slate-500 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};
