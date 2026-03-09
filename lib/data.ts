// lib/data.ts – All data lives here. Import ONLY via lib/fetchData.ts everywhere else.

export type ImpactLevel = 'high' | 'medium' | 'low';
export type MiscStatus = 'in-progress' | 'upcoming' | 'planned' | 'completed';
export type MiscType =
  | 'learning'
  | 'upcoming'
  | 'goal'
  | 'personal'
  | 'achievement'
  | 'other';
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
  name: 'Mohammad Muzeem',
  role: 'Assistant Product Manager',
  team: 'Monetization & Growth',
  period: 'August 2024 – Present',
  years: ['2024', '2026'],
  metrics: {
    projectsShipped: 10,
    prsReviewed: '—',
    prsMerged: '—',
    techDiscussions: '—',
  },
  achievements: [
    {
      id: '1',
      title: 'Scaled MSN Games HTML5 portal revenue',
      category: 'Growth & Monetization',
      impact: 'high',
      date: '2024-11',
      metric: 'CTR 0.8% → 1.8%, ~7x ad revenue',
      description:
        'Owned monetization experiments for 90+ HTML5 titles on MSN Games. Designed A/B tests and AI-assisted creative optimization that lifted CTR from 0.8% to 1.8% and grew daily ad revenue from ~$100/day to ~$700/day by partnering with ad-ops, design, and engineering.',
      tickets: [],
      prs: [],
      chart: {
        type: 'before-after',
        title: 'MSN Games CTR & Daily Revenue',
        unit: 'CTR / $ per day',
        beforeLabel: 'Before launch',
        afterLabel: 'After optimization',
        data: [
          { label: 'CTR', value: 0.8 },
          { label: 'CTR', value: 1.8 },
          { label: 'Revenue ($/day)', value: 100 },
          { label: 'Revenue ($/day)', value: 700 },
        ],
      },
      supportingDocs: [],
      testimonials: [
        {
          id: 'at1',
          name: 'Senior Product Leader',
          designation: 'Head of Monetization',
          image: 'https://i.pravatar.cc/80?img=47',
          comment:
            'Muzeem turned a stagnant revenue stream into a growth engine. Clear hypotheses, disciplined experimentation, and crisp communication with stakeholders.',
        },
      ],
    },
    {
      id: '2',
      title: 'Launched new IAP & subscription revenue streams',
      category: 'Product Strategy',
      impact: 'high',
      date: '2025-01',
      metric: '2 new recurring revenue lines',
      description:
        'Designed and launched Lifetime Purchase and Monthly Subscription models for HTML5 games. Defined pricing, eligibility, and success metrics; partnered with finance and engineering to validate impact and build a predictable base of recurring revenue.',
      tickets: [],
      prs: [],
      chart: {
        type: 'bar',
        title: 'Revenue Mix Before vs After IAP',
        unit: '% of revenue',
        data: [
          { label: 'Ads (Before)', value: 100 },
          { label: 'Ads (After)', value: 70 },
          { label: 'IAP (After)', value: 30 },
        ],
      },
      supportingDocs: [],
      testimonials: [],
    },
    {
      id: '3',
      title: 'Scaled SpaceBasic from 18K to 80K DAU',
      category: 'Product-Led Growth',
      impact: 'high',
      date: '2024-06',
      metric: '4.4x DAU growth',
      description:
        'Drove product-led growth for a SaaS student housing platform, helping DAU grow from ~18K to 80K. Improved onboarding flows, made key features self-serve, and partnered with customer success to prioritize changes that unlocked adoption at scale.',
      tickets: [],
      prs: [],
      chart: {
        type: 'line',
        title: 'SpaceBasic DAU Growth',
        unit: 'DAU',
        data: [
          { label: 'Baseline', value: 18000 },
          { label: 'Midpoint', value: 40000 },
          { label: 'Post-initiatives', value: 80000 },
        ],
      },
      supportingDocs: [],
      testimonials: [],
    },
    {
      id: '4',
      title: 'Shipped end-to-end digital leave management',
      category: 'Delivery',
      impact: 'medium',
      date: '2023-10',
      metric: 'Paperless approvals for 10K+ users',
      description:
        'Replaced a paper-based leave process with an in-app digital flow at SpaceBasic. Students raised requests in-app, while parents and faculty approved in real time; integrated authorization logic with on-ground barrier hardware so only approved students could exit campus.',
      tickets: [],
      prs: [],
      chart: {
        type: 'bar',
        title: 'Leave Approvals: Manual vs Digital',
        unit: 'requests / week',
        data: [
          { label: 'Manual (Before)', value: 300 },
          { label: 'Digital (After)', value: 300 },
        ],
      },
      supportingDocs: [],
      testimonials: [],
    },
    {
      id: '5',
      title: 'Led SEO & content strategy for 400+ posts',
      category: 'Acquisition & SEO',
      impact: 'medium',
      date: '2025-02',
      metric: 'Higher rankings & organic clicks',
      description:
        'Used Google Search Console and analytics to identify ranking gaps, then partnered with content and marketing on 400+ blog publications for Gamezop. Improved keyword positions, organic traffic, and overall discoverability of the games catalog.',
      tickets: [],
      prs: [],
      chart: {
        type: 'line',
        title: 'Organic Clicks from Search',
        unit: 'clicks / month',
        data: [
          { label: 'Baseline', value: 10000 },
          { label: 'After SEO initiatives', value: 18000 },
        ],
      },
      supportingDocs: [],
      testimonials: [],
    },
  ],
  skills: [
    {
      name: 'Product Strategy & Roadmapping',
      level: 90,
      category: 'improved',
    },
    { name: 'Experimentation & A/B Testing', level: 88, category: 'improved' },
    { name: 'Monetization & Pricing', level: 85, category: 'improved' },
    { name: 'User Research & Discovery', level: 80, category: 'improved' },
    { name: 'Stakeholder Management', level: 82, category: 'improved' },
    { name: 'SEO & Content Strategy', level: 78, category: 'improved' },
    {
      name: 'Analytics (Metabase, GSC, GA, Sheets)',
      level: 80,
      category: 'improved',
    },
    { name: 'Funnel & Cohort Analysis', level: 80, category: 'improved' },
    { name: 'Figma / Prototyping', level: 70, category: 'improved' },
    { name: 'HTML5 Games & Game Design', level: 72, category: 'new' },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Product Director',
      designation: 'Gamezop',
      image: 'https://i.pravatar.cc/80?img=12',
      comment:
        'Muzeem brings a systems mindset to monetization — he connects the user journey, content, and ad stack to ship changes that actually move revenue.',
    },
    {
      id: 't2',
      name: 'Founder & CEO',
      designation: 'SpaceBasic',
      image: 'https://i.pravatar.cc/80?img=23',
      comment:
        'He owned critical student experience flows end to end. From visiting campuses to understand constraints to launching scalable features, Muzeem consistently pushed the product forward.',
    },
    {
      id: 't3',
      name: 'Engineering Manager',
      designation: 'Gamezop',
      image: 'https://i.pravatar.cc/80?img=47',
      comment:
        'Working with Muzeem is easy: sharp problem definitions, thoughtful trade-offs, and respect for engineering timelines.',
    },
  ],
  badges: [
    {
      id: 'b1',
      title: 'Revenue Uplift Driver',
      icon: '📈',
      description: 'Delivered ~7x uplift in MSN Games ad revenue',
      color: 'var(--primary)',
      earnedOn: '2024-11',
      imageUrl:
        'https://img.shields.io/badge/Revenue-Uplift-success?style=for-the-badge&logo=google-ads&logoColor=white',
      viewUrl: 'https://example.com/badges/revenue-uplift',
    },
    {
      id: 'b2',
      title: 'Platform Scale Champion',
      icon: '🚀',
      description: 'Helped scale a SaaS platform from 18K to 80K DAU',
      color: 'var(--chart-2)',
      earnedOn: '2024-06',
      imageUrl:
        'https://img.shields.io/badge/Platform-Scale-blueviolet?style=for-the-badge&logo=saas&logoColor=white',
      viewUrl: 'https://example.com/badges/platform-scale',
    },
    {
      id: 'b3',
      title: 'Experimentation Lead',
      icon: '🧪',
      description: 'Ran high-impact A/B tests across creatives and funnels',
      color: 'var(--chart-3)',
      earnedOn: '2024-10',
      imageUrl:
        'https://img.shields.io/badge/Experimentation-Lead-orange?style=for-the-badge&logo=testing-library&logoColor=white',
      viewUrl: 'https://example.com/badges/experimentation-lead',
    },
    {
      id: 'b4',
      title: 'SEO Growth Owner',
      icon: '🔍',
      description: 'Led SEO initiatives powering organic game discovery',
      color: 'var(--chart-4)',
      earnedOn: '2025-02',
      imageUrl:
        'https://img.shields.io/badge/SEO-Growth-green?style=for-the-badge&logo=google-search-console&logoColor=white',
      viewUrl: 'https://example.com/badges/seo-growth',
    },
    {
      id: 'b5',
      title: 'Most Promising Product Award',
      icon: '🏅',
      description:
        'Ranked 1st out of 12 teams in a 12‑week product incubation program',
      color: 'var(--chart-5)',
      earnedOn: '2020-03',
      imageUrl:
        'https://img.shields.io/badge/Most-Promising-Product-gold?style=for-the-badge&logo=product-hunt&logoColor=white',
      viewUrl: 'https://example.com/badges/most-promising-product',
    },
  ],
  certifications: [],
  misc: [
    {
      id: 'm1',
      type: 'personal',
      title: 'Solo HTML5 Game Developer',
      status: 'completed',
      progress: 100,
      note: 'Designed, built, and launched 5+ HTML5 games for the Microsoft Store (Kelby), handling architecture, assets, and platform compliance.',
      icon: '🎮',
    },
    {
      id: 'm2',
      type: 'achievement',
      title: 'Most Promising Product Award',
      status: 'completed',
      progress: 100,
      note: 'Led a 4-member team; ranked 1st out of 12 teams in a 12-week university incubation program (JHUB) for CompactBin.',
      icon: '🏆',
    },
    {
      id: 'm3',
      type: 'achievement',
      title: 'NASA Space Apps & Smart City Hackathon',
      status: 'completed',
      progress: 100,
      note: 'Placed 1st among 1000+ participants with a sustainability-focused proof of concept for a novel waste management system built in 48 hours.',
      icon: '🚀',
    },
    {
      id: 'm4',
      type: 'learning',
      title: 'Deepening experimentation & growth skills',
      status: 'in-progress',
      progress: 60,
      note: 'Exploring advanced experimentation frameworks, monetization playbooks, and SEO strategies to compound impact on growth initiatives.',
      icon: '📚',
    },
    {
      id: 'm5',
      type: 'personal',
      title: '30-day writing streak',
      status: 'completed',
      progress: 100,
      note: 'Wrote technical and product reflections every day for a month to sharpen storytelling and decision logs.',
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
      '2023-03': 1,
      '2023-06': 2,
      '2023-09': 1,
      '2023-11': 2,
      '2024-02': 2,
      '2024-04': 2,
      '2024-06': 1,
      '2024-08': 1,
      '2024-10': 2,
    };
    for (let d = new Date('2023-01-01'); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10);
      const ym = iso.slice(0, 7);
      const base = peaks[ym] ?? 1;
      const weekend = d.getDay() === 0 || d.getDay() === 6;
      const count = weekend
        ? Math.max(0, Math.floor(Math.random() * 2))
        : base + Math.floor(Math.random() * 2);
      const level = (
        count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      ) as 0 | 1 | 2 | 3 | 4;
      acts.push({ date: iso, count, level });
    }
    return acts;
  })(),
};
