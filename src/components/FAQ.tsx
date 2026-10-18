import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CreditCard, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  MessageCircle,
  FileCheck2
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'enrollment' | 'structure' | 'platform' | 'certification';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'enrollment',
    question: 'Como funciona a liberação imediata após a confirmação do pagamento?',
    answer: 'Assim que sua transação for aprovada via PIX ou Cartão de Crédito, o sistema processa a matrícula e atribui automaticamente o nível de acesso correto ao seu perfil. Todas as videoaulas, e-books e materiais complementares ficam desbloqueados no mesmo instante no seu Portal do Aluno, sem necessidade de envio de comprovante por e-mail.'
  },
  {
    id: 'faq-2',
    category: 'enrollment',
    question: 'Quais são as formas de pagamento disponíveis e posso parcelar?',
    answer: 'Aceitamos PIX com compensação imediata via QR Code dinâmico e código Copia e Cola, Cartões de Crédito (Visa, Mastercard, Elo, Hipercard) com parcelamento em até 12x, e PayPal em 1 clique. O processamento conta com criptografia bancária de 256 bits e garantia incondicional de 7 dias.'
  },
  {
    id: 'faq-3',
    category: 'structure',
    question: 'Qual é a metodologia dos cursos e como as aulas são estruturadas?',
    answer: 'As formações são estruturadas sob os preceitos da Prática Baseada em Evidências (TCC, ACT e Neurobiologia do Afeto). Cada aula inclui vídeo explicativo gravado por Patrick Ramon, transcrição integral para estudo assíncrono, resumo clínico e materiais complementares para download (exercícios terapêuticos e roteiros de anamnese).'
  },
  {
    id: 'faq-4',
    category: 'structure',
    question: 'O player de vídeo suporta diferentes resoluções e funciona em dispositivos móveis?',
    answer: 'Sim! Nosso player de vídeo responsivo conta com alternância manual ou automática de qualidade (1080p Full HD, 720p HD e 480p SD), controle de velocidade de 0.75x a 2x, tela cheia e anotações sincronizadas por segundo. Funciona com total fluidez em celulares, tablets e computadores.'
  },
  {
    id: 'faq-5',
    category: 'platform',
    question: 'Como funciona o visualizador de PDF e e-books integrado?',
    answer: 'O leitor digital foi desenvolvido para que você leia todo o material didático sem precisar de programas externos ou quebrar sua concentração. Ele oferece navegação por capítulos, modos de exibição (Papel Claro, Sépia/Papiro para conforto ocular e Noturno escuro), ajuste de tamanho de fonte, marcadores de página e campo para salvar suas reflexões clínicas.'
  },
  {
    id: 'faq-6',
    category: 'certification',
    question: 'O certificado tem validade profissional e registro formal?',
    answer: 'Sim. Ao concluir as exigências do treinamento, o portal emite o Certificado Oficial de Conclusão com carga horária comprovada, número de registro individual e chancela profissional de Patrick Ramon com seu registro ativo no Conselho Regional de Psicologia (CRP 09|22010).'
  },
  {
    id: 'faq-7',
    category: 'certification',
    question: 'Como posso tirar dúvidas clínicas ou debater os casos apresentados?',
    answer: 'Dentro de cada aula do portal existe uma aba exclusiva de "Dúvidas com Patrick", onde você pode formular perguntas sobre o manejo terapêutico. Além disso, os alunos participam dos encontros periódicos de supervisão ao vivo agendados diretamente no Calendário Acadêmico.'
  },
  {
    id: 'faq-8',
    category: 'platform',
    question: 'O que é o sistema de gamificação e como funcionam as recompensas?',
    answer: 'Para incentivar a constância nos estudos, cada aula concluída, página lida e quiz reflexivo respondido concede pontos de experiência (XP). Ao acumular XP e manter sua sequência de dias ativos (Streak), você sobe de nível e desbloqueia recompensas como cadernos bônus, vouchers para supervisões individuais e o certificado oficial.'
  }
];

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 select-none">
      
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#B38E5D]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Central de Dúvidas & Suporte</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B2A4A] tracking-tight">
          Perguntas Frequentes dos Alunos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Tire suas dúvidas sobre matrícula imediata, estrutura das aulas, visualizador de e-books e emissão de certificados.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar por assunto (ex: pagamento, certificado, leitor)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden shadow-xs transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedCategory('enrollment')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
            selectedCategory === 'enrollment'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-[#B38E5D]" />
          <span>Matrícula & Pagamento</span>
        </button>
        <button
          onClick={() => setSelectedCategory('structure')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
            selectedCategory === 'structure'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#B38E5D]" />
          <span>Estrutura dos Cursos</span>
        </button>
        <button
          onClick={() => setSelectedCategory('platform')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
            selectedCategory === 'platform'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#B38E5D]" />
          <span>Leitor de E-books</span>
        </button>
        <button
          onClick={() => setSelectedCategory('certification')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
            selectedCategory === 'certification'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-[#B38E5D]" />
          <span>Certificados & CRP</span>
        </button>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3 pt-2">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            Nenhuma dúvida encontrada para "{searchQuery}". Tente outro termo ou entre em contato direto.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#B38E5D]/60 transition-all shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#1B2A4A] focus:outline-hidden"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#1B2A4A] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Contact Help Banner */}
      <div className="p-6 bg-gradient-to-r from-[#101B30] to-[#1B2A4A] text-white rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif font-bold text-base text-amber-200">
            Ficou com alguma dúvida clínica ou acadêmica?
          </h4>
          <p className="text-xs text-slate-300">
            Nossa equipe de tutoria e o consultório de Patrick Ramon estão à disposição para orientá-lo.
          </p>
        </div>

        <a
          href="https://wa.me/5562999999999?text=Olá%20Patrick,%20tenho%20uma%20dúvida%20sobre%20o%20portal%20de%20cursos"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#B38E5D] hover:bg-[#C9A779] text-[#1B2A4A] font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>

    </section>
  );
};
