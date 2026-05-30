import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/lib/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketTicker() {
  const { t } = useLanguage();
  const { data: prices = [], isLoading } = useQuery({
    queryKey: ['marketPrices'],
    queryFn: () => base44.entities.MarketPrice.list('-created_date', 8),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (prices.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-muted-foreground">Market prices will appear here</p>
      </Card>
    );
  }

  const trendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
    return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  const trendColor = (trend) => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400';
    if (trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {prices.map((price, i) => (
        <motion.div
          key={price.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-xs text-muted-foreground truncate">{price.flower_type}</p>
            <p className="text-xl font-bold mt-1">₹{price.price_per_kg}</p>
            <div className="flex items-center gap-1 mt-1">
              {trendIcon(price.trend)}
              <span className={`text-xs font-medium ${trendColor(price.trend)}`}>
                {price.change_percent ? `${price.change_percent > 0 ? '+' : ''}${price.change_percent}%` : 'Stable'}
              </span>
            </div>
            {price.market_name && (
              <p className="text-[10px] text-muted-foreground mt-1 truncate">{price.market_name}</p>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}