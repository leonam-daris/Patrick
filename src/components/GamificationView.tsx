import React, { useState } from 'react';
import { User, Badge, Reward } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  Award, 
  Flame, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  Gift, 
  FileCheck, 
  Printer, 
  X, 
  Share2, 
  Zap, 
  Compass, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';

interface GamificationViewProps {
  currentUser: User;
  badges: Badge[];
  rewards: Reward[];
  onClaimReward: (rewardId: string) => void;
  onBackToDashboard: () => void;
}

export const GamificationView: React.FC<GamificationViewProps> = ({
  currentUser,
  badges,
  rewards,
  onClaimReward,
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'rewards' | 'leaderboard'>('badges');
  const [selectedCertificateReward, setSelectedCertificateReward] = useState<Reward | null>(null);

  // Leaderboard mock students
  const leaderboard = [
    { rank: 1, name: 'Psic. Beatriz Melo', xp: 890, streak: 12, level: 3, avatar: 'BM' },
    { rank: 2, name: 'Dr. Eduardo Costa', xp: 620, streak: 8, level: 3, avatar: 'EC' },
    { rank: 3, name: currentUser.name, xp: currentUser.xp, streak: currentUser.streakDays, level: currentUser.level, avatar: 'EU', isCurrent: true },
    { rank: 4, name: 'Fernanda Paiva', xp: 340, streak: 4, level: 2, avatar: 'FP' },
    { rank: 5, name: 'Lucas Ferreira', xp: 90, streak: 1, level: 1, avatar: 'LF' }
  ].sort((a, b) => b.xp - a.xp);

  const nextLevelXp = currentUser.level * 300;
  const levelProgress = Math.min(100, Math.round((currentUser.xp / nextLevelXp) * 100));

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Header & Level Progress Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#2B3F66] text-white shadow-xl border border-slate-700/50 w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B38E5D] uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-[#B38E5D] shrink-0" />
              <span className="truncate">Programa de Produtividade & Gamificação</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              Evolução Acadêmica & Conquistas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Cada aula assistida, página lida e exercício clínico praticado recompensa você com XP e desbloqueia distinções acadêmicas chanceladas pelo Psicólogo Patrick Ramon.
            </p>
          </div>

          {/* Level Progress Circle / Widget */}
          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 w-full md:w-auto md:min-w-[260px] shrink-0">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-amber-200 uppercase tracking-wider text-[11px] sm:text-xs">
                Nível {currentUser.level} · {currentUser.level === 1 ? 'Iniciante' : currentUser.level === 2 ? 'Praticante Atento' : 'Terapeuta Integrado'}
              </span>
              <span className="font-mono text-white tabular-nums">
                {currentUser.xp} / {nextLevelXp} XP
              </span>
            </div>

            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#B38E5D] to-[#E5C396] rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-current shrink-0" /> {currentUser.streakDays} dias de consistência
              </span>
              <span>Faltam {Math.max(0, nextLevelXp - currentUser.xp)} XP p/ Nível {currentUser.level + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Responsive, Wraps Cleanly on Small Screens */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'badges'
                ? 'bg-[#1B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Distintivos & Badges ({badges.filter(b => b.progressPercent === 100).length}/{badges.length})
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rewards'
                ? 'bg-[#1B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Loja de Recompensas ({rewards.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'leaderboard'
                ? 'bg-[#1B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Placar de Constância
          </button>
        </div>

        <button
          onClick={onBackToDashboard}
          className="text-xs font-semibold text-[#1B2A4A] hover:text-[#B38E5D] transition-colors self-end sm:self-auto"
        >
          ← Voltar ao Dashboard
        </button>
      </div>

      {/* Tab: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {badges.map(badge => {
            const isUnlocked = badge.progressPercent === 100;

            return (
              <div
                key={badge.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-white border-[#B38E5D]/40 shadow-xs hover:border-[#B38E5D]'
                    : 'bg-slate-50/80 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl shadow-xs shrink-0 ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-[#1B2A4A] to-[#2B3F66] text-[#B38E5D] ring-2 ring-[#B38E5D]/40'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Award className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold font-mono uppercase rounded bg-[#B38E5D]/10 text-[#B38E5D]">
                      +{badge.xpBonus} XP
                    </span>
                    {isUnlocked && (
                      <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Desbloqueado</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-base text-[#1B2A4A] mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {badge.description}
                </p>

                {/* Progress bar if locked */}
                {!isUnlocked ? (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Progresso</span>
                      <span>{badge.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B38E5D] rounded-full"
                        style={{ width: `${badge.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-400 font-mono">
                    Conquistado em {badge.unlockedAt}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Rewards Store */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber-900">
              <Gift className="w-4 h-4 text-[#B38E5D] shrink-0" />
              <span>
                Você possui <strong className="font-mono text-sm">{currentUser.xp} XP</strong> disponíveis para resgatar materiais exclusivos e certificações.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {rewards.map(reward => {
              const canAfford = currentUser.xp >= reward.requiredXp;

              return (
                <div
                  key={reward.id}
                  className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-[#B38E5D] transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B38E5D]">
                        {reward.category}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#1B2A4A] px-2 py-0.5 rounded bg-slate-100">
                        {reward.requiredXp} XP Necessários
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#1B2A4A]">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                    {reward.claimed ? (
                      <div className="w-full flex items-center justify-between gap-2">
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> Recompensa Ativa
                        </span>
                        {reward.category === 'certificado' ? (
                          <button
                            onClick={() => setSelectedCertificateReward(reward)}
                            className="px-3.5 py-1.5 bg-[#1B2A4A] text-white hover:bg-[#101B30] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#B38E5D]" />
                            <span>Visualizar</span>
                          </button>
                        ) : (
                          <span className="font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded border border-slate-200 truncate">
                            {reward.rewardCode}
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        disabled={!canAfford}
                        onClick={() => {
                          onClaimReward(reward.id);
                          if (reward.category === 'certificado') {
                            setSelectedCertificateReward(reward);
                          }
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                          canAfford
                            ? 'bg-[#1B2A4A] hover:bg-[#101B30] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#B38E5D]" />
                            <span>Resgatar Recompensa ({reward.requiredXp} XP)</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>XP Insuficiente ({reward.requiredXp - currentUser.xp} faltantes)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden max-w-3xl mx-auto w-full">
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-[#FAF9F6]">
            <h3 className="font-serif font-bold text-lg text-[#1B2A4A]">
              Placar Acadêmico da Turma
            </h3>
            <p className="text-xs text-slate-500">
              Inspirado na cooperação e na constância de estudos em saúde mental.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {leaderboard.map((student, idx) => (
              <div
                key={student.name}
                className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs ${
                  student.isCurrent ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                    idx === 0 ? 'bg-amber-400 text-amber-950' : idx === 1 ? 'bg-slate-300 text-slate-800' : idx === 2 ? 'bg-amber-700/60 text-white' : 'text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {student.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-800 flex items-center gap-1.5 truncate">
                      <span className="truncate">{student.name}</span>
                      {student.isCurrent && <span className="text-[10px] text-[#B38E5D] font-bold shrink-0">(Você)</span>}
                    </div>
                    <div className="text-[10px] text-slate-400">Nível {student.level}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-amber-700">
                    <Flame className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>{student.streak}d</span>
                  </div>
                  <div className="font-mono font-bold text-slate-800 tabular-nums">
                    {student.xp} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Certificate Modal */}
      {selectedCertificateReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs select-none overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#FAF9F6] text-slate-900 rounded-2xl shadow-2xl border-4 border-[#B38E5D] p-5 sm:p-10 animate-in zoom-in-95 my-auto">
            
            <button
              onClick={() => setSelectedCertificateReward(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Inner Frame */}
            <div className="border-2 border-[#1B2A4A]/20 p-4 sm:p-8 text-center space-y-4 sm:space-y-6 bg-white/60">
              <div className="flex justify-center mb-2">
                <BrandLogo size="lg" variant="full" />
              </div>

              <div className="space-y-1">
                <span className="font-sans font-bold text-xs tracking-[0.25em] uppercase text-[#B38E5D]">
                  CERTIFICADO OFICIAL DE CONCLUSÃO
                </span>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Instituição de Ensino Continuado em Psicologia Clínica
                </p>
              </div>

              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Certificamos para os devidos fins acadêmicos e profissionais que
              </p>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B2A4A] border-b-2 border-[#B38E5D]/40 pb-2 max-w-md mx-auto">
                {currentUser.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                concluiu com êxito as exigências teóricas, estudos de caso e avaliações práticas do programa de extensão em <strong>Regulação Emocional & Manejo da Ansiedade na Prática Clínica</strong>, com carga horária total comprovada de <strong>16 horas</strong>.
              </p>

              {/* Signatures & Seal */}
              <div className="pt-6 sm:pt-8 grid grid-cols-2 gap-4 sm:gap-8 items-end max-w-lg mx-auto border-t border-slate-200">
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-base sm:text-lg text-[#1B2A4A]">
                    Patrick Ramon
                  </div>
                  <div className="h-[1px] bg-slate-400 w-28 sm:w-36 mx-auto" />
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase">Patrick Ramon</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500">Psicólogo Clínico · CRP 09|22010</div>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-[#B38E5D] flex items-center justify-center text-[#B38E5D] font-serif font-bold text-[10px] sm:text-xs">
                    SELO
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    Registro: {selectedCertificateReward.rewardCode || 'PR-2026-9921'}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">
                    Autenticidade Verificada
                  </div>
                </div>
              </div>
            </div>

            {/* Print & Download Action */}
            <div className="mt-4 sm:mt-6 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 sm:px-5 py-2.5 bg-[#1B2A4A] text-white hover:bg-[#101B30] text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#B38E5D]" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
