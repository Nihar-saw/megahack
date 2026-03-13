import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Film, Paperclip } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
}

export const FileUpload = ({ onFilesSelected, maxFiles = 5 }: FileUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    setSelectedFiles(prev => {
      const updated = [...prev, ...newFiles].slice(0, maxFiles);
      onFilesSelected(updated);
      return updated;
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesSelected(updated);
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Film className="w-5 h-5" />;
    if (type === 'application/pdf') return <FileText className="w-5 h-5" />;
    return <Paperclip className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
          Attachments (Images, Videos, PDFs)
        </label>
        <span className="text-xs font-bold text-slate-400 italic">
          Max {maxFiles} files supported
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-10 transition-all duration-300 flex flex-col items-center justify-center text-center ${
          isDragging 
            ? 'border-indigo-600 bg-indigo-50/50' 
            : 'border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-slate-100/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf,.mp4"
        />
        
        <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isDragging ? 'scale-110 shadow-indigo-100' : ''}`}>
          <Upload className={`w-8 h-8 ${isDragging ? 'text-indigo-600' : 'text-slate-400group-hover:text-indigo-600'}`} />
        </div>
        
        <h4 className="text-lg font-black text-slate-900 mb-1">
          {isDragging ? 'Drop to upload' : 'Drag & drop or click to upload'}
        </h4>
        <p className="text-slate-400 font-bold text-sm">
          Images, Videos, or PDF (up to 10MB each)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {selectedFiles.map((file, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{file.name}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
