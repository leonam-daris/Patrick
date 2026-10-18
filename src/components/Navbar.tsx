import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { User, NotificationItem, Course } from '../types';
import { 
  Bell, 
  Flame, 
  Award, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  ShoppingBag,
  Package
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentView: string;
  onNavigate: (view: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onSelectUserPersona: (userId: string | null) => void;
  onLogout: () => void;
  onOpenCheckout: (product: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  notifications,
  onOpenNotifications,
  onSelectUserPersona,
  onLogout,
}) => {
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const isVisitor = !currentUser || currentUser.role === 'visitor';
  const isStudent = currentUser?.role === 'student';
  const isClient = currentUser?.role === 'client';
  const isAdmin = currentUser?.role === 'admin';

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPersonaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: string) => {
    setIsMobileMenuOpen(false);
    setIsPersonaMenuOpen(false);
    onNavigate(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#101B30]/10 transition-colors w-full">
      {/* Contained header with comfortable side padding to prevent desktop edge-cutting */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Wordmark / Monogram (Faithful to image 1) */}
          <button 
            type="button"
            onClick={() => handleNavClick('landing')} 
            className="flex items-center text-left focus-visible:outline-hidden group shrink-0 cursor-pointer"
          >
            <BrandLogo size="md" variant="full" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className={`transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                currentView === 'landing' ? 'text-[#101B30] font-bold border-b-2 border-[#BA8E48]' : ''
              }`}
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('catalog')}
              className={`transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                currentView === 'catalog' ? 'text-[#101B30] font-bold border-b-2 border-[#BA8E48]' : ''
              }`}
            >
              Cursos & E-books
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                currentView === 'about' ? 'text-[#101B30] font-bold border-b-2 border-[#BA8E48]' : ''
              }`}
            >
              Sobre Patrick Ramon
            </button>

            {/* If logged in as Student (Só Aluna da Formação) */}
            {isStudent && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'dashboard' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#BA8E48]" />
                  <span>Portal do Aluno</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('calendar')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'calendar' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <Calendar className="w-4 h-4 text-[#BA8E48]" />
                  <span>Calendário</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('gamification')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'gamification' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <Award className="w-4 h-4 text-[#BA8E48]" />
                  <span>Conquistas</span>
                </button>
              </>
            )}

            {/* If logged in as Client (Só Cliente dos Cursos Comprados) */}
            {isClient && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'dashboard' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <Package className="w-4 h-4 text-[#BA8E48]" />
                  <span>Meus Cursos Comprados</span>
                </button>
              </>
            )}

            {/* If logged in as Admin (Patrick) */}
            {isAdmin && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'dashboard' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#BA8E48]" />
                  <span>Visão do Aluno</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#101B30] cursor-pointer py-1 ${
                    currentView === 'admin' ? 'text-[#101B30] font-bold' : ''
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#BA8E48]" />
                  <span>Gestão</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action & Profile Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* CTA for visitors */}
            {isVisitor && (
              <button
                type="button"
                onClick={() => handleNavClick('catalog')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#101B30] hover:bg-black text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#BA8E48]" />
                <span>Matricular-se</span>
              </button>
            )}

            {/* Gamification Streak & XP (Only for Student on desktop) */}
            {isStudent && currentUser && (
              <div 
                onClick={() => handleNavClick('gamification')}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 bg-[#FAF9F6] border border-[#BA8E48]/50 rounded-xl cursor-pointer hover:border-[#BA8E48] transition-colors"
                title="Seu progresso acadêmico"
              >
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                  <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>{currentUser.streakDays}d</span>
                </div>
                <span className="text-slate-300 text-xs">·</span>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#101B30]">
                  <span className="tabular-nums">{currentUser.xp} XP</span>
                </div>
              </div>
            )}

            {/* Notifications Bell */}
            {!isVisitor && (
              <button
                type="button"
                onClick={onOpenNotifications}
                aria-label="Notificações"
                className="relative p-1.5 sm:p-2 text-slate-700 hover:text-[#101B30] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-rose-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* Persona Switcher / Profile Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsPersonaMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 transition-all cursor-pointer max-w-[190px] sm:max-w-[220px]"
                aria-expanded={isPersonaMenuOpen}
                aria-label="Menu do Usuário"
              >
                {currentUser && !isVisitor ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-[#BA8E48] shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#101B30] text-white flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4 text-[#BA8E48]" />
                  </div>
                )}
                
                {/* Truncated user name and role pill to strictly avoid desktop overflow */}
                <div className="hidden sm:block text-left min-w-0 pr-0.5">
                  <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
                    {currentUser && !isVisitor ? currentUser.name : 'Visitante'}
                  </div>
                  <div className="text-[9px] text-[#BA8E48] font-bold uppercase tracking-wider truncate">
                    {isAdmin 
                      ? 'Admin / Psicólogo' 
                      : isStudent 
                        ? 'Só Aluna' 
                        : isClient 
                          ? 'Só Cliente' 
                          : 'Sem Matrícula'}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${isPersonaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile / Persona Dropdown Menu */}
              {isPersonaMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-84 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 text-sm truncate">
                        {currentUser && !isVisitor ? currentUser.name : 'Visitante'}
                      </div>
                      <div className="text-slate-500 text-xs truncate">
                        {currentUser && !isVisitor ? currentUser.email : 'Navegando no catálogo público'}
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                      isAdmin 
                        ? 'bg-amber-100 text-amber-900' 
                        : isStudent
                          ? 'bg-emerald-100 text-emerald-900'
                          : isClient
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isAdmin ? 'Docente' : isStudent ? 'Só Aluna' : isClient ? 'Só Cliente' : 'Visitante'}
                    </span>
                  </div>

                  {/* Direct portal jump */}
                  {!isVisitor && (
                    <div className="px-3 py-2 border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full py-2 px-3 bg-[#101B30] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors cursor-pointer"
                      >
                        {isClient ? <Package className="w-4 h-4 text-[#BA8E48]" /> : <GraduationCap className="w-4 h-4 text-[#BA8E48]" />}
                        <span>{isClient ? 'Ver Meus Cursos Comprados' : 'Ir para Meu Dashboard'}</span>
                      </button>
                    </div>
                  )}

                  <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Alternar Perfil para Teste:
                  </div>

                  {/* 1. SÓ ALUNA: Dra. Camila Alencar */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectUserPersona('user-camila');
                      setIsPersonaMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        CA
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">Dra. Camila Alencar</div>
                        <div className="text-[10px] text-emerald-700 font-medium">
                          Perfil: <strong>Só Aluna</strong> (Formação, Metas & Certificado)
                        </div>
                      </div>
                    </div>
                    {currentUser?.id === 'user-camila' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                  </button>

                  {/* 2. SÓ CLIENTE DOS CURSOS: Dr. Roberto Mendes */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectUserPersona('user-roberto');
                      setIsPersonaMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#101B30] text-[#BA8E48] flex items-center justify-center font-bold text-xs shrink-0">
                        RM
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">Dr. Roberto Mendes</div>
                        <div className="text-[10px] text-blue-700 font-medium">
                          Perfil: <strong>Só Cliente</strong> (Cursos Comprados & Biblioteca)
                        </div>
                      </div>
                    </div>
                    {currentUser?.id === 'user-roberto' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                  </button>

                  {/* 3. VISITANTE: Lucas Ferreira */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectUserPersona('user-lucas');
                      setIsPersonaMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        LF
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">Lucas Ferreira</div>
                        <div className="text-[10px] text-slate-500">
                          Perfil: <strong>Visitante</strong> (Sem compras / Vê "Matricular-se")
                        </div>
                      </div>
                    </div>
                    {isVisitor && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                  </button>

                  {/* 4. ADMIN: Patrick Ramon */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectUserPersona('user-patrick');
                      setIsPersonaMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#BA8E48] text-[#101B30] flex items-center justify-center font-bold text-xs shrink-0">
                        PR
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate">Patrick Ramon</div>
                        <div className="text-[10px] text-amber-800 font-medium">
                          Perfil: <strong>Admin</strong> (Psicólogo CRP 09|22010)
                        </div>
                      </div>
                    </div>
                    {currentUser?.id === 'user-patrick' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                  </button>

                  {isAdmin && (
                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          handleNavClick('admin');
                          setIsPersonaMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#BA8E48]" />
                        <span>Painel de Gestão do Psicólogo</span>
                      </button>
                    </div>
                  )}

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setIsPersonaMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair / Navegar como Deslogado</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-1.5 text-slate-700 hover:text-[#101B30] hover:bg-slate-100 rounded-xl lg:hidden transition-colors cursor-pointer shrink-0"
              aria-label="Abrir Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FAF9F6] px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              className={`w-full text-left py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${currentView === 'landing' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('catalog')}
              className={`w-full text-left py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${currentView === 'catalog' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Cursos & E-books (Catálogo)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${currentView === 'about' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Sobre Patrick Ramon
            </button>

            {/* Student Links */}
            {isStudent && (
              <>
                <div className="pt-3 pb-1 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
                  Área do Aluno (Formação)
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${currentView === 'dashboard' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <GraduationCap className="w-4 h-4 text-[#BA8E48]" />
                  <span>Dashboard de Estudos</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('calendar')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${currentView === 'calendar' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <Calendar className="w-4 h-4 text-[#BA8E48]" />
                  <span>Calendário Acadêmico</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('gamification')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${currentView === 'gamification' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <Award className="w-4 h-4 text-[#BA8E48]" />
                  <span>Conquistas & Recompensas ({currentUser?.xp} XP)</span>
                </button>
              </>
            )}

            {/* Client Links */}
            {isClient && (
              <>
                <div className="pt-3 pb-1 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
                  Área do Cliente dos Cursos
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer ${currentView === 'dashboard' ? 'bg-[#101B30] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <Package className="w-4 h-4 text-[#BA8E48]" />
                  <span>Meus Cursos Comprados</span>
                </button>
              </>
            )}

            {isVisitor && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('catalog')}
                  className="w-full py-3 bg-[#101B30] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                  <span>Ver Cursos & Matricular-se</span>
                </button>
              </div>
            )}

            {/* Mobile Persona Switcher Section */}
            <div className="pt-3 border-t border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
                Perfil de Acesso:
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onSelectUserPersona('user-camila');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs cursor-pointer ${currentUser?.id === 'user-camila' ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span>Dra. Camila (Só Aluna)</span>
                  {currentUser?.id === 'user-camila' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectUserPersona('user-roberto');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs cursor-pointer ${currentUser?.id === 'user-roberto' ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span>Dr. Roberto (Só Cliente dos Cursos)</span>
                  {currentUser?.id === 'user-roberto' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectUserPersona('user-lucas');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs cursor-pointer ${isVisitor ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span>Lucas (Visitante / Não Matriculado)</span>
                  {isVisitor && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectUserPersona('user-patrick');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs cursor-pointer ${currentUser?.id === 'user-patrick' ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span>Patrick Ramon (Psicólogo / Admin)</span>
                  {currentUser?.id === 'user-patrick' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
