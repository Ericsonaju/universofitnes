
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Flame } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha padrão para acesso inicial (pode ser configurada via settings depois)
    if (password === 'universo2024') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Senha incorreta. Acesso restrito à Viviane.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20 transform rotate-12">
            <Lock size={40} className="text-black" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Painel <span className="text-orange-500">Administrativo</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Acesso Restrito Universo Fitness</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                disabled
                type="text" 
                value="Proprietária Viviane"
                className="w-full bg-black/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-zinc-400 font-bold outline-none"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                autoFocus
                type="password" 
                placeholder="Senha de Acesso"
                className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-[10px] font-black uppercase text-center animate-bounce">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-orange-500 text-black rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-500/20"
          >
            Entrar no Painel <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          Esqueceu a senha? Entre em contato com o suporte técnico.
        </p>
      </div>
    </div>
  );
};

export default Login;
