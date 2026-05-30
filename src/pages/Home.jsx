import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Newspaper } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

import SearchBar from '@/components/home/SearchBar';
import QuickActions from '@/components/home/QuickActions';
import WeatherWidget from '@/components/home/WeatherWidget';
import MarketTicker from '@/components/home/MarketTicker';
import FeaturedCards from '@/components/home/FeaturedCards';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6 pb-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block"
      >
        <h1 className="text-2xl font-bold">{t('appName')} 🌸</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('appTagline')}</p>
      </motion.div>

      {/* Search */}
      <SearchBar />

      {/* Quick Actions */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {t('quickActions')}
        </h2>
        <QuickActions />
      </section>

      {/* Weather */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {t('weather')}
        </h2>
        <WeatherWidget />
      </section>

      {/* AI Chat CTA */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Link to="/ask-expert">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{t('chatWithAI')}</h3>
                <p className="text-xs opacity-80 mt-0.5">{t('askAnything')}</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Market Prices */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t('trendingPrices')}
          </h2>
          <Link to="/marketplace" className="text-xs text-primary font-medium">
            {t('viewAll')} →
          </Link>
        </div>
        <MarketTicker />
      </section>

      {/* Featured Articles */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t('featuredArticles')}
          </h2>
          <Link to="/articles" className="text-xs text-primary font-medium">
            {t('viewAll')} →
          </Link>
        </div>
        <FeaturedCards />
      </section>

      {/* News CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Link to="/articles?cat=news">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-accent" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{t('dailyNews')}</h3>
              <p className="text-xs text-muted-foreground">Latest agriculture & floriculture updates</p>
            </div>
            <Button variant="secondary" size="sm">{t('readMore')}</Button>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}