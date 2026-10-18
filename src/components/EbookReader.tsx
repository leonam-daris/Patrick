import React, { useState, useEffect } from 'react';
import { Ebook, User } from '../types';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Moon, 
  Sun, 
  Coffee, 
  Type, 
  List, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  Download, 
  PenTool, 
  Share2,
  X
} from 'lucide-react';

interface EbookReaderProps {
  ebook: Ebook;
  currentUser: User | null;
  onClose: () => void;
  onOpenCheckout: (ebook: Ebook) => void;
  onUpdateProgress: (ebookId: string, pageNumber: number) => void;
  onAwardXp: (amount: number, reason: string) => void;
}

export const EbookReader: React.FC<EbookReaderProps> = ({
  ebook,
  currentUser,
  onClose,
  onOpenCheckout,
  onUpdateProgress,
  onAwardXp,
}) => {
  const isUnlocked = currentUser?.unlockedProductIds.includes(ebook.id) || currentUser?.role === 'admin';
  const initialPage = currentUser?.readingProgress[ebook.id] || 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);
  const [completedAwarded, setCompletedAwarded] = useState(false);

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`ebook_notes_${ebook.id}`);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [ebook.id]);

  // Save notes handler
  const handleSaveNote = (chapterId: string, text: string) => {
    const updated = { ...notes, [chapterId]: text };
    setNotes(updated);
    localStorage.setItem(`ebook_notes_${ebook.id}`, JSON.stringify(updated));
  };

  // Find active chapter based on current page
  const activeChapterIndex = ebook.chapters.findIndex(
    ch => currentPage >= ch.pageStart && currentPage <= ch.pageEnd
  );
  const activeChapter = ebook.chapters[activeChapterIndex !== -1 ? activeChapterIndex : 0];

  // If locked, max preview page is chapter 1 end
  const maxAllowedPage = isUnlocked ? ebook.totalPages : (ebook.chapters[0]?.pageEnd || 6);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > maxAllowedPage) return;
    setCurrentPage(newPage);
    onUpdateProgress(ebook.id, newPage);

    // Award XP when reaching last page
    if (isUnlocked && newPage >= ebook.totalPages && !completedAwarded) {
      setCompletedAwarded(true);
      onAwardXp(80, `Conclusão da leitura: ${ebook.title}`);
    }
  };

  const toggleBookmark = (page: number) => {
    if (bookmarkedPages.includes(page)) {
      setBookmarkedPages(bookmarkedPages.filter(p => p !== page));
    } else {
      setBookmarkedPages([...bookmarkedPages, page]);
    }
  };

  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  }[fontSize];

  const themeClasses = {
    light: 'bg-[#FAF9F6] text-slate-800 border-slate-200',
    sepia: 'bg-[#F4ECE1] text-[#3D3024] border-[#E2D5C3]',
    dark: 'bg-[#121824] text-slate-200 border-slate-800',
  }[theme];

  const cardThemeClasses = {
    light: 'bg-white shadow-xs border border-slate-200/80',
    sepia: 'bg-[#ECE2D0] border border-[#DDD0BC] text-[#382D22]',
    dark: 'bg-[#1A2234] border border-[#2D3A54] text-slate-200',
  }[theme];

  const progressPercent = Math.round((currentPage / ebook.totalPages) * 100);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeClasses} transition-colors duration-200`}>
      {/* Top Reader Navigation Bar */}
      <header className={`flex items-center justify-between px-4 sm:px-6 h-16 border-b shrink-0 ${theme === 'dark' ? 'border-slate-800 bg-[#0F1520]' : 'border-slate-200 bg-white/80'} backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar ao Portal</span>
          </button>
          
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
          
          <div className="flex flex-col">
            <h1 className="text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-md">
              {ebook.title}
            </h1>
            <span className="text-[11px] text-slate-500 truncate">
              {ebook.author}
            </span>
          </div>
        </div>

        {/* Reader Controls Toolbar */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Table of Contents Button */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              isTocOpen ? 'bg-[#1B2A4A] text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Sumário de Capítulos"
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">Sumário</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentPage)}
            className={`p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
              bookmarkedPages.includes(currentPage) ? 'text-[#B38E5D]' : 'text-slate-500'
            }`}
            title="Marcar página atual"
          >
            <Bookmark className={`w-4 h-4 ${bookmarkedPages.includes(currentPage) ? 'fill-current' : ''}`} />
          </button>

          {/* Font Size Toggle */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-1 text-xs font-medium rounded ${fontSize === 'sm' ? 'bg-[#B38E5D] text-white' : 'text-slate-500'}`}
              title="Fonte Pequena"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-1.5 py-1 text-xs font-medium rounded ${fontSize === 'md' ? 'bg-[#B38E5D] text-white' : 'text-slate-500'}`}
              title="Fonte Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-1 text-xs font-medium rounded ${fontSize === 'lg' ? 'bg-[#B38E5D] text-white' : 'text-slate-500'}`}
              title="Fonte Grande"
            >
              A+
            </button>
          </div>

          {/* Color Themes */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded transition-colors ${theme === 'light' ? 'bg-amber-100 text-amber-900' : 'text-slate-400'}`}
              title="Modo Dia (Papel Alabastro)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded transition-colors ${theme === 'sepia' ? 'bg-[#E2D5C3] text-[#3D3024]' : 'text-slate-400'}`}
              title="Modo Sépia / Papiro (Conforto Ocular)"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded transition-colors ${theme === 'dark' ? 'bg-slate-700 text-slate-100' : 'text-slate-400'}`}
              title="Modo Noturno (Escuro)"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 transition-colors hidden sm:block"
            title={isFullscreen ? 'Sair da tela cheia' : 'Leitura Imersiva Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Reading Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Table of Contents Drawer */}
        {isTocOpen && (
          <aside className={`w-80 shrink-0 border-r z-20 flex flex-col ${theme === 'dark' ? 'bg-[#151D2C] border-slate-800' : 'bg-white border-slate-200'} shadow-lg transition-all`}>
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="font-serif font-bold text-sm tracking-wide uppercase text-[#1B2A4A] dark:text-amber-300">
                Índice & Capítulos
              </span>
              <button 
                onClick={() => setIsTocOpen(false)}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {ebook.chapters.map((ch, idx) => {
                const isActive = activeChapter?.id === ch.id;
                const isChapterLocked = !isUnlocked && idx > 0;

                return (
                  <button
                    key={ch.id}
                    disabled={isChapterLocked}
                    onClick={() => {
                      handlePageChange(ch.pageStart);
                      setIsTocOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-start justify-between gap-2 ${
                      isActive 
                        ? 'bg-[#1B2A4A] text-white shadow-xs font-semibold' 
                        : isChapterLocked
                          ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#B38E5D]">
                        Capítulo {idx + 1}
                      </div>
                      <div className="mt-0.5 line-clamp-2">
                        {ch.title}
                      </div>
                    </div>
                    <div className="text-[10px] shrink-0 font-mono opacity-70">
                      {isChapterLocked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        `p. ${ch.pageStart}`
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Bookmarks section */}
              {bookmarkedPages.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                    Páginas Marcadas
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {bookmarkedPages.map(p => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-[#B38E5D]/20 text-[#B38E5D] hover:bg-[#B38E5D]/30 transition-colors"
                      >
                        Pág. {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Unlock callout inside TOC if locked */}
            {!isUnlocked && (
              <div className="p-4 m-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
                <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Degustação Gratuita</span>
                </div>
                <p className="mt-1 text-amber-700 dark:text-amber-400 text-[11px]">
                  Você está visualizando a amostra do Capítulo 1. Desbloqueie o material completo para ler os {ebook.chapters.length} capítulos.
                </p>
                <button
                  onClick={() => onOpenCheckout(ebook)}
                  className="mt-3 w-full py-2 px-3 bg-[#1B2A4A] text-white font-medium rounded-lg hover:bg-[#101B30] transition-colors text-xs"
                >
                  Liberar E-book por R$ {ebook.price.toFixed(2)}
                </button>
              </div>
            )}
          </aside>
        )}

        {/* Reader Center Document Sheet */}
        <main className="flex-1 overflow-y-auto flex justify-center p-4 sm:p-8 lg:p-12">
          <div className="max-w-3xl w-full flex flex-col justify-between">
            {/* Document Header & Chapter Marker */}
            <div>
              <div className="flex items-center justify-between text-xs pb-4 border-b border-black/10 dark:border-white/10 mb-8 opacity-70">
                <span className="font-serif tracking-widest uppercase text-[#B38E5D] font-bold">
                  {ebook.author}
                </span>
                <span className="font-mono">
                  Página {currentPage} de {ebook.totalPages}
                </span>
              </div>

              {/* Chapter Title */}
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B38E5D] block mb-2">
                  {activeChapter?.title.split(':')[0]}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {activeChapter?.title.includes(':') ? activeChapter.title.split(':')[1] : activeChapter?.title}
                </h2>
              </div>

              {/* Book Content Paragraphs */}
              <div className={`space-y-6 ${fontSizeClass} font-sans`}>
                {activeChapter?.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Interactive Therapeutic Exercise Block */}
              {activeChapter?.therapeuticExercise && (
                <div className={`mt-10 p-6 rounded-2xl ${cardThemeClasses} transition-all`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B38E5D] uppercase tracking-wider mb-2">
                    <PenTool className="w-4 h-4" />
                    <span>{activeChapter.therapeuticExercise.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium mb-3 opacity-90">
                    {activeChapter.therapeuticExercise.instructions}
                  </p>
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 text-xs italic mb-4">
                    "{activeChapter.therapeuticExercise.prompt}"
                  </div>

                  {/* Student Writing Box */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Suas Reflexões Clínicas (Salvas automaticamente no seu perfil):
                    </label>
                    <textarea
                      rows={3}
                      value={notes[activeChapter.id] || ''}
                      onChange={(e) => handleSaveNote(activeChapter.id, e.target.value)}
                      placeholder="Escreva aqui suas reflexões, percepções somáticas e respostas ao exercício..."
                      className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden transition-all"
                    />
                    <div className="flex justify-end items-center gap-2 mt-2 text-[10px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Progresso reflexivo gravado</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lock wall if next chapter is locked */}
              {!isUnlocked && currentPage >= maxAllowedPage && (
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#1B2A4A] to-[#2D4168] text-white text-center shadow-xl">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#B38E5D]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    Fim da Amostra Gratuita
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                    Você completou a degustação do Capítulo 1. Para continuar a leitura dos próximos capítulos, protocolos somáticos e cadernos terapêuticos de Patrick Ramon, garanta seu acesso vitalício.
                  </p>
                  <button
                    onClick={() => onOpenCheckout(ebook)}
                    className="px-6 py-3 bg-[#B38E5D] hover:bg-[#C9A779] text-[#1B2A4A] font-bold text-sm rounded-xl transition-all transform hover:scale-105 shadow-md inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Adquirir E-book Completo · R$ {ebook.price.toFixed(2)}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Chapter Indicator */}
            <div className="pt-12 pb-4 text-center text-xs opacity-50 font-serif italic">
              — {ebook.title} · Patrick Ramon CRP 09|22010 —
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Paging Footer with Progress Bar */}
      <footer className={`h-16 border-t px-4 sm:px-8 flex items-center justify-between shrink-0 ${theme === 'dark' ? 'border-slate-800 bg-[#0F1520]' : 'border-slate-200 bg-white/80'} backdrop-blur-md`}>
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Página Anterior</span>
        </button>

        {/* Center Progress Scrubber */}
        <div className="flex flex-col items-center max-w-xs sm:max-w-md w-full px-4">
          <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-500 mb-1">
            <span>Página {currentPage}</span>
            <span className="font-bold text-[#B38E5D]">{progressPercent}% Lido</span>
            <span>{ebook.totalPages} págs</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B38E5D] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= maxAllowedPage}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <span className="hidden sm:inline">Próxima Página</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
