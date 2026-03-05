// lib/data.ts – All data lives here. Import ONLY via lib/fetchData.ts everywhere else.

export type ImpactLevel = 'high' | 'medium' | 'low';
export type MiscStatus = 'in-progress' | 'upcoming' | 'planned' | 'completed';
export type MiscType = 'learning' | 'upcoming' | 'goal' | 'personal' | 'other';
export type ChartType = 'line' | 'bar' | 'before-after';

export interface CodeActivity {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  unit?: string;
}

export interface AchievementChart {
  type: ChartType;
  title: string;
  unit?: string;
  data: ChartDataPoint[];
  beforeLabel?: string;
  afterLabel?: string;
}

export interface SupportingDoc {
  id: string;
  title: string;
  url: string;
  type: 'doc' | 'design' | 'recording' | 'report' | 'other';
}

export interface AchievementTestimonial {
  id: string;
  name: string;
  designation: string;
  image?: string;
  comment: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  impact: ImpactLevel;
  date?: string;
  metric?: string;
  description?: string;
  tickets?: Array<{ label: string; url: string }>;
  prs?: Array<{ label: string; url: string }>;
  chart?: AchievementChart;
  supportingDocs?: SupportingDoc[];
  testimonials?: AchievementTestimonial[];
}

export type SkillCategory = 'improved' | 'new';

export interface Skill {
  name: string;
  level: number;
  category?: SkillCategory;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  image?: string;
  comment: string;
}

export interface Badge {
  id: string;
  title: string;
  description?: string;
  earnedOn?: string; // "YYYY-MM"
  icon: string; // Emoji fallback
  color: string; // Theme color variable
  imageUrl?: string; // Optional image (e.g., shields.io)
  imageWidth?: number; // Optional custom width
  imageHeight?: number; // Optional custom height
  viewUrl?: string; // Link to credly or evidence
}

export interface Certification {
  id: string;
  title: string;
  issuer?: string;
  issuedOn?: string;
  expiresOn?: string | null;
  credentialUrl?: string;
  icon?: string;
}

export interface MiscItem {
  id: string;
  type: MiscType;
  title: string;
  status: MiscStatus;
  progress?: number | null;
  note?: string;
  icon?: string;
}

export interface ProfileMetrics {
  projectsShipped: number | string;
  prsReviewed: number | string;
  prsMerged: number | string;
  techDiscussions: number | string;
}

export interface BragData {
  name: string;
  role: string;
  team?: string;
  period: string;
  years: string[];
  metrics: ProfileMetrics;
  achievements: Achievement[];
  skills: Skill[];
  testimonials: Testimonial[];
  badges: Badge[];
  certifications: Certification[];
  misc: MiscItem[];
  codeActivity: CodeActivity[];
}

export const BRAG_DATA: BragData = {
  name: 'John Doe',
  role: 'Software Engineer',
  team: 'Growth Platform',
  period: 'Jan 2024 – Dec 2024',
  years: ['2024', '2023'],
  metrics: {
    projectsShipped: 12,
    prsReviewed: 134,
    prsMerged: 89,
    techDiscussions: 28,
  },
  achievements: [
    {
      id: '1',
      title: 'Improved API response time from 4s to 300ms',
      category: 'Performance',
      impact: 'high',
      date: '2024-02',
      metric: '~93% faster',
      description:
        'Profiled and rewrote the core data-fetch layer, added Redis caching, and eliminated N+1 queries across 3 critical endpoints. The change unblocked the mobile team who had been dealing with timeout errors for months.',
      tickets: [
        {
          label: 'PERF-1204',
          url: 'https://linear.app/example/issue/PERF-1204',
        },
        {
          label: 'PERF-1210',
          url: 'https://linear.app/example/issue/PERF-1210',
        },
      ],
      prs: [
        { label: '#891', url: 'https://github.com/example/repo/pull/891' },
        { label: '#904', url: 'https://github.com/example/repo/pull/904' },
      ],
      chart: {
        type: 'before-after',
        title: 'API Response Time by Endpoint',
        unit: 'ms',
        beforeLabel: 'Before (Jan 2024)',
        afterLabel: 'After (Feb 2024)',
        data: [
          { label: '/api/feed', value: 3800 },
          { label: '/api/feed', value: 210 },
          { label: '/api/user/stats', value: 4200 },
          { label: '/api/user/stats', value: 280 },
          { label: '/api/search', value: 5100 },
          { label: '/api/search', value: 340 },
        ],
      },
      supportingDocs: [
        {
          id: 'd1',
          title: 'Performance Audit Report',
          url: 'https://example.com/perf-report',
          type: 'report',
        },
        {
          id: 'd2',
          title: 'Architecture Decision Record',
          url: 'https://example.com/adr',
          type: 'doc',
        },
      ],
      testimonials: [
        {
          id: 'at1',
          name: 'Priya Sharma',
          designation: 'Engineering Manager',
          image: 'https://i.pravatar.cc/80?img=47',
          comment:
            'This single change unblocked our mobile team who had been dealing with timeout errors for months. Exceptional root-cause analysis and clean execution.',
        },
      ],
    },
    {
      id: '2',
      title: 'Led design system migration across 3 squads',
      category: 'Leadership',
      impact: 'high',
      date: '2024-04',
      metric: '3 teams unblocked',
      description:
        'Drove adoption of the new Radix-based component library across Growth, Checkout, and Onboarding squads. Reduced UI inconsistencies by 80% and cut per-squad component duplication significantly.',
      tickets: [
        { label: 'DS-330', url: 'https://linear.app/example/issue/DS-330' },
      ],
      prs: [
        { label: '#712', url: 'https://github.com/example/repo/pull/712' },
        { label: '#750', url: 'https://github.com/example/repo/pull/750' },
      ],
      chart: {
        type: 'bar',
        title: 'Components Migrated per Squad',
        unit: 'components',
        data: [
          { label: 'Growth', value: 34 },
          { label: 'Checkout', value: 28 },
          { label: 'Onboarding', value: 21 },
        ],
      },
      supportingDocs: [],
      testimonials: [
        {
          id: 'at2',
          name: 'Jordan Lee',
          designation: 'Staff Engineer',
          image: 'https://i.pravatar.cc/80?img=12',
          comment:
            'Alex ran the migration playbook with zero drama. Clear docs, patient pairing sessions, and a smooth rollout across every squad.',
        },
      ],
    },
    {
      id: '3',
      title: 'Shipped full accessibility audit and remediation',
      category: 'Quality',
      impact: 'medium',
      date: '2024-06',
      metric: 'WCAG AA compliant',
      description:
        'Fixed 47 a11y violations across the product and added automated axe-core checks into the CI pipeline to prevent regressions.',
      tickets: [
        { label: 'A11Y-55', url: 'https://linear.app/example/issue/A11Y-55' },
        { label: 'A11Y-61', url: 'https://linear.app/example/issue/A11Y-61' },
      ],
      prs: [{ label: '#834', url: 'https://github.com/example/repo/pull/834' }],
      chart: {
        type: 'bar',
        title: 'Violations Fixed by Type',
        unit: 'issues',
        data: [
          { label: 'Color Contrast', value: 18 },
          { label: 'ARIA Labels', value: 12 },
          { label: 'Focus Traps', value: 9 },
          { label: 'Alt Text', value: 8 },
        ],
      },
      supportingDocs: [
        {
          id: 'd3',
          title: 'a11y Audit Figma File',
          url: 'https://example.com/figma',
          type: 'design',
        },
      ],
      testimonials: [],
    },
    {
      id: '4',
      title: 'Mentored 2 junior engineers to promotion',
      category: 'Mentorship',
      impact: 'medium',
      date: '2024-08',
      metric: '2 promotions',
      description:
        'Ran structured weekly 1:1s, detailed code reviews with written feedback, and career coaching sessions across 6 months for two junior engineers, both of whom were promoted at the next cycle.',
      tickets: [],
      prs: [],
      supportingDocs: [],
      testimonials: [
        {
          id: 'at3',
          name: 'Maria Chen',
          designation: 'Product Manager',
          image: 'https://i.pravatar.cc/80?img=23',
          comment:
            'Alex took real ownership of growing the junior members of our team. Both engineers have noticeably levelled up in confidence and output.',
        },
      ],
    },
    {
      id: '5',
      title: 'Launched real-time analytics dashboard',
      category: 'Delivery',
      impact: 'high',
      date: '2024-10',
      metric: '10k DAU at launch',
      description:
        'Delivered a 6-week project on time with zero post-launch P0 bugs. Used WebSockets for live data and React Query for optimistic updates.',
      tickets: [
        { label: 'DASH-100', url: 'https://linear.app/example/issue/DASH-100' },
        { label: 'DASH-145', url: 'https://linear.app/example/issue/DASH-145' },
      ],
      prs: [
        { label: '#960', url: 'https://github.com/example/repo/pull/960' },
        { label: '#975', url: 'https://github.com/example/repo/pull/975' },
      ],
      chart: {
        type: 'line',
        title: 'Daily Active Users — First 30 Days',
        unit: 'users',
        data: [
          { label: 'Day 1', value: 340 },
          { label: 'Day 5', value: 1200 },
          { label: 'Day 10', value: 3800 },
          { label: 'Day 15', value: 6500 },
          { label: 'Day 20', value: 8200 },
          { label: 'Day 25', value: 9400 },
          { label: 'Day 30', value: 10100 },
        ],
      },
      supportingDocs: [
        {
          id: 'd4',
          title: 'Launch Demo Recording',
          url: 'https://example.com/recording',
          type: 'recording',
        },
      ],
      testimonials: [],
    },
  ],
  skills: [
    { name: 'React / Next.js', level: 95, category: 'improved' },
    { name: 'TypeScript', level: 88, category: 'improved' },
    { name: 'System Design', level: 80, category: 'improved' },
    { name: 'Node.js', level: 72, category: 'improved' },
    { name: 'Leadership', level: 75, category: 'improved' },
    { name: 'Rust', level: 25, category: 'new' },
    { name: 'Redis / Caching', level: 60, category: 'new' },
    { name: 'WebSockets', level: 55, category: 'new' },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Priya Sharma',
      designation: 'Engineering Manager',
      image: 'https://i.pravatar.cc/80?img=47',
      comment:
        'Alex consistently goes above and beyond. The design system migration saved our teams weeks of work and set a new standard for cross-squad collaboration.',
    },
    {
      id: 't2',
      name: 'Jordan Lee',
      designation: 'Staff Engineer',
      image: 'https://i.pravatar.cc/80?img=12',
      comment:
        "One of the sharpest engineers I've worked with. The accessibility audit was thorough and educational — the whole team levelled up from the process.",
    },
    {
      id: 't3',
      name: 'Maria Chen',
      designation: 'Product Manager',
      image: 'https://i.pravatar.cc/80?img=23',
      comment:
        'Alex delivered the real-time dashboard flawlessly. Zero bugs at launch, and they kept every stakeholder aligned throughout the entire sprint.',
    },
  ],
  badges: [
    {
      id: 'b1',
      title: 'Performance Wizard',
      icon: '⚡',
      description: 'Achieved 40%+ performance improvement',
      color: 'var(--primary)',
      earnedOn: '2024-02',
      imageUrl:
        'https://img.shields.io/badge/Performance-Wizard-gold?style=for-the-badge&logo=lightning&logoColor=white',
      viewUrl: 'https://example.com/badges/performance-wizard',
    },
    {
      id: 'b2',
      title: 'Team Multiplier',
      icon: '🌱',
      description: 'Unblocked 3+ teams simultaneously',
      color: 'var(--chart-2)',
      earnedOn: '2024-04',
      imageUrl:
        'https://img.shields.io/badge/Team-Multiplier-green?style=for-the-badge&logo=github&logoColor=white',
      viewUrl: 'https://example.com/badges/team-multiplier',
    },
    {
      id: 'b3',
      title: 'Zero Bug Ship',
      icon: '🎯',
      description: 'Launched a project with zero P0 bugs',
      color: 'var(--chart-3)',
      earnedOn: '2024-10',
      imageUrl:
        'https://img.shields.io/badge/Zero-Bug%20Ship-blue?style=for-the-badge&logo=checkmarx&logoColor=white',
      viewUrl: 'https://example.com/badges/zero-bug-ship',
    },
    {
      id: 'b4',
      title: 'Accessibility Champion',
      icon: '♿',
      description: 'Achieved full WCAG AA compliance',
      color: 'var(--chart-4)',
      earnedOn: '2024-06',
      imageUrl:
        'https://img.shields.io/badge/Accessibility-Champion-purple?style=for-the-badge&logo=accessibility&logoColor=white',
      viewUrl: 'https://example.com/badges/accessibility-champion',
    },
    {
      id: 'b5',
      title: 'Mentor of the Cycle',
      icon: '🏅',
      description: 'Mentored 2 engineers to promotion',
      color: 'var(--chart-5)',
      earnedOn: '2024-08',
      imageUrl:
        'https://img.shields.io/badge/Mentor-of%20the%20Cycle-orange?style=for-the-badge&logo=opsgenie&logoColor=white',
      viewUrl: 'https://example.com/badges/mentor-cycle',
    },
  ],
  certifications: [
    {
      id: 'c1',
      title: 'AWS Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issuedOn: '2024-03',
      expiresOn: '2027-03',
      credentialUrl: 'https://aws.amazon.com/certification',
      icon: '☁️',
    },
    {
      id: 'c2',
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      issuedOn: '2023-11',
      expiresOn: null,
      credentialUrl: '',
      icon: '🔄',
    },
    {
      id: 'c3',
      title: 'Google UX Design Certificate',
      issuer: 'Google / Coursera',
      issuedOn: '2024-07',
      expiresOn: null,
      credentialUrl: 'https://coursera.org',
      icon: '🎨',
    },
  ],
  misc: [
    {
      id: 'm1',
      type: 'learning',
      title: 'Learning German',
      status: 'in-progress',
      progress: 42,
      note: 'B1 level target by Q2 2025. Daily Duolingo streak + weekly tutor sessions.',
      icon: '🇩🇪',
    },
    {
      id: 'm2',
      type: 'upcoming',
      title: 'Speaking at ReactConf 2025',
      status: 'upcoming',
      progress: null,
      note: 'Proposal accepted. Talk topic: micro-frontend architecture patterns at scale.',
      icon: '🎤',
    },
    {
      id: 'm3',
      type: 'learning',
      title: 'Rust for Systems Programming',
      status: 'in-progress',
      progress: 25,
      note: 'Working through The Rust Book. Goal: build and open-source a CLI tool by mid-year.',
      icon: '🦀',
    },
    {
      id: 'm4',
      type: 'goal',
      title: 'Ship open-source CLI tool',
      status: 'planned',
      progress: null,
      note: 'A developer productivity tool written in Rust. Target: publicly released by June 2025.',
      icon: '🛠️',
    },
    {
      id: 'm5',
      type: 'personal',
      title: 'Completed 30-day writing streak',
      status: 'completed',
      progress: 100,
      note: 'Wrote technical notes and engineering reflections every single day throughout January.',
      icon: '✍️',
    },
  ],
  codeActivity: (() => {
    const acts: Array<{
      date: string;
      count: number;
      level: 0 | 1 | 2 | 3 | 4;
    }> = [];
    const end = new Date('2024-12-31');
    const peaks: Record<string, number> = {
      '2023-03': 3,
      '2023-06': 4,
      '2023-09': 3,
      '2023-11': 4,
      '2024-02': 4,
      '2024-04': 4,
      '2024-06': 3,
      '2024-08': 3,
      '2024-10': 4,
    };
    for (let d = new Date('2023-01-01'); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10);
      const ym = iso.slice(0, 7);
      const base = peaks[ym] ?? 2;
      const weekend = d.getDay() === 0 || d.getDay() === 6;
      const count = weekend
        ? Math.max(0, Math.floor(Math.random() * 2))
        : base + Math.floor(Math.random() * 3);
      const level = (
        count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      ) as 0 | 1 | 2 | 3 | 4;
      acts.push({ date: iso, count, level });
    }
    return acts;
  })(),
};
