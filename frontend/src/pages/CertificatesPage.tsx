import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Award, Calendar, ExternalLink, Download, Target, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CertificatePreview } from '../components/certificates/CertificatePreview';

export const CertificatesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const certificates = user?.certificates || [];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="w-12 h-12 rounded-2xl border-2 border-slate-100 flex items-center justify-center p-0 hover:bg-white hover:border-indigo-100 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </Button>
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Professional Certificates</h2>
              <p className="text-slate-500 font-bold text-lg">Your earned credentials and career milestones</p>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-6 shadow-xl shadow-slate-100/50">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Earned</span>
              <span className="text-2xl font-black text-indigo-600">{certificates.length}</span>
            </div>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Certificates Grid or Empty State */}
        {certificates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[4rem] border-4 border-dashed border-slate-100 p-20 text-center"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner">
              <Target className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Certificates Issued Yet</h3>
            <p className="text-slate-400 font-bold mb-10 max-w-md mx-auto leading-relaxed">
              Complete your selected career track (Day 1-7) and successfully pass the AI Interview to receive your industry-recognized professional certificate.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 text-white rounded-[1.5rem] h-16 px-12 font-black shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all text-lg outline-none border-none"
            >
              Start Learning Now
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert: any, index: number) => (
              <motion.div
                key={cert.certificateId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <Card className="p-0 rounded-[3rem] overflow-hidden border-slate-100 shadow-2xl shadow-slate-200/50 group hover:shadow-indigo-100 transition-all border-2 hover:border-indigo-100 flex flex-col h-full">
                  <div className="h-44 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 relative p-8 flex flex-col justify-between overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700" />
                    <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-50" />
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <Award className="w-32 h-32 rotate-12" />
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-indigo-300" />
                      </div>
                      <div className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-[9px] text-indigo-300 font-bold tracking-widest uppercase">
                        {cert.certificateId.split('-').pop()}
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Professional Certificate</div>
                      <div className="text-white font-black text-2xl tracking-tight leading-tight uppercase group-hover:text-indigo-200 transition-colors">
                        {cert.courseId.replace(/-/g, ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Issued On</span>
                        <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                          <Calendar className="w-4 h-4 text-indigo-400" />
                          {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Completion Score</span>
                        <div className="text-2xl font-black text-slate-900 flex items-center justify-end gap-1">
                          {cert.score}<span className="text-indigo-600 text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-auto">
                      <Button 
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 bg-[#0f172a] hover:bg-slate-800 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-all"
                      >
                        View Certificate <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition-all group/dl p-0"
                      >
                        <Download className="w-5 h-5 group-hover/dl:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificatePreview 
            certificate={selectedCert} 
            user={user} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};
