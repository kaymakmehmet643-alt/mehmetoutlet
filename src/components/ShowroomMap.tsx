import React from 'react';
import { MapPin, Navigation, Phone, Clock, ShieldCheck, ExternalLink, MessageCircle } from 'lucide-react';

export const ShowroomMap: React.FC = () => {
  return (
    <section id="showroom-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Details */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Fiziksel Mağaza & Showroom</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                Kadıköy Moda Outlet Showroom
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Tüm askıdaki ürünleri ve Azak & Riko kombinlerini yerinde denemek, kumaşları dokunarak incelemek için showroom mağazamıza davetlisiniz.
              </p>

              {/* Info Badges */}
              <div className="mt-6 space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block font-semibold">Adres:</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Caferağa Mah. Moda Cad. No:42 Kadıköy / İstanbul (Tramvay durağı yanı)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block font-semibold">Ziyaret Saatleri:</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Haftanın her günü 10:00 - 21:00 (Pazar günleri açık)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block font-semibold">Müşteri Hattı & WhatsApp:</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      0850 304 72 26 / 0532 100 85 85
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Moda+Caddesi+Kadikoy+Istanbul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Haritada Yol Tarifi Al</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/908503047226?text=Merhaba%20Saban%20Outlet%20hakkinda%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İletişim</span>
              </a>
            </div>
          </div>

          {/* Right Stylized Interactive Vector Map Frame */}
          <div className="lg:col-span-7 relative min-h-[360px] bg-neutral-200 dark:bg-neutral-950 overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
            {/* SVG Interactive Map illustration */}
            <div className="absolute inset-0 opacity-80 dark:opacity-60 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:16px_16px]" />

            {/* Map Roads & Coastline abstraction */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 400" preserveAspectRatio="none">
              {/* Sea Area (Kadıköy Sahil) */}
              <path
                d="M 0,220 C 180,260 300,180 600,240 L 600,400 L 0,400 Z"
                className="fill-blue-100/60 dark:fill-blue-950/40"
              />
              {/* Main Roads */}
              <path
                d="M 50,0 C 120,120 220,140 320,160 C 420,180 520,120 600,100"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-neutral-300 dark:text-neutral-800"
              />
              {/* Moda Caddesi Avenue */}
              <path
                d="M 120,40 C 220,90 280,180 340,300"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-amber-400/40 dark:text-amber-500/20"
              />
              <path
                d="M 120,40 C 220,90 280,180 340,300"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="6 6"
                className="text-amber-500 dark:text-amber-400"
              />
            </svg>

            {/* Showroom Animated Pinpoint */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-amber-500/20 animate-ping absolute" />
                <span className="w-10 h-10 rounded-full bg-amber-500/40 animate-pulse absolute" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl border-2 border-white dark:border-neutral-900">
                  <MapPin className="w-6 h-6 fill-neutral-950" />
                </div>
              </div>

              {/* Pinpoint Label Card */}
              <div className="mt-3 p-3 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-xl text-center max-w-xs">
                <span className="font-extrabold text-xs text-neutral-900 dark:text-white block font-display">
                  ŞABAN OUTLET SHOWROOM
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                  Moda Cad. No:42 Kadıköy / İstanbul
                </span>
                <span className="text-[9px] text-neutral-500 block mt-1">
                  Marmaray & Kadıköy Vapur İskelesi'ne 7 Dk Yürüyüş
                </span>
              </div>
            </div>

            {/* Showroom Inside Photo Badge */}
            <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 p-2 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-lg">
              <img
                src="/src/assets/images/hero_outlet_fashion_1794076319385.jpg"
                alt="Showroom içi"
                className="w-12 h-10 object-cover rounded-lg"
              />
              <div className="text-[10px]">
                <span className="font-bold text-neutral-900 dark:text-white block">Kadıköy Mağaza İçi</span>
                <span className="text-emerald-500 font-semibold">● Şu an Açık</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
