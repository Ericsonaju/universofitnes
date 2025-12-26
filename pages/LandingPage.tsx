
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
  MapPin,
  Clock,
  Flame,
  Map as MapIcon,
  Phone,
  Lock,
  Search,
  Dumbbell,
  CheckCircle2,
  ShieldAlert,
  ChevronDown,
  X,
  Check,
  Zap,
  Crown,
  Star
} from 'lucide-react';
import { GymSettings } from '../types';

const LandingPage: React.FC<{ settings: GymSettings }> = ({ settings }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [showPlansModal, setShowPlansModal] = useState(false);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsapp}?text=Olá! Gostaria de saber mais sobre os planos da Universo Fitness.`, '_blank');
  };

  const handleSearchStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      navigate(`/profile/${studentId.trim().toUpperCase()}`);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-orange-500 selection:text-black scroll-smooth font-sans overflow-x-hidden">
      {/* Dynamic Announcement */}
      {settings.announcement && (
        <div className="bg-orange-500 px-4 py-2.5 text-center text-black font-black text-[clamp(8px,1vw,10px)] uppercase tracking-[0.3em] italic z-[60] relative">
          <span className="animate-pulse">{settings.announcement}</span>
        </div>
      )}

      {/* Modern Fixed Header */}
      <header className="sticky top-0 bg-black/90 backdrop-blur-xl z-50 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-black italic text-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">UF</div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase italic text-white leading-none">Universo</span>
              <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-orange-500">Fitness</span>
            </div>
          </div>

          <nav className="hidden lg:flex gap-6 xl:gap-10 font-black text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <button onClick={() => scrollTo('sobre')} className="hover:text-white transition-colors py-2 relative group">
              A Academia
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('equipe')} className="hover:text-white transition-colors py-2 relative group">
              Treinadores
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('consultar')} className="hover:text-white transition-colors py-2 relative group">
              Minha Matrícula
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('unidade')} className="hover:text-white transition-colors py-2 relative group">
              Localização
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </button>
          </nav>

          <Link to="/register" className="bg-orange-500 text-black px-4 xl:px-6 py-3 rounded-xl font-black text-[11px] uppercase italic tracking-widest hover:bg-white transition-all shadow-xl shadow-orange-500/10 active:scale-95">
            Matricule-se
          </Link>
        </div>
      </header>

      {/* Hero: Impacto Total - Fluid Typography */}
      <section id="sobre" className="relative pt-12 lg:pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-orange-500/10 to-transparent -z-10 blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <div className="space-y-8 xl:space-y-12 relative z-10 text-center lg:text-left animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl">
              <Flame size={16} className="text-orange-500 animate-pulse" /> #A_MELHOR_DE_ARACAJU
            </div>

            <h1 className="text-[clamp(3.5rem,8vw,9rem)] font-black tracking-tighter leading-[0.85] italic uppercase text-white">
              TRANSFORME <br />
              <span className="text-orange-500">SEU CORPO</span> <br />
              HOJE <span className="text-zinc-800 opacity-50">.</span>
            </h1>

            <p className="text-zinc-500 text-lg xl:text-xl max-w-xl font-medium leading-relaxed mx-auto lg:mx-0 italic">
              A Universo Fitness une infraestrutura de ponta com um ambiente acolhedor no coração do Inácio Barbosa. Equipamentos Classic e Mirage para sua melhor performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 xl:gap-5 justify-center lg:justify-start">
              <Link to="/register" className="group bg-white text-black px-8 xl:px-12 py-5 xl:py-7 rounded-2xl font-black uppercase italic tracking-widest text-sm hover:bg-orange-500 transition-all flex items-center justify-center gap-4 shadow-2xl">
                Começar Agora <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button onClick={() => setShowPlansModal(true)} className="bg-zinc-900 text-white px-8 xl:px-12 py-5 xl:py-7 rounded-2xl font-black uppercase italic tracking-widest text-sm hover:bg-zinc-800 border border-zinc-800 transition-all flex items-center justify-center gap-3">
                <Zap size={22} className="text-orange-500" /> Planos & Preços
              </button>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000 hidden sm:block">
            <div className="absolute -inset-10 bg-orange-500/20 rounded-full blur-[150px] opacity-30 animate-pulse"></div>
            <div className="relative aspect-square lg:aspect-[4/5] xl:aspect-square rounded-[3rem] xl:rounded-[4rem] overflow-hidden border border-zinc-800 shadow-3xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 max-w-2xl mx-auto lg:ml-auto">
              <img
                src={settings.coverUrl}
                alt="Ambiente Universo Fitness"
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 xl:bottom-10 left-6 xl:left-10 right-6 xl:right-10 bg-black/40 backdrop-blur-2xl p-6 xl:p-10 rounded-[2rem] xl:rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1 xl:mb-2">Unidade Aracaju</p>
                  <p className="text-xl xl:text-2xl font-black italic uppercase text-white">Status: Aberto</p>
                </div>
                <div className="w-12 h-12 xl:w-16 xl:h-16 bg-emerald-500/20 rounded-2xl xl:rounded-3xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-inner">
                  <CheckCircle2 size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section id="equipe" className="py-24 xl:py-32 px-6 bg-zinc-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 xl:space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter">Nosso <span className="text-orange-500">Elite Team</span></h2>
              <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Profissionais capacitados para guiar sua evolução</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
            {settings.trainers.map(trainer => (
              <div key={trainer.id} className="group relative">
                <div className="aspect-[3/4] rounded-[2.5rem] xl:rounded-[3rem] overflow-hidden border border-zinc-900 group-hover:border-orange-500 transition-all duration-500 shadow-2xl">
                  <img src={trainer.photoUrl} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90"></div>
                  <div className="absolute bottom-8 left-8 right-8 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 italic">{trainer.specialty}</p>
                    <p className="text-2xl font-black italic uppercase text-white leading-tight">{trainer.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Área do Aluno: Portal */}
      <section id="consultar" className="py-24 xl:py-32 px-6 bg-zinc-900/10 border-y border-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12 xl:space-y-16 relative z-10">
          <div className="space-y-4 xl:space-y-6">
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter">Consultar <span className="text-orange-500">Matrícula</span></h2>
            <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] max-w-xl mx-auto italic leading-relaxed">Acesse seu histórico de pagamentos e verifique o vencimento do seu plano com apenas o seu ID.</p>
          </div>

          <form onSubmit={handleSearchStudent} className="w-full max-w-2xl relative group px-4">
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors pointer-events-none">
              <Search size={32} />
            </div>
            <input
              type="text"
              placeholder="UF-XXXXX"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              className="w-full bg-black/60 border border-zinc-800 rounded-[2.5rem] xl:rounded-[3rem] py-8 xl:py-10 pl-24 pr-10 text-2xl xl:text-3xl font-black italic uppercase tracking-[0.2em] placeholder:text-zinc-900 focus:outline-none focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 transition-all text-orange-500"
            />
            <button
              type="submit"
              className="mt-6 lg:mt-0 lg:absolute lg:right-4 lg:top-4 lg:bottom-4 bg-orange-500 text-black px-12 py-5 lg:py-0 rounded-[2rem] font-black uppercase italic tracking-widest text-xs hover:bg-white transition-all shadow-2xl active:scale-95"
            >
              Consultar Agora
            </button>
          </form>
        </div>
      </section>

      {/* Galeria de Fotos Reais */}
      <section id="galeria" className="py-24 xl:py-32 px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 xl:space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter">Nossa <span className="text-orange-500">Estrutura</span></h2>
            <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Conheça o ambiente que vai transformar sua vida</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/2021-06-02.webp" alt="Área de Musculação" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/2021-06-02 (1).webp" alt="Equipamentos" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/2021-05-10.webp" alt="Espaço de Treino" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/unnamed.webp" alt="Academia Universo" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500 lg:col-span-2">
              <img src="./universo fitnes/IMG_20200916_075029_904.webp" alt="Vista Geral" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/2021-10-09.webp" alt="Equipamentos Classic" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 group cursor-pointer hover:border-orange-500 transition-all duration-500">
              <img src="./universo fitnes/2022-11-11.webp" alt="Área de Treino" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Localização & Info */}
      <section id="unidade" className="py-24 xl:py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter text-white leading-none">Venha <br /> <span className="text-orange-500">Treinar</span></h2>
              <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] italic">Inácio Barbosa, Aracaju/SE</p>
            </div>

            <div className="grid sm:grid-cols-1 gap-6 xl:gap-8">
              <div className="bg-zinc-900/30 p-8 xl:p-10 rounded-[2.5rem] xl:rounded-[3rem] border border-zinc-800 flex items-start gap-6 xl:gap-8 group hover:bg-zinc-900/50 transition-colors">
                <div className="w-14 h-14 xl:w-16 xl:h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-black shrink-0 shadow-lg group-hover:scale-110 transition-transform"><Clock size={32} /></div>
                <div>
                  <h4 className="text-lg font-black uppercase italic text-white tracking-widest mb-2">Funcionamento</h4>
                  <p className="text-zinc-500 font-bold leading-relaxed italic">{settings.openingHours}</p>
                </div>
              </div>

              <div className="bg-zinc-900/30 p-8 xl:p-10 rounded-[2.5rem] xl:rounded-[3rem] border border-zinc-800 flex items-start gap-6 xl:gap-8 group hover:bg-zinc-900/50 transition-colors">
                <div className="w-14 h-14 xl:w-16 xl:h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform"><MapPin size={32} /></div>
                <div>
                  <h4 className="text-lg font-black uppercase italic text-white tracking-widest mb-2">Localização Estratégica</h4>
                  <p className="text-zinc-500 font-bold leading-relaxed italic">Rua de Acesso, s/n - Em frente à Praça do Inácio Barbosa, Aracaju - SE</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-orange-500 text-[11px] font-black uppercase tracking-widest mt-6 hover:translate-x-2 transition-transform italic">
                    <MapIcon size={18} /> Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[4/5] rounded-[3rem] xl:rounded-[4rem] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-3xl relative group hidden lg:block">
            <img
              src="./universo fitnes/IMG_20200906_003557_949.webp"
              alt="Fachada Universo Fitness"
              className="w-full h-full object-cover opacity-80 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-orange-500 text-black px-10 py-10 xl:px-12 xl:py-12 rounded-full font-black italic uppercase text-2xl xl:text-3xl shadow-3xl tracking-tighter flex flex-col items-center animate-pulse">
                <span className="text-xs tracking-widest opacity-60">Visite-nos</span>
                UNIDADE INÁCIO
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Footer Profissional */}
      < footer className="bg-zinc-950 py-24 xl:py-32 px-6 border-t border-zinc-900/50 relative" >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 xl:gap-24">
          <div className="space-y-8 xl:space-y-10 max-w-md">
            <div className="flex items-center gap-5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-black italic text-2xl">UF</div>
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">Universo <span className="text-orange-500">Fitness</span></h3>
            </div>
            <p className="text-zinc-600 font-medium italic leading-relaxed text-sm">O maior centro de musculação do Inácio Barbosa. Focado em resultados reais, equipamentos de elite e acompanhamento profissional qualificado.</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" title="Siga no Instagram" rel="noopener noreferrer" className="w-12 h-12 xl:w-14 xl:h-14 bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all shadow-2xl border border-zinc-800"><Instagram size={24} /></a>
              <a href="#" aria-label="Facebook" title="Siga no Facebook" rel="noopener noreferrer" className="w-12 h-12 xl:w-14 xl:h-14 bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all shadow-2xl border border-zinc-800"><Facebook size={24} /></a>
              <button onClick={openWhatsApp} aria-label="WhatsApp" title="Entre em contato via WhatsApp" className="w-12 h-12 xl:w-14 xl:h-14 bg-emerald-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl border border-emerald-500/20"><MessageCircle size={24} /></button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-12 xl:gap-16">
            <div className="space-y-6 xl:space-y-8">
              <h4 className="font-black uppercase italic text-orange-500 tracking-widest text-xs">Navegação</h4>
              <ul className="space-y-4 font-bold text-xs text-zinc-500 uppercase tracking-[0.2em] italic">
                <li><button onClick={() => scrollTo('sobre')} className="hover:text-white transition-colors">A Academia</button></li>
                <li><button onClick={() => scrollTo('equipe')} className="hover:text-white transition-colors">Elite Team</button></li>
                <li><button onClick={() => scrollTo('unidade')} className="hover:text-white transition-colors">Localização</button></li>
                <li><Link to="/register" className="text-orange-500 hover:underline">Matrícula Online</Link></li>
              </ul>
            </div>

            <div className="bg-orange-500 p-8 xl:p-10 rounded-[2.5rem] xl:rounded-[3rem] text-black shadow-3xl shadow-orange-500/10 max-w-xs relative overflow-hidden group">
              <h4 className="text-2xl font-black uppercase italic leading-tight">Dúvidas?</h4>
              <p className="mt-2 font-bold text-[10px] uppercase tracking-widest opacity-80 italic">Atendimento Direto</p>
              <div className="mt-6 xl:mt-8 flex flex-col gap-4 relative z-10">
                <a href={`tel:${settings.whatsapp}`} className="flex items-center gap-3 font-black text-sm italic hover:underline truncate max-w-full"><Phone size={20} /> (79) 3043-7610</a>
                <button onClick={openWhatsApp} className="bg-black text-white px-8 py-5 rounded-2xl font-black uppercase italic tracking-widest text-[10px] hover:bg-zinc-900 transition-all shadow-xl">
                  Suporte WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-zinc-700 font-black text-[9px] uppercase tracking-[0.5em] italic">© 2024 {settings.name} • PROFESSIONAL GYM MANAGEMENT</p>
          <Link to="/login" className="flex items-center gap-4 px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-700 hover:text-orange-500 hover:border-orange-500 transition-all text-[10px] font-black uppercase tracking-widest italic shadow-inner">
            <Lock size={14} /> Sistema Viviane
          </Link>
        </div>
      </footer>

      {/* Global FAB */}
      <button
        onClick={openWhatsApp}
        aria-label="Contato WhatsApp"
        title="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 lg:w-20 lg:h-20 bg-emerald-600 text-white rounded-2xl lg:rounded-[2rem] flex items-center justify-center shadow-3xl shadow-emerald-950/50 hover:scale-110 transition-all z-[100] border-2 lg:border-4 border-black group"
      >
        <MessageCircle size={32} className="lg:hidden" />
        <MessageCircle size={40} className="hidden lg:block group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal de Planos e Preços */}
      {showPlansModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setShowPlansModal(false)}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-3xl relative" onClick={e => e.stopPropagation()}>
            {/* Header do Modal */}
            <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl p-8 pb-6 border-b border-zinc-800 flex items-center justify-between z-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase italic tracking-tighter text-white">Nossos <span className="text-orange-500">Planos</span></h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2 italic">Escolha o melhor para você</p>
              </div>
              <button onClick={() => setShowPlansModal(false)} aria-label="Fechar" className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Cards de Planos */}
            <div className="p-6 lg:p-10">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Plano Mensal */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 hover:border-zinc-700 transition-all group">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Star size={28} className="text-zinc-400" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-white">Mensal</h3>
                  <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mt-1 italic">Flexibilidade Total</p>
                  <div className="mt-6">
                    <span className="text-5xl font-black text-white">R$99</span>
                    <span className="text-zinc-500 text-sm font-bold">/mês</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Acesso ilimitado
                    </li>
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Todos os equipamentos
                    </li>
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Horário livre
                    </li>
                  </ul>
                  <button onClick={() => { setShowPlansModal(false); openWhatsApp(); }} className="w-full mt-8 bg-zinc-800 text-white py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-zinc-700 transition-all">
                    Quero Este
                  </button>
                </div>

                {/* Plano Trimestral - Destaque */}
                <div className="bg-gradient-to-b from-orange-500/10 to-transparent border-2 border-orange-500 rounded-[2rem] p-8 relative overflow-hidden group scale-105 shadow-2xl shadow-orange-500/10">
                  <div className="absolute top-4 right-4 bg-orange-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                    Mais Popular
                  </div>
                  <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap size={28} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-white">Trimestral</h3>
                  <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Melhor Custo-Benefício</p>
                  <div className="mt-6">
                    <span className="text-5xl font-black text-white">R$79</span>
                    <span className="text-zinc-500 text-sm font-bold">/mês</span>
                  </div>
                  <p className="text-orange-500 text-xs font-bold mt-2">Total: R$237 (3 meses)</p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-3 text-zinc-300 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Tudo do Mensal
                    </li>
                    <li className="flex items-center gap-3 text-zinc-300 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Avaliação física grátis
                    </li>
                    <li className="flex items-center gap-3 text-zinc-300 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Economia de 20%
                    </li>
                  </ul>
                  <button onClick={() => { setShowPlansModal(false); openWhatsApp(); }} className="w-full mt-8 bg-orange-500 text-black py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-white transition-all shadow-lg">
                    Quero Este
                  </button>
                </div>

                {/* Plano Semestral */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 hover:border-zinc-700 transition-all group">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Crown size={28} className="text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-white">Semestral</h3>
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Máxima Economia</p>
                  <div className="mt-6">
                    <span className="text-5xl font-black text-white">R$69</span>
                    <span className="text-zinc-500 text-sm font-bold">/mês</span>
                  </div>
                  <p className="text-amber-500 text-xs font-bold mt-2">Total: R$414 (6 meses)</p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Tudo do Trimestral
                    </li>
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Camiseta exclusiva
                    </li>
                    <li className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={18} className="text-orange-500" /> Economia de 30%
                    </li>
                  </ul>
                  <button onClick={() => { setShowPlansModal(false); openWhatsApp(); }} className="w-full mt-8 bg-zinc-800 text-white py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-zinc-700 transition-all">
                    Quero Este
                  </button>
                </div>
              </div>

              {/* Info Adicional */}
              <div className="mt-10 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-white font-black uppercase italic text-sm">Ficou com dúvidas?</p>
                  <p className="text-zinc-500 text-xs mt-1">Fale diretamente com a Viviane pelo WhatsApp</p>
                </div>
                <button onClick={() => { setShowPlansModal(false); openWhatsApp(); }} className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-emerald-500 transition-all">
                  <MessageCircle size={20} /> Falar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
