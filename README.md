# 英国历史文化深度游 · 互动网站

一个基于时间线的互动旅行回忆网站，展示2025年12月英国11天的历史文化深度游。从温莎城堡到威斯敏斯特教堂，从牛津剑桥到苏格兰高地，深入探索英国文明的空间、制度与人物。

## 功能特色

- ✨ 时间线视图展示11天行程
- 🏛️ 详细的景点历史背景、实地体验和核心洞察
- 🖼️ 自动从Unsplash获取景点高质量图片
- 📱 完全响应式设计，适配移动端和桌面端
- 🎨 英伦风格配色（深蓝+金色）
- 🔮 预留未来旅行扩展接口

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (图标)

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── Header.tsx      # 页面头部
│   ├── TripTabs.tsx    # 旅行标签切换
│   ├── Timeline.tsx    # 时间线主组件
│   ├── DayCard.tsx     # 每日行程卡片
│   └── AttractionModal.tsx  # 景点详情弹窗
├── data/               # 数据文件
│   ├── ukTripData.ts   # 英国旅行数据
│   └── 英国旅游报告_完整版.md  # 原始markdown报告
├── types/              # TypeScript类型定义
│   └── trip.ts
├── utils/              # 工具函数
│   └── imageService.ts # 图片服务
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 如何添加新旅行

未来添加新旅行非常简单，只需以下步骤：

### 1. 准备markdown文件

将新旅行的markdown报告放入 `src/data/` 目录，格式参考 `英国旅游报告_完整版.md`

### 2. 创建新的数据文件

在 `src/data/` 创建新文件（如 `japanTripData.ts`），按照以下格式组织数据：

```typescript
import { Trip } from '../types/trip';

export const japanTrip: Trip = {
  id: 'japan-2025',
  title: '日本文化探索之旅',
  subtitle: 'A Journey Through Japanese Culture',
  traveler: 'Justin',
  date: '2025年3月',
  days: [
    {
      day: 1,
      title: '东京 → 浅草寺 → 秋叶原',
      cities: ['东京'],
      attractions: [
        {
          id: 'senso-ji',
          nameCn: '浅草寺',
          nameEn: 'Senso-ji Temple',
          type: '寺庙',
          imageKeyword: 'Sensoji Temple Tokyo',
          historicalContext: '东京最古老的寺庙...',
          experience: '参观体验...',
          insight: '核心感悟...',
          relatedPeople: ['相关人物'],
          historicalPeriod: '历史时期'
        }
      ]
    }
  ]
};
```

### 3. 更新App.tsx

在 `src/App.tsx` 中导入新旅行数据：

```typescript
import { ukTrip } from './data/ukTripData';
import { japanTrip } from './data/japanTripData';

// 创建旅行列表
const trips = [ukTrip, japanTrip];

// 更新状态管理以支持多个旅行
const [currentTripId, setCurrentTripId] = useState('uk-2024');
const currentTrip = trips.find(t => t.id === currentTripId) || ukTrip;
```

### 4. 更新TripTabs组件

修改 `src/components/TripTabs.tsx`，将占位符标签改为真实的可点击标签：

```typescript
<button
  onClick={() => onTripChange('japan-2025')}
  className={/* 根据是否选中设置样式 */}
>
  日本之旅 2025
</button>
```

## 图片说明

景点图片通过Unsplash API自动获取，基于每个景点的 `imageKeyword` 字段。如果图片不合适，可以修改 `imageKeyword` 来调整搜索关键词。

## 数据结构说明

### Trip (旅行)
- `id`: 唯一标识符
- `title`: 旅行标题
- `subtitle`: 副标题
- `traveler`: 旅行者姓名
- `date`: 旅行日期
- `days`: 每日行程数组

### DayItinerary (每日行程)
- `day`: 天数
- `title`: 当日标题
- `cities`: 访问城市列表
- `attractions`: 景点数组

### Attraction (景点)
- `id`: 唯一标识符
- `nameCn`: 中文名称
- `nameEn`: 英文名称
- `type`: 景点类型
- `imageKeyword`: Unsplash搜索关键词
- `historicalContext`: 历史定位（可选）
- `experience`: 实地体验（可选）
- `insight`: 核心洞察（可选）
- `relatedPeople`: 相关人物数组（可选）
- `historicalPeriod`: 历史时期（可选）

## 部署

项目使用Vite构建，生成静态文件，可部署到任何静态托管服务：

- Netlify
- Vercel
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

```bash
npm run build
# dist/ 目录包含所有静态文件
```

## 设计理念

这不仅是一个旅行照片展示网站，而是：

- 📚 **知识深度**: 每个景点都有历史背景和文化洞察
- 🎯 **叙事结构**: 时间线视图符合旅行回忆的线性浏览习惯
- 🔄 **易于扩展**: 未来添加新旅行无需改动核心代码
- 🎨 **视觉美感**: 英伦风格配色，专业设计感
- 🌏 **完全中文**: 适合中文用户浏览回忆

## 许可证

MIT License

---

**创建者**: Justin
**创建日期**: 2025年12月
