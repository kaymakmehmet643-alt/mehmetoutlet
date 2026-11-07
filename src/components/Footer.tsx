import React from 'react';
import { Truck, ShieldCheck, RotateCcw, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white font-display">
              ŞABAN <span className="text-amber-500">OUTLET</span>
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
              Azak ve Riko sokak modası koleksiyonlarının tasfiye ve outlet satış merkezi. Yüksek gramajlı pamuk ve orijinal deri parçalar.
            </p>
            <div className="pt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
              © {new Date().getFullYear()} Şaban Outlet & Riko Studio. Tüm hakları saklıdır.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">Koleksiyonlar</h4>
            <ul className="space-y-1.5">
              <li><a href="#clothes-rack-section" className="hover:text-amber-500 transition-colors">Askılık Vitrini</a></li>
              <li><a href="#kombin-studio-section" className="hover:text-amber-500 transition-colors">Azak & Riko Kombin Atölyesi</a></li>
              <li><a href="#catalog-section" className="hover:text-amber-500 transition-colors">Deri Bomber & Ceketler</a></li>
              <li><a href="#catalog-section" className="hover:text-amber-500 transition-colors">480 GSM Yıkamalı Hoodieler</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">Müşteri Güvencesi</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>%100 Orijinal Ürün Faturalı</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span>1.500 TL Üzeri Ücretsiz Kargo</span>
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                <span>14 Gün Değişim Hakkı</span>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">Outlet Showroom</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Caferağa Mah. Moda Cad. No:42 Kadıköy / İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>0850 304 72 26</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>destek@sabanoutlet.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            <span>Ödeme Seçenekleri: Kapıda Nakit, Kapıda Kredi Kartı, Online 3D Secure</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-700 dark:hover:text-neutral-400">Gizlilik Politikası</a>
            <a href="#" className="hover:text-neutral-700 dark:hover:text-neutral-400">Mesafeli Satış Sözleşmesi</a>
            <a href="#" className="hover:text-neutral-700 dark:hover:text-neutral-400">İptal ve İade Koşulları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
