
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  History, 
  ShieldCheck, 
  XCircle, 
  Phone, 
  Flame,
  Award,
  DollarSign,
  AlertCircle,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Student, GymSettings, Payment } from '../types';
import { getDaysRemaining, formatDate, formatWhatsAppLink, getStatusTheme } from '../utils';

interface StudentProfileProps {
  students: Student[];
  payments: Payment[];
  settings: GymSettings;
  updateStudent: (s: Student) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ students, payments, settings }) => {
  const { id } = useParams<{ id: string }>();
  // Normalização de ID para busca sem erros de caixa ou espaço
  const student = students.find(s => s.id.trim().toUpperCase() === id?.trim().toUpperCase());
  const studentPayments = payments.filter(p => p.studentId === student?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!student) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-700 animate-pulse">
           <XCircle size={40} />
        </div>
        <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Matrícula não localizada</h2>
        <p className="text-zinc-500 max-w-xs mx-auto">Verifique se digitou seu ID corretamente (Ex: UF-XXXXX).</p>
        <Link to="/" className="bg-orange-500 text-black px-10 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest shadow-xl">
          Voltar para Início
        </Link>
      </div>
    );
  }

  const isPending = student.registrationStatus === 'Pendente';
  const days = getDaysRemaining(student.dueDate);
  const theme = getStatusTheme(days, student.registrationStatus);

  const handleWhatsAppAction = (type: 'comprovante' | 'suporte') => {
    const msg = type === 'comprovante' 
      ? `Olá Viviane! 👋 Me chamo ${student.name} (ID: ${student.id}). Gostaria de enviar meu comprovante para ativar o acesso!`
      : `Olá Viviane, preciso de uma ajuda com minha matrícula ${student.id}.`;
    window.open(formatWhatsAppLink(settings.whatsapp, msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black font-sans">
      {/* Top Header - Sticky & Responsive */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-zinc-500 hover:text-orange-500 flex items-center gap-2 font-black uppercase italic text-[10px] tracking-widest transition-all">
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Página Inicial</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">ID Identificado</p>
                <p className="text-xs font-black italic text-white uppercase mt-1">#{student.id}</p>
             </div>
             <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-black italic text-lg shadow-lg">UF</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
           <div className="space-y-4 text-center md:text-left">
             <h1 className="text-5xl sm:text-7xl lg:text-[clamp(3rem,8vw,10rem)] font-black italic uppercase tracking-tighter leading-none">
               Minha <span className="text-orange-500">Área</span>
             </h1>
             <p className="text-zinc-500 font-bold italic uppercase tracking-widest text-xs sm:text-sm">Controle de Matrícula Universo Fitness</p>
           </div>
           
           <div className={`w-full md:w-auto px-8 py-6 rounded-[2.5rem] border flex items-center justify-center md:justify-start gap-6 shadow-2xl ${theme.bg} ${theme.border} ${theme.color}`}>
              { (isPending || days < 0) ? <Lock size={32} /> : <ShieldCheck size={32} />}
              <div className="text-left">
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60">Status de Acesso</p>
                 <p className="text-xl sm:text-2xl font-black italic uppercase mt-1 leading-none">{theme.label}</p>
              </div>
           </div>
        </div>

        {/* Floating Alert for Pending Students */}
        {isPending && (
          <div className="bg-orange-500 rounded-[2.5rem] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-500/10 border-b-8 border-black/20">
            <div className="flex items-center gap-6 text-center lg:text-left flex-col lg:flex-row">
              <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-orange-500 shrink-0"><AlertCircle size={40} /></div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black italic uppercase text-black leading-none">Aguardando Pagamento</h4>
                <p className="text-black/70 font-bold text-sm uppercase italic tracking-widest">Sua matrícula foi recebida, envie o comprovante para liberar!</p>
              </div>
            </div>
            <button 
              onClick={() => handleWhatsAppAction('comprovante')}
              className="w-full lg:w-auto bg-black text-white px-10 py-5 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              Ativar via WhatsApp <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Virtual Access Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="aspect-[3/4.2] max-w-sm mx-auto lg:max-w-none rounded-[3.5rem] bg-zinc-950 border-2 border-zinc-900 p-10 flex flex-col justify-between shadow-3xl relative overflow-hidden group">
              <Flame size={400} className="absolute -right-20 -bottom-20 opacity-[0.03] -rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl italic text-black">UF</div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-700">Membro Oficial</p>
                  <p className="text-[10px] font-black uppercase text-orange-500 mt-1 italic">Universo Elite</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3.5rem] border-4 border-zinc-900 overflow-hidden shadow-2xl ring-8 ring-zinc-900/10 transition-transform duration-500 group-hover:scale-105">
                  <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-black italic uppercase text-white tracking-tighter leading-none truncate max-w-[200px]">{student.name.split(' ')[0]}</h3>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2 italic">{student.name.split(' ').slice(1).join(' ')}</p>
                </div>
              </div>

              <div className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-center border relative z-10 italic ${theme.bg} ${theme.border} ${theme.color}`}>
                {theme.label}
              </div>
            </div>

            <button 
              onClick={() => handleWhatsAppAction('suporte')}
              className="w-full py-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-3xl font-black uppercase italic text-[10px] tracking-widest text-zinc-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <Phone size={18} /> Suporte à Matrícula
            </button>
          </div>

          {/* Info Panels */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-[3rem] space-y-4 shadow-xl">
                 <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500 w-fit"><Calendar size={32} /></div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Próximo Vencimento</p>
                   <p className="text-4xl md:text-5xl font-black italic text-white mt-1">
                     {isPending ? '--/--/--' : formatDate(student.dueDate)}
                   </p>
                 </div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-[3rem] space-y-4 shadow-xl">
                 <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 w-fit"><DollarSign size={32} /></div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Status Financeiro</p>
                   <p className={`text-4xl md:text-5xl font-black italic mt-1 ${theme.color}`}>
                     {isPending ? 'Pendente' : (days < 0 ? 'Em Atraso' : 'Em Dia')}
                   </p>
                 </div>
              </div>
            </div>

            {/* Transaction History Card */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-[3rem] p-8 md:p-12 space-y-10 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400"><History size={24} /></div>
                   <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white">Extrato de Mensalidades</h4>
                </div>
              </div>

              <div className="space-y-4">
                {studentPayments.map(pay => (
                  <div key={pay.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-7 bg-black border border-zinc-800/50 rounded-3xl gap-4 hover:border-emerald-500/20 transition-all group">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                         <ShieldCheck size={28} />
                       </div>
                       <div>
                         <p className="text-sm font-black italic uppercase text-white tracking-tight">Mês de Ref. {pay.reference}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="text-[8px] font-black uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded text-zinc-500">{pay.paymentType}</span>
                            <span className="text-[10px] font-medium text-zinc-600 italic">Pago em {new Date(pay.date).toLocaleDateString()}</span>
                         </div>
                       </div>
                    </div>
                    <p className="text-2xl font-black italic text-emerald-500">R$ {pay.amount.toFixed(2)}</p>
                  </div>
                ))}
                
                {studentPayments.length === 0 && !isPending && (
                  <div className="py-24 flex flex-col items-center gap-4 opacity-10 italic">
                     <History size={64} />
                     <p className="font-black uppercase tracking-widest text-xs">Sem registros financeiros ainda</p>
                  </div>
                )}

                {isPending && (
                  <div className="py-20 flex flex-col items-center gap-4 text-orange-500/40">
                     <Lock size={64} />
                     <p className="font-black italic uppercase tracking-[0.2em] text-xs">Acesso pendente de ativação</p>
                  </div>
                )}
              </div>

              {!isPending && (
                <div className="pt-10 border-t border-zinc-900">
                  <button onClick={() => handleWhatsAppAction('comprovante')} className="w-full py-7 bg-orange-500 text-black rounded-3xl font-black uppercase italic text-xs tracking-[0.2em] hover:scale-[1.02] transition-all shadow-3xl shadow-orange-500/10 flex items-center justify-center gap-3">
                    <DollarSign size={20} /> Solicitar Pix para Renovação
                  </button>
                </div>
              )}
            </div>

            {/* Legal / Policy Blocker */}
            <div className="grid md:grid-cols-2 gap-6 opacity-50">
               <div className="bg-zinc-900/10 border border-zinc-900 p-8 rounded-[2.5rem] space-y-3">
                  <p className="text-[10px] font-black uppercase text-white">Aviso de Cancelamento</p>
                  <p className="text-[10px] text-zinc-500 italic leading-relaxed">Cancelamentos devem ser comunicados com 30 dias de antecedência para interromper o ciclo de cobrança do mês seguinte.</p>
               </div>
               <div className="bg-zinc-900/10 border border-zinc-900 p-8 rounded-[2.5rem] space-y-3">
                  <p className="text-[10px] font-black uppercase text-white">Suspensão de Acesso</p>
                  <p className="text-[10px] text-zinc-500 italic leading-relaxed">Atrasos superiores a 5 dias acarretam no bloqueio automático da identificação digital na entrada da academia.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
