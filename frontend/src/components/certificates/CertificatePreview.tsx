import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, X, Share2, ShieldCheck, Target, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface CertificatePreviewProps {
  certificate: any;
  user: any;
  onClose: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ certificate, user, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md pointer-events-auto"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Certificate Section */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto print:p-0">
          <div 
            ref={certificateRef}
            className="certificate-container relative bg-white border-[16px] border-slate-900 p-8 md:p-16 aspect-[1.414/1] w-full shadow-inner flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-10">
               <div className="w-full h-full border-[1px] border-slate-900 rounded-[2rem] flex items-center justify-center opacity-20">
                  <Award className="w-[80%] h-[80%] -rotate-12" />
               </div>
            </div>
            
            <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-slate-900/10" />
            <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-slate-900/10" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-slate-900/10" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-slate-900/10" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full h-full">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-100 border-4 border-white">
                <Target className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-sm font-black text-indigo-600 tracking-[0.4em] uppercase mb-6">Certificate of Completion</h1>
              
              <div className="w-20 h-1 bg-slate-900 mb-10" />

              <p className="text-slate-500 font-bold italic text-lg mb-4">This acknowledges that</p>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight underline decoration-indigo-600 decoration-8 underline-offset-8">
                {user?.name || 'Candidate Name'}
              </h2>
              
              <p className="text-slate-500 font-bold text-lg mb-8 max-w-2xl leading-relaxed">
                has successfully completed the 7-day intensive career simulation and passed the professional validation assessment for the role of
              </p>
              
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-widest border-y-2 border-slate-100 py-6 px-12 mb-12">
                {certificate.courseId.replace(/-/g, ' ')}
              </h3>

              <div className="grid grid-cols-2 gap-20 mt-auto w-full">
                <div className="flex flex-col items-center">
                  <div className="w-full border-b border-slate-900 mb-2" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Issue Date</span>
                  <span className="text-sm font-black text-slate-900">{new Date(certificate.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full border-b border-slate-900 mb-2" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verification ID</span>
                  <span className="text-sm font-black text-slate-900">{certificate.certificateId}</span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 flex flex-col items-end">
                <div className="w-20 h-20 bg-slate-50 border-4 border-slate-100 rounded-full flex items-center justify-center mb-2">
                   <ShieldCheck className="w-10 h-10 text-indigo-600" />
                </div>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Verified Professional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full md:w-80 bg-slate-50 p-8 border-l border-slate-100 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
               <h4 className="text-xl font-black text-slate-900">Certificate Details</h4>
               <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
                 <X className="w-5 h-5 text-slate-400" />
               </button>
            </div>

            <div className="space-y-4">
               <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Performance Level</span>
                 <span className="text-lg font-black text-slate-900">{certificate.level}</span>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Assessment Score</span>
                 <span className="text-lg font-black text-indigo-600">{certificate.score}%</span>
               </div>
            </div>

            <div className="p-6 bg-indigo-600 rounded-3xl text-white text-center shadow-xl shadow-indigo-100">
               <Award className="w-10 h-10 mx-auto mb-4" />
               <p className="text-xs font-bold leading-relaxed">This certificate is blockchain-verified and can be shared with recruiters.</p>
            </div>
          </div>

          <div className="space-y-3 mt-10">
            <Button 
               onClick={handleDownload}
               className="w-full h-14 bg-slate-900 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
            >
              <Download className="w-4 h-4" /> Download PDF
            </Button>
            <Button 
               variant="outline"
               className="w-full h-14 rounded-[1.25rem] border-2 border-slate-200 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white"
            >
              <Share2 className="w-4 h-4" /> Share to LinkedIn
            </Button>
            <Button 
               variant="ghost"
               className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Verify Credential
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
