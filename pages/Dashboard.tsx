
import React, { useState } from 'react';
import {
  Search,
  DollarSign,
  Wallet,
  CreditCard as CardIcon,
  Users,
  Calendar,
  Bell,
  MessageSquare,
  CheckCircle,
  UserX,
  UserPlus,
  X,
  ChevronRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Student, GymSettings, Payment, PaymentType } from '../types';
import { getDaysRemaining, formatWhatsAppLink, formatDate } from '../utils';
import { Link } from 'react-router-dom';

interface DashboardProps {
  settings: GymSettings;
  students: Student[];
  payments: Payment[];
  updateStudent: (s: Student) => void;
  addPayment: (p: Payment) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, students, payments, updateStudent, addPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; student: Student | null }>({ isOpen: false, student: null });
  const [paymentType, setPaymentType] = useState<PaymentType>('Pix');
  const [paymentAmount, setPaymentAmount] = useState('80.00');

  const pendingRegistrations = students.filter(s => s.registrationStatus === 'Pendente');
  const overdueStudents = students.filter(s => s.registrationStatus === 'Concluído' && getDaysRemaining(s.dueDate) < 0);
  const activeStudents = students.filter(s => s.registrationStatus === 'Concluído' && getDaysRemaining(s.dueDate) >= 0);
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

  const handleActivateStudent = () => {
    if (!paymentModal.student) return;

    const student = paymentModal.student;
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setDate(today.getDate() + 30);

    const newPayment: Payment = {
      id: `PAY-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      studentId: student.id,
      studentName: student.name,
      amount: parseFloat(paymentAmount),
      date: today.toISOString(),
      reference: `${today.getMonth() + 1}/${today.getFullYear()}`,
      paymentType: paymentType
    };

    addPayment(newPayment);
    updateStudent({
      ...student,
      registrationStatus: 'Concluído',
      dueDate: nextMonth.toISOString()
    });

    setPaymentModal({ isOpen: false, student: null });

    const msg = settings.prompts.welcome
      .replace('{name}', student.name)
      .replace('{due_date}', formatDate(nextMonth.toISOString()));
    window.open(formatWhatsAppLink(student.whatsapp, msg), '_blank');
  };

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-700 pb-20 px-1 md:px-0">

      {/* Pending Activations Banner */}
      {pendingRegistrations.length > 0 && (
        <div className="bg-orange-500 rounded-[2rem] xl:rounded-[2.5rem] p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 shadow-2xl shadow-orange-500/10 border-b-4 lg:border-b-8 border-black/10">
          <div className="flex items-center gap-5 lg:gap-6 text-center lg:text-left flex-col lg:flex-row">
            <div className="w-14 h-14 lg:w-20 lg:h-20 bg-black rounded-2xl lg:rounded-[2rem] flex items-center justify-center text-orange-500 shrink-0 animate-bounce">
              <Bell size={28} className="lg:w-8 lg:h-8" />
            </div>
            <div>
              <h2 className="text-xl lg:text-3xl font-black italic uppercase text-black leading-none tracking-tighter">Matrículas Pendentes!</h2>
              <p className="text-black/60 font-bold text-[10px] lg:text-xs mt-1 uppercase italic tracking-widest">Existem {pendingRegistrations.length} alunos aguardando confirmação.</p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('activation-list')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full lg:w-auto bg-black text-white px-8 py-4 rounded-xl lg:rounded-2xl font-black uppercase italic text-[11px] tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Ver Pendências
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8">
        <div className="space-y-1 lg:space-y-2">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">Gestão</h1>
          <p className="text-zinc-500 font-bold italic uppercase tracking-widest text-[10px]">{settings.name} — Painel Admin</p>
        </div>
        <Link to="/register" className="bg-zinc-900 text-orange-500 border border-orange-500/30 px-6 xl:px-8 py-4 xl:py-5 rounded-xl xl:rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-orange-500 hover:text-black transition-all flex items-center justify-center gap-3">
          <UserPlus size={18} /> Novo Registro
        </Link>
      </div>

      {/* Grid de Métricas - Tablet/Notebook Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 xl:p-8 rounded-[2rem] xl:rounded-[2.5rem] space-y-4 hover:border-red-500/30 transition-all shadow-lg group">
          <div className="flex justify-between items-start">
            <div className="p-3 xl:p-4 bg-red-500/10 rounded-xl xl:rounded-2xl text-red-500 group-hover:scale-110 transition-transform"><UserX size={24} /></div>
            <span className="text-3xl xl:text-4xl font-black italic text-white leading-none">{overdueStudents.length}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Inadimplentes</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 xl:p-8 rounded-[2rem] xl:rounded-[2.5rem] space-y-4 hover:border-orange-500/30 transition-all shadow-lg group">
          <div className="flex justify-between items-start">
            <div className="p-3 xl:p-4 bg-orange-500/10 rounded-xl xl:rounded-2xl text-orange-500 group-hover:scale-110 transition-transform"><Bell size={24} /></div>
            <span className="text-3xl xl:text-4xl font-black italic text-white leading-none">{pendingRegistrations.length}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Pendentes</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 xl:p-8 rounded-[2rem] xl:rounded-[2.5rem] space-y-4 hover:border-emerald-500/30 transition-all shadow-lg group">
          <div className="flex justify-between items-start">
            <div className="p-3 xl:p-4 bg-emerald-500/10 rounded-xl xl:rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform"><Users size={24} /></div>
            <span className="text-3xl xl:text-4xl font-black italic text-white leading-none">{activeStudents.length}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Alunos Ativos</p>
        </div>

        <div className="bg-emerald-600 p-6 xl:p-8 rounded-[2rem] xl:rounded-[2.5rem] space-y-4 text-black shadow-2xl shadow-emerald-950/20 group hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start">
            <div className="p-3 xl:p-4 bg-black/10 rounded-xl xl:rounded-2xl"><DollarSign size={24} /></div>
            <span className="text-2xl xl:text-3xl font-black italic leading-none truncate max-w-[150px]">R$ {totalRevenue.toLocaleString('pt-BR')}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Receita do Mês</p>
        </div>
      </div>

      {/* Listagem de Pendências */}
      <div id="activation-list" className="bg-zinc-950 border border-zinc-900 rounded-[2rem] xl:rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-6 lg:p-10 xl:p-12 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-orange-500/5 to-transparent">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-500 text-black rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg"><TrendingUp size={24} /></div>
            <div>
              <h2 className="text-xl lg:text-2xl font-black italic uppercase text-white leading-none tracking-tighter">Ativar Novos Alunos</h2>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2 italic">Novos cadastros pendentes</p>
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16} />
            <input
              type="text"
              placeholder="Localizar aluno..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl lg:rounded-2xl pl-12 pr-6 py-3 lg:py-4 text-xs outline-none focus:ring-2 focus:ring-orange-500/30 transition-all text-white italic font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          {/* Desktop Table */}
          <table className="w-full text-left hidden lg:table min-w-[800px]">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-zinc-900">
                <th className="px-10 xl:px-12 py-6">Membro</th>
                <th className="px-10 xl:px-12 py-6">ID Gerado</th>
                <th className="px-10 xl:px-12 py-6">Data Cadastro</th>
                <th className="px-10 xl:px-12 py-6 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {pendingRegistrations.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(student => (
                <tr key={student.id} className="hover:bg-zinc-900/20 transition-all group">
                  <td className="px-10 xl:px-12 py-6">
                    <div className="flex items-center gap-4">
                      <img src={student.photoUrl} alt="" className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl object-cover border border-zinc-800" />
                      <div>
                        <p className="text-sm font-black italic uppercase text-white leading-none truncate max-w-[150px] xl:max-w-none">{student.name}</p>
                        <p className="text-[10px] font-bold text-zinc-600 mt-1 uppercase tracking-widest">{student.whatsapp}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 xl:px-12 py-6">
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 font-black text-[10px] italic tracking-widest uppercase truncate block w-fit">#{student.id}</span>
                  </td>
                  <td className="px-10 xl:px-12 py-6 text-[11px] text-zinc-600 italic font-bold">
                    {new Date(student.linkSentAt).toLocaleDateString()}
                  </td>
                  <td className="px-10 xl:px-12 py-6 text-right">
                    <button
                      onClick={() => setPaymentModal({ isOpen: true, student })}
                      className="bg-orange-500 text-black px-6 xl:px-8 py-2.5 xl:py-3 rounded-lg xl:rounded-xl font-black uppercase italic text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      Ativar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile/Small Notebook Card View */}
          <div className="lg:hidden divide-y divide-zinc-900">
            {pendingRegistrations.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(student => (
              <div key={student.id} className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={student.photoUrl} alt="" className="w-14 h-14 rounded-xl object-cover border border-zinc-800 shadow-xl" />
                  <div>
                    <p className="text-base font-black italic uppercase text-white leading-tight">{student.name}</p>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1 italic">ID: #{student.id}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(formatWhatsAppLink(student.whatsapp, "Olá! Recebemos sua matrícula. Aguardamos o comprovante Pix para liberação!"), '_blank')}
                    aria-label="Enviar mensagem WhatsApp"
                    title="Enviar mensagem WhatsApp"
                    className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 flex items-center justify-center hover:text-white transition-colors"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button
                    onClick={() => setPaymentModal({ isOpen: true, student })}
                    className="flex-[4] py-3 bg-orange-500 text-black rounded-xl font-black uppercase italic text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                  >
                    Confirmar Pagamento
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pendingRegistrations.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-6 opacity-20">
              <CheckCircle size={48} className="text-emerald-500" />
              <p className="font-black italic uppercase tracking-[0.2em] text-[10px]">Tudo em dia! Sem novos cadastros.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Pagamento */}
      {paymentModal.isOpen && paymentModal.student && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4" onClick={() => setPaymentModal({ isOpen: false, student: null })}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-[2rem] max-w-md w-full overflow-hidden shadow-3xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 lg:p-8 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl font-black uppercase italic text-white">Ativar Aluno</h2>
                <p className="text-zinc-500 text-xs font-bold mt-1 italic">Registrar pagamento</p>
              </div>
              <button onClick={() => setPaymentModal({ isOpen: false, student: null })} aria-label="Fechar modal" title="Fechar" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                <img src={paymentModal.student.photoUrl} alt="" className="w-14 h-14 rounded-xl object-cover border border-zinc-700" />
                <div>
                  <p className="text-white font-black italic uppercase">{paymentModal.student.name}</p>
                  <p className="text-zinc-500 text-xs font-bold">#{paymentModal.student.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-zinc-500 text-xs font-black uppercase tracking-widest italic">Forma de Pagamento</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Pix', 'Dinheiro', 'Cartão'] as PaymentType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setPaymentType(type)}
                      className={`py-3 rounded-xl font-black uppercase italic text-xs tracking-widest transition-all ${paymentType === type
                        ? 'bg-orange-500 text-black'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="paymentAmount" className="text-zinc-500 text-xs font-black uppercase tracking-widest italic">Valor</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-black">R$</span>
                  <input
                    id="paymentAmount"
                    type="text"
                    placeholder="80.00"
                    value={paymentAmount}
                    onChange={e => setPaymentAmount(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white text-xl font-black italic focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleActivateStudent}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <CheckCircle size={22} /> Confirmar Ativação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
