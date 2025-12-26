
import React, { useState } from 'react';
import { Search, Filter, MessageSquare, CheckCircle2, UserPlus, Trash2, ArrowUpDown, UserCheck, CreditCard, ExternalLink } from 'lucide-react';
import { Student, GymSettings } from '../types';
import { getDaysRemaining, formatDate, getStatusColor, formatWhatsAppLink } from '../utils';
import { Link } from 'react-router-dom';

interface AdminStudentsProps {
  students: Student[];
  settings: GymSettings;
  updateStudent: (s: Student) => void;
}

const AdminStudents: React.FC<AdminStudentsProps> = ({ students, settings, updateStudent }) => {
  const [filter, setFilter] = useState<'Todos' | 'Vencidos' | 'Pendentes' | 'Ativos'>('Todos');
  const [search, setSearch] = useState('');

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.whatsapp.includes(search);
    const days = getDaysRemaining(s.dueDate);
    
    if (filter === 'Vencidos') return matchesSearch && s.registrationStatus === 'Concluído' && days < 0;
    if (filter === 'Pendentes') return matchesSearch && s.registrationStatus === 'Pendente';
    if (filter === 'Ativos') return matchesSearch && s.registrationStatus === 'Concluído' && days >= 0;
    return matchesSearch;
  });

  const handleConfirmRegistration = (student: Student) => {
    const now = new Date();
    const dueDate = new Date(now.setMonth(now.getMonth() + 1)).toISOString();
    updateStudent({ 
      ...student, 
      registrationStatus: 'Concluído',
      dueDate: dueDate
    });
  };

  const sendBillingMessage = (student: Student) => {
    const msg = settings.prompts.billing
      .replace('{name}', student.name)
      .replace('{due_date}', formatDate(student.dueDate));
    window.open(formatWhatsAppLink(student.whatsapp, msg), '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Gestão de Alunos</h1>
          <p className="text-zinc-500 font-medium">Controle de acesso e cobranças da {settings.name}.</p>
        </div>
        <Link to="/register" className="bg-orange-500 text-black px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-orange-500/20">
          <UserPlus size={20} /> Novo Aluno
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-zinc-900/40 p-5 rounded-3xl border border-zinc-800/50 backdrop-blur-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou WhatsApp..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {(['Todos', 'Vencidos', 'Ativos', 'Pendentes'] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/10' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(student => {
          const days = getDaysRemaining(student.dueDate);
          const statusColor = getStatusColor(days);
          const isOverdue = student.registrationStatus === 'Concluído' && days < 0;

          return (
            <div key={student.id} className={`bg-zinc-900/30 border p-7 rounded-[2.5rem] space-y-6 transition-all group hover:bg-zinc-900/50 ${isOverdue ? 'border-red-500/30 shadow-2xl shadow-red-500/5' : 'border-zinc-800'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <Link to={`/profile/${student.id}`} className="w-16 h-16 rounded-2xl bg-zinc-800 overflow-hidden ring-4 ring-zinc-900/50 border border-zinc-800 shrink-0">
                    <img src={student.photoUrl} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </Link>
                  <div className="min-w-0">
                    <Link to={`/profile/${student.id}`} className="block">
                      <h3 className="font-black italic uppercase text-white text-lg leading-tight tracking-tight hover:text-orange-500 transition-colors truncate">
                        {student.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mt-1 italic">ID: {student.id}</p>
                  </div>
                </div>
                {student.registrationStatus === 'Concluído' && (
                  <button 
                    onClick={() => sendBillingMessage(student)}
                    title="Enviar cobrança rápida"
                    className={`p-3 rounded-xl border transition-all hover:scale-110 active:scale-95 ${
                      isOverdue 
                        ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' 
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                    }`}
                  >
                    <MessageSquare size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-zinc-800/30">
                <div className="space-y-1">
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Vencimento</p>
                  <p className="font-black italic text-sm text-zinc-300">{student.dueDate ? formatDate(student.dueDate) : 'A definir'}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Situação</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isOverdue ? 'text-red-500' : 'text-emerald-500'}`}>
                    {student.registrationStatus === 'Pendente' ? 'Aguardando' : (days < 0 ? `Atrasado ${Math.abs(days)}d` : `Em dia`)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                {student.registrationStatus === 'Pendente' ? (
                  <button 
                    onClick={() => handleConfirmRegistration(student)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-center text-[10px] font-black uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20"
                  >
                    <UserCheck size={18} /> Confirmar Pagamento
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link 
                      to={`/profile/${student.id}`} 
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-zinc-700/50"
                    >
                      <ExternalLink size={14} /> Ver Perfil
                    </Link>
                    
                    <button 
                      onClick={() => sendBillingMessage(student)}
                      className={`flex-[2] py-4 rounded-2xl text-center text-[10px] font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
                        isOverdue 
                          ? 'bg-orange-500 text-black hover:scale-[1.03] shadow-orange-500/20 font-black' 
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                      }`}
                    >
                      <MessageSquare size={16} /> Enviar Cobrança
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-32 bg-zinc-900/10 border-2 border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center gap-6 opacity-40">
          <Search size={48} className="text-zinc-700" />
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] italic text-sm">Nenhum aluno encontrado nesta categoria</p>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
