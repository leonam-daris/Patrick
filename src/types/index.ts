export type UserRole = 'visitor' | 'student' | 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  unlockedProductIds: string[]; // IDs of courses and ebooks purchased/granted
  xp: number;
  level: number;
  streakDays: number;
  lastStudyDate: string;
  completedLessonIds: string[];
  readingProgress: Record<string, number>; // ebookId -> pageNumber
}

export interface LessonNote {
  id: string;
  lessonId: string;
  timestampSeconds: number;
  content: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoUrl: string; // real video stream or high-res demo
  resolutions: { resolution: '1080p' | '720p' | '480p'; url: string }[];
  summary: string;
  transcript: string;
  resources: { title: string; type: 'pdf' | 'worksheet' | 'link'; size?: string; url: string }[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  instructor: string;
  instructorTitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  totalLessons: number;
  totalHours: string;
  badgeText?: string;
  description: string;
  learningGoals: string[];
  modules: CourseModule[];
  certificateAvailable: boolean;
  coverImage: string;
}

export interface EbookChapter {
  id: string;
  title: string;
  pageStart: number;
  pageEnd: number;
  content: string[]; // paragraphs for realistic reader
  therapeuticExercise?: {
    title: string;
    instructions: string;
    prompt: string;
  };
}

export interface Ebook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  price: number;
  originalPrice?: number;
  totalPages: number;
  category: string;
  description: string;
  coverImage: string;
  sampleAvailable: boolean;
  chapters: EbookChapter[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lesson' | 'deadline' | 'reward' | 'system' | 'event';
  timestamp: string;
  read: boolean;
  linkAction?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpBonus: number;
  unlockedAt?: string;
  progressPercent: number;
  category: 'foco' | 'conhecimento' | 'consistencia' | 'pratica';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  requiredXp: number;
  claimed: boolean;
  category: 'desconto' | 'conteudo' | 'mentoria' | 'certificado';
  rewardCode?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  durationMinutes: number;
  type: 'live' | 'deadline' | 'study_group' | 'supervision';
  instructor: string;
  location: string;
}

export interface Transaction {
  id: string;
  userId: string;
  productId: string;
  productType: 'course' | 'ebook';
  productTitle: string;
  amount: number;
  paymentMethod: 'credit_card' | 'pix' | 'paypal';
  status: 'approved' | 'pending';
  date: string;
  invoiceUrl: string;
}
