import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  Mail, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  Edit2,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    role: string;
    email: string;
    location: string;
    joined: string;
    image: string;
  };
  onUpdateImage: (newImage: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  user,
  onUpdateImage
}) => {
  const navigate = useNavigate();
  const { logout, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(() => {
    return localStorage.getItem('user-profile-name') || user.name;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = async () => {
    localStorage.setItem('user-profile-name', currentName);
    await updateProfile({ name: currentName });
    setIsEditingName(false);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-[400px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">Profile Details</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden">
                    <img 
                      src={user.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="mt-6 text-center w-full">
                  {isEditingName ? (
                    <div className="flex items-center justify-center gap-2">
                      <input 
                        type="text" 
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        className="text-xl font-black text-slate-900 bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full text-center"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      />
                      <button onClick={handleSaveName} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg">
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 group">
                      <h3 className="text-xl font-black text-slate-900">{currentName}</h3>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{user.role}</p>
                </div>
              </div>

              {/* Info List */}
              <div className="space-y-4">
                <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={user.email} />
                <InfoItem icon={<MapPin className="w-5 h-5" />} label="Location" value={user.location} />
                <InfoItem icon={<Calendar className="w-5 h-5" />} label="Member Since" value={user.joined} />
              </div>

              {/* Account Status */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Status</h4>
                <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900">Verified Professional</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Full access enabled</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4 pt-4">
                 <button className="w-full p-6 py-4 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50 group transition-all flex items-center justify-between text-left">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                      <span className="font-bold text-slate-600 group-hover:text-slate-900">Billing & Subscription</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                 </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="w-full py-4 rounded-2xl border-2 border-red-50 text-red-500 hover:bg-red-50 hover:border-red-100 font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-3xl border border-slate-100 bg-white hover:shadow-lg hover:shadow-slate-100 transition-all cursor-default">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</div>
      <div className="text-sm font-black text-slate-700">{value}</div>
    </div>
  </div>
);
