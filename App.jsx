import React, { useEffect } from 'react';
import { MapPin, Clock, Globe, MessageCircle, ArrowUpCircle, ChevronRight } from 'lucide-react';

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
  </svg>
);

export default function App() {
  // SEO 及 Meta Tags 動態注入 (適合單頁應用或沒有直接存取 HTML head 的部署環境)
  useEffect(() => {
    const metaTags = [
      { name: 'description', content: '2015 Suzuki Carry 小貨車。實用載貨・尾門升降更省力。配備尾門升降，裝卸貨物更輕鬆。歡迎現場賞車，位於台南市歸仁區。' },
      { name: 'theme-color', content: '#f8fafc' },
      { property: 'og:title', content: '2015 Suzuki Carry 小貨車 | 佳馬汽車' },
      { property: 'og:description', content: '實用載貨・尾門升降更省力。配備尾門升降，裝卸貨物更輕鬆。歡迎現場賞車！' },
      { property: 'og:image', content: 'https://suzuki-carry.ai.jiama.com.tw/suzuki-carry.jpg' },
      { property: 'og:url', content: 'https://suzuki-carry.ai.jiama.com.tw/' },
      { property: 'og:type', content: 'website' }
    ];

    document.title = '2015 Suzuki Carry 小貨車 | 佳馬汽車';

    metaTags.forEach(({ name, property, content }) => {
      let tag = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center text-slate-800 font-sans">
      {/* 核心容器：限制最大寬度，強迫桌機也顯示完美的手機比例 */}
      <main className="w-full max-w-md bg-slate-50 shadow-xl relative overflow-hidden flex flex-col">
        
        {/* 頂部 Header */}
        <header className="px-6 py-8 text-center bg-white relative z-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            2015 Suzuki Carry 小貨車
          </h1>
          <p className="text-slate-600 font-medium">
            實用載貨・尾門升降更省力
          </p>
        </header>

        {/* 圖片區域 (與貓咪結合) */}
        <div className="relative w-full aspect-square bg-slate-200">
          {/* 探頭的賓士貓 */}
          <div className="absolute -top-1 left-6 z-20 w-14 h-14 drop-shadow-md">
            <PeekingTuxedoCat className="w-full h-full" />
          </div>
          
          <img 
            src="/suzuki-carry.jpg" 
            alt="2015 Suzuki Carry 小貨車" 
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              // 圖片失效時的優雅降級
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-200');
              e.target.parentElement.innerHTML += '<span class="text-slate-400">圖片載入中或未找到...</span>';
            }}
          />
        </div>

        {/* 重點配備區塊 */}
        <div className="px-6 py-8 bg-white mt-1 border-t border-slate-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 shrink-0">
              <ArrowUpCircle size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">重點配備</h3>
              <p className="text-slate-600 leading-relaxed">
                配備尾門升降，裝卸貨物更輕鬆
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg font-bold text-slate-700 tracking-wide">
              — 歡迎現場賞車 —
            </p>
          </div>
        </div>

        {/* 行動呼籲 (CTA) 區塊 */}
        <div className="px-6 py-8 bg-slate-50 flex-grow border-t border-slate-100">
          <div className="space-y-4">
            
            {/* LINE CTA Button */}
            <a 
              href="https://lin.ee/XtPcoZP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-4 bg-[#06C755] hover:bg-[#05b34c] transition-colors rounded-2xl shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl text-white">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg">加官方 LINE 洽詢</p>
                  <p className="text-green-50 text-sm">ID：@jiamacar</p>
                </div>
              </div>
              <ChevronRight className="text-white opacity-80 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* 官網 CTA Button */}
            <a 
              href="https://jiama.com.tw/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-4 bg-white hover:bg-slate-50 border border-slate-200 transition-colors rounded-2xl shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                  <Globe size={24} />
                </div>
                <div className="text-left">
                  <p className="text-slate-800 font-bold text-lg">佳馬汽車官網</p>
                  <p className="text-slate-500 text-sm">查看更多優質好車</p>
                </div>
              </div>
              <ChevronRight className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* 實體店面資訊 */}
          <div className="mt-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-slate-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-700">賞車地點</p>
                  <p className="text-sm text-slate-600 mt-0.5">台南市歸仁區中山路三段550號</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-slate-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-700">營業時間</p>
                  <p className="text-sm text-slate-600 mt-0.5">08:00 - 19:00</p>
                  <p className="text-xs text-slate-400 mt-0.5">(假日照常營業)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 頁尾與睡覺的賓士貓 */}
        <footer className="relative pt-6 pb-8 text-center bg-slate-50 border-t border-slate-200">
          <div className="absolute -top-[1.2rem] right-8 z-10 w-16 h-8 opacity-80">
            <SleepingTuxedoCat className="w-full h-full" />
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} 佳馬汽車 版權所有
          </p>
        </footer>

      </main>
    </div>
  );
}