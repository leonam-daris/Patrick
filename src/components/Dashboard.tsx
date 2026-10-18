import React from 'react';
import { User, Course, Ebook, CalendarEvent } from '../types';
import { 
  Play, 
  BookOpen, 
  Flame, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Target, 
  Compass, 
  GraduationCap, 
  FileCheck2,
  Lock,
  Package,
  ShieldCheck,
  Download,
  CreditCard
} from 'lucide-react';

interface DashboardProps {
  currentUser: User;
  courses: Course[];
  ebooks: Ebook[];
  calendarEvents: CalendarEvent[];
  onOpenCourse: (course: Course) => void;
  onOpenEbook: (ebook: Ebook) => void;
  onOpenCheckout: (item: Course | Ebook) => void;
  onOpenMatricula: (course: Course) => void;
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  courses,
  ebooks,
  calendarEvents,
  onOpenCourse,
  onOpenEbook,
  onOpenCheckout,
  onOpenMatricula,
  onNavigate,
}) => {
  const isStudent = currentUser.role === 'student';
  const isClient = currentUser.role === 'client';
  const isAdmin = currentUser.role === 'admin';

  // Filter enrolled / purchased courses & ebooks
  const enrolledCourses = courses.filter(c => 
    currentUser.unlockedProductIds.includes(c.id) || isAdmin
  );
  const enrolledEbooks = ebooks.filter(e => 
    currentUser.unlockedProductIds.includes(e.id) || isAdmin
  );

  // Available to purchase
  const availableCourses = courses.filter(c => 
    !currentUser.unlockedProductIds.includes(c.id) && !isAdmin
  );
  const availableEbooks = ebooks.filter(e => 
    !currentUser.unlockedProductIds.includes(e.id) && !isAdmin
  );

  // Next recommended lesson from enrolled courses
  const primaryCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
  const allPrimaryLessons = primaryCourse?.modules.flatMap(m => m.lessons) || [];
  const nextLesson = allPrimaryLessons.find(l => !currentUser.completedLessonIds.includes(l.id)) || allPrimaryLessons[0] || null;

  const totalLessonsCount = courses.flatMap(c => c.modules.flatMap(m => m.lessons)).length;
  const completedLessonsCount = currentUser.completedLessonIds.length;
  const progressRatio = Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100);

  // Academic learning goals (Only for student role)
  const studyGoals = [
    {
      id: 'g1',
      title: 'Dominar o Modelo Trifásico da Ansiedade',
      category: 'Módulo 1 · Regulação Emocional',
      completed: currentUser.completedLessonIds.includes('aula-1-1'),
      targetXp: 50,
    },
    {
      id: 'g2',
      title: 'Praticar o Exercício do Suspiro Fisiológico',
      category: 'Prática Clínica Somática',
      completed: currentUser.completedLessonIds.includes('aula-1-2'),
      targetXp: 50,
    },
    {
      id: 'g3',
      title: 'Completar o Tribunal dos Pensamentos (E-book pág. 15)',
      category: 'Caderno de Exercícios Terapêuticos',
      completed: (currentUser.readingProgress['ebook-guia-ansiedade'] || 0) >= 15,
      targetXp: 80,
    },
    {
      id: 'g4',
      title: 'Entregar Conceitualização Cognitiva de Caso',
      category: 'Meta Acadêmica do Módulo 2',
      completed: false,
      targetXp: 120,
    }
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 overflow-x-hidden">
      
      {/* ========================================================
          HERO BANNER: Differentiated for Student vs Client vs Admin
          ======================================================== */}
      {isClient ? (
        /* SÓ CLIENTE DOS CURSOS: Commercial Client Header */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#1E2E4E] text-white p-6 sm:p-8 shadow-xl border border-slate-700/50 w-full">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#BA8E48] tracking-wider uppercase">
                <Package className="w-4 h-4 shrink-0" />
                <span className="truncate">Área de Membros · Meus Produtos Adquiridos</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Olá, {currentUser.name}!
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Bem-vindo à sua área de cliente. Aqui você acessa seus treinamentos contratados com Patrick Ramon, reproduz as videoaulas em Full HD e baixa as apostilas complementares.
              </p>
            </div>

            {/* Client Status Badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#BA8E48] to-[#D4AA6A] text-[#101B30] flex items-center justify-center font-bold shadow-md shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Cliente Verificado</div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span className="font-semibold text-white">{enrolledCourses.length} cursos</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">Acesso Vitalício</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Suporte direto por Patrick Ramon CRP 09|22010
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SÓ ALUNA / ACADÊMICO / ADMIN: Student Academic Header */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#2B3F66] text-white p-6 sm:p-8 shadow-xl border border-slate-700/50 w-full">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#BA8E48] tracking-wider uppercase">
                <Compass className="w-4 h-4 shrink-0" />
                <span className="truncate">Ambiente Acadêmico · Patrick Ramon CRP 09|22010</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Olá, {currentUser.name}!
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {enrolledCourses.length > 0 
                  ? 'Continue sua formação clínica em TCC baseada em evidências, regulação afetiva e estudos de caso.'
                  : 'Seja bem-vindo ao portal! Escolha um dos cursos abaixo para iniciar sua jornada e desbloquear suas aulas.'}
              </p>
            </div>

            {/* Student Gamification Badge */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#BA8E48] to-[#E3C38D] text-[#101B30] flex flex-col items-center justify-center font-bold shadow-md shrink-0">
                <span className="text-[9px] uppercase font-sans tracking-tight">Nível</span>
                <span className="text-lg font-serif leading-none">{currentUser.level}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">
                  {currentUser.level === 1 ? 'Aprendiz Consciente' : currentUser.level === 2 ? 'Praticante Atento' : 'Terapeuta Integrado'}
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-white tabular-nums">{currentUser.xp} XP</span>
                  <span>·</span>
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {currentUser.streakDays} dias seguidos
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('gamification')}
                  className="mt-1.5 text-[11px] text-[#BA8E48] hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ver Placar de Conquistas & Recompensas</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          KPI STATS STRIP
          ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 truncate">
            {isClient ? 'Cursos Ativos' : 'Aulas Concluídas'}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-[#101B30] tabular-nums">
            {isClient ? `${enrolledCourses.length} cursos` : `${completedLessonsCount}`}
            {!isClient && <span className="text-xs font-sans font-normal text-slate-400"> / {totalLessonsCount}</span>}
          </div>
          <div className="mt-1.5 text-[11px] text-emerald-700 font-medium truncate">
            {isClient ? 'Acesso total liberado' : `${progressRatio}% do currículo percorrido`}
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 truncate">
            Tempo em Imersão
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-[#101B30] tabular-nums">
            {completedLessonsCount * 0.5 + (enrolledCourses.length > 0 ? 2.5 : 0)} <span className="text-xs font-sans font-normal text-slate-400">horas</span>
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 truncate">
            Aulas + apostilas
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 truncate">
            {isClient ? 'E-books Digitais' : 'Páginas Lidas'}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-[#101B30] tabular-nums">
            {isClient ? `${enrolledEbooks.length} e-books` : Object.values(currentUser.readingProgress).reduce((a, b) => a + b, 0)} 
            {!isClient && <span className="text-xs font-sans font-normal text-slate-400"> págs</span>}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 truncate">
            No leitor interno integrado
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 truncate">
            {isClient ? 'Garantia de Compra' : 'Constância Ativa'}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-amber-700 flex items-center gap-2 tabular-nums">
            {isClient ? (
              <span className="text-emerald-700 text-lg flex items-center gap-1.5 font-sans font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                100% Protegido
              </span>
            ) : (
              <>
                <Flame className="w-5 h-5 fill-amber-500 text-amber-600" />
                <span>{currentUser.streakDays} dias</span>
              </>
            )}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-500 truncate">
            {isClient ? 'Comprovante com CNPJ' : 'Meta diária superada hoje!'}
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN BODY: Client Experience vs Student Experience
          ======================================================== */}
      {isClient ? (
        /* SÓ CLIENTE: Clean purchased library without academic pressure */
        <div className="space-y-8">
          
          {/* Purchased Courses Library */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#BA8E48]">
                  Minha Biblioteca
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#101B30]">
                  Cursos Adquiridos ({enrolledCourses.length})
                </h2>
              </div>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-3">
                <p>Nenhum curso comprado ainda na sua conta.</p>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-5 py-2.5 bg-[#101B30] text-white rounded-xl font-bold hover:bg-black transition-colors"
                >
                  Explorar Catálogo de Cursos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
                  <div
                    key={course.id}
                    className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-[#BA8E48] transition-all shadow-xs flex flex-col justify-between group min-w-0"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-md">
                          Acesso Liberado
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {course.totalLessons} Aulas
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-[#101B30] group-hover:text-[#BA8E48] transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {course.subtitle}
                      </p>

                      <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                        <div className="flex justify-between text-slate-500 text-[11px]">
                          <span>Carga Horária:</span>
                          <span className="font-semibold text-slate-700">{course.totalHours}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[11px]">
                          <span>Instrutor:</span>
                          <span className="font-semibold text-slate-700">Patrick Ramon</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                      <button
                        onClick={() => onOpenCourse(course)}
                        className="w-full py-3 bg-[#101B30] hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#BA8E48]" />
                        <span>Assistir Aulas do Curso</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Purchased E-books */}
          {enrolledEbooks.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-serif font-bold text-xl text-[#101B30]">
                Meus E-books no Leitor Integrado ({enrolledEbooks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledEbooks.map(ebook => (
                  <div
                    key={ebook.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#BA8E48] transition-all shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48]">
                        {ebook.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#101B30] truncate">
                        {ebook.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{ebook.totalPages} páginas com leitor interno</p>
                    </div>
                    <button
                      onClick={() => onOpenEbook(ebook)}
                      className="px-4 py-2.5 bg-[#BA8E48] hover:bg-[#D4AA6A] text-[#101B30] font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Abrir Leitor</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other courses available for purchase */}
          {availableCourses.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#BA8E48]">
                    Novidades no Catálogo
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#101B30]">
                    Outros Cursos Disponíveis para Compra
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCourses.map(course => (
                  <div
                    key={course.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#BA8E48] transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48]">
                        {course.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#101B30] mt-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {course.subtitle}
                      </p>
                    </div>
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="font-serif text-base font-bold text-[#101B30]">
                        R$ {course.price.toFixed(2)}
                      </div>
                      <button
                        onClick={() => onOpenMatricula(course)}
                        className="px-4 py-2 bg-[#101B30] hover:bg-black text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#BA8E48]" />
                        <span>Comprar / Matricular</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* SÓ ALUNA / ACADÊMICO: Comprehensive Academic Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start w-full">
          
          {/* Left Column (8 cols): Lessons & Courses */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            
            {primaryCourse && nextLesson ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-bold text-xl text-[#101B30] flex items-center gap-2">
                    <Play className="w-5 h-5 text-[#BA8E48] fill-current" />
                    <span>Próxima Etapa de Estudo</span>
                  </h2>
                  <button
                    onClick={() => onOpenCourse(primaryCourse)}
                    className="text-xs font-semibold text-[#101B30] hover:text-[#BA8E48] transition-colors cursor-pointer"
                  >
                    Ver Grade Completa →
                  </button>
                </div>

                {/* Next Lesson Card */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#BA8E48] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-lg min-w-0">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#BA8E48] uppercase tracking-wider">
                      <span>{primaryCourse.title}</span>
                      <span>·</span>
                      <span>{nextLesson.duration}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#101B30]">
                      {nextLesson.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {nextLesson.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenCourse(primaryCourse)}
                    className="px-6 py-3.5 bg-[#101B30] hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-transform transform hover:scale-105 flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-[#BA8E48]" />
                    <span>Continuar Aula</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50/70 to-orange-50/40 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#BA8E48] border border-[#BA8E48]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Primeiro Passo Acadêmico</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#101B30]">
                  Você ainda não possui cursos matriculados
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  Comece sua especialização com os treinamentos oficiais de Patrick Ramon. Assim que sua matrícula for confirmada, todas as videoaulas, certificados e materiais complementares serão liberados instantaneamente.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (courses[0]) onOpenMatricula(courses[0]);
                    }}
                    className="px-6 py-3 bg-[#101B30] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                    <span>Escolher Curso & Matricular-se</span>
                  </button>
                </div>
              </div>
            )}

            {/* Enrolled Courses Showcase */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif font-bold text-lg text-[#101B30]">
                Meus Cursos Matriculados
              </h3>

              {enrolledCourses.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                  <p>Nenhum curso matriculado no momento.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledCourses.map(course => (
                    <div
                      key={course.id}
                      className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-[#BA8E48] transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48] mb-1 block">
                          {course.category}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#101B30] mb-2 line-clamp-1">
                          {course.title}
                        </h4>
                        <div className="text-xs text-slate-500 mb-3 font-mono">
                          {course.totalLessons} Aulas · {course.totalHours}
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenCourse(course)}
                        className="w-full py-2.5 bg-[#101B30] hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#BA8E48]" />
                        <span>Acessar Aulas</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enrolled E-books Showcase */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif font-bold text-lg text-[#101B30]">
                Meus E-books no Leitor Integrado
              </h3>

              {enrolledEbooks.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                  Nenhum e-book desbloqueado ainda. Confira os guias práticos recomendados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledEbooks.map(ebook => (
                    <div
                      key={ebook.id}
                      className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-[#BA8E48] transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48] mb-1">
                          {ebook.category}
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#101B30] mb-1 line-clamp-1">
                          {ebook.title}
                        </h4>
                        <div className="text-xs text-slate-500 mb-3 font-mono">
                          Progresso: Página {currentUser.readingProgress[ebook.id] || 1} de {ebook.totalPages}
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenEbook(ebook)}
                        className="w-full py-2 bg-[#BA8E48] hover:bg-[#D4AA6A] text-[#101B30] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Abrir no Leitor Interno</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (4 cols): Academic Metas & Calendar */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
            
            {/* Metas de Aprendizagem */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#101B30] flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#BA8E48]" />
                  <span>Metas de Aprendizagem</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  {studyGoals.filter(g => g.completed).length} / {studyGoals.length}
                </span>
              </div>

              <div className="space-y-3">
                {studyGoals.map(goal => (
                  <div
                    key={goal.id}
                    className={`p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                      goal.completed
                        ? 'bg-emerald-50/50 border-emerald-200/70 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {goal.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold line-clamp-1 ${goal.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {goal.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {goal.category} · +{goal.targetXp} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos Compromissos no Calendário */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#101B30] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#BA8E48]" />
                  <span>Agenda Acadêmica</span>
                </h3>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="text-xs text-[#BA8E48] hover:underline font-semibold cursor-pointer"
                >
                  Ver Todos
                </button>
              </div>

              <div className="space-y-3">
                {calendarEvents.slice(0, 3).map(ev => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#BA8E48] transition-colors bg-white text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-[#BA8E48]">
                        {ev.date} · {ev.time}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {ev.type === 'live' ? 'Ao Vivo' : 'Prazo'}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800 line-clamp-1">
                      {ev.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {ev.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificado de Conclusão */}
            <div className="p-5 bg-gradient-to-br from-[#FAF9F6] to-[#F3EFE6] rounded-2xl border border-[#BA8E48]/30 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#101B30] uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4 text-[#BA8E48]" />
                <span>Certificado Oficial</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete as aulas e atinja os requisitos para emitir seu certificado assinado com registro ativo no CRP 09|22010.
              </p>
              <button
                onClick={() => onNavigate('gamification')}
                className="text-xs font-bold text-[#101B30] hover:text-[#BA8E48] transition-colors flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Ver requisitos do certificado</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Available to Unlock / Store Row */}
      {availableCourses.length > 0 && !isClient && (
        <div className="pt-8 border-t border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#BA8E48]">
                Expansão Contínua
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#101B30]">
                Cursos Disponíveis para Matrícula
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableCourses.map(course => (
              <div
                key={course.id}
                onClick={() => onOpenMatricula(course)}
                className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#BA8E48] transition-all shadow-xs flex flex-col justify-between cursor-pointer group min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48]">
                      {course.category}
                    </span>
                    <Lock className="w-4 h-4 text-slate-400 group-hover:text-[#BA8E48] transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#101B30] mb-2 line-clamp-1 group-hover:text-[#BA8E48] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="font-serif text-lg font-bold text-[#101B30]">
                    R$ {course.price.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMatricula(course);
                    }}
                    className="px-4 py-2 bg-[#101B30] hover:bg-black text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#BA8E48]" />
                    <span>Matricular-se</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
