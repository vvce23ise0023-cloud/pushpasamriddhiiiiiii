import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';
import { Plus, Search, MapPin, Phone, Pencil, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from 'framer-motion';
import ListingForm from '@/components/marketplace/ListingForm';

export default function Marketplace() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editListing, setEditListing] = useState(null);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => base44.entities.FlowerListing.filter({ status: 'active' }, '-created_date', 50),
  });

  const handleDelete = async (listing) => {
    await base44.entities.FlowerListing.update(listing.id, { status: 'cancelled' });
    queryClient.invalidateQueries({ queryKey: ['listings'] });
  };

  const filtered = listings.filter(l => {
    const typeMatch = tab === 'all' || l.listing_type === tab;
    const searchMatch = !search || l.title?.toLowerCase().includes(search.toLowerCase()) || l.flower_type?.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('marketplace')}</h1>
        <Button onClick={() => { setEditListing(null); setShowForm(true); }} size="sm" className="rounded-xl gap-2">
          <Plus className="w-4 h-4" /> {t('postListing')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('search')} className="pl-10 h-11 rounded-xl" />
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full grid grid-cols-3 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg">{t('allListings')}</TabsTrigger>
          <TabsTrigger value="sell" className="rounded-lg">{t('sell')}</TabsTrigger>
          <TabsTrigger value="buy" className="rounded-lg">{t('buy')}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Listings */}
      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence>
            {filtered.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  {listing.image_url && (
                    <img src={listing.image_url} alt="" className="w-full h-36 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={listing.listing_type === 'sell' ? 'default' : 'secondary'} className="text-[10px]">
                            {listing.listing_type === 'sell' ? t('sell') : t('buy')}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            🌸 {listing.flower_type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm truncate">{listing.title}</h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-lg text-primary">₹{listing.price}</p>
                        <p className="text-[10px] text-muted-foreground">/{listing.unit}</p>
                      </div>
                    </div>
                    {listing.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{listing.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      {listing.location && (
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</span>
                      )}
                      {listing.seller_name && (
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{listing.seller_name}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {listing.contact_phone && (
                        <a href={`tel:${listing.contact_phone}`}>
                          <Button variant="outline" size="sm" className="rounded-lg gap-1 text-xs">
                            <Phone className="w-3 h-3" /> {t('contact')}
                          </Button>
                        </a>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => { setEditListing(listing); setShowForm(true); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(listing)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showForm && (
        <ListingForm
          open={showForm}
          onClose={() => { setShowForm(false); setEditListing(null); }}
          editListing={editListing}
        />
      )}
    </div>
  );
}