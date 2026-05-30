import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Bug, Landmark, TrendingUp, BookOpen, Sprout } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

const actions = [
  { icon: Flower2, labelKey: 'cultivation', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', path: '/articles?cat=cultivation' },
  { icon: Bug, labelKey: 'pestManagement', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', path: '/articles?cat=pest_management' },
  { icon: Landmark, labelKey: 'govSchemes', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', path: '/articles?cat=government_scheme' },
  { icon: TrendingUp, labelKey: 'marketPrices', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', path: '/marketplace' },
  { icon: Sprout, labelKey: 'organicFarming', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', path: '/articles?cat=organic_farming' },
  { icon: BookOpen, labelKey: 'seasonalTips', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', path: '/articles?cat=seasonal_tips' },
];

export default function QuickActions() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.labelKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={action.path}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:shadow-md transition-all active:scale-95"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-center text-foreground leading-tight">
                {t(action.labelKey)}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}