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

export interface PortfolioData {
  name: string
  nameAlt: string
  title: string
  education: string
  intro: string
  stats: StatItem[]
  career: CareerItem[]
  flagship: FlagshipItem[]
  sections: {
    career: string
    flagship: string
    explore: string
    skills: string
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
    back: string
    viewProject: string
  }
}

export const DATA: Record<Lang, PortfolioData> = {
  en: {
    name: 'Ju Woocheol',
    nameAlt: '주우철',
    title: 'Tech Lead / Product Owner',
    education: 'Seoul National University — Civil & Environmental Engineering (2025.07)',
    intro: 'I rebuild fragile product platforms into shippable systems: SemuGPT commercialization, 48K+ indexable pages, PageSpeed 20→80, and AI-operated production workflows.',
    stats: [
      { value: '8,231', label: 'Commits' },
      { value: '1,588', label: 'Pull Requests' },
      { value: '1,462', label: 'Merged PRs' },
      { value: '4+', label: 'Years' },
    ],
    career: [
      { period: '2025.03 — Present', company: 'Bootalk', type: 'PropTech', role: 'Data Engineer → Tech Lead / PO' },
      { period: '2022.02 — 2025.08', company: 'Intelz / YouBook', type: 'EdTech', role: 'App Developer & Data Manager' },
    ],
    flagship: [
      { id: 'semugpt-commercialization', name: 'SemuGPT Commercialization', metric: '2026-05-18', impact: 'Production handover completed and commercial agreement signed' },
      { id: 'platform-rebuild', name: 'Platform Rebuild', metric: '1,130 PRs', impact: 'Fragmented product stack → small-team delivery system after CTO transition' },
      { id: 'seo-performance', name: 'SEO & Performance', metric: '20→80', impact: 'CSR/static web → SSR, 48,706 sitemap URLs, PageSpeed 20→80' },
      { id: 'sentry-automation', name: 'Autonomous Sentry Ops', metric: 'Alert→PR', impact: 'Production errors became AI-assisted diagnosis and fix PR candidates' },
      { id: 'data-reliability', name: 'Data Reliability', metric: 'Recovery', impact: 'Crawler/data incidents turned into guarded lifecycle and preflight operations' },
    ],
    sections: {
      career: 'Career',
      flagship: 'Impact Case Studies',
      explore: 'Explore More',
      skills: 'Operating Stack',
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
      timeline: 'Selected milestones only',
      skills: 'Stack mapped to outcomes',
      architecture: 'Technical decisions that changed outcomes',
      intelz: '3.5 years of UX, content, and app development',
    },
    labels: {
      back: 'Back to Home',
      viewProject: 'View project',
    },
  },
  ko: {
    name: '주우철',
    nameAlt: 'Ju Woocheol',
    title: 'Tech Lead / Product Owner',
    education: '서울대학교 — 토목공학과 (2025.07 졸업)',
    intro: '취약한 제품 플랫폼을 배포 가능한 시스템으로 재건합니다: 세무GPT 상용화, 48K+ 색인 페이지, PageSpeed 20→80, AI 기반 프로덕션 운영.',
    stats: [
      { value: '8,231', label: '커밋' },
      { value: '1,588', label: 'PR' },
      { value: '1,462', label: '머지 PR' },
      { value: '4+', label: '년차' },
    ],
    career: [
      { period: '2025.03 — 현재', company: '부톡 (Bootalk)', type: 'PropTech', role: 'Data Engineer → Tech Lead / PO' },
      { period: '2022.02 — 2025.08', company: '인텔즈 / 유북 (YouBook)', type: 'EdTech', role: '앱 개발자 & 데이터 매니저' },
    ],
    flagship: [
      { id: 'semugpt-commercialization', name: '세무GPT 상용화', metric: '2026-05-18', impact: '프로덕션 인수인계 완료 및 상용 계약 체결' },
      { id: 'platform-rebuild', name: '플랫폼 재건', metric: '1,130 PR', impact: 'CTO 전환 이후 분산된 제품 스택 → 작은 팀의 배포 시스템' },
      { id: 'seo-performance', name: 'SEO & 성능', metric: '20→80', impact: 'CSR/정적 웹 → SSR, 사이트맵 48,706개 URL, PageSpeed 20→80' },
      { id: 'sentry-automation', name: '자율 Sentry 운영', metric: 'Alert→PR', impact: '프로덕션 에러를 AI 진단과 수정 PR 후보로 연결' },
      { id: 'data-reliability', name: '데이터 신뢰성', metric: 'Recovery', impact: '크롤러/데이터 사고를 guarded lifecycle과 preflight 운영으로 전환' },
    ],
    sections: {
      career: '경력',
      flagship: '임팩트 케이스 스터디',
      explore: '더 보기',
      skills: '운영 스택',
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
      timeline: '선별된 주요 마일스톤',
      skills: '산출물에 연결된 스택',
      architecture: '결과를 바꾼 기술적 결정',
      intelz: '3.5년간의 UX, 콘텐츠, 앱 개발',
    },
    labels: {
      back: '홈으로',
      viewProject: '프로젝트 보기',
    },
  },
}
