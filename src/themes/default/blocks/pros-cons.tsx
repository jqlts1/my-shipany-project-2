import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';

export interface ProsConsListProps {
  title: string;
  items: string[];
  type?: 'pros' | 'cons';
}

const ProsConsList: React.FC<ProsConsListProps> = ({ title, items, type = 'pros' }) => {
  const isPros = type === 'pros';
  const Icon = isPros ? Target : AlertTriangle;
  return (
    <div className={`p-8 rounded-3xl border ${isPros ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800' : 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-800'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl ${isPros ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPros ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export interface ProsConsProps {
  section?: any;
  title?: string;
  description?: string;
  prosTitle?: string;
  consTitle?: string;
  pros?: string[];
  cons?: string[];
}

export const ProsCons = (props: ProsConsProps) => {
  const section = props.section || {};

  // Extract props either from root or from section object
  const title = props.title || section.title;
  const description = props.description || section.description;
  const prosTitle = props.prosTitle || section.prosTitle || 'Why choose us';
  const consTitle = props.consTitle || section.consTitle || 'Things to consider';
  const pros = props.pros && props.pros.length > 0 ? props.pros : (section.pros || []);
  const cons = props.cons && props.cons.length > 0 ? props.cons : (section.cons || []);
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          {title && <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">{title}</h2>}
          {description && <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ProsConsList title={prosTitle} items={pros} type="pros" />
          <ProsConsList title={consTitle} items={cons} type="cons" />
        </div>
      </div>
    </section>
  );
};
