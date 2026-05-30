import React from 'react';
import { Link } from 'react-router-dom';
import { User, Globe, Flower2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  const { t, language, setLanguage, languageOptions } = useLanguage();

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-top">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Flower2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-base text-foreground">{t('appName')}</span>
        </Link>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? 'bg-primary/10 text-primary' : ''}
                >
                  {lang.nativeLabel}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}