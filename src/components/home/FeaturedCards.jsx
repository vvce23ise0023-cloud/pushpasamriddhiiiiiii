import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/lib/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from 'lucide-react';

const categoryLabels = {
  cultivation: 'cultivation',
  pest_management: 'pestManagement',
  government_scheme: 'govSchemes',
  organic_farming: 'organicFarming',
  seasonal_tips: 'seasonalTips',
  disease_prevention: 'diseasePrevention',
  news: 'news',
};

export default function FeaturedCards() {
  const { t, language } = useLanguage();
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['featuredArticles'],
    queryFn: () => base44.entities.Article.filter({ is_featured: true }, '-created_date', 4),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1,2].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {articles.map((article, i) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Link to={`/articles?id=${article.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
              {article.image_url && (
                <div className="h-36 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4">
                <Badge variant="secondary" className="text-[10px] mb-2">
                  {t(categoryLabels[article.category] || article.category)}
                </Badge>
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {language !== 'en' && article[`title_${language}`] ? article[`title_${language}`] : article.title}
                </h3>
                {article.summary && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</p>
                )}
                <div className="flex items-center gap-1 mt-3 text-primary text-xs font-medium">
                  {t('readMore')} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}