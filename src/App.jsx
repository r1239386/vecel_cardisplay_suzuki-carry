import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Globe, MessageCircle, ArrowUpCircle, ChevronRight, Truck, Shield, Wrench, Star } from 'lucide-react';

/* ═══════════════════════════════════════════════
   賓士貓 SVGs
   ═══════════════════════════════════════════════ */

// 賓士貓 1：探頭貓 (放在圖片上方)
const PeekingTuxedoCat = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 耳朵 */}
    <path d="M14 36L6 12L24 22C29 20 35 20 40 22L58 12L50 36" fill="#1A1A1A" />
    {/* 頭部與身體 */}
    <path d="M14 64V36C14 24 22 16 32 16C42 16 50 24 50 36V64H14Z" fill="#1A1A1A" />
    {/* 賓士白面罩 (倒V) */}
    <path d="M32 26L20 48V64H44V48L32 26Z" fill="#F8FAFC" />
    {/* 眼睛 */}
    <circle cx="24" cy="34" r="3.5" fill="#FBBF24" />
    <circle cx="24" cy="34" r="1.5" fill="#1A1A1A" />
    <circle cx="40" cy="34" r="3.5" fill="#FBBF24" />
    <circle cx="40" cy="34" r="1.5" fill="#1A1A1A" />
    {/* 鼻子 */}
    <path d="M32 40L29.5 37H34.5L32 40Z" fill="#FDA4AF" />
    {/* 貓掌 (扒在邊緣) */}
    <rect x="18" y="58" width="8" height="6" rx="3" fill="#F8FAFC" />
    <rect x="38" y="58" width="8" height="6" rx="3" fill="#F8FAFC" />
  </svg>
);

// 賓士貓 2：趴睡貓 (放在頁尾)
const SleepingTuxedoCat = ({ className }) => (
  <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 尾巴 */}
    <path d="M70 34C76 34 78 24 74 20C70 16 66 26 66 26" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    {/* 身體 */}
    <rect x="20" y="14" width="46" height="22" rx="11" fill="#1A1A1A" />
    {/* 頭部 */}
    <circle cx="22" cy="22" r="14" fill="#1A1A1A" />
    {/* 耳朵 */}
    <path d="M14 12L8 4L18 10" fill="#1A1A1A" />
    <path d="M30 12L36 4L26 10" fill="#1A1A1A" />
    {/* 賓士白面罩 */}
    <path d="M22 18L12 30C16 34 28 34 32 30L22 18Z" fill="#F8FAFC" />
    {/* 睡著的眼睛 */}
    <path d="M16 23C17 25 19 25 20 23" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 23C25 25 27 25 28 23" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
    {/* 白襪子 */}
    <rect x="36" y="30" width="6" height="6" rx="3" fill="#F8FAFC" />
    <rect x="56" y="30" width="6" height="6" rx="3" fill="#F8FAFC" />
    {/* Zzz 睡覺符號 */}
    <text x="38" y="10" fill="rgba(255,255,255,0.3)" fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">Z</text>
    <text x="44" y="6" fill="rgba(255,255,255,0.2)" fontSize="5" fontWeight="bold" fontFamily="Inter, sans-serif">z</text>
    <text x="48" y="3" fill="rgba(255,255,255,0.15)" fontSize="4" fontWeight="bold" fontFamily="Inter, sans-serif">z</text>
  </svg>
);

/* ═══════════════════════════════════════════════
   Scroll Reveal Hook
   ═══════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════
   Particle Background Component
   ═══════════════════════════════════════════════ */
const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'rgba(255, 255, 255, 0.15)',
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   Feature Badge Component
   ═══════════════════════════════════════════════ */
const FeatureBadge = ({ icon: Icon, text, variant = 'brand' }) => (
  <span className={`badge ${variant === 'brand' ? 'badge-brand' : 'badge-accent'}`}>
    <Icon size={13} strokeWidth={2.5} />
    {text}
  </span>
);

/* ═══════════════════════════════════════════════
   Feature Card Component
   ═══════════════════════════════════════════════ */
const FeatureCard = ({ icon: Icon, title, description, iconBg, delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`feature-card reveal reveal-delay-${delay}`}>
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={22} strokeWidth={1.8} className="text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   Main App
   ═══════════════════════════════════════════════ */
export default function App() {
  const heroRef = useReveal();
  const ctaRef = useReveal();
  const infoRef = useReveal();
  const footerRef = useReveal();

  // Counter animation for year
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Animated Mesh Background */}
      <div className="bg-mesh" />
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      <div className="min-h-screen flex justify-center relative" style={{ zIndex: 1 }}>
        {/* 核心容器 */}
        <main className="w-full max-w-md relative flex flex-col">

          {/* ── Hero Section ── */}
          <section className="px-5 pt-8 pb-2">
            {/* Top brand strip */}
            <div
              className={`flex items-center justify-between mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3380ff, #1b5ff5)' }}>
                  <span className="text-white text-xs font-bold tracking-tight">佳馬</span>
                </div>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  佳馬汽車
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#06C755' }} />
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  營業中
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div
              ref={heroRef}
              className={`hero-image-wrapper reveal relative ${isLoaded ? 'visible' : ''}`}
            >
              {/* Peeking Cat */}
              <div className="absolute -top-1 left-5 w-14 h-14 drop-shadow-lg cat-peek"
                style={{ zIndex: 20 }}>
                <PeekingTuxedoCat className="w-full h-full" />
              </div>

              {/* Badges overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2" style={{ zIndex: 10 }}>
                <FeatureBadge icon={Truck} text="2015年式" variant="brand" />
                <FeatureBadge icon={Star} text="優質好車" variant="accent" />
              </div>

              {/* Image */}
              <img
                src="/suzuki-carry.jpg"
                alt="2015 Suzuki Carry 小貨車"
                className="w-full aspect-[4/3] object-cover relative"
                style={{ zIndex: 1 }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML +=
                    '<div class="w-full aspect-[4/3] flex items-center justify-center" style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.3)">圖片載入中...</div>';
                }}
              />

              {/* Bottom overlay text */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5" style={{ zIndex: 3 }}>
                <h1 className="text-2xl font-bold text-white mb-1 tracking-tight"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                  Suzuki Carry
                </h1>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  2015 小貨車 ・ 實用載貨首選
                </p>
              </div>
            </div>
          </section>

          {/* ── Tagline ── */}
          <section className="px-5 py-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gradient tracking-tight leading-snug">
                實用載貨・尾門升降更省力
              </p>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                配備尾門升降，裝卸貨物更輕鬆
              </p>
            </div>
            <div className="divider-glow mt-6" style={{ width: '60%' }} />
          </section>

          {/* ── Feature Cards ── */}
          <section className="px-5 pb-6 space-y-3">
            <FeatureCard
              icon={ArrowUpCircle}
              title="尾門升降機"
              description="搭載尾門升降設備，重物裝卸不費力，省時省力"
              iconBg="linear-gradient(135deg, #3380ff, #1b5ff5)"
              delay={1}
            />
            <FeatureCard
              icon={Truck}
              title="載貨實力派"
              description="寬敞車斗空間，小型貨物運輸的最佳夥伴"
              iconBg="linear-gradient(135deg, #f97316, #ea580c)"
              delay={2}
            />
            <FeatureCard
              icon={Shield}
              title="佳馬品質保證"
              description="完整車況檢查，透明交易，安心購車無煩惱"
              iconBg="linear-gradient(135deg, #10b981, #059669)"
              delay={3}
            />
          </section>

          {/* ── CTA Section ── */}
          <section ref={ctaRef} className="px-5 pb-6 reveal space-y-3">
            {/* "歡迎現場賞車" Highlight */}
            <div className="glass-card-bright shimmer text-center py-5 px-4 mb-2">
              <ParticleField />
              <p className="text-lg font-bold text-gradient-brand relative" style={{ zIndex: 2 }}>
                ✦ 歡迎現場賞車 ✦
              </p>
              <p className="text-xs mt-1.5 relative" style={{ color: 'rgba(255,255,255,0.35)', zIndex: 2 }}>
                台南歸仁 ・ 假日照常營業
              </p>
            </div>

            {/* LINE CTA */}
            <a
              href="https://lin.ee/XtPcoZP"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-line pulse-glow-green"
              id="cta-line"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base leading-tight">加官方 LINE 洽詢</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>ID：@jiamacar</p>
                </div>
              </div>
              <ChevronRight
                className="text-white opacity-70 transition-transform group-hover:translate-x-1"
                size={22}
              />
            </a>

            {/* Website CTA */}
            <a
              href="https://jiama.com.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-website"
              id="cta-website"
            >
              <div className="flex items-center gap-3.5">
                <div className="info-icon"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Globe size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    佳馬汽車官網
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    查看更多優質好車
                  </p>
                </div>
              </div>
              <ChevronRight
                size={20}
                style={{ color: 'rgba(255,255,255,0.3)' }}
                className="transition-transform"
              />
            </a>
          </section>

          {/* ── Store Info ── */}
          <section ref={infoRef} className="px-5 pb-6 reveal">
            <div className="glass-card p-5">
              <h2 className="text-sm font-semibold mb-4 tracking-wider uppercase"
                style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>
                店面資訊
              </h2>

              <div className="space-y-1">
                <div className="info-row">
                  <div className="info-icon" style={{ background: 'rgba(51, 128, 255, 0.12)' }}>
                    <MapPin size={18} style={{ color: '#5b9cff' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/80">賞車地點</p>
                    <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      台南市歸仁區中山路三段550號
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon" style={{ background: 'rgba(249, 115, 22, 0.12)' }}>
                    <Clock size={18} style={{ color: '#fb923c' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/80">營業時間</p>
                    <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      08:00 – 19:00
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      (假日照常營業)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer
            ref={footerRef}
            className="relative px-5 pt-6 pb-8 text-center reveal"
          >
            {/* Sleeping Cat */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-10 cat-sleep opacity-70">
                <SleepingTuxedoCat className="w-full h-full" />
              </div>
            </div>

            <div className="divider-glow mb-4" style={{ width: '40%' }} />

            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              &copy; {new Date().getFullYear()} 佳馬汽車 版權所有
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.12)' }}>
              台南市歸仁區 ・ 用心賣好車
            </p>
          </footer>

        </main>
      </div>
    </>
  );
}