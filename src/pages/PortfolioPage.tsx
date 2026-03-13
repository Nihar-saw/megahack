import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileUpload } from '../components/ui/FileUpload';
import { useAuth } from '../context/AuthContext';
import { 
  Plus,
  ExternalLink, 
  Trash2, 
  Briefcase, 
  Award, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export const PortfolioPage = () => {
  const { user, updateProfile } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelected = async (files: File[]) => {
    const newFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newFiles);
    await updateProfile({ portfolioCount: newFiles.length });
  };

  const removeFile = async (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    await updateProfile({ portfolioCount: newFiles.length });
  };

  const portfolioScore = (user?.portfolioCount || 0) * 125; // Simple score: 125 per item, max 1000
  const scorePercent = Math.min(Math.round((portfolioScore / 1000) * 100), 100);

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Career Portfolio</h2>
            <p className="text-slate-500 font-bold">Manage your verified credentials and industry projects.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="px-6 py-3 rounded-xl border-2 font-black flex items-center gap-2">
               <ExternalLink className="w-4 h-4" /> Export PDF
             </Button>
             <Button className="px-8 py-3 rounded-xl shadow-xl shadow-indigo-200 font-black">
               Share Profile
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <Card className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Project Uploads</h3>
                <p className="text-slate-500 font-medium">Add case studies, code samples, or design prototypes to your portfolio.</p>
              </div>
              <FileUpload onFilesSelected={handleFilesSelected} maxFiles={10} />
            </Card>

            {/* Display Section */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                  Portfolio Exhibits ({uploadedFiles.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {uploadedFiles.map((file, index) => (
                    <Card key={index} className="p-6 rounded-3xl border-slate-100 hover:border-indigo-200 transition-all group relative">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                          <FileText className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-black text-slate-900 truncate pr-8">{file.name}</h5>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            Verified Exhibit • {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="absolute top-6 right-6 p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card className="p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-slate-50">
              <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Verified Badges
              </h4>
              <div className="space-y-4">
                {[
                  { name: 'Algorithm Specialist', issuer: 'JobSim Validated', date: 'March 2026', status: 'Completed' },
                  { name: 'SE-II Architect', issuer: 'JobSim Validated', date: 'March 2026', status: 'Completed' },
                  { name: 'UI/UX Fundamentals', issuer: 'Google Certified', date: 'Feb 2026', status: 'In Progress' },
                ].filter(b => b.status === 'Completed').map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-indigo-100 shadow-sm shadow-indigo-50 group hover:border-indigo-600 transition-all">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-900">{badge.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{badge.issuer}</div>
                      <div className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">Verified • {badge.date}</div>
                    </div>
                  </div>
                ))}
                {/* Fallback for empty state */}
                {[].length === 0 && (
                   <p className="text-xs font-bold text-slate-400 text-center py-4 border-2 border-dashed border-slate-200 rounded-3xl">
                     Complete simulations to unlock badges
                   </p>
                )}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-2 border-blue-100 shadow-xl shadow-blue-50/50 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  Portfolio Score
                </h4>
                <div className="text-6xl font-black text-blue-600 mb-6 drop-shadow-sm">
                  {Math.min(portfolioScore, 1000)}<span className="text-blue-200 text-2xl ml-1">/1000</span>
                </div>
                <p className="text-slate-500 font-bold mb-8">
                  Your portfolio is in the <span className="text-blue-600">Top {Math.max(100 - (user?.portfolioCount || 0) * 5, 1)}%</span> of applicants.
                </p>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${scorePercent}%` }} 
                  />
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-5 rounded-2xl font-black shadow-xl shadow-blue-200 transition-all border-none text-lg">
                  Increase Your Score
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
