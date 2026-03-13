import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Building2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const marketTrends = [
  { title: 'AI Integration', growth: '+45%', sentiment: 'bullish', description: 'Massive shift towards LLM-integrated frontend architectures.' },
  { title: 'Remote Work', growth: '-12%', sentiment: 'bearish', description: 'Increased demand for hybrid roles in major tech hubs.' },
  { title: 'Full-Stack Demand', growth: '+28%', sentiment: 'bullish', description: 'Companies prioritizing engineers who can handle both Ends.' },
];

const topCompanies = [
  { name: 'Google', roles: 124, growth: '+5%', logo: 'https://www.google.com/favicon.ico' },
  { name: 'Meta', roles: 89, growth: '+12%', logo: 'https://www.meta.com/favicon.ico' },
  { name: 'Stripe', roles: 45, growth: '+22%', logo: 'https://www.stripe.com/favicon.ico' },
  { name: 'Vercel', roles: 32, growth: '+35%', logo: 'https://vercel.com/favicon.ico' },
];

export const IndustryInsightsPage = () => {
  const [lastUpdated] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  });

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Industry Insights</h2>
            <p className="text-slate-500 font-bold">Real-time market intelligence and career analytics.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Market Feed
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Last Updated: <span className="text-indigo-600">{lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Trends */}
          {marketTrends.map((trend, index) => (
            <Card key={index} className="p-8 rounded-[2.5rem] border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 font-black ${trend.sentiment === 'bullish' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {trend.sentiment === 'bullish' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {trend.growth}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{trend.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{trend.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salary Benchmarks */}
          <Card className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <DollarSign className="w-7 h-7 text-emerald-500" />
              Global Salary Benchmarks
            </h3>
            <div className="space-y-6">
              {[
                { level: 'Junior / Entry Level', range: '$70k - $95k', color: 'bg-emerald-500' },
                { level: 'Mid-Level Engineer', range: '$110k - $145k', color: 'bg-indigo-600' },
                { level: 'Senior / Staff Level', range: '$165k - $240k', color: 'bg-violet-600' },
                { level: 'Engineering Manager', range: '$190k - $275k', color: 'bg-pink-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-bold text-slate-700">{item.level}</span>
                  </div>
                  <span className="font-black text-slate-900">{item.range}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Companies */}
          <Card className="p-10 rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-100/50">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-indigo-600" />
              Top Hiring Companies
            </h3>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-indigo-100 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center p-2 group-hover:bg-white transition-colors">
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900">{company.name}</div>
                      <div className="text-xs font-bold text-slate-400">{company.roles} Open Roles</div>
                    </div>
                  </div>
                  <div className="text-emerald-500 font-black text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {company.growth}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Global Market Map CTA */}
        <Card className="p-12 rounded-[3rem] bg-indigo-600 text-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black mb-4">Explore Global Opportunities</h3>
              <p className="bg-white text-indigo-600 font-black">
                Our interactive market map shows the highest-paying regions for your specific skill profile. Move beyond your local geography.
              </p>
            </div>
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <Globe className="w-6 h-6" /> Open Market Map
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
