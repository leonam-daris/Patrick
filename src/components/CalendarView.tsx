import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  FileText, 
  Users, 
  Plus, 
  ExternalLink, 
  Download, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onBackToDashboard: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onAddEvent,
  onBackToDashboard,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-10-24');
  const [newEventTime, setNewEventTime] = useState('19:00');
  const [newEventType, setNewEventType] = useState<'live' | 'deadline' | 'study_group' | 'supervision'>('study_group');
  const [newEventDesc, setNewEventDesc] = useState('');

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(e => e.type === filterType);

  // Google Calendar URL generator
  const createGoogleCalendarUrl = (event: CalendarEvent) => {
    const startIso = event.date.replace(/-/g, '') + 'T' + event.time.replace(':', '') + '00Z';
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nInstrutor: ${event.instructor}\nLocal: ${event.location}`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${startIso}&details=${details}&location=${location}`;
  };

  // Export .ICS file
  const handleExportIcs = (event: CalendarEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Patrick Ramon Psicologia//Portal Academico//PT-BR',
      'BEGIN:VEVENT',
      `UID:${event.id}@patrickramon.com.br`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description} - Instrutor: ${event.instructor}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.slice(0, 25).replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle.trim(),
      description: newEventDesc.trim() || 'Sessão de estudos independente agendada pelo aluno.',
      date: newEventDate,
      time: newEventTime,
      durationMinutes: 60,
      type: newEventType,
      instructor: 'Estudo Pessoal',
      location: 'Portal do Aluno · Ambiente Virtual'
    };

    onAddEvent(newEv);
    setIsModalOpen(false);
    setNewEventTitle('');
    setNewEventDesc('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B38E5D] uppercase tracking-wider">
            <CalendarIcon className="w-4 h-4" />
            <span>Organizador Acadêmico & Cronograma</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1B2A4A] mt-1">
            Calendário de Estudos & Encontros
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mantenha suas metas em dia, participe das supervisões ao vivo e organize suas tarefas clínicas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#1B2A4A] hover:bg-[#101B30] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#B38E5D]" />
            <span>Agendar Meta de Estudo</span>
          </button>
          <button
            onClick={onBackToDashboard}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            filterType === 'all' ? 'bg-[#1B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Todos os Compromissos ({events.length})
        </button>
        <button
          onClick={() => setFilterType('live')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filterType === 'live' ? 'bg-[#1B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-rose-500" />
          <span>Aulas ao Vivo com Patrick</span>
        </button>
        <button
          onClick={() => setFilterType('deadline')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filterType === 'deadline' ? 'bg-[#1B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Prazos & Tarefas</span>
        </button>
        <button
          onClick={() => setFilterType('study_group')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filterType === 'study_group' ? 'bg-[#1B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-blue-500" />
          <span>Grupos de Estudos</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => {
          const googleUrl = createGoogleCalendarUrl(event);

          return (
            <div
              key={event.id}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-[#B38E5D] transition-all shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B2A4A] px-2.5 py-1 bg-amber-50 border border-amber-200/60 rounded-lg">
                      {event.date}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {event.time}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    event.type === 'live' 
                      ? 'bg-rose-50 text-rose-700' 
                      : event.type === 'deadline'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-blue-50 text-blue-700'
                  }`}>
                    {event.type === 'live' ? 'Encontro Ao Vivo' : event.type === 'deadline' ? 'Prazo de Entrega' : 'Grupo de Estudo'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#1B2A4A]">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                  <div><strong>Instrutor:</strong> {event.instructor}</div>
                  <div><strong>Local / Plataforma:</strong> {event.location}</div>
                </div>
              </div>

              {/* Sync Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold text-[#1B2A4A] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#B38E5D]" />
                  <span>Google Agenda</span>
                </a>

                <button
                  onClick={() => handleExportIcs(event)}
                  className="px-3.5 py-1.5 bg-[#FAF9F6] border border-slate-200 hover:border-[#B38E5D] text-xs font-semibold text-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                  title="Baixar arquivo .ICS para Apple Calendar ou Outlook"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar .ICS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Study Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1B2A4A]">
                Nova Meta de Estudo
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Título da Meta ou Tarefa:
                </label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="Ex: Assistir Aula 03 de TCC e preencher RPD"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Data:
                  </label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Horário:
                  </label>
                  <input
                    type="time"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tipo de Atividade:
                </label>
                <select
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden bg-white"
                >
                  <option value="study_group">Estudo Pessoal / Leitura de E-book</option>
                  <option value="deadline">Prazo de Exercício Clínico</option>
                  <option value="live">Revisão de Conteúdo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Anotações / Descrição:
                </label>
                <textarea
                  rows={2}
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Detalhes ou metas específicas..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1B2A4A] text-white font-semibold rounded-lg hover:bg-[#101B30]"
                >
                  Adicionar ao Calendário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
