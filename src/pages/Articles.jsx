import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const categories = [
  { value: 'all', labelKey: 'viewAll' },
  { value: 'cultivation', labelKey: 'cultivation' },
  { value: 'pest_management', labelKey: 'pestManagement' },
  { value: 'government_scheme', labelKey: 'govSchemes' },
  { value: 'organic_farming', labelKey: 'organicFarming' },
  { value: 'seasonal_tips', labelKey: 'seasonalTips' },
  { value: 'disease_prevention', labelKey: 'diseasePrevention' },
  { value: 'news', labelKey: 'news' },
];

export default function Articles() {
  const { t, language } = useLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('cat') || 'all';
  const initialSearch = urlParams.get('search') || '';
  const articleId = urlParams.get('id');

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list('-created_date', 50),
  });

  // If articleId is in URL, find and show it
  React.useEffect(() => {
    if (articleId && articles.length > 0) {
      const found = articles.find(a => a.id === articleId);
      if (found) setSelectedArticle(found);
    }
  }, [articleId, articles]);

  const filtered = articles.filter(article => {
    const catMatch = activeCategory === 'all' || article.category === activeCategory;
    const searchMatch = !searchQuery || 
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.flower_type?.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  if (selectedArticle) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4"
      >
        <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        {selectedArticle.image_url && (
          <img src={selectedArticle.image_url} alt="" className="w-full h-48 sm:h-64 object-cover rounded-xl mb-4" />
        )}
        <Badge variant="secondary" className="mb-2">
          {t(categories.find(c => c.value === selectedArticle.category)?.labelKey || selectedArticle.category)}
        </Badge>
        <h1 className="text-xl font-bold mb-2">
          {language !== 'en' && selectedArticle[`title_${language}`] ? selectedArticle[`title_${language}`] : selectedArticle.title}
        </h1>
        {selectedArticle.flower_type && (
          <Badge variant="outline" className="mb-4">🌸 {selectedArticle.flower_type}</Badge>
        )}
        <div className="prose prose-sm max-w-none text-foreground">
          <ReactMarkdown>
            {language === 'hi' && selectedArticle.content_hi ? selectedArticle.content_hi : (selectedArticle.content || selectedArticle.summary || '')}
          </ReactMarkdown>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{t('articles')}</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search')}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className="rounded-full whitespace-nowrap flex-shrink-0 text-xs"
          >
            {t(cat.labelKey)}
          </Button>
        ))}
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noResults')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  className="flex overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.image_url && (
                    <div className="w-24 sm:w-32 flex-shrink-0">
                      <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-3 flex-1 min-w-0">
                    <Badge variant="secondary" className="text-[10px] mb-1">
                      {t(categories.find(c => c.value === article.category)?.labelKey || article.category)}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {language !== 'en' && article[`title_${language}`] ? article[`title_${language}`] : article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}