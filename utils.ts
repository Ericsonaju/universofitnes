
export const getDaysRemaining = (dueDate: string): number => {
  if (!dueDate || dueDate === '') return -999;
  
  const due = new Date(dueDate);
  const today = new Date();
  
  // Reseta horas para comparação justa entre dias
  const d1 = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatWhatsAppLink = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === '') return 'Aguardando Ativação';
  return new Date(dateString).toLocaleDateString('pt-BR');
};

// Returns a Tailwind text color class based on the number of days remaining until due date
export const getStatusColor = (days: number): string => {
  if (days < 0) return 'text-red-500';
  if (days <= 3) return 'text-amber-500';
  return 'text-emerald-500';
};

export const getStatusTheme = (days: number, status: string) => {
  if (status === 'Pendente') return { label: 'AGUARDANDO ATIVAÇÃO', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
  if (days < 0) return { label: 'ACESSO BLOQUEADO', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  if (days <= 3) return { label: 'VENCIMENTO PRÓXIMO', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
  return { label: 'ACESSO LIBERADO', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
};
