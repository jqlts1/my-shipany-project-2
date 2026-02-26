import React from 'react';
import { Check, X } from 'lucide-react';

export interface ComparisonFeature {
  name: string;
  us: boolean | string;
  them: boolean | string;
}

export interface ComparisonTableProps {
  section?: any;
  title?: string;
  description?: string;
  ourName?: string;
  competitorName?: string;
  features?: ComparisonFeature[];
}

export const ComparisonTable = (props: ComparisonTableProps) => {
  const section = props.section || {};
  
  // Extract props either from root or from section object
  const title = props.title || section.title;
  const description = props.description || section.description;
  const ourName = props.ourName || section.usName || 'Us';
  const competitorName = props.competitorName || section.themName || 'Them';
  const features = props.features && props.features.length > 0 ? props.features : (section.features || []);
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">{title}</h2>}
          {description && <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="p-6 text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 w-1/2">
                  Feature
                </th>
                <th className="p-6 text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 w-1/4 text-center bg-blue-50/50 dark:bg-blue-900/10">
                  {ourName}
                </th>
                <th className="p-6 text-sm md:text-base font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 w-1/4 text-center">
                  {competitorName}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {features.map((feature: ComparisonFeature, index: number) => (
                <tr key={index} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-6 text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
                    {feature.name}
                  </td>
                  <td className="p-6 text-center bg-blue-50/30 dark:bg-blue-900/5">
                    {typeof feature.us === 'boolean' ? (
                      feature.us ? (
                        <Check className="mx-auto h-6 w-6 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <X className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{feature.us}</span>
                    )}
                  </td>
                  <td className="p-6 text-center">
                    {typeof feature.them === 'boolean' ? (
                      feature.them ? (
                        <Check className="mx-auto h-6 w-6 text-slate-400 dark:text-slate-500" />
                      ) : (
                        <X className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">{feature.them}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
