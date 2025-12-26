
import React, { useState } from 'react';
/* Added Calendar to imports */
import { Save, Plus, Trash2, Layout, MessageSquare, Users, Sparkles, Sun, Dumbbell, Calendar } from 'lucide-react';
import { GymSettings } from '../types';

interface AdminSettingsProps {
  settings: GymSettings;
  onSave: (s: GymSettings) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onSave }) => {
  const [form, setForm] = useState<GymSettings>(settings);

  const handleTrainerChange = (id: string, field: string, value: string) => {
    setForm({
      ...form,
      trainers: form.trainers.map(t => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const removeTrainer = (id: string) => {
    setForm({ ...form, trainers: form.trainers.filter(t => t.id !== id) });
  };

  const addTrainer = () => {
    const newTrainer = { id: Math.random().toString(), name: '', specialty: '', photoUrl: 'https://i.pravatar.cc/150' };
    setForm({ ...form, trainers: [...form.trainers, newTrainer] });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white italic uppercase">Configurações</h1>
          <p className="text-zinc-500 font-medium">Controle total da marca Universo Fitness.</p>
        </div>
        <button 
          onClick={() => {
            onSave(form);
            alert("Configurações atualizadas com sucesso!");
          }}
          className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-black rounded-2xl font-black uppercase italic tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20"
        >
          <Save size={20} />
          Salvar Tudo
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Info Básica */}
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] space-y-8">
          <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3 text-white">
            <Layout size={22} className="text-orange-500" />
            Identidade da Academia
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Nome Oficial</label>
              <input 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white" 
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Proprietária</label>
                <input 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white" 
                  value={form.ownerName}
                  onChange={e => setForm({ ...form, ownerName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">WhatsApp de Negócio</label>
                <input 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white" 
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Aviso Geral (Mural)</label>
              <textarea 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 h-28 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none text-white" 
                value={form.announcement}
                onChange={e => setForm({ ...form, announcement: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Mensagens Automáticas e Prompts */}
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] space-y-8">
          <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3 text-white">
            <MessageSquare size={22} className="text-orange-500" />
            Central de Avisos & Marketing
          </h2>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Boas Vindas */}
            <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
                <Sparkles size={14} /> Boas-Vindas
              </label>
              <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 focus:ring-1 focus:ring-orange-500 outline-none text-sm text-zinc-300 transition-all" 
                value={form.prompts.welcome}
                onChange={e => setForm({ ...form, prompts: { ...form.prompts, welcome: e.target.value } })}
              />
            </div>

            {/* Cobrança */}
            <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
                <Save size={14} /> Lembrete de Mensalidade
              </label>
              <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 focus:ring-1 focus:ring-orange-500 outline-none text-sm text-zinc-300 transition-all" 
                value={form.prompts.billing}
                onChange={e => setForm({ ...form, prompts: { ...form.prompts, billing: e.target.value } })}
              />
            </div>

            {/* Verão */}
            <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
                <Sun size={14} /> Campanha de Verão
              </label>
              <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 focus:ring-1 focus:ring-orange-500 outline-none text-sm text-zinc-300 transition-all" 
                value={form.prompts.summerPromo}
                onChange={e => setForm({ ...form, prompts: { ...form.prompts, summerPromo: e.target.value } })}
              />
            </div>

            {/* Treino da Semana */}
            <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
                <Dumbbell size={14} /> Treino da Semana
              </label>
              <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 focus:ring-1 focus:ring-orange-500 outline-none text-sm text-zinc-300 transition-all" 
                value={form.prompts.weeklyWorkout}
                onChange={e => setForm({ ...form, prompts: { ...form.prompts, weeklyWorkout: e.target.value } })}
              />
            </div>

            {/* Feriados */}
            <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
                <Calendar size={14} /> Aviso de Feriado
              </label>
              <textarea 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 h-24 focus:ring-1 focus:ring-orange-500 outline-none text-sm text-zinc-300 transition-all" 
                value={form.prompts.holiday}
                onChange={e => setForm({ ...form, prompts: { ...form.prompts, holiday: e.target.value } })}
              />
            </div>
          </div>
        </section>

        {/* Treinadores / Time */}
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] space-y-8 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-3 text-white">
              <Users size={22} className="text-orange-500" />
              Equipe Universo Fitness
            </h2>
            <button onClick={addTrainer} className="p-3 bg-zinc-800 text-orange-500 hover:bg-orange-500 hover:text-black rounded-2xl transition-all shadow-lg">
              <Plus size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {form.trainers.map(trainer => (
              <div key={trainer.id} className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl relative group hover:border-zinc-700 transition-all">
                <button 
                  onClick={() => removeTrainer(trainer.id)}
                  className="absolute -top-2 -right-2 p-2 bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 overflow-hidden border border-zinc-700 shrink-0">
                      <img src={trainer.photoUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input 
                        placeholder="Nome do Coach"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold text-white" 
                        value={trainer.name}
                        onChange={e => handleTrainerChange(trainer.id, 'name', e.target.value)}
                      />
                      <input 
                        placeholder="Especialidade"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-orange-500 text-zinc-400" 
                        value={trainer.specialty}
                        // Added missing event parameter 'e'
                        onChange={e => handleTrainerChange(trainer.id, 'specialty', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
