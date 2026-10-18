import React from 'react';
import { Course, Ebook, User } from '../types';
import { BrandLogo } from './BrandLogo';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { FAQ } from './FAQ';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Play, 
  Clock, 
  FileCheck, 
  Heart, 
  Brain, 
  Compass, 
  MessageCircle,
  HelpCircle,
  Lock
} from 'lucide-react';

interface LandingPageProps {
  courses: Course[];
  ebooks: Ebook[];
  currentUser: User | null;
  onOpenCourse: (course: Course) => void;
  onOpenEbook: (ebook: Ebook) => void;
  onOpenCheckout: (item: Course | Ebook) => void;
  onOpenMatricula: (course: Course) => void;
  onNavigate: (view: string) => void;
  onSelectUserPersona: (userId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  courses,
  ebooks,
  currentUser,
  onOpenCourse,
  onOpenEbook,
  onOpenCheckout,
  onOpenMatricula,
  onNavigate,
  onSelectUserPersona,
}) => {
  const isVisitor = !currentUser || currentUser.role === 'visitor';

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-16 sm:space-y-24 pb-20 select-none">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-b from-[#FAF9F6] via-[#F4EFE6]/50 to-[#FAF9F6] border-b border-[#101B30]/10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Editorial Typography */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#C49A5A]/30 rounded-full text-[11px] sm:text-xs font-semibold text-[#101B30] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C49A5A] shrink-0" />
                <span className="truncate">Portal Oficial do Psicólogo Patrick Ramon · CRP 09|22010</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#101B30] leading-[1.15] tracking-tight">
                Ciência clínica, neurobiologia e acolhimento para sua evolução.
              </h1>

              <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-sans">
                Acesse cursos estruturados com base na Terapia Cognitivo-Comportamental, manuais práticos e e-books terapêuticos desenhados para estudantes de psicologia, profissionais da saúde e indivíduos em busca de regulação emocional e equilíbrio.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#cursos"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#101B30] hover:bg-black text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                >
                  <span>Explorar Cursos & Matrículas</span>
                  <ArrowRight className="w-4 h-4 text-[#C49A5A]" />
                </a>

                {currentUser && !isVisitor ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('dashboard')}
                    className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white border border-[#101B30]/20 hover:border-[#101B30] text-[#101B30] font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#BA8E48]" />
                    <span>{currentUser.role === 'client' ? 'Ver Meus Cursos Comprados' : 'Entrar no Meu Portal do Aluno'}</span>
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectUserPersona('user-camila')}
                      className="px-4 sm:px-5 py-3 bg-white border border-emerald-600/30 hover:border-emerald-700 text-emerald-900 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>Ver como <strong>Só Aluna</strong></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectUserPersona('user-roberto')}
                      className="px-4 sm:px-5 py-3 bg-white border border-blue-600/30 hover:border-blue-700 text-blue-900 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Ver como <strong>Só Cliente</strong></span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Trust Pillars */}
              <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200/80 max-w-xl text-xs">
                <div>
                  <div className="font-serif font-bold text-lg sm:text-xl text-[#101B30] tabular-nums">+1.400h</div>
                  <div className="text-slate-500 text-[10px] sm:text-[11px]">De Atendimento Clínico</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg sm:text-xl text-[#101B30] tabular-nums">100%</div>
                  <div className="text-slate-500 text-[10px] sm:text-[11px]">Baseado em Evidências</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg sm:text-xl text-[#101B30] tabular-nums">CRP 09|22010</div>
                  <div className="text-slate-500 text-[10px] sm:text-[11px]">Registro Profissional</div>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Brand Card / Office Mockup */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 text-center space-y-5 sm:space-y-6">
                
                {/* Visual Emblem */}
                <div className="mx-auto flex justify-center py-1">
                  <BrandLogo size="lg" variant="full" />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#C49A5A]">
                    Psicólogo Clínico & Docente
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B30]">
                    Patrick Ramon
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Especialista em Psicoterapia Cognitivo-Comportamental, Regulação Afetiva e Terapias de Terceira Onda. Docente em formações continuadas para psicólogos e terapeutas.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl text-left text-xs space-y-2 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Visualizador de E-books e Apostilas Integrado</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Aulas em Vídeo Full HD com Transcrição</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certificado de Conclusão Assinado (CRP)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gamificação & Calendário de Estudos</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href="#cursos"
                    className="w-full py-3 bg-[#C49A5A] hover:bg-[#D4AA6A] text-[#101B30] font-bold text-xs rounded-xl shadow-xs transition-colors block cursor-pointer"
                  >
                    Ver Cursos Disponíveis & Matrícula
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section id="cursos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A5A]">
              Treinamentos & Formações
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101B30] mt-1">
              Cursos Oficiais com Patrick Ramon
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Conteúdo com rigor científico e aplicabilidade clínica imediata. Ao clicar no curso, você é direcionado à página de matrícula detalhada.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {courses.map(course => {
            // Strict check: ONLY logged-in users with the specific product unlocked have access
            const hasAccess = !!currentUser && currentUser.role !== 'visitor' && (currentUser.unlockedProductIds.includes(course.id) || currentUser.role === 'admin');

            return (
              <div
                key={course.id}
                onClick={() => {
                  if (hasAccess) {
                    onOpenCourse(course);
                  } else {
                    onOpenMatricula(course);
                  }
                }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#C49A5A] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Decorative Header Art */}
                  <div
                    className="h-44 p-6 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{ background: course.coverImage }}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                      {course.badgeText && (
                        <span className="px-2.5 py-1 bg-[#C49A5A] text-[#101B30] font-bold text-[10px] uppercase rounded-lg shadow-xs">
                          {course.badgeText}
                        </span>
                      )}
                    </div>

                    <div className="z-10">
                      <div className="flex items-center gap-1.5 text-xs text-amber-200">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-white/70">({course.reviewsCount} alunos)</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-serif font-bold text-xl text-[#101B30] group-hover:text-[#C49A5A] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.subtitle}
                    </p>

                    <div className="pt-2 flex items-center gap-3 sm:gap-4 text-xs font-mono text-slate-500 border-t border-slate-100">
                      <span>{course.totalLessons} Aulas</span>
                      <span>·</span>
                      <span>{course.totalHours}</span>
                      <span>·</span>
                      <span>Certificado CRP</span>
                    </div>

                    {/* Learning Goals Bullet Points */}
                    <div className="space-y-1.5 pt-2">
                      {course.learningGoals.slice(0, 2).map((goal, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Price & Actions */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mb-4">
                    <div>
                      {course.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          R$ {course.originalPrice.toFixed(2)}
                        </div>
                      )}
                      <div className="font-serif text-2xl font-bold text-[#101B30]">
                        R$ {course.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400">
                      ou até 12x no cartão
                    </div>
                  </div>

                  {/* ONLY show 'Continuar Assistindo' when user is logged in as an enrolled student */}
                  {hasAccess ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCourse(course);
                      }}
                      className="w-full py-3 bg-[#101B30] hover:bg-black text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current text-[#C49A5A]" />
                      <span>Continuar Assistindo</span>
                    </button>
                  ) : (
                    /* When NOT logged in or not enrolled: ALWAYS show enrollment button to redirect to 'página matricular' */
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMatricula(course);
                        }}
                        className="w-full py-3 bg-[#101B30] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#C49A5A]" />
                        <span>Garantir Vaga / Matricular-se</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMatricula(course);
                        }}
                        className="w-full py-2 border border-slate-300 hover:border-[#101B30] text-slate-700 hover:text-[#101B30] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Conhecer Grade & Matrícula →</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Mini E-books & Guides Section (With In-App Reader) */}
      <section id="ebooks" className="bg-[#FAF9F6] py-12 border-y border-slate-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A5A]">
              Publicações & Cadernos de Exercícios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101B30] mt-1">
              E-books com Leitor Digital Integrado
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Leia diretamente no portal através do nosso visualizador de alta legibilidade, com ajuste de fonte, modo noturno, sumário e anotação de reflexões.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ebooks.map(ebook => {
              const hasAccess = !!currentUser && currentUser.role !== 'visitor' && (currentUser.unlockedProductIds.includes(ebook.id) || currentUser.role === 'admin');

              return (
                <div
                  key={ebook.id}
                  className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 hover:border-[#C49A5A] transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A5A]">
                        {ebook.category}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {ebook.totalPages} Páginas · {ebook.chapters.length} Capítulos
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-[#101B30]">
                      {ebook.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ebook.description}
                    </p>

                    {/* Chapter Preview Pill list */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="font-semibold text-slate-700">Índice Geral de Conteúdos:</div>
                      {ebook.chapters.map(ch => (
                        <div key={ch.id} className="flex items-center justify-between text-slate-600">
                          <span className="truncate pr-2">• {ch.title}</span>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">p. {ch.pageStart}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                    <div>
                      {ebook.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          R$ {ebook.originalPrice.toFixed(2)}
                        </div>
                      )}
                      <div className="font-serif text-2xl font-bold text-[#101B30]">
                        R$ {ebook.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenEbook(ebook)}
                        className="px-3.5 sm:px-4 py-2.5 border border-slate-300 hover:border-[#101B30] text-[#101B30] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#C49A5A]" />
                        <span>{hasAccess ? 'Ler no Portal' : 'Degustar Cap. 1'}</span>
                      </button>

                      {!hasAccess && (
                        <button
                          type="button"
                          onClick={() => onOpenCheckout(ebook)}
                          className="px-3.5 sm:px-4 py-2.5 bg-[#C49A5A] hover:bg-[#D4AA6A] text-[#101B30] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Comprar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Patrick Ramon & Clinical Approach */}
      <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A5A]">
              Trajetória & Filosofia Clínica
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101B30]">
              Uma prática fundamentada no rigor científico e na profunda escuta humana.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Olá, eu sou Patrick Ramon (CRP 09|22010). Como psicólogo clínico, meu trabalho converge a neurobiologia do estresse e do trauma com intervenções estruturadas da Terapia Cognitivo-Comportamental e das abordagens contemporâneas de Terceira Onda.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Criei este portal com um objetivo singular: oferecer aos meus alunos, mentorados e pacientes um ambiente contínuo de aprendizado, onde o conhecimento não fica restrito ao consultório, mas se traduz em ferramentas cotidianas de autorregulação e autocompaixão.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <Brain className="w-6 h-6 text-[#C49A5A] mb-2" />
                <h4 className="font-bold text-xs text-[#101B30]">Neurobiologia Aplicada</h4>
                <p className="text-[11px] text-slate-500 mt-1">Intervenções somáticas de regulação vagal e eixo HPA.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <Heart className="w-6 h-6 text-[#C49A5A] mb-2" />
                <h4 className="font-bold text-xs text-[#101B30]">Acolhimento Ético</h4>
                <p className="text-[11px] text-slate-500 mt-1">Total observância aos preceitos éticos do CFP.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 w-full">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#101B30] to-[#1B2A4A] text-white rounded-3xl shadow-xl space-y-5 sm:space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[#C49A5A] bg-[#FAF9F6] text-[#101B30] flex items-center justify-center font-serif font-bold text-xl shrink-0">
                  <BrandLogo size="sm" variant="monogram" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-lg sm:text-xl">Patrick Ramon</h3>
                  <p className="text-xs text-[#C49A5A]">Psicólogo Clínico · CRP 09|22010</p>
                  <p className="text-[11px] text-slate-400">Atendimentos Presenciais e Telepsicologia</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white/10 rounded-2xl border border-white/10 space-y-2">
                <div className="font-serif italic text-xs sm:text-sm text-amber-200 leading-relaxed">
                  "A terapia não se trata de eliminar o desconforto a qualquer custo, mas de expandir a capacidade humana de acolhê-lo com sabedoria, consciência e coragem."
                </div>
                <div className="text-[11px] text-slate-400 text-right">— Patrick Ramon</div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold text-slate-300">
                  Interessado em psicoterapia individual ou supervisão clínica?
                </div>
                <a
                  href="https://wa.me/5562999999999?text=Olá%20Patrick,%20gostaria%20de%20informações%20sobre%20atendimentos%20clínicos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#C49A5A] hover:bg-[#D4AA6A] text-[#101B30] font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Conversar no WhatsApp do Consultório</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Testimonials Carousel Component */}
      <TestimonialsCarousel />

      {/* Dedicated FAQ Component */}
      <FAQ />

      {/* Footer */}
      <footer className="pt-12 border-t border-slate-200 text-slate-600 text-xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <BrandLogo size="md" variant="full" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500">
              <a href="#cursos" className="hover:text-[#101B30] transition-colors">Cursos</a>
              <a href="#ebooks" className="hover:text-[#101B30] transition-colors">E-books</a>
              <a href="#sobre" className="hover:text-[#101B30] transition-colors">Sobre</a>
              <a href="#depoimentos" className="hover:text-[#101B30] transition-colors">Depoimentos</a>
              <a href="#faq" className="hover:text-[#101B30] transition-colors">Dúvidas Frequentes</a>
              <button 
                type="button"
                onClick={() => onNavigate('dashboard')} 
                className="hover:text-[#101B30] transition-colors cursor-pointer"
              >
                Portal do Aluno
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 text-center sm:text-left">
            <div>
              © 2026 Patrick Ramon · Psicólogo Clínico CRP 09|22010. Todos os direitos reservados.
            </div>
            <div>
              Atendimento e práticas em conformidade com o Código de Ética Profissional do Psicólogo (CFP).
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
