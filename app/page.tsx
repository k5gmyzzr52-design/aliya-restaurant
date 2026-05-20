"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, ChevronRight, Star, Menu as MenuIcon, X, ArrowUpRight, Play, Sparkles, Award, Flame, Wine, ChefHat, Globe, Share2, Utensils } from 'lucide-react';

export default function AliyaRestaurant() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  // Inject premium fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(e){} };
  }, []);

  const categories = [
    { id: 'all', label: 'Wszystko', icon: Sparkles },
    { id: 'starters', label: 'Przystawki', icon: Flame },
    { id: 'mains', label: 'Dania główne', icon: ChefHat },
    { id: 'desserts', label: 'Desery', icon: Award },
    { id: 'drinks', label: 'Napoje', icon: Wine },
  ];

  const menuItems = [
    { id: 1, cat: 'starters', name: 'Tatar z polędwicy', desc: 'Wołowa polędwica, żółtko przepiórcze, kapary, trufla', price: '54', img: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80', tag: 'Signature' },
    { id: 2, cat: 'starters', name: 'Carpaccio z buraka', desc: 'Pieczony burak, kozi ser, pestki dyni, redukcja balsamico', price: '38', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', tag: 'Vege' },
    { id: 3, cat: 'mains', name: 'Polędwica wołowa', desc: 'Sous-vide, purée z selera, glazurowane warzywa, demi-glace', price: '128', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', tag: 'Premium' },
    { id: 4, cat: 'mains', name: 'Risotto z truflą', desc: 'Carnaroli, czarna trufla, parmezan 24m, oliwa truflowa', price: '78', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80', tag: 'Hit' },
    { id: 5, cat: 'mains', name: 'Halibut z grilla', desc: 'Halibut atlantycki, fenkuł, beurre blanc, kawior', price: '98', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80', tag: 'Chef' },
    { id: 6, cat: 'desserts', name: 'Czekoladowy fondant', desc: 'Płynne wnętrze, lody waniliowe, sos malinowy', price: '36', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80', tag: 'Sweet' },
    { id: 7, cat: 'desserts', name: 'Crème Brûlée', desc: 'Klasyczna francuska, wanilia z Madagaskaru, owoce sezonowe', price: '32', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80', tag: 'Classic' },
    { id: 8, cat: 'drinks', name: 'Aliya Signature', desc: 'Gin, likier z bzu, prosecco, świeża mięta, lód', price: '42', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', tag: 'Cocktail' },
    { id: 9, cat: 'drinks', name: 'Old Fashioned Gold', desc: 'Bourbon premium, brązowy cukier, bittery, skórka pomarańczy', price: '48', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', tag: 'Whiskey' },
  ];

  const filteredMenu = activeCategory === 'all' ? menuItems : menuItems.filter(i => i.cat === activeCategory);

  const reviews = [
    { name: 'Anna K.', text: 'Najlepsze miejsce w Turku. Atmosfera jak z najlepszych restauracji w Warszawie. Każdy detal dopracowany do perfekcji.', rating: 5, role: 'Krytyk kulinarny' },
    { name: 'Michał W.', text: 'Tatar z truflą to czyste dzieło sztuki. Obsługa profesjonalna, wnętrze zachwyca, smaki niezapomniane.', rating: 5, role: 'Stały gość' },
    { name: 'Karolina P.', text: 'Romantyczna kolacja w Aliya to gwarancja niezapomnianego wieczoru. Cinematic experience na talerzu.', rating: 5, role: 'Food blogger' },
    { name: 'Tomasz B.', text: 'Premium poziom. Wino, jedzenie, muzyka, światło - wszystko gra w idealnej harmonii. Polecam każdemu.', rating: 5, role: 'Sommelier' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
    'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .font-serif-lux { font-family: 'Cormorant Garamond', serif; }
        .gradient-gold { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .gradient-flame { background: linear-gradient(135deg, #fb923c 0%, #ef4444 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .glow-gold { box-shadow: 0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.15); }
        .glow-flame { box-shadow: 0 0 40px rgba(251,146,60,0.4), 0 0 80px rgba(239,68,68,0.2); }
        .text-glow { text-shadow: 0 0 20px rgba(251,191,36,0.5); }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-gold { background: rgba(251,191,36,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(251,191,36,0.2); }
        @keyframes shimmer { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        @keyframes float-particle { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-30px) translateX(10px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
        @keyframes grain { 0%,100% {transform:translate(0,0)} 10%{transform:translate(-5%,-10%)} 30%{transform:translate(3%,-15%)} 50%{transform:translate(12%,9%)} 70%{transform:translate(9%,4%)} 90%{transform:translate(-1%,7%)} }
        .grain::after { content:''; position:absolute; inset:-100%; background-image: radial-gradient(circle at center, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 4px 4px; animation: grain 8s steps(10) infinite; pointer-events:none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .marquee { animation: marquee 30s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      {/* NAV */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-black text-lg">A</div>
              <div className="absolute inset-0 rounded-full border border-amber-400 animate-ping opacity-30"></div>
            </div>
            <div>
              <div className="font-serif-lux text-2xl tracking-wider gradient-gold font-semibold">ALIYA</div>
              <div className="text-xs text-zinc-500 -mt-1 tracking-widest">PREMIUM LOUNGE</div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wider">
            {['Menu', 'O nas', 'Specjalności', 'Galeria', 'Kontakt'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative group text-zinc-300 hover:text-amber-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-500"></span>
              </motion.a>
            ))}
          </div>

          <motion.a 
            href="tel:799096723"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold text-sm tracking-wide glow-gold"
          >
            <Phone className="w-4 h-4" /> 799 096 723
          </motion.a>

          <button className="md:hidden text-amber-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {['Menu', 'O nas', 'Specjalności', 'Galeria', 'Kontakt'].map(item => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)} className="text-zinc-300 hover:text-amber-400 tracking-wider">
                    {item.toUpperCase()}
                  </a>
                ))}
                <a href="tel:799096723" className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold text-center">
                  799 096 723
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden grain">
        {/* Animated background */}
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900"></div>
          <div 
            className="absolute inset-0 opacity-60"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4) contrast(1.2) saturate(1.1)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {mounted && [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-400"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [null, -100, -200],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{ filter: 'blur(0.5px)', boxShadow: '0 0 6px #fbbf24' }}
            />
          ))}
        </div>

        {/* 3D floating element */}
        <motion.div 
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="absolute top-1/4 right-10 hidden lg:block"
        >
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="relative w-64 h-64"
          >
            <div className="absolute inset-0 rounded-full border border-amber-400/30"></div>
            <div className="absolute inset-4 rounded-full border border-orange-500/20"></div>
            <div className="absolute inset-8 rounded-full border border-amber-400/10"></div>
            <div className="absolute inset-1/2 w-2 h-2 rounded-full bg-amber-400 -translate-x-1/2 -translate-y-1/2 glow-gold"></div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-amber-400"></div>
            <span className="text-amber-400 text-xs tracking-[0.3em] font-light">EST. TUREK · MICKIEWICZA 3</span>
          </motion.div>

          <h1 className="font-serif-lux text-7xl md:text-9xl font-light leading-none tracking-tight">
            <motion.span 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-glow"
            >
              Smak.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block gradient-gold italic"
            >
              Sztuka.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Aliya.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-8 max-w-xl text-zinc-400 text-lg font-light leading-relaxed"
          >
            Wyjątkowe doświadczenie kulinarne w sercu Turku. 
            Cinematic atmosphere, premium składniki i smaki, które zostają w pamięci.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.a 
              href="#menu"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(251,191,36,0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-black font-semibold tracking-wide flex items-center gap-2"
              style={{ backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10">ZAMÓW TERAZ</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
            
            <motion.a 
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 rounded-full glass text-white font-semibold tracking-wide flex items-center gap-3 border border-white/20 hover:border-amber-400/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/40 transition-colors">
                <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
              </div>
              ZOBACZ MENU
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.3em] text-zinc-500">SCROLL</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative py-6 border-y border-white/5 bg-zinc-950 overflow-hidden">
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-serif-lux text-3xl text-zinc-700">
              <span>PREMIUM CUISINE</span>
              <Sparkles className="text-amber-400 w-5 h-5" />
              <span className="italic gradient-gold">Aliya Lounge</span>
              <Sparkles className="text-amber-400 w-5 h-5" />
              <span>FINE DINING</span>
              <Sparkles className="text-amber-400 w-5 h-5" />
              <span className="italic">Turek Mickiewicza 3</span>
              <Sparkles className="text-amber-400 w-5 h-5" />
              <span>SINCE 2018</span>
              <Sparkles className="text-amber-400 w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* O NAS */}
      <section id="o-nas" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">NASZA HISTORIA</span>
            </div>
            
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light leading-none mb-8">
              Pasja, która <br />
              <span className="italic gradient-gold">stała się</span> <br />
              filozofią.
            </h2>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-6 font-light">
              Aliya to nie tylko restauracja. To miejsce, gdzie kulinarna sztuka spotyka się 
              z ekskluzywną atmosferą. Każdy detal — od światła, przez muzykę, po układ talerza 
              — został zaprojektowany, by tworzyć niezapomniane chwile.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
              Nasz szef kuchni z pasją łączy tradycyjne polskie smaki z nowoczesną technologią 
              kulinarną. Wybieramy tylko najwyższej jakości składniki od lokalnych dostawców.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '7+', label: 'Lat doświadczenia' },
                { num: '50+', label: 'Wykwintnych dań' },
                { num: '10K+', label: 'Zadowolonych gości' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="border-l border-amber-400/30 pl-4"
                >
                  <div className="font-serif-lux text-4xl gradient-gold font-semibold">{stat.num}</div>
                  <div className="text-xs text-zinc-500 tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -10 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-gold"
              >
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" className="w-full h-full object-cover" alt="Wnętrze" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs text-amber-400 tracking-widest">WNĘTRZE</div>
                  <div className="font-serif-lux text-xl">Lounge</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-gold mt-12"
              >
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" className="w-full h-full object-cover" alt="Bar" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs text-amber-400 tracking-widest">BAR</div>
                  <div className="font-serif-lux text-xl">Atmosphere</div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-amber-400/30 flex items-center justify-center"
            >
              <div className="absolute inset-2 rounded-full border border-amber-400/20"></div>
              <Award className="w-10 h-10 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">MENU SIGNATURE</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light">
              Sztuka <span className="italic gradient-gold">smaku</span>
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              Każde danie to historia. Każdy kęs — momentem do zapamiętania.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm tracking-wider flex items-center gap-2 transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold glow-gold' 
                      : 'glass text-zinc-300 hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {/* Menu Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img 
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-gold text-xs text-amber-400 tracking-wider">
                      {item.tag}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-serif-lux text-2xl font-medium group-hover:gradient-gold transition-all">{item.name}</h3>
                      <div className="text-right shrink-0">
                        <div className="font-serif-lux text-2xl gradient-gold font-semibold">{item.price}</div>
                        <div className="text-xs text-zinc-500">PLN</div>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                      </div>
                      <span className="text-zinc-500 group-hover:text-amber-400 transition-colors">Zamów →</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-amber-400/0 group-hover:ring-amber-400/30 transition-all pointer-events-none"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SPECJALNOŚCI */}
      <section id="specjalności" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">CHEF'S CHOICE</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light">
              Nasze <span className="italic gradient-flame">specjalności</span>
            </h2>
          </motion.div>

          <div className="space-y-32">
            {[
              { 
                name: 'Polędwica wołowa Wagyu', 
                desc: 'Najwyższej jakości polędwica Wagyu A5, marmurkowa tekstura, sous-vide 2h, finishowana na żeliwnej patelni. Podawana z purée z czarnego czosnku, glazurowanymi warzywami i demi-glace z czerwonego wina.',
                img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80',
                tag: 'SIGNATURE 01'
              },
              { 
                name: 'Risotto z białą truflą', 
                desc: 'Carnaroli risotto, hodowane przez 18 miesięcy, hojnie posypane białą truflą z Alby. Parmigiano Reggiano 36 miesięcy. Esencja luksusu na talerzu.',
                img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=80',
                tag: 'SIGNATURE 02'
              },
              { 
                name: 'Halibut z kawiorem', 
                desc: 'Świeży halibut atlantycki, grillowany na brzozowym węglu, podawany z kremem z fenkułu, beurre blanc i czarnym kawiorem osetra.',
                img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=80',
                tag: 'SIGNATURE 03'
              },
            ].map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
              >
                <div className="md:[direction:ltr]">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square rounded-3xl overflow-hidden group"
                  >
                    <img src={spec.img} alt={spec.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-500/20"></div>
                    
                    {/* Floating elements */}
                    <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-6 right-6 px-4 py-2 rounded-full glass text-xs tracking-widest text-amber-400"
                    >
                      {spec.tag}
                    </motion.div>

                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full border border-amber-400/20"
                    >
                      <div className="absolute top-2 left-1/2 w-2 h-2 rounded-full bg-amber-400 glow-gold"></div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="md:[direction:ltr]">
                  <div className="text-7xl font-serif-lux gradient-gold font-light opacity-30">0{i+1}</div>
                  <h3 className="font-serif-lux text-4xl md:text-5xl mt-2 mb-6 leading-tight">{spec.name}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">{spec.desc}</p>
                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-amber-400 tracking-wider"
                  >
                    DOWIEDZ SIĘ WIĘCEJ <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">CO MÓWIĄ GOŚCIE</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light">
              Głosy <span className="italic gradient-gold">koneserów</span>
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-10 md:p-16 text-center relative"
              >
                <div className="absolute top-6 left-6 font-serif-lux text-8xl gradient-gold opacity-30 leading-none">"</div>
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-serif-lux text-2xl md:text-4xl font-light italic leading-relaxed mb-8 max-w-3xl mx-auto">
                  {reviews[activeReview].text}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-black text-xl">
                    {reviews[activeReview].name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{reviews[activeReview].name}</div>
                    <div className="text-xs text-amber-400 tracking-wider">{reviews[activeReview].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              {reviews.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveReview(i)}
                  className={`h-1 rounded-full transition-all ${i === activeReview ? 'w-12 bg-amber-400' : 'w-6 bg-zinc-700'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">GALERIA</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light">
              Wizualna <span className="italic gradient-gold">poezja</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => setLightbox(img)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  i === 0 ? 'col-span-2 row-span-2 aspect-square' : 
                  i === 3 ? 'aspect-[3/4]' :
                  i === 5 ? 'aspect-[3/4]' :
                  'aspect-square'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-amber-400" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {lightbox && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.img 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={lightbox}
                className="max-w-full max-h-full rounded-2xl"
                alt=""
              />
              <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-amber-400">
                <X />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="relative py-32 px-6 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-96 rounded-full bg-amber-500/5 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="text-amber-400 text-xs tracking-[0.3em]">REZERWACJA & KONTAKT</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            <h2 className="font-serif-lux text-5xl md:text-7xl font-light">
              Zaproś <span className="italic gradient-gold">siebie</span>
            </h2>
            <p className="text-zinc-400 mt-4">Odwiedź nas lub zarezerwuj stolik telefonicznie</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <h3 className="font-serif-lux text-3xl mb-6">Zarezerwuj stolik</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 tracking-wider mb-2 block">IMIĘ</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors" placeholder="Twoje imię" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 tracking-wider mb-2 block">TELEFON</label>
                    <input type="tel" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors" placeholder="+48..." />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 tracking-wider mb-2 block">EMAIL</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors" placeholder="email@przykład.pl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 tracking-wider mb-2 block">DATA</label>
                    <input type="date" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors text-zinc-300" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 tracking-wider mb-2 block">OSOBY</label>
                    <input type="number" min="1" defaultValue="2" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 tracking-wider mb-2 block">WIADOMOŚĆ</label>
                  <textarea rows="3" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-amber-400 transition-colors resize-none" placeholder="Specjalne życzenia..."></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 60px rgba(251,191,36,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold tracking-wide flex items-center justify-center gap-2"
                >
                  ZAREZERWUJ TERAZ <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass rounded-3xl p-8">
                <h3 className="font-serif-lux text-3xl mb-6">Znajdź nas</h3>
                
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Adres', value: 'Mickiewicza 3, 62-700 Turek' },
                    { icon: Phone, label: 'Telefon', value: '799 096 723', href: 'tel:799096723' },
                    { icon: Mail, label: 'Email', value: 'kontakt@aliya-turek.pl' },
                    { icon: Clock, label: 'Godziny otwarcia', value: 'Pon-Czw: 12:00 - 22:00\nPt-Sob: 12:00 - 24:00\nNiedziela: 13:00 - 22:00' },
                  ].map((info, i) => {
                    const Icon = info.icon;
                    const Tag = info.href ? 'a' : 'div';
                    return (
                      <Tag key={i} href={info.href} className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-xs text-amber-400 tracking-wider mb-1">{info.label.toUpperCase()}</div>
                          <div className="text-zinc-200 whitespace-pre-line">{info.value}</div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass rounded-3xl p-2 overflow-hidden">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=18.5%2C52.0%2C18.55%2C52.03&layer=mapnik&marker=52.0167%2C18.5"
                    className="w-full h-full opacity-80 grayscale"
                    style={{ filter: 'invert(0.92) hue-rotate(180deg)' }}
                    title="Mapa"
                  ></iframe>
                  <div className="absolute top-4 left-4 glass-gold rounded-full px-4 py-2 flex items-center gap-2 pointer-events-none">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">Mickiewicza 3, Turek</span>
                  </div>
                </div>
              </div>

              <motion.a 
                href="tel:799096723"
                whileHover={{ scale: 1.02 }}
                className="block glass-gold rounded-3xl p-6 text-center group"
              >
                <div className="text-xs text-amber-400 tracking-widest mb-2">ZADZWOŃ TERAZ</div>
                <div className="font-serif-lux text-4xl gradient-gold font-semibold group-hover:scale-110 transition-transform inline-block">
                  799 096 723
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-black">A</div>
                <div>
                  <div className="font-serif-lux text-2xl gradient-gold font-semibold">ALIYA</div>
                  <div className="text-xs text-zinc-500 tracking-widest">PREMIUM LOUNGE</div>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Premium gastronomy experience w sercu Turku. Smak, sztuka, atmosfera.
              </p>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs tracking-widest mb-4">NAWIGACJA</h4>
              <ul className="space-y-2 text-sm">
                {['Menu', 'O nas', 'Specjalności', 'Galeria', 'Kontakt'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-zinc-400 hover:text-amber-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs tracking-widest mb-4">KONTAKT</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Mickiewicza 3</li>
                <li>62-700 Turek</li>
                <li><a href="tel:799096723" className="hover:text-amber-400">799 096 723</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs tracking-widest mb-4">OBSERWUJ NAS</h4>
              <div className="flex gap-3">
                {[Globe, Share2].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-11 h-11 rounded-full glass flex items-center justify-center text-amber-400 hover:glass-gold transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-zinc-600 mt-6">
                Bądź na bieżąco z naszymi nowościami, eventami i promocjami.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-600 text-xs tracking-wider">
              © 2026 ALIYA PREMIUM LOUNGE. WSZYSTKIE PRAWA ZASTRZEŻONE.
            </div>
            <div className="flex gap-6 text-xs text-zinc-600">
              <a href="#" className="hover:text-amber-400 transition-colors">POLITYKA PRYWATNOŚCI</a>
              <a href="#" className="hover:text-amber-400 transition-colors">REGULAMIN</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
