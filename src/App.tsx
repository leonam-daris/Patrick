import React, { useState, useEffect } from 'react';
import { 
  User, 
  Course, 
  Ebook, 
  NotificationItem, 
  Badge, 
  Reward, 
  CalendarEvent 
} from './types';
import { 
  INITIAL_COURSES, 
  INITIAL_EBOOKS, 
  MOCK_USERS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_BADGES, 
  INITIAL_REWARDS, 
  INITIAL_CALENDAR_EVENTS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MatriculaPage } from './components/MatriculaPage';
import { Dashboard } from './components/Dashboard';
import { CoursePlayer } from './components/CoursePlayer';
import { EbookReader } from './components/EbookReader';
import { GamificationView } from './components/GamificationView';
import { CalendarView } from './components/CalendarView';
import { NotificationCenter } from './components/NotificationCenter';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Application Data States (default to visitor Lucas with no courses unlocked)
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [ebooks, setEbooks] = useState<Ebook[]>(INITIAL_EBOOKS);
  const [students, setStudents] = useState<Record<string, User>>(MOCK_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>('user-lucas');
  
  // Navigation & View States
  const [currentView, setCurrentView] = useState<string>('landing');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeEbook, setActiveEbook] = useState<Ebook | null>(null);
  const [selectedCourseForMatricula, setSelectedCourseForMatricula] = useState<Course | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Course | Ebook | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Gamification, Notifications & Calendar
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);

  // Floating Toast Alert
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const currentUser = students[currentUserId] || null;

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Award XP and handle level up
  const handleAwardXp = (amount: number, reason: string) => {
    if (!currentUser) return;

    const newXp = currentUser.xp + amount;
    const newLevel = Math.floor(newXp / 300) + 1;
    const leveledUp = newLevel > currentUser.level;

    setStudents(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        xp: newXp,
        level: newLevel,
      }
    }));

    if (leveledUp) {
      showToast(
        `Parabéns! Você subiu para o Nível ${newLevel}!`,
        `Novo título de evolução acadêmica desbloqueado (+${amount} XP).`
      );
      // Add notification
      const notif: NotificationItem = {
        id: Date.now().toString(),
        title: `Novo Nível Conquistado: Nível ${newLevel}`,
        message: `Sua dedicação aos estudos rendeu o Nível ${newLevel}! Confira as recompensas disponíveis.`,
        type: 'reward',
        timestamp: 'Agora',
        read: false,
        linkAction: 'gamificacao'
      };
      setNotifications(prev => [notif, ...prev]);
    } else {
      showToast(`+${amount} XP Conquistados!`, reason);
    }
  };

  // Mark Lesson as Completed
  const handleCompleteLesson = (lessonId: string) => {
    if (!currentUser) return;
    if (currentUser.completedLessonIds.includes(lessonId)) return;

    setStudents(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        completedLessonIds: [...prev[currentUser.id].completedLessonIds, lessonId]
      }
    }));
  };

  // Update E-book Reading Page Progress
  const handleUpdateEbookProgress = (ebookId: string, pageNumber: number) => {
    if (!currentUser) return;

    setStudents(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        readingProgress: {
          ...prev[currentUser.id].readingProgress,
          [ebookId]: pageNumber
        }
      }
    }));
  };

  // Handle Payment Success & Automatic Access Provisioning
  const handlePaymentSuccess = (product: Course | Ebook) => {
    if (!currentUser) return;

    // Immediately grant product access to current user
    setStudents(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        role: prev[currentUser.id].role === 'visitor' ? 'student' : prev[currentUser.id].role,
        unlockedProductIds: Array.from(new Set([...prev[currentUser.id].unlockedProductIds, product.id]))
      }
    }));

    // In-app notification
    const purchaseNotif: NotificationItem = {
      id: Date.now().toString(),
      title: 'Acesso Liberado com Sucesso!',
      message: `O seu acesso vitalício ao "${product.title}" já está disponível na sua conta. Bons estudos!`,
      type: 'system',
      timestamp: 'Agora',
      read: false,
      linkAction: 'dashboard'
    };
    setNotifications(prev => [purchaseNotif, ...prev]);

    handleAwardXp(100, `Matrícula efetuada: ${product.title}`);
    showToast('Matrícula Confirmada!', `Acesso liberado a ${product.title}`);
  };

  // Toggle access manually by Admin (Patrick)
  const handleToggleProductAccess = (userId: string, productId: string) => {
    setStudents(prev => {
      const user = prev[userId];
      if (!user) return prev;
      const hasIt = user.unlockedProductIds.includes(productId);
      const nextUnlocked = hasIt 
        ? user.unlockedProductIds.filter(id => id !== productId)
        : [...user.unlockedProductIds, productId];

      return {
        ...prev,
        [userId]: {
          ...user,
          unlockedProductIds: nextUnlocked
        }
      };
    });
  };

  // Broadcast notification sent by Admin
  const handleSendBroadcastNotification = (title: string, message: string, type: 'lesson' | 'event' | 'system') => {
    const newBroadcast: NotificationItem = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: 'Agora',
      read: false,
    };
    setNotifications(prev => [newBroadcast, ...prev]);
    showToast('Aviso Geral Enviado!', 'Todos os alunos receberam a notificação em tempo real.');
  };

  // Claim Reward
  const handleClaimReward = (rewardId: string) => {
    if (!currentUser) return;
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || currentUser.xp < reward.requiredXp) return;

    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, claimed: true, rewardCode: `RESGATE-${Math.floor(Math.random() * 90000 + 10000)}` } : r));
    showToast('Recompensa Resgatada com Sucesso!', `Você liberou: ${reward.title}`);
  };

  // Add Calendar Event
  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents(prev => [newEvent, ...prev]);
    showToast('Meta Agendada!', `"${newEvent.title}" adicionado ao seu calendário.`);
  };

  // Notification actions
  const handleNotificationAction = (linkAction?: string) => {
    if (!linkAction) return;

    if (linkAction === 'dashboard') {
      setCurrentView('dashboard');
    } else if (linkAction === 'calendario') {
      setCurrentView('calendar');
    } else if (linkAction === 'gamificacao') {
      setCurrentView('gamification');
    } else {
      const targetCourse = courses.find(c => c.id === linkAction);
      if (targetCourse) {
        setActiveCourse(targetCourse);
        setCurrentView('course-player');
        return;
      }
      const targetEbook = ebooks.find(e => e.id === linkAction);
      if (targetEbook) {
        setActiveEbook(targetEbook);
        setCurrentView('ebook-reader');
        return;
      }
      setCurrentView('dashboard');
    }
  };

  // Navigation handlers
  const handleOpenCourse = (course: Course) => {
    setActiveCourse(course);
    setCurrentView('course-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEbook = (ebook: Ebook) => {
    setActiveEbook(ebook);
    setCurrentView('ebook-reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Matricula Page
  const handleOpenMatricula = (course: Course) => {
    setSelectedCourseForMatricula(course);
    setCurrentView('matricula');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] text-slate-800 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'catalog') {
            setCurrentView('landing');
            setTimeout(() => {
              const el = document.getElementById('cursos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 120);
          } else if (view === 'about') {
            setCurrentView('landing');
            setTimeout(() => {
              const el = document.getElementById('sobre');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 120);
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onSelectUserPersona={(userId) => {
          if (userId) {
            setCurrentUserId(userId);
            const user = students[userId] || MOCK_USERS[userId];
            const roleDesc = user?.role === 'client' 
              ? 'Perfil Só Cliente dos Cursos (Biblioteca Comercial)' 
              : user?.role === 'student' 
                ? 'Perfil Só Aluna (Formação Acadêmica & Metas)' 
                : user?.role === 'admin' 
                  ? 'Perfil Psicólogo / Gestor Geral (Admin)' 
                  : 'Perfil Visitante (Sem Compras)';
            showToast(
              `Perfil: ${user?.name}`,
              `Você está navegando como ${roleDesc}`
            );
          }
        }}
        onLogout={() => {
          setCurrentUserId('user-lucas');
          setCurrentView('landing');
          showToast('Sessão encerrada', 'Você está navegando como visitante.');
        }}
        onOpenCheckout={(item) => setCheckoutProduct(item)}
      />

      {/* Main Body Router */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentView === 'landing' && (
          <LandingPage
            courses={courses}
            ebooks={ebooks}
            currentUser={currentUser}
            onOpenCourse={handleOpenCourse}
            onOpenEbook={handleOpenEbook}
            onOpenCheckout={(product) => setCheckoutProduct(product)}
            onOpenMatricula={handleOpenMatricula}
            onNavigate={(view) => setCurrentView(view)}
            onSelectUserPersona={(userId) => {
              setCurrentUserId(userId);
              setCurrentView('dashboard');
            }}
          />
        )}

        {currentView === 'matricula' && selectedCourseForMatricula && (
          <MatriculaPage
            course={selectedCourseForMatricula}
            currentUser={currentUser}
            onBack={() => setCurrentView('landing')}
            onPaymentSuccess={handlePaymentSuccess}
            onOpenCourseDirectly={handleOpenCourse}
          />
        )}

        {currentView === 'dashboard' && currentUser && (
          <Dashboard
            currentUser={currentUser}
            courses={courses}
            ebooks={ebooks}
            calendarEvents={calendarEvents}
            onOpenCourse={handleOpenCourse}
            onOpenEbook={handleOpenEbook}
            onOpenCheckout={(product) => setCheckoutProduct(product)}
            onOpenMatricula={handleOpenMatricula}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'course-player' && activeCourse && (
          <CoursePlayer
            course={activeCourse}
            currentUser={currentUser}
            onBack={() => setCurrentView(currentUser && currentUser.role !== 'visitor' ? 'dashboard' : 'landing')}
            onOpenCheckout={(course) => handleOpenMatricula(course)}
            onCompleteLesson={handleCompleteLesson}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'ebook-reader' && activeEbook && (
          <EbookReader
            ebook={activeEbook}
            currentUser={currentUser}
            onClose={() => setCurrentView(currentUser && currentUser.role !== 'visitor' ? 'dashboard' : 'landing')}
            onOpenCheckout={(ebook) => setCheckoutProduct(ebook)}
            onUpdateProgress={handleUpdateEbookProgress}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'gamification' && currentUser && (
          <GamificationView
            currentUser={currentUser}
            badges={badges}
            rewards={rewards}
            onClaimReward={handleClaimReward}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView
            events={calendarEvents}
            onAddEvent={handleAddCalendarEvent}
            onBackToDashboard={() => setCurrentView(currentUser && currentUser.role !== 'visitor' ? 'dashboard' : 'landing')}
          />
        )}

        {currentView === 'admin' && currentUser?.role === 'admin' && (
          <AdminPanel
            courses={courses}
            ebooks={ebooks}
            students={students}
            onToggleProductAccess={handleToggleProductAccess}
            onSendBroadcastNotification={handleSendBroadcastNotification}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Slide-over Notification Center */}
      <NotificationCenter
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onMarkAsRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }}
        onActionClick={handleNotificationAction}
      />

      {/* Checkout / Paywall Modal */}
      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          currentUser={currentUser}
          onClose={() => setCheckoutProduct(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#101B30] text-white rounded-2xl shadow-2xl border border-slate-700 max-w-sm flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#C49A5A] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-[#C49A5A]">{toastMessage.title}</div>
            <div className="text-slate-300 leading-relaxed">{toastMessage.desc}</div>
          </div>
        </div>
      )}

    </div>
  );
}
