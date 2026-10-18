import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { 
  Bell, 
  CheckCheck, 
  X, 
  Play, 
  Calendar, 
  Award, 
  Clock, 
  Sparkles, 
  ShieldAlert,
  Send,
  Check
} from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onActionClick: (actionLink?: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onActionClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'lesson' | 'deadline' | 'reward'>('all');
  const [pushEnabled, setPushEnabled] = useState(false);
  const [showPushToast, setShowPushToast] = useState(false);

  if (!isOpen) return null;

  const filtered = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const handleTogglePush = () => {
    const nextState = !pushEnabled;
    setPushEnabled(nextState);
    if (nextState) {
      setShowPushToast(true);
      setTimeout(() => setShowPushToast(false), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B2A4A] text-[#B38E5D] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-[#1B2A4A]">
                Notificações Acadêmicas
              </h2>
              <span className="text-[10px] text-slate-500">
                Lembretes de aulas, prazos e recompensas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="p-1.5 text-slate-500 hover:text-[#1B2A4A] hover:bg-slate-200/60 rounded-lg text-xs flex items-center gap-1 transition-colors"
              title="Marcar todas como lidas"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Web Push Notification Simulator Toggle */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between text-xs">
          <div className="space-y-0.5 max-w-[240px]">
            <div className="font-bold text-[#1B2A4A]">
              Alertas Push no Navegador
            </div>
            <div className="text-[11px] text-slate-600">
              Receba avisos instantâneos quando Patrick liberar uma nova aula.
            </div>
          </div>
          <button
            onClick={handleTogglePush}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 ${
              pushEnabled
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-[#1B2A4A]'
            }`}
          >
            {pushEnabled ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{pushEnabled ? 'Ativado' : 'Ativar Push'}</span>
          </button>
        </div>

        {/* Simulated Push Toast feedback */}
        {showPushToast && (
          <div className="mx-4 mt-3 p-3 bg-[#101B30] text-white rounded-xl shadow-lg border border-slate-700 text-xs flex items-start gap-3 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#B38E5D]">Push Ativado com Sucesso!</div>
              <div className="text-slate-300 text-[11px]">Você receberá notificações na área de trabalho mesmo se o portal estiver em segundo plano.</div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 overflow-x-auto text-xs bg-slate-50">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-[#1B2A4A] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('lesson')}
            className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'lesson' ? 'bg-[#1B2A4A] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Aulas
          </button>
          <button
            onClick={() => setFilter('deadline')}
            className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'deadline' ? 'bg-[#1B2A4A] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Prazos
          </button>
          <button
            onClick={() => setFilter('reward')}
            className={`px-2.5 py-1 rounded-md transition-colors ${filter === 'reward' ? 'bg-[#1B2A4A] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Recompensas
          </button>
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Nenhuma notificação neste filtro.
            </div>
          ) : (
            filtered.map(notif => {
              const iconMap = {
                lesson: <Play className="w-4 h-4 text-emerald-600" />,
                event: <Calendar className="w-4 h-4 text-blue-600" />,
                reward: <Award className="w-4 h-4 text-amber-600" />,
                deadline: <Clock className="w-4 h-4 text-rose-600" />,
                system: <Sparkles className="w-4 h-4 text-[#B38E5D]" />,
              };

              return (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead(notif.id)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                    notif.read ? 'bg-white hover:bg-slate-50' : 'bg-amber-50/40 hover:bg-amber-50/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                      {iconMap[notif.type] || <Bell className="w-4 h-4 text-slate-600" />}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-800">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {notif.message}
                      </p>

                      {notif.linkAction && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onActionClick(notif.linkAction);
                            onClose();
                          }}
                          className="mt-1 text-[11px] font-semibold text-[#B38E5D] hover:underline flex items-center gap-1"
                        >
                          <span>Acessar conteúdo</span>
                          <span>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
