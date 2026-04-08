export type Lang = 'en' | 'ko'

export interface StatItem {
  value: string
  label: string
}

export interface CareerItem {
  period: string
  company: string
  type: string
  role: string
}

export interface FlagshipItem {
  id: string
  name: string
  metric: string
  impact: string
}

export interface OtherItem {
  id: string
  name: string
  commits: number | null
  desc: string
}

export interface PortfolioData {
  name: string
  nameAlt: string
  title: string
  education: string
  intro: string
  stats: StatItem[]
  career: CareerItem[]
  flagship: FlagshipItem[]
  other: OtherItem[]
  sections: {
    career: string
    flagship: string
    otherProjects: string
    explore: string
  }
  nav: {
    home: string
    overview: string
    projects: string
    timeline: string
    skills: string
    architecture: string
    intelz: string
  }
  navDesc: {
    overview: string
    timeline: string
    skills: string
    architecture: string
    intelz: string
  }
  labels: {
    commits: string
    back: string
  }
}

export const DATA: Record<Lang, PortfolioData> = {
  en: {
    name: 'Ju Woocheol',
    nameAlt: '주우철',
    title: 'Data Engineer → Tech Lead / Product Owner',
    education: 'Seoul National University — Civil & Environmental Engineering (2025.07)',
    intro: '4+ years building fullstack products — from mobile apps and data pipelines to AI services. Managed a 4-person dev team, shipping 3,203 commits across 28 repositories in 11 months, powered by AI-augmented workflows.',
    stats: [
      { value: '3,571', label: 'Commits' },
      { value: '754+', label: 'Pull Requests' },
      { value: '34', label: 'Repositories' },
      { value: '4+', label: 'Years' },
    ],
    career: [
      { period: '2025.03 — 2026.02', company: 'Bootalk', type: 'PropTech', role: 'Data Engineer → Tech Lead / PO' },
      { period: '2022.02 — 2025.08', company: 'Intelz / YouBook', type: 'EdTech', role: 'App Developer & Data Manager' },
    ],
    flagship: [
      { id: 'frontend-monorepo', name: 'Frontend Monorepo', metric: '594 PRs', impact: '3 repos → 1 monorepo. PageSpeed 20→80, type safety 98%+' },
      { id: 'bootalk-app', name: 'Bootalk App', metric: '90% coverage', impact: 'Bare RN → Expo managed. 7-stage migration, OTA updates' },
      { id: 'bootalk-amplify', name: 'Bootalk Amplify', metric: '29 Lambdas', impact: 'Legacy backend. Environment separation, Sentry, auth fixes' },
      { id: 'bootalk-web', name: 'Bootalk Web', metric: '48K URLs', impact: 'CSR→SSR, sitemap 5→48K, PageSpeed 20→80, AI search GEO' },
    ],
    other: [
      { id: 'sentry-triage-bot', name: 'Sentry Triage Bot', commits: null, desc: 'Autonomous error triage: webhook → AI diagnosis → fix PR' },
      { id: 'ubuntu-crawler', name: 'Ubuntu Crawler', commits: 420, desc: 'Real estate data collection' },
      { id: 'data-pipelines', name: 'Data Pipelines', commits: 109, desc: 'Dagster-based ETL infrastructure' },
      { id: 'frontend-onboarding', name: 'Frontend Onboarding', commits: 342, desc: 'Developer docs (Mintlify)' },
      { id: 'other-projects', name: 'Other Projects', commits: 219, desc: 'Admin, Backend, AI/ML, and more' },
    ],
    sections: {
      career: 'Career',
      flagship: 'Flagship Projects',
      otherProjects: 'Other Projects',
      explore: 'Explore More',
    },
    nav: {
      home: 'Home',
      overview: 'Overview',
      projects: 'Projects',
      timeline: 'Timeline',
      skills: 'Skills',
      architecture: 'Architecture',
      intelz: 'Previous: Intelz',
    },
    navDesc: {
      overview: 'Role narrative, AI transformation, key metrics',
      timeline: 'Monthly activity and growth phases',
      skills: 'Technical stack breakdown',
      architecture: '7 platform-shaping technical decisions',
      intelz: '3.5 years of UX, content, and app development',
    },
    labels: {
      commits: 'commits',
      back: 'Back to Home',
    },
  },
  ko: {
    name: '주우철',
    nameAlt: 'Ju Woocheol',
    title: 'Data Engineer → Tech Lead / Product Owner',
    education: '서울대학교 — 토목공학과 (2025.07 졸업)',
    intro: '4년 이상의 풀스택 프로덕트 개발 — 모바일 앱, 데이터 파이프라인부터 AI 서비스까지. 4인 개발팀을 이끌며 11개월간 28개 저장소에서 3,203 커밋 달성.',
    stats: [
      { value: '3,571', label: '커밋' },
      { value: '754+', label: 'PR' },
      { value: '34', label: '저장소' },
      { value: '4+', label: '년차' },
    ],
    career: [
      { period: '2025.03 — 2026.02', company: '부톡 (Bootalk)', type: 'PropTech', role: 'Data Engineer → Tech Lead / PO' },
      { period: '2022.02 — 2025.08', company: '인텔즈 / 유북 (YouBook)', type: 'EdTech', role: '앱 개발자 & 데이터 매니저' },
    ],
    flagship: [
      { id: 'frontend-monorepo', name: '프론트엔드 모노레포', metric: '594 PR', impact: '3개 레포 → 1개 모노레포. PageSpeed 20→80, 타입 안전성 98%+' },
      { id: 'bootalk-app', name: '부톡 앱', metric: '90% 커버리지', impact: 'Bare RN → Expo. 7단계 마이그레이션, OTA 업데이트' },
      { id: 'bootalk-amplify', name: 'Bootalk Amplify', metric: '29 Lambda', impact: '레거시 백엔드. 환경 분리, Sentry, 인증 수정' },
      { id: 'bootalk-web', name: '부톡 웹', metric: '48K URL', impact: 'CSR→SSR, 사이트맵 5→48K, PageSpeed 20→80, AI 검색 GEO' },
    ],
    other: [
      { id: 'sentry-triage-bot', name: 'Sentry Issue 분석 봇', commits: null, desc: '자율 에러 분석: 웹훅 → AI 진단 → 수정 PR' },
      { id: 'ubuntu-crawler', name: 'Ubuntu Crawler', commits: 420, desc: '부동산 데이터 수집' },
      { id: 'data-pipelines', name: 'Data Pipelines', commits: 109, desc: 'Dagster 기반 ETL 인프라' },
      { id: 'frontend-onboarding', name: 'Frontend Onboarding', commits: 342, desc: '개발자 문서 (Mintlify)' },
      { id: 'other-projects', name: 'Other Projects', commits: 219, desc: '어드민, 백엔드, AI/ML 등' },
    ],
    sections: {
      career: '경력',
      flagship: '주요 프로젝트',
      otherProjects: '기타 프로젝트',
      explore: '더 보기',
    },
    nav: {
      home: '홈',
      overview: '개요',
      projects: '프로젝트',
      timeline: '타임라인',
      skills: '기술 스택',
      architecture: '아키텍처 결정',
      intelz: '이전: Intelz',
    },
    navDesc: {
      overview: '역할 내러티브, AI 전환, 핵심 지표',
      timeline: '월별 활동과 성장 단계',
      skills: '기술 스택 상세',
      architecture: '플랫폼을 바꾼 7가지 기술적 결정',
      intelz: '3.5년간의 UX, 콘텐츠, 앱 개발',
    },
    labels: {
      commits: '커밋',
      back: '홈으로',
    },
  },
}
