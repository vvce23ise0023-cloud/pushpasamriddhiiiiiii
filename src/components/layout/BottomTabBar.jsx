import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingBag, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/', icon: Home, labelKey: 'home' },
  { path: '/articles', icon: BookOpen, labelKey: 'articles' },
  { path: '/marketplace', icon: ShoppingBag, labelKey: 'marketplace' },
  { path: '/ask-expert', icon: MessageCircle, labelKey: 'askExpert' },
];

export default function BottomTabBar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="no-select flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {t(tab.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}