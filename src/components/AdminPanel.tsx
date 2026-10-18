import React, { useState } from 'react';
import { Course, Ebook, User, NotificationItem } from '../types';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  BookOpen, 
  GraduationCap, 
  Plus, 
  Send, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Sparkles,
  BarChart3
} from 'lucide-react';

interface AdminPanelProps {
  courses: Course[];
  ebooks: Ebook[];
  students: Record<string, User>;
  onToggleProductAccess: (userId: string, productId: string) => void;
  onSendBroadcastNotification: (title: string, message: string, type: 'lesson' | 'event' | 'system') => void;
  onBackToDashboard: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  courses,
  ebooks,
  students,
  onToggleProductAccess,
  onSendBroadcastNotification,
  onBackToDashboard,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('user-camila');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const selectedStudent = students[selectedStudentId] || Object.values(students)[0];

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    onSendBroadcastNotification(broadcastTitle.trim(), broadcastMessage.trim(), 'system');
    setBroadcastSent(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#2B3F66] text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B38E5D] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Painel do Docente & Administrador</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            Gestão da Plataforma · Patrick Ramon
          </h1>
          <p className="text-xs text-slate-300">
            Controle de matrículas, liberação manual de produtos, engajamento dos alunos e avisos gerais.
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold rounded-xl transition-colors self-start sm:self-auto"
        >
          Visualizar como Aluno
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
            Alunos Matriculados
          </div>
          <div className="text-2xl font-bold font-serif text-[#1B2A4A]">
            {Object.keys(students).length + 142}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            +18 novos este mês
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
            Receita Estimada
          </div>
          <div className="text-2xl font-bold font-serif text-[#1B2A4A]">
            R$ 48.650
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Cursos + E-books
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
            Taxa de Conclusão
          </div>
          <div className="text-2xl font-bold font-serif text-[#1B2A4A]">
            78.4%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Acima da média do mercado (LMS)
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold uppercase mb-1">
            Satisfação dos Alunos
          </div>
          <div className="text-2xl font-bold font-serif text-[#1B2A4A]">
            4.95 <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Com base em 148 avaliações
          </div>
        </div>
      </div>

      {/* Main Grid: Student Access Management & Broadcast Notification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Access Permissions (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1B2A4A] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#B38E5D]" />
                <span>Gerenciar Acesso e Conteúdos por Aluno</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Selecione o aluno e ative ou desative o acesso imediato aos cursos e e-books.
              </p>
            </div>

            {/* Student Picker */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.values(students).map(stu => (
                <button
                  key={stu.id}
                  onClick={() => setSelectedStudentId(stu.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    selectedStudent.id === stu.id
                      ? 'bg-[#1B2A4A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{stu.name}</span>
                </button>
              ))}
            </div>

            {/* Student Details & Product Toggles */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-slate-800">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.email} · Nível {selectedStudent.level} · {selectedStudent.xp} XP</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600">
                  {selectedStudent.unlockedProductIds.length} Produtos Liberados
                </span>
              </div>

              {/* Course Toggles */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#B38E5D]">
                  Cursos Disponíveis:
                </div>
                {courses.map(course => {
                  const hasAccess = selectedStudent.unlockedProductIds.includes(course.id) || selectedStudent.role === 'admin';

                  return (
                    <div
                      key={course.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{course.title}</div>
                        <div className="text-[11px] text-slate-500">R$ {course.price.toFixed(2)} · {course.totalLessons} aulas</div>
                      </div>

                      <button
                        onClick={() => onToggleProductAccess(selectedStudent.id, course.id)}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                          hasAccess
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                        }`}
                      >
                        {hasAccess ? (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Liberado (Clique p/ Bloquear)</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Bloqueado (Clique p/ Liberar)</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Ebook Toggles */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#B38E5D]">
                  E-books & Materiais Práticos:
                </div>
                {ebooks.map(ebook => {
                  const hasAccess = selectedStudent.unlockedProductIds.includes(ebook.id) || selectedStudent.role === 'admin';

                  return (
                    <div
                      key={ebook.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{ebook.title}</div>
                        <div className="text-[11px] text-slate-500">R$ {ebook.price.toFixed(2)} · {ebook.totalPages} páginas</div>
                      </div>

                      <button
                        onClick={() => onToggleProductAccess(selectedStudent.id, ebook.id)}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                          hasAccess
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                        }`}
                      >
                        {hasAccess ? (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Liberado</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Liberar E-book</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Send Broadcast Push / In-App Notification (1 Column) */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1B2A4A] flex items-center gap-2">
                <Send className="w-4 h-4 text-[#B38E5D]" />
                <span>Enviar Notificação Geral</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Dispare avisos push e in-app para todos os alunos sobre novas aulas, avisos ou prazos.
              </p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Título do Aviso:
                </label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="Ex: Nova Aula Extra Disponível!"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mensagem:
                </label>
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Escreva a mensagem que os alunos receberão em tempo real..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                />
              </div>

              {broadcastSent && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Notificação disparada para todos os alunos!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B2A4A] hover:bg-[#101B30] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#B38E5D]" />
                <span>Disparar Notificação p/ Turma</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
