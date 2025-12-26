
export type StudentStatus = 'Pendente' | 'Concluído' | 'Cancelamento Solicitado';
export type PaymentType = 'Dinheiro' | 'Pix' | 'Cartão';

export interface Student {
  id: string;
  name: string;
  photoUrl: string;
  whatsapp: string;
  birthDate: string;
  registrationStatus: StudentStatus;
  linkSentAt: string;
  dueDate: string; // ISO String
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string; // ISO String
  reference: string; // MM/YYYY
  paymentType: PaymentType;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
}

export interface GymSettings {
  name: string;
  ownerName: string;
  whatsapp: string;
  logoUrl: string;
  coverUrl: string;
  aboutText: string;
  announcement: string;
  openingHours: string;
  trainers: Trainer[];
  prompts: {
    welcome: string;
    billing: string;
    holiday: string;
    newRegistration: string;
    summerPromo: string;
    weeklyWorkout: string;
  };
}
