import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';
import { User, Globe, LogOut, Trash2, ChevronRight, Flower2, Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';

export default function Profile() {
  const { t, language, setLanguage, languageOptions } = useLanguage();
  const { user } = useAuth();

  const handleLogout = () => {
    base44.auth.logout('/login');
  };

  return (
    <div className="p-4 space-y-6 pb-8">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{user?.full_name || 'Farmer'}</h2>
              <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Settings */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {t('settings')}
        </h2>
        <Card className="divide-y divide-border">
          {/* Language */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{t('language')}</span>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </section>

      {/* Quick Links */}
      <section>
        <Card className="divide-y divide-border">
          <button onClick={() => window.location.href = '/help'} className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{t('helpContact')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </Card>
      </section>

      {/* Actions */}
      <section className="space-y-3">
        <Button variant="outline" onClick={handleLogout} className="w-full rounded-xl gap-2 h-12 text-base">
          <LogOut className="w-5 h-5" /> {t('logout')}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full rounded-xl gap-2 h-12 text-destructive hover:text-destructive text-base">
              <Trash2 className="w-5 h-5" /> {t('delete')} Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All your data including listings and conversations will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                {t('delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* App Info */}
      <div className="text-center pt-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Flower2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{t('appName')}</span>
        </div>
        <p className="text-xs text-muted-foreground">v1.0.0 • Made for Indian Flower Farmers 🇮🇳</p>
      </div>
    </div>
  );
}