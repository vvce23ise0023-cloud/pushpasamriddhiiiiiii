import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Thermometer, MapPin, Loader2, Sprout } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function WeatherWidget() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    let lat = 20.5937, lon = 78.9629; // Default India center
    let locName = 'India';

    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        );
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
      } catch (e) {
        // Use default
      }
    }

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Get current weather data for coordinates latitude ${lat}, longitude ${lon}. Include city name, temperature in celsius, humidity percentage, wind speed in km/h, rainfall chance, and a brief farming suggestion for flower farmers based on conditions.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          city: { type: "string" },
          temperature: { type: "number" },
          humidity: { type: "number" },
          wind_speed: { type: "number" },
          rainfall_chance: { type: "number" },
          condition: { type: "string" },
          farming_tip: { type: "string" }
        }
      }
    });

    setWeather(result);
    setLocation(result.city || locName);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center h-44">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{location}</span>
            <Cloud className="w-4 h-4 text-muted-foreground ml-auto" />
            <span className="text-xs text-muted-foreground">{weather.condition}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                <Thermometer className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('temperature')}</p>
                <p className="font-bold text-lg">{weather.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                <Droplets className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('humidity')}</p>
                <p className="font-bold text-lg">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                <Wind className="w-4 h-4 text-teal-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('windSpeed')}</p>
                <p className="font-bold text-lg">{weather.wind_speed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                <Droplets className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('rainfall')}</p>
                <p className="font-bold text-lg">{weather.rainfall_chance}%</p>
              </div>
            </div>
          </div>
          {weather.farming_tip && (
            <div className="mt-4 p-3 bg-card/80 rounded-lg flex items-start gap-2">
              <Sprout className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">{weather.farming_tip}</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}