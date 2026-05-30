import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const flowerTypes = ['Rose', 'Marigold', 'Jasmine', 'Tuberose', 'Chrysanthemum', 'Lily', 'Orchid', 'Gladiolus', 'Carnation', 'Gerbera', 'Other'];

export default function ListingForm({ open, onClose, editListing }) {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(editListing || {
    title: '',
    flower_type: '',
    description: '',
    price: '',
    unit: 'kg',
    quantity_available: '',
    listing_type: 'sell',
    location: '',
    contact_phone: '',
    seller_name: '',
    image_url: '',
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, image_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, price: Number(form.price), quantity_available: Number(form.quantity_available) };
    if (editListing?.id) {
      await base44.entities.FlowerListing.update(editListing.id, data);
    } else {
      await base44.entities.FlowerListing.create(data);
    }
    queryClient.invalidateQueries({ queryKey: ['listings'] });
    setSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editListing?.id ? t('edit') : t('postListing')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Listing Type */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={form.listing_type === 'sell' ? 'default' : 'outline'}
              onClick={() => setForm(p => ({ ...p, listing_type: 'sell' }))}
              className="rounded-xl"
            >
              {t('sell')}
            </Button>
            <Button
              type="button"
              variant={form.listing_type === 'buy' ? 'default' : 'outline'}
              onClick={() => setForm(p => ({ ...p, listing_type: 'buy' }))}
              className="rounded-xl"
            >
              {t('buy')}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
          </div>

          <div className="space-y-2">
            <Label>{t('flowerType')}</Label>
            <Select value={form.flower_type} onValueChange={v => setForm(p => ({ ...p, flower_type: v }))}>
              <SelectTrigger><SelectValue placeholder="Select flower" /></SelectTrigger>
              <SelectContent>
                {flowerTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('price')} (₹)</Label>
              <Input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={form.unit} onValueChange={v => setForm(p => ({ ...p, unit: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="bunch">Bunch</SelectItem>
                  <SelectItem value="piece">Piece</SelectItem>
                  <SelectItem value="quintal">Quintal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('quantity')}</Label>
              <Input type="number" value={form.quantity_available} onChange={e => setForm(p => ({ ...p, quantity_available: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{t('location')}</Label>
              <Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('contact')}</Label>
            <Input value={form.contact_phone} onChange={e => setForm(p => ({ ...p, contact_phone: e.target.value }))} placeholder="Phone number" />
          </div>

          <div className="space-y-2">
            <Label>Seller Name</Label>
            <Input value={form.seller_name} onChange={e => setForm(p => ({ ...p, seller_name: e.target.value }))} />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>{t('uploadImage')}</Label>
            {form.image_url ? (
              <div className="relative">
                <img src={form.image_url} alt="" className="w-full h-32 object-cover rounded-xl" />
                <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => setForm(p => ({ ...p, image_url: '' }))}>
                  ✕
                </Button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5 text-muted-foreground" />}
                <span className="text-sm text-muted-foreground">
                  {uploading ? t('loading') : t('uploadImage')}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">{t('cancel')}</Button>
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : t('save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}