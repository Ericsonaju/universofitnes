
import { GymSettings, Student } from './types';

export const INITIAL_SETTINGS: GymSettings = {
  name: "Universo Fitness",
  ownerName: "Viviane",
  whatsapp: "557930437610",
  logoUrl: "/universo-fitness/universo.webp",
  coverUrl: "/universo-fitness/2021-06-02.webp",
  aboutText: "A Universo Fitness é a sua casa em Aracaju. Localizada no coração do Inácio Barbosa, oferecemos infraestrutura de ponta com equipamentos Classic e Mirage, garantindo o melhor ambiente para sua musculação e funcional.",
  announcement: "🔥 MATRÍCULAS ABERTAS! Venha conhecer nossa unidade Inácio Barbosa.",
  openingHours: "Seg-Sex: 05:30 às 22:00 | Sáb: 08:00 às 13:00",
  trainers: [
    { id: '1', name: 'Viviane', specialty: 'Proprietária & Gestão', photoUrl: '/universo-fitness/2021-10-09 (1).webp' },
    { id: '2', name: 'Time Universo', specialty: 'Musculação / Hipertrofia', photoUrl: '/universo-fitness/unnamed (1).webp' }
  ],
  prompts: {
    welcome: "Olá {name}, seja muito bem-vindo(a) à Família Universo Fitness! 🏋️‍♂️ Cadastro ok! Sua mensalidade vence no dia {due_date}. #VemPraUniverso",
    billing: "Oi {name}! Passando para lembrar que sua mensalidade na Universo Fitness vence em {due_date}. Qualquer dúvida, fale com a Viviane no (79) 3043-7610.",
    holiday: "Fala {name}! Teremos horários especiais neste feriado. Fique atento às nossas redes sociais da Universo Fitness!",
    newRegistration: "Olá Viviane! 👋 Um novo aluno acabou de se cadastrar pelo site:\n\n👤 Nome: {name}\n📱 WhatsApp: {whatsapp}\n🆔 ID de Acesso: {id}\n\nVerifique o Dashboard para confirmar o pagamento e liberar o acesso!",
    summerPromo: "O verão chegou na Universo Fitness, {name}! ☀️ Traga um amigo para se matricular e ganhe 15 dias de bônus no seu plano atual. Promoção válida para o mês de Dezembro!",
    weeklyWorkout: "Fala {name}, foco total! 🦾 O desafio da semana na Universo é Intensidade Máxima. Já conferiu sua nova planilha de treino no mural da recepção?"
  }
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'UF-PROMO',
    name: 'José Oliveira',
    photoUrl: 'https://i.pravatar.cc/150?u=jose_aracaju',
    whatsapp: '5579999999999',
    birthDate: '1990-01-01',
    registrationStatus: 'Concluído',
    linkSentAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 10).toISOString(),
  }
];
