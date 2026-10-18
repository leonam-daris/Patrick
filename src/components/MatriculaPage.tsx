import React, { useState } from 'react';
import { Course, User } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Clock, 
  Star, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Layers, 
  Users 
} from 'lucide-react';

interface MatriculaPageProps {
  course: Course;
  currentUser: User | null;
  onBack: () => void;
  onPaymentSuccess: (course: Course) => void;
  onOpenCourseDirectly?: (course: Course) => void;
}

export const MatriculaPage: React.FC<MatriculaPageProps> = ({
  course,
  currentUser,
  onBack,
  onPaymentSuccess,
  onOpenCourseDirectly,
}) => {
  const isAlreadyEnrolled = !!currentUser && (currentUser.unlockedProductIds.includes(course.id) || currentUser.role === 'admin');

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'paypal'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Form fields
  const [buyerName, setBuyerName] = useState(currentUser?.name || 'Dr. Roberto Mendes');
  const [buyerEmail, setBuyerEmail] = useState(currentUser?.email || 'roberto.mendes@clinica.med.br');
  const [buyerCpf, setBuyerCpf] = useState('342.981.650-84');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('824');
  const [installments, setInstallments] = useState(1);

  // Dynamic PIX payload string
  const pixKey = `00020126580014br.gov.bcb.pix0136patrick.ramon.crp09@instituto.com.br520400005303986540${course.price.toFixed(2)}5802BR5913PATRICK RAMON6009GOIANIA62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onPaymentSuccess(course);
    }, 1500);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#FAF9F6] text-slate-800 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#101B30] text-white py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#1B2A4A]/50 sticky top-16 sm:top-20 z-30 shadow-xs w-full">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#BA8E48] group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Catálogo</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#BA8E48]">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Ambiente Seguro de Matrícula</span>
            <span>· CRP 09|22010</span>
          </div>
        </div>
      </div>

      {/* Main Page Container constrained to 1240px with comfortable padding to prevent desktop edge cutting */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* If user is already enrolled */}
        {isAlreadyEnrolled && (
          <div className="mb-6 p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <h4 className="font-bold text-emerald-900 text-sm">Você já possui matrícula ativa neste curso!</h4>
                <p className="text-emerald-700 text-xs">Seu acesso está liberado no Portal do Aluno com todas as aulas e certificados.</p>
              </div>
            </div>
            {onOpenCourseDirectly && (
              <button
                onClick={() => onOpenCourseDirectly(course)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continuar Assistindo</span>
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          
          {/* Left Column (7 cols): Course Syllabus & Pedagogical Value */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 min-w-0">
            
            {/* Header info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#101B30] text-[#BA8E48] text-xs font-bold rounded-lg uppercase tracking-wider">
                  {course.category}
                </span>
                {course.badgeText && (
                  <span className="px-3 py-1 bg-[#BA8E48] text-[#101B30] text-xs font-bold rounded-lg uppercase">
                    {course.badgeText}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-amber-600 font-bold ml-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.reviewsCount} avaliações)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#101B30] leading-[1.18] break-words">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {course.subtitle}
              </p>

              {/* Instructor Badge with image 1 logo */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs max-w-md">
                <div className="shrink-0">
                  <BrandLogo size="sm" variant="monogram" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Docente Responsável</div>
                  <div className="font-serif font-bold text-slate-900 text-sm">Patrick Ramon</div>
                  <div className="text-xs text-[#BA8E48] font-semibold">Psicólogo Clínico · CRP 09|22010</div>
                </div>
              </div>
            </div>

            {/* What is included strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 text-center">
              <div className="p-2 space-y-1">
                <Clock className="w-5 h-5 text-[#BA8E48] mx-auto" />
                <div className="font-bold text-xs text-slate-800">{course.totalHours}</div>
                <div className="text-[10px] text-slate-500">Carga Horária</div>
              </div>
              <div className="p-2 space-y-1">
                <Layers className="w-5 h-5 text-[#BA8E48] mx-auto" />
                <div className="font-bold text-xs text-slate-800">{course.totalLessons} Aulas</div>
                <div className="text-[10px] text-slate-500">Videoaulas Full HD</div>
              </div>
              <div className="p-2 space-y-1">
                <BookOpen className="w-5 h-5 text-[#BA8E48] mx-auto" />
                <div className="font-bold text-xs text-slate-800">Leitor Integrado</div>
                <div className="text-[10px] text-slate-500">PDFs e Exercícios</div>
              </div>
              <div className="p-2 space-y-1">
                <Award className="w-5 h-5 text-[#BA8E48] mx-auto" />
                <div className="font-bold text-xs text-slate-800">Certificado</div>
                <div className="text-[10px] text-slate-500">Válido com CRP</div>
              </div>
            </div>

            {/* Description & Competencies */}
            <div className="space-y-4 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B30]">
                O que você vai dominar neste treinamento
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.learningGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Syllabus Breakdown */}
            <div className="space-y-4 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B30]">
                  Grade Curricular Completa
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {course.modules.length} Módulos pedagógicos · {course.totalLessons} Aulas estruturadas
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="p-3.5 sm:p-4 bg-slate-50/80 border-b border-slate-200/70 flex items-center justify-between">
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA8E48]">
                          Módulo {modIdx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-slate-800 text-sm sm:text-base truncate">
                          {mod.title}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-500 font-mono shrink-0">
                        {mod.lessons.length} aulas
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {mod.lessons.map(lesson => (
                        <div key={lesson.id} className="p-3 sm:p-3.5 px-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-[#101B30]/5 text-[#101B30] flex items-center justify-center shrink-0">
                              <Play className="w-3 h-3 fill-current" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-800 truncate">{lesson.title}</div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">{lesson.summary}</div>
                            </div>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px] shrink-0">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="p-5 sm:p-6 bg-amber-50/60 rounded-3xl border border-amber-200/70 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-[#BA8E48] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-serif font-bold text-base text-[#101B30]">
                  Garantia Incondicional de 7 Dias
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Experimente o curso, assista às primeiras aulas e explore os materiais. Se você achar que a metodologia não é para você, basta solicitar o reembolso em 1 clique e devolveremos 100% do seu investimento.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Checkout Box (Desktop sticky, completely contained) */}
          <div className="lg:col-span-5 min-w-0 sticky top-24 space-y-5">
            
            <div className="bg-white rounded-3xl shadow-xl border-2 border-[#BA8E48]/30 overflow-hidden w-full">
              
              {/* Header Box */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#101B30] text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA8E48]">
                    Matrícula com Acesso Imediato
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    Vagas Abertas
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    R$ {course.price.toFixed(2)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      R$ {course.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-amber-200/80">
                  ou 12x de R$ {(course.price / 12 * 1.05).toFixed(2)} sem juros no cartão
                </div>
              </div>

              {/* Form or Success State */}
              <div className="p-5 sm:p-6">
                {isSuccess ? (
                  <div className="text-center py-5 space-y-4 animate-in zoom-in-95">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-2xl font-bold text-[#101B30]">Matrícula Confirmada!</h4>
                      <p className="text-xs text-slate-600">
                        O seu acesso foi liberado com sucesso na plataforma.
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl text-left text-xs space-y-1 border border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Curso:</span>
                        <span className="font-bold text-slate-800 truncate pl-2">{course.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Valor pago:</span>
                        <span className="font-bold text-emerald-700">R$ {course.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Acesso:</span>
                        <span className="font-bold text-emerald-600">Vitalício Liberado</span>
                      </div>
                    </div>

                    {onOpenCourseDirectly && (
                      <button
                        onClick={() => onOpenCourseDirectly(course)}
                        className="w-full py-3.5 bg-[#101B30] hover:bg-black text-white font-bold text-sm rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current text-[#BA8E48]" />
                        <span>Acessar as Aulas Agora</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleEnrollmentSubmit} className="space-y-4 sm:space-y-5">
                    
                    {/* Buyer Identification */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        1. Dados do Aluno para Certificado
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Nome completo (como sairá no certificado)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#BA8E48] focus:ring-1 focus:ring-[#BA8E48]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="email"
                          required
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          placeholder="E-mail de acesso"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#BA8E48] focus:ring-1 focus:ring-[#BA8E48]"
                        />
                        <input
                          type="text"
                          required
                          value={buyerCpf}
                          onChange={(e) => setBuyerCpf(e.target.value)}
                          placeholder="CPF (para emissão)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#BA8E48] focus:ring-1 focus:ring-[#BA8E48]"
                        />
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="space-y-2.5 pt-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        2. Forma de Pagamento
                      </label>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('pix')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'pix'
                              ? 'border-[#BA8E48] bg-[#BA8E48]/10 text-[#101B30] font-bold shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <QrCode className="w-4 h-4 text-[#BA8E48]" />
                          <span className="text-[11px]">PIX Instantâneo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'card'
                              ? 'border-[#BA8E48] bg-[#BA8E48]/10 text-[#101B30] font-bold shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <CreditCard className="w-4 h-4 text-[#BA8E48]" />
                          <span className="text-[11px]">Cartão até 12x</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('paypal')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'paypal'
                              ? 'border-[#BA8E48] bg-[#BA8E48]/10 text-[#101B30] font-bold shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                          <span className="text-[11px]">PayPal 1-Click</span>
                        </button>
                      </div>

                      {/* PIX Details */}
                      {paymentMethod === 'pix' && (
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-18 h-18 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                                <rect x="5" y="5" width="30" height="30" fill="currentColor" />
                                <rect x="10" y="10" width="20" height="20" fill="white" />
                                <rect x="15" y="15" width="10" height="10" fill="currentColor" />
                                <rect x="65" y="5" width="30" height="30" fill="currentColor" />
                                <rect x="70" y="10" width="20" height="20" fill="white" />
                                <rect x="75" y="15" width="10" height="10" fill="currentColor" />
                                <rect x="5" y="65" width="30" height="30" fill="currentColor" />
                                <rect x="10" y="70" width="20" height="20" fill="white" />
                                <rect x="15" y="75" width="10" height="10" fill="currentColor" />
                                <rect x="45" y="10" width="10" height="25" fill="currentColor" />
                                <rect x="45" y="45" width="15" height="15" fill="currentColor" />
                                <rect x="65" y="65" width="25" height="25" fill="currentColor" />
                              </svg>
                            </div>
                            <div className="space-y-1 min-w-0">
                              <span className="font-bold text-slate-800 text-xs block">Aprovação em segundos</span>
                              <p className="text-[11px] text-slate-500 leading-tight">
                                Aponte a câmera do aplicativo do seu banco para o QR Code.
                              </p>
                              <div className="text-[10px] text-emerald-600 font-bold truncate">
                                ✓ Liberação automática imediata
                              </div>
                            </div>
                          </div>

                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={handleCopyPix}
                              className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                              {copiedPix ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Código PIX Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Copiar Código PIX Copia e Cola</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Card Details */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-500">Número do Cartão</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs mt-1 font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-slate-500">Validade</label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs mt-1 font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase text-slate-500">CVV</label>
                              <input
                                type="password"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs mt-1 font-mono"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-500">Parcelamento</label>
                            <select
                              value={installments}
                              onChange={(e) => setInstallments(Number(e.target.value))}
                              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs mt-1"
                            >
                              <option value={1}>1x de R$ {course.price.toFixed(2)} (à vista)</option>
                              <option value={3}>3x de R$ {(course.price / 3).toFixed(2)} sem juros</option>
                              <option value={6}>6x de R$ {(course.price / 6).toFixed(2)} sem juros</option>
                              <option value={12}>12x de R$ {(course.price / 12 * 1.05).toFixed(2)}</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* PayPal Details */}
                      {paymentMethod === 'paypal' && (
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-center space-y-1.5">
                          <div className="text-slate-600">
                            Você será autenticado com a proteção do PayPal em 1 clique.
                          </div>
                          <div className="text-[11px] text-emerald-600 font-medium">
                            Disponível para contas no Brasil e no exterior.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 sm:py-4 bg-[#101B30] hover:bg-black text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processando Matrícula Segura...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#BA8E48]" />
                          <span>Confirmar Matrícula & Liberar Acesso</span>
                          <ArrowRight className="w-4 h-4 text-[#BA8E48]" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                      <Lock className="w-3 h-3 text-[#BA8E48]" />
                      <span>Transação Criptografada SSL 256-Bit · Patrick Ramon CRP 09|22010</span>
                    </div>

                  </form>
                )}
              </div>

            </div>

            {/* Quick Support Badge */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <Users className="w-5 h-5 text-[#BA8E48] shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-slate-800 block">Dúvidas com a matrícula?</span>
                <p className="text-[11px] text-slate-500">Nosso suporte atende diretamente pelo portal ou WhatsApp oficial.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
