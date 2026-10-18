import React, { useState, useRef, useEffect } from 'react';
import { Course, Lesson, User, CourseModule } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Download, 
  FileText, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Bookmark, 
  Share2, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  Send,
  HelpCircle,
  Tv
} from 'lucide-react';

interface CoursePlayerProps {
  course: Course;
  currentUser: User | null;
  onBack: () => void;
  onOpenCheckout: (course: Course) => void;
  onCompleteLesson: (lessonId: string) => void;
  onAwardXp: (amount: number, reason: string) => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  currentUser,
  onBack,
  onOpenCheckout,
  onCompleteLesson,
  onAwardXp,
}) => {
  const isCourseUnlocked = currentUser?.unlockedProductIds.includes(course.id) || currentUser?.role === 'admin';

  // Find all lessons flattened
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || '');
  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];

  // Video Player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedResolution, setSelectedResolution] = useState<'1080p' | '720p' | '480p'>('1080p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'materials' | 'notes' | 'discussion'>('overview');

  // Custom user notes on timestamps
  interface TimestampNote {
    id: string;
    timestamp: number;
    text: string;
    date: string;
  }
  const [userNotes, setUserNotes] = useState<TimestampNote[]>([]);
  const [newNoteText, setNewNoteText] = useState('');

  // Interactive Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Student comments / Q&A
  interface Comment {
    id: string;
    author: string;
    role: string;
    timeAgo: string;
    text: string;
    reply?: { author: string; text: string; timeAgo: string };
  }
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Dra. Mariana Rios',
      role: 'Aluna · Psicóloga Clínica',
      timeAgo: 'Há 1 dia',
      text: 'Professor Patrick, na prática com pacientes que apresentam queixa somática muito intensa no início da sessão, você recomenda iniciar direto pela respiração diafragmática ou pela validação do relato verbal?',
      reply: {
        author: 'Patrick Ramon (CRP 09|22010)',
        text: 'Excelente questão, Mariana! Sempre iniciamos acolhendo e validando o sofrimento (top-down), para que o paciente não sinta que suas sensações estão sendo "abafadas". Em seguida, propomos o exercício somático como um recurso conjunto de ancoragem.',
        timeAgo: 'Há 18 horas'
      }
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Video resolution matching
  const currentVideoSource = activeLesson?.resolutions.find(r => r.resolution === selectedResolution)?.url || activeLesson?.videoUrl;

  const isLessonCompleted = currentUser?.completedLessonIds.includes(activeLesson.id);

  // Controls auto-hide timer
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: TimestampNote = {
      id: Date.now().toString(),
      timestamp: Math.floor(currentTime),
      text: newNoteText.trim(),
      date: 'Agora'
    };
    setUserNotes([...userNotes, newNote]);
    setNewNoteText('');
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComm: Comment = {
      id: Date.now().toString(),
      author: currentUser?.name || 'Aluno Convidado',
      role: 'Aluno Matriculado',
      timeAgo: 'Agora mesmo',
      text: newCommentText.trim()
    };
    setComments([newComm, ...comments]);
    setNewCommentText('');
    onAwardXp(15, 'Participação na discussão da aula');
  };

  const handleMarkComplete = () => {
    onCompleteLesson(activeLesson.id);
    onAwardXp(50, `Conclusão da aula: ${activeLesson.title}`);

    // Auto navigate to next lesson if available
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      if (isCourseUnlocked || currentIndex === 0) {
        setActiveLessonId(nextLesson.id);
      }
    }
  };

  // Check if active lesson is locked
  const isLessonLocked = !isCourseUnlocked && activeLesson.id !== allLessons[0]?.id;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-20">
      {/* Top Breadcrumb & Navigation */}
      <div className="bg-[#1B2A4A] text-white py-3 px-4 sm:px-8 border-b border-[#2A3E66]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Painel do Curso</span>
            </button>
            <span className="text-slate-500">/</span>
            <span className="font-medium text-amber-200/90 truncate max-w-[200px] sm:max-w-md">
              {course.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isCourseUnlocked && (
              <button
                onClick={() => onOpenCheckout(course)}
                className="px-3 py-1 bg-[#B38E5D] text-[#1B2A4A] hover:bg-[#C9A779] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Adquirir Acesso Completo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Column Left: Video Player & Tabs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Custom High-Res Video Player Container */}
            <div 
              ref={playerContainerRef}
              onMouseMove={handleMouseMove}
              className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group select-none"
            >
              {isLessonLocked ? (
                /* Paywall Overlay for Locked Lesson */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#101B30] to-[#1B2A4A] text-white">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-[#B38E5D]">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    Aula Reservada para Alunos Matriculados
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                    Esta aula pertence ao programa completo de formação com Patrick Ramon. Adquira o treinamento para desbloquear todos os módulos, certificados e materiais complementares.
                  </p>
                  <button
                    onClick={() => onOpenCheckout(course)}
                    className="px-6 py-3 bg-[#B38E5D] hover:bg-[#C9A779] text-[#1B2A4A] font-bold text-sm rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Liberar Acesso Integral · R$ {course.price.toFixed(2)}</span>
                  </button>
                </div>
              ) : (
                /* Active Video Player */
                <>
                  <video
                    ref={videoRef}
                    src={currentVideoSource}
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-cover cursor-pointer"
                    playsInline
                  />

                  {/* Play Overlay Button if Paused */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#B38E5D]/90 text-[#1B2A4A] flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Player Controls Bar */}
                  <div 
                    className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${
                      showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {/* Time Progress Scrubber */}
                    <div className="relative mb-3 group/scrubber">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#B38E5D] focus:outline-hidden"
                      />
                    </div>

                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        {/* Play/Pause */}
                        <button
                          onClick={togglePlay}
                          className="p-1 hover:text-[#B38E5D] transition-colors"
                          title={isPlaying ? 'Pausar (Espaço)' : 'Reproduzir (Espaço)'}
                        >
                          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-1.5">
                          <button onClick={toggleMute} className="hover:text-[#B38E5D] transition-colors">
                            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#B38E5D] hidden sm:block"
                          />
                        </div>

                        {/* Timestamps */}
                        <div className="font-mono text-[11px] text-slate-300 tabular-nums">
                          {formatTime(currentTime)} / {formatTime(duration || activeLesson.durationSeconds)}
                        </div>
                      </div>

                      {/* Right Controls: Quality, Speed, Fullscreen */}
                      <div className="flex items-center gap-3">
                        {/* Speed Toggle */}
                        <div className="relative group/speed">
                          <button className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-mono text-[11px] text-slate-200">
                            {playbackRate}x
                          </button>
                          <div className="absolute bottom-full right-0 mb-1 hidden group-hover/speed:flex flex-col bg-[#101B30] border border-slate-700 rounded-lg py-1 shadow-xl z-30">
                            {[0.75, 1, 1.25, 1.5, 2].map(rate => (
                              <button
                                key={rate}
                                onClick={() => changePlaybackRate(rate)}
                                className={`px-3 py-1 text-left text-xs hover:bg-[#B38E5D] hover:text-[#1B2A4A] transition-colors ${
                                  playbackRate === rate ? 'font-bold text-[#B38E5D]' : 'text-slate-300'
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Resolution Switcher */}
                        <div className="relative group/res">
                          <button className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-mono text-[11px] text-slate-200 flex items-center gap-1">
                            <span>{selectedResolution}</span>
                          </button>
                          <div className="absolute bottom-full right-0 mb-1 hidden group-hover/res:flex flex-col bg-[#101B30] border border-slate-700 rounded-lg py-1 shadow-xl z-30">
                            {(['1080p', '720p', '480p'] as const).map(res => (
                              <button
                                key={res}
                                onClick={() => setSelectedResolution(res)}
                                className={`px-3 py-1 text-left text-xs hover:bg-[#B38E5D] hover:text-[#1B2A4A] transition-colors ${
                                  selectedResolution === res ? 'font-bold text-[#B38E5D]' : 'text-slate-300'
                                }`}
                              >
                                {res} {res === '1080p' ? '(Full HD)' : res === '720p' ? '(HD)' : '(SD)'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fullscreen */}
                        <button
                          onClick={toggleFullscreen}
                          className="hover:text-[#B38E5D] transition-colors"
                          title="Tela cheia"
                        >
                          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Lesson Title & Action Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B38E5D]">
                  {course.category}
                </span>
                <h1 className="font-serif text-2xl font-bold text-[#1B2A4A] mt-0.5">
                  {activeLesson.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Instrutor: Patrick Ramon</span>
                  <span>·</span>
                  <span>Duração: {activeLesson.duration}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">+50 XP por conclusão</span>
                </div>
              </div>

              {/* Complete Lesson Button */}
              <button
                onClick={handleMarkComplete}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  isLessonCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-[#1B2A4A] hover:bg-[#101B30] text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isLessonCompleted ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span>{isLessonCompleted ? 'Aula Concluída (+50 XP)' : 'Marcar como Concluída'}</span>
              </button>
            </div>

            {/* Interactive Tabs: Overview, Transcripts, Materials, Notes, Q&A */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="flex items-center border-b border-slate-200 overflow-x-auto p-1 bg-slate-50">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'overview' ? 'bg-white text-[#1B2A4A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Visão Geral & Fixação
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'materials' ? 'bg-white text-[#1B2A4A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#B38E5D]" />
                  <span>Materiais ({activeLesson.resources.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'transcript' ? 'bg-white text-[#1B2A4A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Transcrição da Aula
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'notes' ? 'bg-white text-[#1B2A4A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#B38E5D]" />
                  <span>Minhas Anotações ({userNotes.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'discussion' ? 'bg-white text-[#1B2A4A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B38E5D]" />
                  <span>Dúvidas com Patrick ({comments.length})</span>
                </button>
              </div>

              <div className="p-6">
                {/* Tab: Overview & Quiz */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#1B2A4A] mb-2">
                        Resumo Clínico da Aula
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {activeLesson.summary}
                      </p>
                    </div>

                    {/* Interactive Comprehension Quiz */}
                    {activeLesson.quiz && (
                      <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#B38E5D] uppercase tracking-wider mb-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>Exercício Reflexivo de Fixação (+30 XP)</span>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm mb-4">
                          {activeLesson.quiz.question}
                        </p>

                        <div className="space-y-2.5">
                          {activeLesson.quiz.options.map((option, idx) => {
                            const isSelected = selectedQuizOption === idx;
                            const isCorrect = idx === activeLesson.quiz?.correctAnswerIndex;
                            let btnStyle = 'border-slate-200 bg-white hover:border-[#B38E5D] text-slate-700';

                            if (quizSubmitted) {
                              if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                              else if (isSelected) btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                              else btnStyle = 'border-slate-200 bg-white opacity-50';
                            } else if (isSelected) {
                              btnStyle = 'border-[#1B2A4A] bg-[#1B2A4A]/5 font-semibold text-[#1B2A4A]';
                            }

                            return (
                              <button
                                key={idx}
                                disabled={quizSubmitted}
                                onClick={() => setSelectedQuizOption(idx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                              >
                                <span>{option}</span>
                                {quizSubmitted && isCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {!quizSubmitted ? (
                          <button
                            disabled={selectedQuizOption === null}
                            onClick={() => {
                              setQuizSubmitted(true);
                              if (selectedQuizOption === activeLesson.quiz?.correctAnswerIndex) {
                                onAwardXp(30, 'Resposta correta no quiz da aula');
                              }
                            }}
                            className="mt-4 px-5 py-2 bg-[#1B2A4A] hover:bg-[#101B30] disabled:opacity-40 text-white font-semibold text-xs rounded-xl transition-colors"
                          >
                            Verificar Resposta
                          </button>
                        ) : (
                          <div className="mt-4 p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-700">
                            <span className="font-bold text-[#1B2A4A]">Justificativa do Psicólogo: </span>
                            {activeLesson.quiz.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Complementary Materials */}
                {activeTab === 'materials' && (
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-lg text-[#1B2A4A] mb-1">
                      Materiais Didáticos & Ferramentas de Aplicação
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Faça o download dos protocolos estruturados e ferramentas clínicas para utilizar com seus pacientes ou em seus estudos pessoais.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeLesson.resources.map((res, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200 hover:border-[#B38E5D] transition-colors flex items-center justify-between gap-3 bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#B38E5D] flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-slate-800 line-clamp-1">
                                {res.title}
                              </div>
                              <div className="text-[10px] text-slate-400 uppercase">
                                {res.type.toUpperCase()} · {res.size}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => alert(`Iniciando download simulado de: ${res.title}`)}
                            className="p-2 rounded-lg text-slate-500 hover:text-[#1B2A4A] hover:bg-slate-100 transition-colors"
                            title="Baixar arquivo"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: Transcripts */}
                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-lg text-[#1B2A4A] mb-1">
                      Transcrição Integral da Aula
                    </h4>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {activeLesson.transcript}
                    </div>
                  </div>
                )}

                {/* Tab: Timestamp Notes */}
                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#1B2A4A] mb-1">
                        Caderno de Anotações Sincronizado
                      </h4>
                      <p className="text-xs text-slate-500 mb-3">
                        Grave suas reflexões vinculadas ao segundo exato da explicação. Ao clicar no horário, o vídeo se posiciona naquele momento.
                      </p>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder={`Anotação no instante [${formatTime(currentTime)}]...`}
                          className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                        />
                        <button
                          onClick={handleAddNote}
                          className="px-4 py-2 bg-[#1B2A4A] text-white text-xs font-semibold rounded-xl hover:bg-[#101B30] transition-colors"
                        >
                          Salvar Nota
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {userNotes.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-xs">
                          Nenhuma anotação nesta aula ainda. Pause o vídeo no momento de um insight e anote acima.
                        </div>
                      ) : (
                        userNotes.map(n => (
                          <div
                            key={n.id}
                            className="p-3 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3 text-xs"
                          >
                            <div>
                              <button
                                onClick={() => {
                                  if (videoRef.current) videoRef.current.currentTime = n.timestamp;
                                }}
                                className="font-mono font-bold text-[#B38E5D] hover:underline"
                              >
                                [{formatTime(n.timestamp)}]
                              </button>
                              <span className="ml-2 text-slate-700">{n.text}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{n.date}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Discussion / Q&A */}
                {activeTab === 'discussion' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#1B2A4A] mb-1">
                        Comunidade Acadêmica & Dúvidas com Patrick Ramon
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Compartilhe suas indagações clínicas. Patrick Ramon e os tutores respondem diretamente nesta seção.
                      </p>

                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Escreva sua dúvida clínica sobre esta aula..."
                          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={handleAddComment}
                            className="px-4 py-2 bg-[#1B2A4A] text-white text-xs font-semibold rounded-xl hover:bg-[#101B30] transition-colors flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar Pergunta</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {comments.map(c => (
                        <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <div className="font-semibold text-slate-800">{c.author}</div>
                            <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {c.text}
                          </p>

                          {c.reply && (
                            <div className="ml-4 pl-4 border-l-2 border-[#B38E5D] bg-white p-3 rounded-r-xl space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                                <span>{c.reply.author}</span>
                                <span className="text-[10px] text-slate-400 font-normal">· {c.reply.timeAgo}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {c.reply.text}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Course Curriculum Sidebar */}
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-base text-[#1B2A4A]">
                  Conteúdo Programático
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {currentUser?.completedLessonIds.length || 0} / {allLessons.length} Aulas
                </span>
              </div>

              {/* Course Overall Progress */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#B38E5D] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(((currentUser?.completedLessonIds.length || 0) / allLessons.length) * 100)}%`
                  }}
                />
              </div>

              {/* Modules Accordion */}
              <div className="space-y-4">
                {course.modules.map((module, mIdx) => (
                  <div key={module.id} className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      {module.title}
                    </div>

                    <div className="space-y-1">
                      {module.lessons.map(lesson => {
                        const isActive = lesson.id === activeLesson.id;
                        const isDone = currentUser?.completedLessonIds.includes(lesson.id);
                        const isLocked = !isCourseUnlocked && lesson.id !== allLessons[0]?.id;

                        return (
                          <button
                            key={lesson.id}
                            disabled={isLocked}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                              isActive
                                ? 'bg-[#1B2A4A] text-white shadow-xs font-medium'
                                : isLocked
                                  ? 'opacity-60 bg-slate-50 hover:bg-slate-50 cursor-not-allowed'
                                  : 'hover:bg-slate-100 text-slate-700 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-emerald-600'}`} />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                              ) : (
                                <Play className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] shrink-0 font-mono opacity-70">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patrick Ramon Clinical Bio Card */}
            <div className="p-5 bg-gradient-to-br from-[#101B30] to-[#1B2A4A] text-white rounded-2xl shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full border border-[#B38E5D] bg-[#FAF9F6] text-[#1B2A4A] flex items-center justify-center font-serif font-bold text-sm">
                  PR
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm">Patrick Ramon</h4>
                  <p className="text-[11px] text-[#B38E5D]">Psicólogo Clínico · CRP 09|22010</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Nosso objetivo nesta formação não é apenas transmitir conceitos teóricos, mas transformar sua percepção e capacitar sua prática com ferramentas de impacto real."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
