import { HistoricalPeriod } from '../types/trip';

export const historicalTimeline: HistoricalPeriod[] = [
  {
    period: '罗马不列颠时期',
    timeRange: 'AD 43–410',
    keyLocation: '约克 (Eboracum)',
    keyFigures: ['罗马总督', '塞普提米乌斯·塞维鲁皇帝'],
    majorEvents: '罗马征服不列颠，建立军事与行政城市',
    significance: '英国首次被纳入帝国制度治理',
    relatedDays: [6]
  },
  {
    period: '罗马末期',
    timeRange: '4世纪',
    keyLocation: '约克、林肯',
    keyFigures: ['罗马军团'],
    majorEvents: '罗马军撤离，权力真空期',
    significance: '制度崩塌，地方化',
    relatedDays: [6, 7]
  },
  {
    period: '盎格鲁-撒克逊时期',
    timeRange: '5–11世纪',
    keyLocation: '约克、林肯、牛津',
    keyFigures: ['阿尔弗雷德大帝'],
    majorEvents: '基督教传播，英语形成，习惯法 (Common Law)',
    significance: '教会成为秩序核心，英格兰民族成形',
    relatedDays: [1, 6, 7]
  },
  {
    period: '维京时期',
    timeRange: '8–10世纪',
    keyLocation: '约克 (Jorvik)',
    keyFigures: ['丹麦维京人', '克努特大帝'],
    majorEvents: '北英格兰被丹麦法统治，Danelaw区域',
    significance: '北海贸易世界',
    relatedDays: [6]
  },
  {
    period: '诺曼征服',
    timeRange: '1066',
    keyLocation: '林肯城堡、白崖 Dover、温莎城堡',
    keyFigures: ['威廉一世 (征服者威廉)'],
    majorEvents: '黑斯廷斯战役，诺曼征服，封建制系统化',
    significance: '法语贵族统治英格兰，精英阶层整体替换，国家能力跃迁',
    relatedDays: [1, 7, 8]
  },
  {
    period: '诺曼时期',
    timeRange: '1072–1092',
    keyLocation: '林肯大教堂',
    keyFigures: ['诺曼主教 Remigius'],
    majorEvents: '大教堂奠基，教会权力可视化',
    significance: '宗教建筑压过世俗建筑',
    relatedDays: [7]
  },
  {
    period: '中世纪盛期 - 大宪章',
    timeRange: '1215',
    keyLocation: '林肯大教堂 Chapter House',
    keyFigures: ['约翰王 (King John)'],
    majorEvents: 'Magna Carta 大宪章签署',
    significance: '王权被法律约束，制度优先于个人',
    relatedDays: [7, 10]
  },
  {
    period: '哥特式建筑发展',
    timeRange: '13–14世纪',
    keyLocation: '约克大教堂 (York Minster)',
    keyFigures: ['英国教会', '中世纪工匠'],
    majorEvents: '哥特式建筑发展，彩色玻璃工艺',
    significance: '信仰+技术巅峰',
    relatedDays: [6]
  },
  {
    period: '中世纪大学形成',
    timeRange: '12–14世纪',
    keyLocation: '牛津、剑桥',
    keyFigures: ['神职学者'],
    majorEvents: '学院制大学诞生，知识制度化',
    significance: '精英复制系统，知识脱离修道院',
    relatedDays: [1, 9]
  },
  {
    period: '百年战争',
    timeRange: '1337–1453',
    keyLocation: '牛津 All Souls College',
    keyFigures: ['英法王权', '爱德华三世'],
    majorEvents: '英法王位争夺，民族意识形成',
    significance: '国家认同成型',
    relatedDays: [1]
  },
  {
    period: '玫瑰战争',
    timeRange: '1455–1487',
    keyLocation: '约克',
    keyFigures: ['约克家族 (白玫瑰)', '兰开斯特家族 (红玫瑰)'],
    majorEvents: '贵族内战，王权重构',
    significance: '都铎王朝建立，王权集中',
    relatedDays: [6]
  },
  {
    period: '都铎王朝',
    timeRange: '1485–1603',
    keyLocation: '剑桥 Trinity College、牛津',
    keyFigures: ['亨利八世', '伊丽莎白一世'],
    majorEvents: '宗教改革，解散修道院，民族国家',
    significance: '国家高于教会，王权至上',
    relatedDays: [1, 2, 8, 9]
  },
  {
    period: '血腥玛丽时期',
    timeRange: '1553–1558',
    keyLocation: '牛津 Martyrs\' Memorial',
    keyFigures: ['玛丽一世'],
    majorEvents: '新教徒迫害，火刑处决',
    significance: '宗教冲突高峰',
    relatedDays: [1]
  },
  {
    period: '王冠合并',
    timeRange: '1603',
    keyLocation: '爱丁堡—伦敦',
    keyFigures: ['詹姆士一世 (苏格兰六世)'],
    majorEvents: '英格兰与苏格兰同一国王',
    significance: '人合非国合，双王国并立',
    relatedDays: [5]
  },
  {
    period: '英国内战',
    timeRange: '1640s',
    keyLocation: '牛津',
    keyFigures: ['查理一世'],
    majorEvents: '王权vs议会内战',
    significance: '议会权力上升',
    relatedDays: [1]
  },
  {
    period: '光荣革命',
    timeRange: '1688',
    keyLocation: '全英国',
    keyFigures: ['威廉三世'],
    majorEvents: '议会至上，君主立宪',
    significance: '现代英国制度确立',
    relatedDays: []
  },
  {
    period: '苏格兰独立战争',
    timeRange: '1296–1357',
    keyLocation: '爱丁堡城堡',
    keyFigures: ['威廉·华莱士', '罗伯特·布鲁斯'],
    majorEvents: '班诺克本战役1314，独立战争',
    significance: '苏格兰主权确立',
    relatedDays: [5]
  },
  {
    period: '正式合并',
    timeRange: '1707',
    keyLocation: '爱丁堡',
    keyFigures: [],
    majorEvents: 'Act of Union，联合王国成立',
    significance: '苏格兰保留法律/教会/教育',
    relatedDays: [5]
  },
  {
    period: '启蒙运动',
    timeRange: '18世纪',
    keyLocation: '格拉斯哥、爱丁堡',
    keyFigures: ['Adam Smith', 'David Hume', 'James Hutton'],
    majorEvents: '《国富论》，《道德情操论》，经验主义哲学',
    significance: '市场制度，理性精神',
    relatedDays: [5]
  },
  {
    period: '工业革命',
    timeRange: '1760–1840',
    keyLocation: '曼彻斯特、格拉斯哥',
    keyFigures: ['工厂主', '工人阶级'],
    majorEvents: '工业化，铁路、纺织',
    significance: '世界工厂，全球贸易中心',
    relatedDays: [4, 5]
  },
  {
    period: '浪漫主义',
    timeRange: '1790–1830',
    keyLocation: 'Lake District 湖区',
    keyFigures: ['William Wordsworth'],
    majorEvents: '自然诗歌，情感反工业',
    significance: '精神疗愈，国家身份',
    relatedDays: [3]
  },
  {
    period: '贵族转型',
    timeRange: '18–19世纪',
    keyLocation: '布莱顿 (Brighton)',
    keyFigures: ['乔治四世'],
    majorEvents: '海滨度假，Royal Pavilion',
    significance: '权力去军事化，生活方式转型',
    relatedDays: [11]
  },
  {
    period: '战争功绩奖励',
    timeRange: '18世纪',
    keyLocation: 'Blenheim Palace 布伦海姆宫',
    keyFigures: ['1st Duke John Churchill'],
    majorEvents: '马尔伯勒战争，对法战争',
    significance: '功绩授爵，贵族体系',
    relatedDays: [2]
  },
  {
    period: '维多利亚时代',
    timeRange: '1837–1901',
    keyLocation: '温莎城堡、全英国',
    keyFigures: ['维多利亚女王'],
    majorEvents: '帝国巅峰，工程奇迹',
    significance: '全球殖民体系，民族国家象征',
    relatedDays: [1]
  },
  {
    period: '航海帝国',
    timeRange: '18世纪',
    keyLocation: 'Whitby',
    keyFigures: ['Captain Cook 库克船长'],
    majorEvents: '三次太平洋航行，科学测绘',
    significance: '测量型帝国，知识即权力',
    relatedDays: [8]
  },
  {
    period: '哥特文学',
    timeRange: '19世纪',
    keyLocation: 'Whitby',
    keyFigures: ['Bram Stoker'],
    majorEvents: '《德古拉》1897',
    significance: '维多利亚焦虑，外来恐惧',
    relatedDays: [8]
  },
  {
    period: '两次世界大战',
    timeRange: '1914–1945',
    keyLocation: 'Blenheim Palace、Chartwell',
    keyFigures: ['Winston Churchill 温斯顿·丘吉尔'],
    majorEvents: '二战领导，民主对抗极权',
    significance: '制度韧性，国家存亡',
    relatedDays: [2]
  },
  {
    period: '20世纪科学革命',
    timeRange: '20世纪',
    keyLocation: '剑桥 King\'s College、Trinity College',
    keyFigures: ['Alan Turing 图灵', 'Stephen Hawking 霍金'],
    majorEvents: '计算机科学，密码破译，现代物理',
    significance: '现代世界基础，理性权威延续',
    relatedDays: [9]
  },
  {
    period: '20世纪诗歌',
    timeRange: '1920s',
    keyLocation: '剑桥 King\'s College',
    keyFigures: ['徐志摩'],
    majorEvents: '《再别康桥》，中国现代文学',
    significance: '中西文化交流，知识分子精神原乡',
    relatedDays: [9]
  },
  {
    period: '中世纪至今',
    timeRange: '中世纪至今',
    keyLocation: 'Westminster Abbey 威斯敏斯特教堂',
    keyFigures: ['英国历代君主', '牛顿', '达尔文', '莎士比亚纪念'],
    majorEvents: '加冕与国葬，国家仪式',
    significance: '制度连续性，国家叙事工厂',
    relatedDays: [10]
  },
  {
    period: '当代英国',
    timeRange: '1997–至今',
    keyLocation: '爱丁堡苏格兰议会',
    keyFigures: [],
    majorEvents: '权力下放 Devolution，独立公投2014',
    significance: '自治回潮，联合王国张力',
    relatedDays: [5]
  }
];
