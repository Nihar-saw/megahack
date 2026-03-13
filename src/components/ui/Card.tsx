import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
};
