import { Language } from '../contexts/LanguageContext';

export const translations = {
  en: {
    languageSelector: {
      label: 'Language'
    },
    header: {
      traveler: 'Traveler',
      days: 'days itinerary'
    },
    tripTabs: {
      ukTrip: 'UK Journey 2025',
      trip2: 'Trip 2',
      trip3: 'Trip 3',
      newTrip: 'New Trip',
      uploadHint: 'Add new trip by uploading markdown file'
    },
    dayCard: {
      day: 'Day'
    },
    attractionModal: {
      historicalContext: 'Historical Context',
      experience: 'Experience',
      insight: 'Core Insight',
      relatedPeople: 'Related People',
      close: 'Close'
    },
    historicalOverview: {
      title: 'British Historical Timeline',
      subtitle: 'This is not a "tourist attraction list," but a timeline of "how civilization continuously repairs and perpetuates itself through space, institutions, and people"',
      coreFramework: 'Core Framework',
      englandTimeline: 'England Historical Periods Overview',
      scotlandTimeline: 'Scotland Independence Timeline (Parallel)',
      collapseEngland: 'Collapse England Historical Periods',
      expandEngland: 'Expand England Historical Periods',
      collapseScotland: 'Collapse Scotland Independence Timeline',
      expandScotland: 'Expand Scotland Independence Timeline',
      location: 'Location',
      keyFigures: 'Key Figures',
      coreEvents: 'Core Events',
      historicalSignificance: 'Historical Significance',
      day: 'Day',
      period: 'Period',
      scotlandStatus: 'Scotland Status',
      englandRelation: 'England Relations',
      keyEvents: 'Key Events'
    },
    reflectionSection: {
      title: 'Macro Reflections & Insights',
      subtitle: 'Deep reflections beyond attractions: from the struggle between religion and monarchy, to the self-repair mechanisms of civilization',
      conclusion: 'Conclusion',
      conclusionText1: 'This UK journey, I am not "sightseeing," but rather "reading how a civilization continuously repairs and perpetuates itself through space, institutions, and people."',
      conclusionText2: 'From the White Cliffs to Westminster, from Roman military camps to modern universities, I see: how power is architecturalized, how law is institutionalized, how knowledge is preserved, how culture is softened. Britain is not "perfect," but it demonstrates a path: how to keep institutions alive through constant conflict, compromise, and repair.'
    }
  },
  zh: {
    languageSelector: {
      label: '语言'
    },
    header: {
      traveler: '旅行者',
      days: '天行程'
    },
    tripTabs: {
      ukTrip: '英国之旅 2025',
      trip2: '旅行 2',
      trip3: '旅行 3',
      newTrip: '新旅行',
      uploadHint: '通过上传markdown文件添加新旅行'
    },
    dayCard: {
      day: 'Day'
    },
    attractionModal: {
      historicalContext: '历史定位',
      experience: '实地体验',
      insight: '核心洞察',
      relatedPeople: '相关人物',
      close: '关闭'
    },
    historicalOverview: {
      title: '英国历史时间线',
      subtitle: '这不是一张"旅游景点清单"，而是一条"文明如何通过空间、制度、人物不断自我修复与延续"的时间轴',
      coreFramework: '核心框架',
      englandTimeline: '英格兰历史时期总览',
      scotlandTimeline: '苏格兰独立线（并行时间轴）',
      collapseEngland: '收起英格兰历史时期',
      expandEngland: '展开英格兰历史时期',
      collapseScotland: '收起苏格兰独立线',
      expandScotland: '展开苏格兰独立线',
      location: '地点',
      keyFigures: '关键人物',
      coreEvents: '核心事件',
      historicalSignificance: '历史意义',
      day: 'Day',
      period: '时期',
      scotlandStatus: '苏格兰状态',
      englandRelation: '英格兰关系',
      keyEvents: '关键事件'
    },
    reflectionSection: {
      title: '宏观思考与洞察',
      subtitle: '超越景点的深度反思：从宗教与王权的博弈，到文明的自我修复机制',
      conclusion: '结语',
      conclusionText1: '这次英国之行，我不是在"看景点"，而是在"阅读一个文明如何通过空间、制度、人物不断自我修复与延续"。',
      conclusionText2: '从白崖到威斯敏斯特，从罗马军营到现代大学，我看到的是：权力如何被建筑化、法律如何被制度化、知识如何被保存、文化如何被软化。英国不是"完美"的，但它展示了一条路径：如何在不断的冲突、妥协、修复中，让制度活下来。'
    }
  }
};

export function t(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
