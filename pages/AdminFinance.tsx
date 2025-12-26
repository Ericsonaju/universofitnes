
import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Payment, Student } from '../types';
import { formatDate } from '../utils';

interface AdminFinanceProps {
  payments: Payment[];
  students: Student[];
}

const AdminFinance: React.FC<AdminFinanceProps> = ({ payments, students }) => {
  const totalMonth = payments.reduce((acc, p) => acc + p.amount, 0);
  const activeCount = students.filter(s => s.registrationStatus === 'Concluído').length;
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Financeiro</h1>
          <p className="text-zinc-500 font-medium">Controle de entradas e fluxo de caixa.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={20} /></div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Mês Atual</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black italic">R$ {totalMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <p className="text-xs opacity-70">Total de recebimentos registrados</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-zinc-800 rounded-lg text-emerald-500"><TrendingUp size={20} /></div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Potencial</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black italic text-white">R$ {(activeCount * 80).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <p className="text-xs text-zinc-500">Com base em {activeCount} alunos ativos</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-zinc-800 rounded-lg text-amber-500"><Calendar size={20} /></div>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Ticket Médio</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black italic text-white text-emerald-500">R$ 80,00</h3>
            <p className="text-xs text-zinc-500">Valor padrão da mensalidade</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-zinc-900">
          <h2 className="text-xl font-bold uppercase italic">Histórico de Transações</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] border-b border-zinc-900">
                <th className="px-6 py-4">Aluno</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Ref.</th>
                <th className="px-6 py-4">Método</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {payments.map(payment => {
                const student = students.find(s => s.id === payment.studentId);
                return (
                  <tr key={payment.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-sm text-white">{student?.name || 'Ex-Aluno'}</td>
                    <td className="px-6 py-4 text-xs text-zinc-500">{formatDate(payment.date)}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">{payment.reference}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-zinc-800 rounded-md">{payment.paymentType}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-black italic text-emerald-500">R$ {payment.amount.toFixed(2)}</td>
                  </tr>
                );
              })}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest italic">Nenhum pagamento registrado este mês</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
