import { Course, Ebook, NotificationItem, Badge, Reward, CalendarEvent, User } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'curso-regulacao-emocional',
    title: 'Regulação Emocional & Manejo da Ansiedade na Prática',
    subtitle: 'Da neurobiologia das emoções aos protocolos clínicos validados de intervenção e psicoeducação.',
    category: 'Psicologia Clínica & Neurociência',
    instructor: 'Patrick Ramon',
    instructorTitle: 'Psicólogo Clínico · CRP 09|22010',
    price: 297.00,
    originalPrice: 497.00,
    rating: 4.9,
    reviewsCount: 148,
    totalLessons: 12,
    totalHours: '16 horas',
    badgeText: 'Mais Vendido',
    coverImage: 'linear-gradient(135deg, #1B2A4A 0%, #2A3E66 60%, #B38E5D 100%)',
    description: 'Um treinamento aprofundado e prático desenhado para profissionais de saúde mental, estudantes e pessoas em busca de domínio sobre seus estados emocionais. Aprenda estratégias da TCC e Terapias de Terceira Onda (ACT e Mindfulness) para desarmar gatilhos de pânico, ruminação mental e ansiedade generalizada.',
    learningGoals: [
      'Dominar a neurobiologia da amígdala e do córtex pré-frontal sob estresse agudo',
      'Aplicar ferramentas de desfusão cognitiva e reestruturação de pensamentos automáticos',
      'Conduzir exercícios somáticos de regulação vagal e respiração diafragmática',
      'Elaborar planos terapêuticos de manutenção de ganhos e prevenção de recaídas'
    ],
    certificateAvailable: true,
    modules: [
      {
        id: 'mod-1',
        title: 'Módulo 1: Fundamentos & Neurobiologia do Afeto',
        description: 'Compreendendo como o cérebro processa ameaças, medo e gatilhos emocionais.',
        lessons: [
          {
            id: 'aula-1-1',
            title: 'Aula 01: O Ciclo da Ansiedade e o Sistema de Alarme',
            duration: '24 min',
            durationSeconds: 1440,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { resolution: '720p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
              { resolution: '480p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
            ],
            summary: 'Nesta primeira aula, Patrick Ramon apresenta o modelo trifásico da ansiedade: componente cognitivo (pensamentos de catastrofização), fisiológico (taquicardia, sudorese, hiperventilação) e comportamental (esquiva experiencial). Entenda como o cérebro evoluiu para priorizar a sobrevivência sobre o bem-estar imediato.',
            transcript: 'Olá a todos. Sejam muito bem-vindos ao nosso curso. Hoje começamos desmistificando um dos maiores mitos da clínica: a ideia de que a ansiedade é um defeito a ser extinto. A ansiedade é um mecanismo adaptativo milenar de alerta. Quando entendemos como a amígdala aciona o eixo HPA, deixamos de lutar contra os sintomas e passamos a regulá-los...',
            resources: [
              { title: 'Guia de Psicoeducação do Eixo HPA (PDF)', type: 'pdf', size: '2.4 MB', url: '#' },
              { title: 'Escala de Avaliação de Sintomas Somáticos (Word/PDF)', type: 'worksheet', size: '640 KB', url: '#' }
            ],
            quiz: {
              question: 'Qual é a função adaptativa primordial do sistema límbico frente a um estímulo aversivo percebido?',
              options: [
                'Inibir a produção de cortisol e desacelerar os batimentos cardíacos',
                'Ativar a resposta de luta, fuga ou congelamento visando a preservação da integridade física',
                'Promover raciocínio abstrato reflexivo prolongado sem ação muscular',
                'Eliminar completamente memórias traumáticas precedentes'
              ],
              correctAnswerIndex: 1,
              explanation: 'O sistema límbico, com ênfase na amígdala, atua como sentinela ultrarrápido disparando vias simpáticas de prontidão para sobrevivência.'
            }
          },
          {
            id: 'aula-1-2',
            title: 'Aula 02: Tolerância ao Desconforto e Janela de Tolerância',
            duration: '31 min',
            durationSeconds: 1860,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
              { resolution: '720p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
              { resolution: '480p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
            ],
            summary: 'Aprofundamento na teoria da Janela de Tolerância (Dan Siegel) e estratégias para identificar estados de hiperativação (pânico, agitação motora) versus hipoativação (apatia, embotamento afetivo).',
            transcript: 'A capacidade de sustentar sensações desconfortáveis sem recorrer à fuga compulsiva é o divisor de águas na saúde emocional. Quando nos mantemos conscientes dentro da nossa janela de tolerância...',
            resources: [
              { title: 'Diagrama da Janela de Tolerância Clínica (PDF)', type: 'pdf', size: '1.1 MB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Módulo 2: Protocolos de Reestruturação Cognitiva',
        description: 'Técnicas estruturadas para desafiar distorções cognitivas e pensamentos catastróficos.',
        lessons: [
          {
            id: 'aula-2-1',
            title: 'Aula 03: Identificação de Pensamentos Automáticos e Erros Cognitivos',
            duration: '28 min',
            durationSeconds: 1680,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
              { resolution: '720p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
            ],
            summary: 'Catastrofização, pensamento tudo-ou-nada, leitura mental e personalização. Exercícios práticos de RPD (Registro de Pensamentos Disfuncionais) com exemplos clínicos reais.',
            transcript: 'Nesta aula examinamos como os pensamentos automáticos se infiltram na rotina com roupagem de verdade absoluta...',
            resources: [
              { title: 'Formulário RPD de 7 Colunas (Modelo Editável)', type: 'worksheet', size: '450 KB', url: '#' }
            ]
          },
          {
            id: 'aula-2-2',
            title: 'Aula 04: Questionamento Socrático e Prova de Realidade',
            duration: '35 min',
            durationSeconds: 2100,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
            ],
            summary: 'Como conduzir perguntas que convidam o paciente a testar hipóteses, avaliar evidências a favor e contra, e formular pensamentos alternativos mais equilibrados.',
            transcript: 'O questionamento socrático não é um debate verbal; é uma investigação cooperativa...',
            resources: [
              { title: 'Guia de 20 Perguntas Socráticas para Terapia (PDF)', type: 'pdf', size: '1.8 MB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Módulo 3: Intervenções Somáticas e Terceira Onda',
        description: 'Integrando regulação vagal, desfusão cognitiva e aceitação radical.',
        lessons: [
          {
            id: 'aula-3-1',
            title: 'Aula 05: Fisiologia Respiratória e Estimulação do Nervo Vago',
            duration: '22 min',
            durationSeconds: 1320,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
            ],
            summary: 'Técnicas de suspiro fisiológico (double inhale), coerência cardíaca em 0.1 Hz e ancoragem nos 5 sentidos (5-4-3-2-1).',
            transcript: 'O corpo envia mais sinais ao cérebro do que o cérebro envia ao corpo. Quando modulamos a expiração...',
            resources: [
              { title: 'Áudio Guiado: Prática de Coerência Cardíaca (MP3)', type: 'worksheet', size: '8.2 MB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'curso-tcc-avancada',
    title: 'TCC Aplicada: Protocolos e Prática Clínica Contemporânea',
    subtitle: 'Abordagem estruturada da avaliação diagnóstica ao encerramento e consolidação terapêutica.',
    category: 'Formação Profissional',
    instructor: 'Patrick Ramon',
    instructorTitle: 'Psicólogo Clínico · CRP 09|22010',
    price: 389.00,
    originalPrice: 590.00,
    rating: 5.0,
    reviewsCount: 92,
    totalLessons: 18,
    totalHours: '24 horas',
    badgeText: 'Formação Completa',
    coverImage: 'linear-gradient(135deg, #101B30 0%, #1B2A4A 60%, #9B7746 100%)',
    description: 'Curso avançado para psicólogos e terapeutas que desejam segurança técnica no manejo de quadros de transtornos do humor, ansiedade social, TOC e esquemas desadaptativos precoces. Inclui modelos de relatórios, prontuários éticos e estudos de caso completos comentados por Patrick Ramon.',
    learningGoals: [
      'Estruturar sessões clínicas com rigor metodológico e acolhimento empático',
      'Elaborar conceituualização cognitiva aprofundada com crenças nucleares',
      'Manejar resistências e quebras de aliança terapêutica',
      'Aplicar inventários validados (BDI-II, BAI, BHS) com respaldo ético do CFP'
    ],
    certificateAvailable: true,
    modules: [
      {
        id: 'mod-tcc-1',
        title: 'Módulo 1: Aliança e Formulação Conceitual',
        description: 'Construindo o mapa cognitivo do paciente.',
        lessons: [
          {
            id: 'aula-tcc-1',
            title: 'Aula 01: O Diagrama de Conceitualização Cognitiva de Judith Beck',
            duration: '38 min',
            durationSeconds: 2280,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
            ],
            summary: 'Passo a passo da identificação de dados de infância, crenças nucleares (desamparo, desamor, desvalor), suposições condicionais e estratégias compensatórias.',
            transcript: 'A conceitualização é o mapa de navegação do psicólogo...',
            resources: [
              { title: 'Diagrama de Conceitualização em Branco (PDF/DOCX)', type: 'worksheet', size: '780 KB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mentoria-casos-clinicos',
    title: 'Supervisão & Discussão de Casos Clínicos em Saúde Mental',
    subtitle: 'Encontros mensais gravados, análise de queixas complexas e refinamento de manejo técnico.',
    category: 'Supervisão & Mentoria',
    instructor: 'Patrick Ramon',
    instructorTitle: 'Psicólogo Clínico · CRP 09|22010',
    price: 497.00,
    originalPrice: 750.00,
    rating: 4.95,
    reviewsCount: 64,
    totalLessons: 8,
    totalHours: '18 horas',
    coverImage: 'linear-gradient(135deg, #1B2A4A 0%, #3A4F73 70%, #B38E5D 100%)',
    description: 'Imersão nos bastidores do raciocínio clínico de Patrick Ramon. Análise minuciosa de hipóteses diagnósticas, intervenções de crise, manejo de ambivalência e ética profissional.',
    learningGoals: [
      'Refinar o olho clínico para nuances de personalidade e apego',
      'Elaborar intervenções sob medida para pacientes resistentes',
      'Evitar a fadiga por compaixão e manter a higidez do terapeuta'
    ],
    certificateAvailable: true,
    modules: [
      {
        id: 'mod-sup-1',
        title: 'Módulo 1: Casos de Ansiedade Generalizada com Comorbidades',
        description: 'Discussão minuciosa de casos reais anonimizados.',
        lessons: [
          {
            id: 'aula-sup-1',
            title: 'Sessão 01: Manejo do Paciente com Crises de Pânico Noturnas',
            duration: '45 min',
            durationSeconds: 2700,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            resolutions: [
              { resolution: '1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' }
            ],
            summary: 'Estudo de caso clínico detalhando intervenção psicoeducativa e dessensibilização interoceptiva.',
            transcript: 'Hoje analisaremos o caso de M., 34 anos, que relatava despertares com taquicardia severa...',
            resources: [
              { title: 'Roteiro de Dessensibilização Interoceptiva (PDF)', type: 'pdf', size: '1.2 MB', url: '#' }
            ]
          }
        ]
      }
    ]
  }
];

export const INITIAL_EBOOKS: Ebook[] = [
  {
    id: 'ebook-guia-ansiedade',
    title: 'Guia Prático de Regulação Emocional & Manejo da Ansiedade',
    subtitle: 'Um manual terapêutico fundamentado na neurociência e na TCC para a sua rotina diária.',
    author: 'Patrick Ramon (Psicólogo CRP 09|22010)',
    price: 47.00,
    originalPrice: 89.00,
    totalPages: 36,
    category: 'E-book Clínico & Guia Prático',
    coverImage: 'linear-gradient(135deg, #1B2A4A 0%, #2D4168 50%, #B38E5D 100%)',
    sampleAvailable: true,
    description: 'Um e-book completo com visualizador de leitura imersivo diretamente no portal. Contém protocolos passo a passo para crises de ansiedade, rotinas de sono restaurador, técnicas de aterramento somático e exercícios de autorreflexão.',
    chapters: [
      {
        id: 'cap-1',
        title: 'Capítulo 1: Compreendendo a Linguagem do Seu Corpo',
        pageStart: 1,
        pageEnd: 6,
        content: [
          'A ansiedade é frequentemente rotulada como uma inimiga a ser eliminada a qualquer custo. Na prática clínica diária, contudo, o primeiro passo transformador é a mudança de postura perante ela: a ansiedade não é um sinal de fraqueza, mas um alarme fisiológico hiper-reativo que aprendeu a interpretar incerteza como perigo iminente.',
          'Quando seu coração acelera, sua respiração se torna curta e seus músculos se contraem, seu corpo não está enlouquecendo. Ele está se preparando para protegê-lo com uma tecnologia ancestral de defesa. O problema moderno reside no fato de que os gatilhos atuais raramente são predadores na savana; são prazos corporativos, e-mails não respondidos, conflitos de relacionamento e expectativas financeiras.',
          'Ao aprender a ler os primeiros sinais somáticos — o nó na garganta, a tensão nos trapézios, o calor no peito — você ganha precioso tempo para intervir antes que a resposta de estresse atinja o ápice de uma crise de pânico.',
          'Nas páginas seguintes, exploraremos como o sistema nervoso autônomo opera em duas vias complementares: o ramo simpático (que acelera) e o ramo parassimpático (que desacelera e regenera).'
        ],
        therapeuticExercise: {
          title: 'Exercício Clínico: Mapeamento dos Primeiros Sinais Fisiológicos',
          instructions: 'Reserve 5 minutos em um ambiente silencioso. Feche os olhos por três respirações profundas e reflita sobre o último momento de ansiedade que vivenciou.',
          prompt: 'Qual foi o primeiro local do seu corpo a demonstrar tensão? Descreva com precisão a sensação física (pressão, ardor, tremor, palpitação) e a palavra mental que surgiu naquele instante.'
        }
      },
      {
        id: 'cap-2',
        title: 'Capítulo 2: Desarmando a Tempestade de Pensamentos Catastróficos',
        pageStart: 7,
        pageEnd: 15,
        content: [
          'A mente sob ansiedade é uma especialista em produzir cenários catastróficos. Ela formula com facilidade perguntas que começam com "E se...?": "E se eu falhar?", "E se me julgarem?", "E se eu perder o controle?".',
          'Na Terapia Cognitivo-Comportamental (TCC), ensinamos que pensamentos não são fatos. São apenas hipóteses mentais geradas por um cérebro que busca antecipar o pior para tentar se proteger.',
          'A técnica da Desfusão Cognitiva convida você a dar um passo atrás em relação aos seus pensamentos. Em vez de dizer "Eu vou ter uma crise e passar vergonha", experimente reformular internamente para: "Eu estou notando que minha mente está me contando a história de que terei uma crise". Esse microespaço entre você e o pensamento é onde reside sua liberdade de escolha.',
          'Outra ferramenta vital é o Teste de Realidade: Quais evidências reais sustentam que o pior vai acontecer? Quais evidências apontam o contrário? Se o pior acontecesse, como eu lidaria com isso, considerando recursos que já utilizei no passado?'
        ],
        therapeuticExercise: {
          title: 'Exercício Clínico: O Tribunal dos Pensamentos',
          instructions: 'Escreva um pensamento ansioso recorrente desta semana. Em seguida, divida uma folha em duas colunas: Advogado de Acusação (fatos objetivos) e Advogado de Defesa (evidências contrárias).',
          prompt: 'Qual é o veredito equilibrado e realista sobre essa situação?'
        }
      },
      {
        id: 'cap-3',
        title: 'Capítulo 3: Âncoras Somáticas e o Poder da Respiração Fisiológica',
        pageStart: 16,
        pageEnd: 24,
        content: [
          'Não é possível pensar de forma racional quando o cérebro límbico está em alerta máximo. Nesses momentos, a tentativa de "pensar positivo" é ineficaz porque as vias corticais estão temporariamente subordinadas à resposta de alarme.',
          'Por essa razão, o acesso mais rápido e confiável ao sistema nervoso é de baixo para cima (bottom-up), através do corpo. A respiração é a única função autônoma vital que você pode controlar voluntariamente de forma imediata.',
          'A técnica do Suspiro Fisiológico (duas inspirações consecutivas pelo nariz, a segunda mais curta para reabrir os alvéolos colapsados, seguida de uma expiração longa e suave pela boca) ativa quase que instantaneamente os barorreceptores do coração, enviando um comando de desaceleração ao nódulo sinusal.',
          'Junto a isso, o protocolo 5-4-3-2-1 ancora a atenção no momento presente: 5 coisas que você pode ver, 4 coisas que pode tocar, 3 sons que pode ouvir, 2 aromas que pode sentir e 1 sensação de sabor ou gratidão.'
        ],
        therapeuticExercise: {
          title: 'Prática Guiada: O Protocolo dos 3 Suspiros Fisiológicos',
          instructions: 'Pratique agora: 1 inspiração profunda pelo nariz + 1 microinspiração no topo + expiração lenta pela boca com som de suspiro suave. Repita 3 vezes.',
          prompt: 'Registre como os ombros, o maxilar e a frequência respiratória se comportaram após a prática.'
        }
      },
      {
        id: 'cap-4',
        title: 'Capítulo 4: O Papel da Autocompaixão na Cicatrização Emocional',
        pageStart: 25,
        pageEnd: 36,
        content: [
          'Muitas pessoas ansiosas nutrem uma voz crítica interna implacável. Elas acreditam que a autocrítica severa é necessária para mantê-las motivadas e produtivas. Pesquisas em neurociência afetiva demonstram exatamente o oposto: a autocrítica aciona o sistema de ameaça, inundando o corpo com adrenalina e cortisol.',
          'A autocompaixão, por outro lado, aciona o sistema de afiliação e apaziguamento, estimulando a liberação de ocitocina e endorfinas. Trata-se de se perguntar: "Se o meu melhor amigo estivesse passando por esse mesmo sofrimento agora, o que eu diria a ele com ternura e clareza?".',
          'Aprender a se tratar com a mesma gentileza que você dedica aos outros não é indulgência; é maturidade psicológica e o alicerce fundamental para a resiliência duradoura.',
          'Ao concluir este guia, lembre-se: a evolução emocional é feita de pequenos passos consistentes, não de transformações mágicas da noite para o dia. Celebre cada momento em que você escolheu acolher suas emoções em vez de lutar cegamente contra elas.'
        ],
        therapeuticExercise: {
          title: 'Carta de Autocompaixão para Si Mesmo',
          instructions: 'Escreva uma mensagem de 1 parágrafo para você mesmo, reconhecendo a sua dedicação aos estudos e o esforço que você tem feito em sua saúde mental.',
          prompt: 'Guarde esta frase como um lembrete visual na sua mesa de estudos.'
        }
      }
    ]
  },
  {
    id: 'ebook-caderno-terapeutico',
    title: 'Caderno Terapêutico de Autocompaixão & Hábitos Conscientes',
    subtitle: 'Diário guiado de 21 dias com perguntas terapêuticas para fortalecimento do ego e clareza mental.',
    author: 'Patrick Ramon (Psicólogo CRP 09|22010)',
    price: 39.00,
    originalPrice: 65.00,
    totalPages: 28,
    category: 'Ferramenta & Caderno de Exercícios',
    coverImage: 'linear-gradient(135deg, #101B30 0%, #1B2A4A 60%, #CBB089 100%)',
    sampleAvailable: true,
    description: 'Um caderno interativo para preenchimento diário com reflexões estruturadas pela abordagem cognitivo-comportamental e fenomenológica. Ideal para acompanhar o processo psicoterápico.',
    chapters: [
      {
        id: 'cad-1',
        title: 'Semana 1: Consciência do Momento Presente',
        pageStart: 1,
        pageEnd: 10,
        content: [
          'Bem-vindo ao seu caderno de práticas. Aqui, não há respostas certas ou erradas. O objetivo é criar um refúgio seguro de diálogo com o seu eu mais autêntico.',
          'Nos próximos sete dias, nossa atenção estará voltada para a identificação dos momentos em que você opera no piloto automático, sem notar as pequenas belezas e os sinais sutis de cansaço da sua rotina.',
          'Permita-se desacelerar e responder com sinceridade total às perguntas propostas ao final de cada dia.'
        ],
        therapeuticExercise: {
          title: 'Check-in Matinal dos 3 Minutos',
          instructions: 'Logo ao acordar, antes de pegar no celular, anote três intenções para o seu dia.',
          prompt: 'Qual emoção quero cultivar hoje (calma, clareza, coragem, acolhimento)?'
        }
      },
      {
        id: 'cad-2',
        title: 'Semana 2: Cultivando a Voz Amigável',
        pageStart: 11,
        pageEnd: 28,
        content: [
          'Na segunda semana, examinaremos as cobranças desmedidas que você impõe a si mesmo.',
          'Quantas vezes você se puniu mentalmente por um erro simples? Como seria substituir o juiz implacável por um mentor gentil e encorajador?',
          'Acompanhe os exercícios diários de reescrita de crenças autolimitantes.'
        ]
      }
    ]
  }
];

export const MOCK_USERS: Record<string, User> = {
  'user-camila': {
    id: 'user-camila',
    name: 'Dra. Camila Alencar',
    email: 'camila.psico@exemplo.com.br',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    role: 'student', // SÓ ALUNA (Formação Acadêmica, metas, certificação)
    unlockedProductIds: ['curso-regulacao-emocional', 'ebook-guia-ansiedade'],
    xp: 480,
    level: 2,
    streakDays: 5,
    lastStudyDate: '2026-10-17',
    completedLessonIds: ['aula-1-1', 'aula-1-2'],
    readingProgress: {
      'ebook-guia-ansiedade': 12
    }
  },
  'user-roberto': {
    id: 'user-roberto',
    name: 'Dr. Roberto Mendes',
    email: 'roberto.mendes@clinica.med.br',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    role: 'client', // SÓ CLIENTE DOS CURSOS (Comprador de produtos/cursos avulsos)
    unlockedProductIds: ['curso-regulacao-emocional', 'curso-tcc-avancada'],
    xp: 200,
    level: 1,
    streakDays: 2,
    lastStudyDate: '2026-10-17',
    completedLessonIds: ['aula-1-1'],
    readingProgress: {}
  },
  'user-lucas': {
    id: 'user-lucas',
    name: 'Lucas Ferreira',
    email: 'lucas.estudante@exemplo.com.br',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    role: 'visitor',
    unlockedProductIds: [],
    xp: 50,
    level: 1,
    streakDays: 1,
    lastStudyDate: '2026-10-16',
    completedLessonIds: [],
    readingProgress: {}
  },
  'user-patrick': {
    id: 'user-patrick',
    name: 'Patrick Ramon',
    email: 'contato@patrickramon.com.br',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    role: 'admin',
    unlockedProductIds: ['curso-regulacao-emocional', 'curso-tcc-avancada', 'mentoria-casos-clinicos', 'ebook-guia-ansiedade', 'ebook-caderno-terapeutico'],
    xp: 2500,
    level: 5,
    streakDays: 42,
    lastStudyDate: '2026-10-17',
    completedLessonIds: ['aula-1-1', 'aula-1-2', 'aula-2-1', 'aula-2-2', 'aula-3-1', 'aula-tcc-1', 'aula-sup-1'],
    readingProgress: {
      'ebook-guia-ansiedade': 36,
      'ebook-caderno-terapeutico': 28
    }
  }
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Aula Disponível!',
    message: 'Patrick Ramon liberou uma nova aula: "Questionamento Socrático e Prova de Realidade".',
    type: 'lesson',
    timestamp: 'Há 25 minutos',
    read: false,
    linkAction: 'curso-regulacao-emocional'
  },
  {
    id: 'notif-2',
    title: 'Encontro ao Vivo Confirmado',
    message: 'Supervisão de Casos Clínicos agendada para quinta-feira às 19:30. Adicione ao calendário.',
    type: 'event',
    timestamp: 'Há 2 horas',
    read: false,
    linkAction: 'calendario'
  },
  {
    id: 'notif-3',
    title: 'Nova Conquista Desbloqueada!',
    message: 'Você completou 5 dias consecutivos de estudos e ganhou o distintivo "Mente Focada" (+100 XP)!',
    type: 'reward',
    timestamp: 'Ontem',
    read: true,
    linkAction: 'gamificacao'
  },
  {
    id: 'notif-4',
    title: 'Lembrete de Prazo',
    message: 'A entrega do Roteiro de Conceitualização Cognitiva encerra em 3 dias.',
    type: 'deadline',
    timestamp: 'Há 2 dias',
    read: true,
    linkAction: 'calendario'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'Primeiro Passo Clínico',
    description: 'Assistiu à primeira aula do portal com 100% de aproveitamento.',
    iconName: 'Compass',
    xpBonus: 50,
    unlockedAt: '12 Out 2026',
    progressPercent: 100,
    category: 'conhecimento'
  },
  {
    id: 'badge-streak-5',
    title: 'Mente Constante',
    description: 'Manteve uma sequência ativa de estudos por 5 dias seguidos.',
    iconName: 'Flame',
    xpBonus: 100,
    unlockedAt: '17 Out 2026',
    progressPercent: 100,
    category: 'consistencia'
  },
  {
    id: 'badge-bookworm',
    title: 'Leitor Consciente',
    description: 'Leu mais de 10 páginas do e-book terapêutico no visualizador integrado.',
    iconName: 'BookOpen',
    xpBonus: 80,
    unlockedAt: '16 Out 2026',
    progressPercent: 100,
    category: 'conhecimento'
  },
  {
    id: 'badge-quiz-master',
    title: 'Raciocínio Socrático',
    description: 'Acertou de primeira as questões reflexivas de fixação ao fim da aula.',
    iconName: 'Award',
    xpBonus: 120,
    unlockedAt: '17 Out 2026',
    progressPercent: 100,
    category: 'pratica'
  },
  {
    id: 'badge-streak-14',
    title: 'Resiliência Psicológica',
    description: 'Alcance 14 dias consecutivos de presença acadêmica.',
    iconName: 'Zap',
    xpBonus: 250,
    progressPercent: 35,
    category: 'consistencia'
  },
  {
    id: 'badge-course-complete',
    title: 'Especialista em Regulação',
    description: 'Conclua todos os módulos e receba o Certificado Oficial Patrick Ramon.',
    iconName: 'GraduationCap',
    xpBonus: 500,
    progressPercent: 20,
    category: 'pratica'
  }
];

export const INITIAL_REWARDS: Reward[] = [
  {
    id: 'reward-cert',
    title: 'Certificado Oficial de Conclusão (Com Selo CRP 09|22010)',
    description: 'Documento digital assinado em alta definição com autenticação de carga horária para impressão ou LinkedIn.',
    requiredXp: 300,
    claimed: true,
    category: 'certificado',
    rewardCode: 'CERT-PR-2026-9921'
  },
  {
    id: 'reward-ebook-bonus',
    title: 'Caderno Extra: 10 Roteiros de Anamnese em Saúde Mental',
    description: 'Material exclusivo em PDF com perguntas-chave para acolhimento e queixa principal.',
    requiredXp: 400,
    claimed: true,
    category: 'conteudo',
    rewardCode: 'BONUS-ANAMNESE-PATRICK'
  },
  {
    id: 'reward-supervision-discount',
    title: 'Voucher de 40% em Supervisão Individual com Patrick Ramon',
    description: 'Agende uma hora privativa de análise de caso clínico com Patrick Ramon via videoconferência.',
    requiredXp: 800,
    claimed: false,
    category: 'mentoria',
    rewardCode: 'SUPERVISAO-40-OFF'
  },
  {
    id: 'reward-masterclass',
    title: 'Gravação da Masterclass Secreta: "Manejo da Impulsividade"',
    description: 'Acesso vitalício à palestra fechada realizada com especialistas convidados.',
    requiredXp: 1200,
    claimed: false,
    category: 'conteudo'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Encontro ao Vivo: Análise de Caso de Pânico com Patrick Ramon',
    description: 'Discussão clínica via Zoom com espaço aberto para dúvidas e perguntas dos alunos.',
    date: '2026-10-22',
    time: '19:30',
    durationMinutes: 90,
    type: 'live',
    instructor: 'Patrick Ramon',
    location: 'Sala Virtual Exclusiva (Zoom Privado)'
  },
  {
    id: 'event-2',
    title: 'Prazo: Envio do Diário de Automonitoramento (Módulo 2)',
    description: 'Submissão da planilha prática de pensamentos automáticos para feedback da tutoria.',
    date: '2026-10-25',
    time: '23:59',
    durationMinutes: 0,
    type: 'deadline',
    instructor: 'Tutoria Acadêmica',
    location: 'Portal do Aluno · Aba Tarefas'
  },
  {
    id: 'event-3',
    title: 'Grupo de Estudos: Terapias Baseadas em Mindfulness',
    description: 'Roda de conversa orientada entre os alunos da turma sobre os capítulos do e-book.',
    date: '2026-10-29',
    time: '20:00',
    durationMinutes: 60,
    type: 'study_group',
    instructor: 'Coordenação Acadêmica',
    location: 'Auditório Online'
  },
  {
    id: 'event-4',
    title: 'Sessão de Perguntas & Respostas: Dúvidas Clínicas',
    description: 'Tira-dúvidas semanal focado nas aulas de neurobiologia do estresse.',
    date: '2026-11-05',
    time: '18:00',
    durationMinutes: 60,
    type: 'supervision',
    instructor: 'Patrick Ramon',
    location: 'Google Meet Integrado'
  }
];
