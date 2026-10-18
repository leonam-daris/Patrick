import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  courseCompleted: string;
  rating: number;
  highlight: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dra. Camila Alencar',
    role: 'Psicóloga Clínica & Especialista em Ansiedade',
    location: 'São Paulo - SP',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    courseCompleted: 'Regulação Emocional & Manejo da Ansiedade na Prática',
    rating: 5,
    highlight: 'Intervenções somáticas de impacto imediato nos atendimentos.',
    quote: 'O treinamento do Patrick transformou meu raciocínio clínico. A forma como ele articula a neurobiologia da amígdala e o tônus vagal com intervenções práticas da TCC facilitou a psicoeducação com meus pacientes. Os materiais complementares em PDF são de um refinamento ímpar.'
  },
  {
    id: 't-2',
    name: 'Dr. Eduardo Costa',
    role: 'Psicoterapeuta Cognitivo & Supervisor',
    location: 'Belo Horizonte - MG',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    courseCompleted: 'TCC Aplicada: Protocolos e Prática Contemporânea',
    rating: 5,
    highlight: 'Segurança técnica absoluta para formulação de casos complexos.',
    quote: 'A conceitualização cognitiva estruturada por Patrick permite mapear crenças nucleares com rigor e rapidez. A plataforma do curso é intuitiva: o visualizador de e-book e as anotações sincronizadas no vídeo tornam o estudo diário muito agradável.'
  },
  {
    id: 't-3',
    name: 'Beatriz Melo',
    role: 'Terapeuta em Formação & Aluna de Pós-Graduação',
    location: 'Goiânia - GO',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    courseCompleted: 'Supervisão & Discussão de Casos Clínicos em Saúde Mental',
    rating: 5,
    highlight: 'Acolhimento empático e didática cirúrgica de Patrick Ramon.',
    quote: 'Em início de carreira, a insegurança clínica é muito comum. As aulas gravadas e as supervisões ao vivo com Patrick me deram o chão teórico e a serenidade que a graduação não ensina. Ter o certificado assinado com o registro CRP 09|22010 traz enorme credibilidade.'
  },
  {
    id: 't-4',
    name: 'Mateus Rezende',
    role: 'Estudante do 9º Período de Psicologia',
    location: 'Curitiba - PR',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    courseCompleted: 'E-book: Guia Prático de Regulação Emocional',
    rating: 5,
    highlight: 'O visualizador interno de e-books revolucionou minha rotina.',
    quote: 'Poder ler as páginas no modo sépia pelo celular, fazer anotações de autoestudo e voltar no dia seguinte de onde parei sem perder o progresso é fantástico. A gamificação com pontos de XP e metas acadêmicas mantém o foco lá em cima.'
  }
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 6 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      id="depoimentos" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#B38E5D]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Depoimentos & Avaliações Reais</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B2A4A] mt-1 tracking-tight">
            A Experiência de Quem Já Aprendeu com Patrick
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Profissionais e estudantes relatam o impacto prático dos cursos, e-books e supervisões clínicas.
          </p>
        </div>

        {/* Carousel Controls Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-slate-300 hover:border-[#1B2A4A] bg-white text-slate-700 hover:text-[#1B2A4A] transition-colors shadow-xs"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-slate-500 px-2">
            0{currentIndex + 1} / 0{TESTIMONIALS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-slate-300 hover:border-[#1B2A4A] bg-white text-slate-700 hover:text-[#1B2A4A] transition-colors shadow-xs"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Carousel Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 transition-all overflow-hidden">
        {/* Subtle decorative quote watermark in background */}
        <div className="absolute right-6 top-6 text-[#1B2A4A]/5 pointer-events-none select-none">
          <Quote className="w-24 h-24 sm:w-36 sm:h-36" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Quote & Highlight (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Stars & Highlight */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aluno Verificado
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B2A4A] leading-snug">
              "{current.highlight}"
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              "{current.quote}"
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold text-[#B38E5D] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Formação Concluída: {current.courseCompleted}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Author Card & Badge (4 cols) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 flex flex-row lg:flex-col items-center lg:items-start gap-4">
            <img
              src={current.avatar}
              alt={current.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#B38E5D] shadow-md shrink-0"
            />
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1B2A4A]">
                {current.name}
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                {current.role}
              </p>
              <p className="text-[11px] text-slate-400">
                {current.location}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx 
                ? 'w-8 bg-[#B38E5D]' 
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Ir para depoimento ${idx + 1}`}
          />
        ))}
      </div>

      {/* Social Proof Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80 text-center">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-xs">
          <div className="font-serif font-bold text-2xl text-[#1B2A4A] tabular-nums">4.95 / 5.0</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Média de Avaliação dos Cursos</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-xs">
          <div className="font-serif font-bold text-2xl text-[#1B2A4A] tabular-nums">+850</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Psicólogos & Alunos Formados</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-xs">
          <div className="font-serif font-bold text-2xl text-[#1B2A4A] tabular-nums">100%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Baseado em Evidências Científicas</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-xs">
          <div className="font-serif font-bold text-2xl text-[#1B2A4A] tabular-nums">CRP 09|22010</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Docência & Certificação Oficial</div>
        </div>
      </div>

    </section>
  );
};
