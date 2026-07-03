import { Language } from '../contexts/LanguageContext';

// UI chrome only. Trip CONTENT comes from content/trips/*.json — plain strings
// render in both languages; {zh, en} fields switch with the toggle.
export const translations = {
  en: {
    languageSelector: {
      label: 'Language'
    },
    nav: {
      wordmark: 'Travel Journals',
      journal: 'Journal'
    },
    header: {
      traveler: 'Traveler',
      days: 'days',
      backToTrips: 'All trips'
    },
    index: {
      kicker: 'Field notes on civilizations',
      title: "Justin's Travel Journals",
      subtitle: 'Not tourism — field studies of civilizations',
      days: 'days',
      view: 'Read the journal'
    },
    attractionModal: {
      historicalContext: 'Historical Context',
      experience: 'On the Ground',
      insight: 'Core Insight',
      relatedPeople: 'Related People',
      close: 'Close'
    },
    timeline: {
      entries: 'entries — click to expand',
      location: 'Location',
      keyFigures: 'Key figures',
      coreEvents: 'Core events',
      significance: 'Significance'
    },
    table: {
      rows: 'rows — click to expand'
    },
    notFound: {
      title: 'Page not found',
      text: 'This trip does not exist (yet).',
      backHome: 'Back to all trips'
    },
    footer: {
      motto: 'Not tourism — field studies of civilizations',
      note: "© 2026 Justin's travel journals · new trips are added from markdown notes"
    }
  },
  zh: {
    languageSelector: {
      label: '语言'
    },
    nav: {
      wordmark: '旅行笔记',
      journal: '游记'
    },
    header: {
      traveler: '旅行者',
      days: '天行程',
      backToTrips: '全部旅行'
    },
    index: {
      kicker: '文明的田野笔记',
      title: 'Justin的旅行笔记',
      subtitle: '这不是旅游，而是文明的田野调查',
      days: '天',
      view: '阅读游记'
    },
    attractionModal: {
      historicalContext: '历史定位',
      experience: '实地体验',
      insight: '核心洞察',
      relatedPeople: '相关人物',
      close: '关闭'
    },
    timeline: {
      entries: '条记录 — 点击展开',
      location: '地点',
      keyFigures: '关键人物',
      coreEvents: '核心事件',
      significance: '历史意义'
    },
    table: {
      rows: '行 — 点击展开'
    },
    notFound: {
      title: '页面不存在',
      text: '这段旅程还不存在。',
      backHome: '返回全部旅行'
    },
    footer: {
      motto: '这不是旅游，而是文明的田野调查',
      note: '© 2026 Justin的旅行笔记 · 通过上传markdown文件添加更多旅行'
    }
  }
};

export function t(language: Language, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
