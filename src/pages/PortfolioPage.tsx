import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileUpload } from '../components/ui/FileUpload';
import { 
  ExternalLink, 
  Trash2, 
  Briefcase, 
  Award, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export const PortfolioPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

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
                  { name: 'Algorithm Specialist', issuer: 'JobSim Validated', date: 'March 2026' },
                  { name: 'UI/UX Fundamentals', issuer: 'Google Certified', date: 'Feb 2026' },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-900">{badge.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{badge.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-indigo-600 text-white">
              <h4 className="text-xl font-black mb-4">Portfolio Score</h4>
              <div className="text-5xl font-black mb-6">840<span className="text-indigo-300 text-lg">/1000</span></div>
              <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
                Your portfolio is in the <strong>Top 5%</strong> of applicants for Full Stack roles.
              </p>
              <div className="h-2 bg-indigo-900/30 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
              </div>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-4 rounded-xl font-black">
                Review Full Analysis
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
