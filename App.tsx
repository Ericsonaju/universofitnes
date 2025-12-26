
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  CreditCard, 
  Settings as SettingsIcon, 
  Home,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import StudentProfile from './pages/StudentProfile';
import AdminSettings from './pages/AdminSettings';
import AdminStudents from './pages/AdminStudents';
import AdminFinance from './pages/AdminFinance';
import Login from './pages/Login';
import { INITIAL_SETTINGS, MOCK_STUDENTS } from './constants';
import { GymSettings, Student, Payment } from './types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GymSettings>(INITIAL_SETTINGS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('uf_auth') === 'true';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('gymflow_settings');
    const savedStudents = localStorage.getItem('gymflow_students');
    const savedPayments = localStorage.getItem('gymflow_payments');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedPayments) setPayments(JSON.parse(savedPayments));
  }, []);

  const safeSave = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.error('Local storage quota exceeded!');
        alert('⚠️ LIMITE DE ESPAÇO ATINGIDO: O navegador não consegue salvar mais dados. Por favor, remova alunos antigos ou limpe o histórico do navegador para continuar.');
      } else {
        console.error('Error saving to localStorage', e);
      }
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('uf_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('uf_auth');
  };

  const updateSettings = (newSettings: GymSettings) => {
    setSettings(newSettings);
    safeSave('gymflow_settings', newSettings);
  };

  const addStudent = (newStudent: Student) => {
    const updated = [...students, newStudent];
    setStudents(updated);
    safeSave('gymflow_students', updated);
  };

  const updateStudent = (updatedStudent: Student) => {
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updated);
    safeSave('gymflow_students', updated);
  };

  const addPayment = (payment: Payment) => {
    const updated = [payment, ...payments];
    setPayments(updated);
    safeSave('gymflow_payments', updated);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col md:flex-row bg-black text-zinc-100 overflow-x-hidden">
        <AdminLayout 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          settings={settings}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        >
          <Routes>
            <Route path="/" element={<LandingPage settings={settings} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration settings={settings} addStudent={addStudent} />} />
            <Route path="/profile/:id" element={<StudentProfile students={students} payments={payments} settings={settings} updateStudent={updateStudent} />} />

            <Route path="/admin" element={isAuthenticated ? <Dashboard settings={settings} students={students} payments={payments} updateStudent={updateStudent} addPayment={addPayment} /> : <Navigate to="/login" />} />
            <Route path="/admin/students" element={isAuthenticated ? <AdminStudents students={students} settings={settings} updateStudent={updateStudent} /> : <Navigate to="/login" />} />
            <Route path="/admin/finance" element={isAuthenticated ? <AdminFinance payments={payments} students={students} /> : <Navigate to="/login" />} />
            <Route path="/admin/settings" element={isAuthenticated ? <AdminSettings settings={settings} onSave={updateSettings} /> : <Navigate to="/login" />} />
          </Routes>
        </AdminLayout>
      </div>
    </HashRouter>
  );
};

const AdminLayout: React.FC<{ 
  children: React.ReactNode; 
  isOpen: boolean; 
  setIsOpen: (o: boolean) => void;
  settings: GymSettings;
  isAuthenticated: boolean;
  onLogout: () => void;
}> = ({ children, isOpen, setIsOpen, settings, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = (location.pathname.startsWith('/admin')) && isAuthenticated;

  if (!isAdminRoute) return <>{children}</>;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link 
      to={to} 
      onClick={() => setIsOpen(false)}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
        location.pathname === to 
          ? 'bg-orange-500 text-black shadow-2xl shadow-orange-500/10 scale-105' 
          : 'hover:bg-zinc-900 text-zinc-500 hover:text-zinc-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-black italic uppercase text-[10px] tracking-widest">{label}</span>
    </Link>
  );

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar - Fix width for better notebook responsiveness */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-zinc-900 p-6 xl:p-8 space-y-12 bg-black shrink-0">
        <div className="flex items-center gap-4 px-2 cursor-pointer" onClick={() => navigate('/admin')}>
          <div className="w-10 h-10 xl:w-12 xl:h-12 bg-orange-500 rounded-xl xl:rounded-2xl flex items-center justify-center font-black text-xl xl:text-2xl italic text-black shadow-lg">UF</div>
          <div>
            <h1 className="text-lg xl:text-xl font-black tracking-tight uppercase italic text-white leading-none">Universo</h1>
            <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest mt-1 italic">Gestão Elite</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 xl:gap-3">
          <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/admin/students" icon={Users} label="Alunos" />
          <NavItem to="/admin/finance" icon={CreditCard} label="Financeiro" />
          <NavItem to="/admin/settings" icon={SettingsIcon} label="Academia" />
        </nav>

        <div className="mt-auto space-y-3">
          <Link to="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-all font-black uppercase italic text-[10px] tracking-widest">
            <Home size={20} />
            Site Público
          </Link>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-black uppercase italic text-[10px] tracking-widest"
          >
            <LogOut size={20} />
            Encerrar
          </button>
        </div>
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-md border-b border-zinc-900 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-xl italic text-black">UF</div>
          <span className="font-black text-sm uppercase italic">Universo</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[100] lg:hidden animate-in fade-in duration-300" onClick={() => setIsOpen(false)}>
          <aside className="fixed left-0 top-0 bottom-0 w-4/5 max-w-xs bg-black p-8 space-y-12 border-r border-zinc-900" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl italic text-black">UF</div>
              <h1 className="text-xl font-black uppercase italic">Universo</h1>
            </div>
            <nav className="flex flex-col gap-3">
              <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/admin/students" icon={Users} label="Alunos" />
              <NavItem to="/admin/finance" icon={CreditCard} label="Financeiro" />
              <NavItem to="/admin/settings" icon={SettingsIcon} label="Academia" />
            </nav>
            <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-black uppercase italic text-[10px] tracking-widest">
              <LogOut size={20} /> Sair
            </button>
          </aside>
        </div>
      )}

      {/* Main Content - Fluid padding */}
      <main className="flex-1 w-full pt-20 lg:pt-0 overflow-y-auto bg-black min-w-0">
        <div className="max-w-[1440px] mx-auto p-4 sm:p-8 lg:p-10 xl:p-16">
          {children}
        </div>
      </main>
    </div>
  );
};

export default App;
