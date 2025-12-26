
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle, ArrowRight, User, Phone, Calendar, Upload, Flame, ShieldAlert, MessageCircle, Info } from 'lucide-react';
import { GymSettings, Student } from '../types';
import { formatWhatsAppLink } from '../utils';

interface RegistrationProps {
  settings: GymSettings;
  addStudent: (s: Student) => void;
}

const Registration: React.FC<RegistrationProps> = ({ settings, addStudent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    birthDate: ''
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredStudent, setRegisteredStudent] = useState<Student | null>(null);

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          resolve(base64Str);
        }
      };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        setPhoto(compressed);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert("⚠️ A foto do rosto é obrigatória para seu cartão de acesso digital!");
      return;
    }

    setIsSubmitting(true);

    try {
      const id = `UF-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const newStudent: Student = {
        id,
        name: formData.name,
        whatsapp: formData.whatsapp.replace(/\D/g, ''),
        birthDate: formData.birthDate,
        photoUrl: photo,
        registrationStatus: 'Pendente',
        linkSentAt: new Date().toISOString(),
        dueDate: ''
      };

      addStudent(newStudent);
      setRegisteredStudent(newStudent);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("Erro ao processar matrícula. O armazenamento local está cheio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const notifyViviane = () => {
    if (!registeredStudent) return;
    const msg = settings.prompts.newRegistration
      .replace('{name}', registeredStudent.name)
      .replace('{whatsapp}', registeredStudent.whatsapp)
      .replace('{id}', registeredStudent.id);
    window.open(formatWhatsAppLink(settings.whatsapp, msg), '_blank');
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
        <div className="max-w-xl w-full space-y-12 animate-in zoom-in slide-in-from-bottom-10 duration-1000">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="w-32 h-32 bg-orange-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl relative z-10 border-4 border-black">
              <CheckCircle size={64} className="text-black" />
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic uppercase text-white leading-none">PRONTO!</h1>

            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem] space-y-6 shadow-2xl">
              <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Seu Cartão de Acesso</p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-40 rounded-[2rem] border-4 border-orange-500 overflow-hidden shadow-2xl ring-8 ring-orange-500/5">
                  <img src={registeredStudent?.photoUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-5xl font-black italic text-orange-500 tracking-tighter">#{registeredStudent?.id}</p>
                <p className="text-white font-black uppercase italic tracking-widest text-lg">{registeredStudent?.name}</p>
              </div>
            </div>

            <div className="bg-orange-500 p-10 rounded-[3rem] text-left space-y-5 shadow-3xl shadow-orange-500/10 relative overflow-hidden group">
              <ShieldAlert size={120} className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
              <p className="text-black font-black uppercase italic text-sm flex items-center gap-3">
                <Info size={20} /> PRÓXIMO PASSO: ATIVAÇÃO
              </p>
              <p className="text-black font-bold text-base leading-relaxed italic">
                Seu acesso está pendente. Para treinar hoje mesmo, você precisa enviar o comprovante do primeiro mês para a Viviane via WhatsApp.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <button
              onClick={notifyViviane}
              className="w-full py-8 bg-emerald-600 text-white rounded-[2rem] font-black uppercase italic tracking-[0.2em] hover:scale-[1.03] active:scale-95 transition-all shadow-3xl shadow-emerald-950/40 flex items-center justify-center gap-4 text-xl"
            >
              Liberar Meu Acesso <MessageCircle size={32} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-5 text-zinc-600 hover:text-white font-black uppercase italic tracking-widest text-xs transition-colors"
            >
              Voltar para o Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-orange-500 p-24 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 space-y-10">
          <div className="w-24 h-24 bg-black text-orange-500 rounded-[2.5rem] flex items-center justify-center font-black text-4xl italic shadow-3xl border-4 border-orange-400/20">UF</div>
          <h2 className="text-[12rem] font-black text-black leading-[0.75] uppercase italic tracking-tighter opacity-90">ENTRE <br /> PARA O <br /> <span className="text-white drop-shadow-2xl">CLUBE.</span></h2>
        </div>

        <div className="relative z-10 bg-black/10 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 space-y-6">
          <h4 className="text-black font-black uppercase italic text-sm tracking-widest">📜 Termos de Adesão</h4>
          <p className="text-black/60 text-[11px] font-bold italic leading-relaxed uppercase tracking-tighter">
            Ao se cadastrar, você declara estar apto para atividades físicas. O cancelamento exige 30 dias de aviso prévio. Seus dados estão protegidos pela LGPD e serão usados exclusivamente para gestão do seu plano Universo Fitness.
          </p>
        </div>

        <Flame size={800} className="absolute -right-60 -top-40 text-black opacity-10 rotate-12" />
      </div>

      <div className="flex-1 p-8 lg:p-32 flex items-center justify-center relative bg-zinc-950">
        <div className="max-w-lg w-full space-y-16 animate-in slide-in-from-right-10 duration-1000">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 text-orange-500 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl">
              <User size={16} /> NOVO MEMBRO ELITE
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic text-white leading-none">Matrícula <br /> <span className="text-orange-500">Digital</span></h1>
            <p className="text-zinc-600 font-bold italic text-xs lg:text-sm uppercase tracking-widest">Preencha os dados oficiais para seu registro.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-[3rem] lg:rounded-[4rem] bg-zinc-900 border-4 border-dashed border-zinc-800 overflow-hidden flex items-center justify-center group-hover:border-orange-500 transition-all shadow-3xl relative">
                    {photo ? (
                      <img src={photo} alt="Preview" className="w-full h-full object-cover animate-in fade-in zoom-in" />
                    ) : (
                      <div className="flex flex-col items-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-zinc-500 group-hover:text-orange-500 transition-colors" size={64} />
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Foto do Rosto</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      aria-label="Selecionar foto do rosto"
                      title="Clique para tirar ou selecionar sua foto"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-orange-500 text-black rounded-[2rem] flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform border-4 border-zinc-950">
                    <Upload size={28} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-600 bg-zinc-900/50 px-6 py-3 rounded-2xl border border-zinc-800">
                  <Info size={14} className="text-orange-500" />
                  <p className="text-[9px] font-black uppercase tracking-widest italic">Toque no círculo para tirar a foto</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={24} />
                  <input
                    required
                    type="text"
                    placeholder="Nome Completo"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[2rem] lg:rounded-[2.5rem] py-5 lg:py-8 pl-14 lg:pl-20 pr-4 lg:pr-8 text-white focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-black italic uppercase tracking-wider lg:tracking-widest placeholder:text-zinc-800 text-base lg:text-xl"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={24} />
                  <input
                    required
                    type="tel"
                    placeholder="Seu WhatsApp"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[2rem] lg:rounded-[2.5rem] py-5 lg:py-8 pl-14 lg:pl-20 pr-4 lg:pr-8 text-white focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-black italic uppercase tracking-wider lg:tracking-widest placeholder:text-zinc-800 text-base lg:text-xl"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>

                <div className="relative group">
                  <Calendar className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={24} />
                  <input
                    required
                    type="date"
                    aria-label="Data de nascimento"
                    title="Selecione sua data de nascimento"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[2rem] lg:rounded-[2.5rem] py-5 lg:py-8 pl-14 lg:pl-20 pr-4 lg:pr-8 text-zinc-700 focus:text-white focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-black italic uppercase tracking-wider lg:tracking-widest placeholder:text-zinc-800 text-base lg:text-xl"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 lg:py-8 bg-orange-500 text-black rounded-[2rem] lg:rounded-[2.5rem] font-black uppercase italic tracking-widest flex items-center justify-center gap-3 lg:gap-5 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 shadow-3xl shadow-orange-500/20 text-lg lg:text-2xl"
            >
              {isSubmitting ? (
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Finalizar Cadastro <ArrowRight size={32} /></>
              )}
            </button>

            <p className="text-[10px] text-zinc-800 text-center font-black italic uppercase tracking-widest px-10 leading-relaxed">
              O pré-cadastro não garante acesso imediato. O desbloqueio da catraca ocorre após a confirmação do pagamento com a Viviane.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
