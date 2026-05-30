import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingBag, MessageCircle, User, HelpCircle, Flower2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, labelKey: 'home' },
  { path: '/articles', icon: BookOpen, labelKey: 'articles' },
  { path: '/marketplace', icon: ShoppingBag, labelKey: 'marketplace' },
  { path: '/ask-expert', icon: MessageCircle, labelKey: 'askExpert' },
  { path: '/help', icon: HelpCircle, labelKey: 'helpContact' },
  { path: '/profile', icon: User, labelKey: 'profile' },
];

export default function DesktopSidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground leading-tight">{t('appName')}</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">🌸 {t('appTagline')}</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <Icon className="w-5 h-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}