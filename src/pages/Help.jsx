import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Phone, Mail, MessageCircle, HelpCircle, ExternalLink } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const faqs = [
  {
    q: "How do I post a flower listing?",
    a: "Go to the Marketplace page and tap the '+ Post Listing' button. Fill in flower details, price, and optionally upload a photo."
  },
  {
    q: "How does the AI chatbot work?",
    a: "Our AI chatbot is trained on floriculture knowledge. You can ask questions about cultivation, diseases, pests, or even upload photos of your flowers for diagnosis."
  },
  {
    q: "How can I check market prices?",
    a: "Market prices are shown on the Home page and in the Marketplace section. Prices are updated regularly."
  },
  {
    q: "Can I use this app in my local language?",
    a: "Yes! PushpaSamriddhi supports English, Hindi, Kannada, Tamil, and Marathi. Tap the globe icon to change your language."
  },
  {
    q: "How do I get weather information?",
    a: "Weather information is automatically shown on the Home page based on your location. Allow location access for accurate data."
  },
];

export default function Help() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6 pb-8">
      <h1 className="text-xl font-bold">{t('helpContact')}</h1>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-green-700 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-sm">Call Us</h3>
            <p className="text-xs text-muted-foreground mt-1">1800-XXX-XXXX</p>
            <a href="tel:1800000000">
              <Button variant="outline" size="sm" className="mt-3 rounded-lg w-full">Call Now</Button>
            </a>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-sm">Email</h3>
            <p className="text-xs text-muted-foreground mt-1">help@pushpasamriddhi.in</p>
            <a href="mailto:help@pushpasamriddhi.in">
              <Button variant="outline" size="sm" className="mt-3 rounded-lg w-full">Send Email</Button>
            </a>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-purple-700 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-sm">WhatsApp</h3>
            <p className="text-xs text-muted-foreground mt-1">Chat with us</p>
            <Button variant="outline" size="sm" className="mt-3 rounded-lg w-full">Open Chat</Button>
          </Card>
        </motion.div>
      </div>

      {/* FAQs */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Frequently Asked Questions
        </h2>
        <Card className="p-2">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-0">
                <AccordionTrigger className="text-sm text-left px-3 py-3 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-3 text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </section>
    </div>
  );
}