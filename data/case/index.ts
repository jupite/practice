import type { CaseItem } from "@/types/case";
export * from "./charts";

const cases: CaseItem[] = [
  {
    id: "case-001",
    title: "智慧城市交通指挥系统",
    summary: "基于大数据与 AI 的城市级实时交通调度平台，支持信号灯自适应、拥堵预测和事故预警。",
    description:
      "该项目为某一线城市打造的交通指挥大脑，接入全市 3000+ 路口信号灯与 2 万路摄像头。通过深度学习模型对车流密度、车速、天气等多源数据进行实时分析，实现信号灯配时秒级调整，平均道路通行效率提升 23%。",
    cover:
      "https://images.unsplash.com/photo-1514866726862-0f081731e63f?auto=format&fit=crop&w=1200&q=80",
    tags: ["智慧城市", "AI", "大数据"],
    author: "林深",
    publishedAt: "2025-09-12",
    stats: { views: 12480, likes: 328 },
    chapters: [
      {
        slug: "chapter1",
        title: "项目背景与挑战",
        content:
          "随着城市机动车保有量的快速增长，传统交通信号灯配时方式已无法满足复杂路况需求。\n\n核心痛点包括：\n• 高峰时段路口拥堵严重，平均等待时间超过 15 分钟\n• 事故响应滞后，平均到达现场时间需 20 分钟以上\n• 缺乏全局视野，无法进行跨区域联动调度\n\n本项目旨在通过 AI 和大数据技术，构建城市级智能交通指挥大脑。",
      },
      {
        slug: "chapter2",
        title: "技术架构设计",
        content:
          "系统采用云边协同架构，分为感知层、边缘计算层、云端决策层三层。\n\n感知层：\n接入全市 3000+ 路口信号灯、2 万路视频摄像头、地磁线圈、雷达等多源感知设备，实时采集车流、车速、排队长度等数据。\n\n边缘计算层：\n在路口部署边缘节点，通过轻量化 AI 模型实时处理视频流，本地识别车辆类型、检测交通事故，毫秒级响应。\n\n云端决策层：\n基于城市交通数字孪生，通过强化学习模型进行全局信号灯配时优化，支持秒级调整。",
      },
      {
        slug: "chapter3",
        title: "应用成果与效益",
        content:
          "项目上线一年来取得显著成效：\n\n通行效率提升：\n• 平均道路通行效率提升 23%\n• 早晚高峰平均拥堵时长减少 35%\n• 主干道平均车速由 28km/h 提升至 42km/h\n\n安全保障增强：\n• 事故自动检测准确率达 98.6%\n• 事故响应时间缩短至 5 分钟以内\n• 二次事故率下降 60%\n\n社会效益：\n年减排二氧化碳约 12 万吨，节省市民通勤时间累计超 500 万小时。",
      },
    ],
  },
  {
    id: "case-002",
    title: "新能源充电桩运营平台",
    summary: "面向运营商的一站式充电桩管理 SaaS，覆盖设备接入、计费结算、用户端小程序。",
    description:
      "平台支持主流 OCPP 协议与私有协议，完成 5 万+ 充电桩的统一纳管。通过云端调度算法优化峰谷电价，帮助运营商平均收益提升 18%。内置故障自诊模块，将设备平均修复时间缩短至 2 小时。",
    cover:
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=1200&q=80",
    tags: ["新能源", "SaaS", "物联网"],
    author: "江野",
    publishedAt: "2025-11-03",
    stats: { views: 8921, likes: 215 },
    chapters: [
      {
        slug: "chapter1",
        title: "行业痛点分析",
        content:
          "新能源汽车保有量爆发式增长，但充电桩运营面临诸多挑战：\n\n设备碎片化：\n不同厂商充电桩协议不兼容，运营商需同时运维多套系统，管理成本高昂。\n\n运营效率低：\n• 人工巡检成本高，故障发现滞后\n• 峰谷电价策略粗放，收益未最大化\n• 用户找桩、支付体验差，复购率低\n\n数据孤岛：\n设备数据、用户数据、运营数据分散，无法进行全局优化分析。",
      },
      {
        slug: "chapter2",
        title: "平台核心功能",
        content:
          "平台采用微服务架构，提供一站式运营能力：\n\n设备接入层：\n支持 OCPP 1.6/2.0 及主流厂商私有协议，5 分钟完成新品牌接入。已接入 5 万+ 充电桩，覆盖 200+ 城市。\n\n智能调度引擎：\n基于实时电价、电网负载、用户预约数据，动态调整充电功率和价格策略，帮助运营商平均收益提升 18%。\n\n故障自诊系统：\n通过设备遥测数据结合 AI 模型，提前 72 小时预测潜在故障，自动派单，设备平均修复时间从 24 小时缩短至 2 小时。\n\n用户端小程序：\n提供找桩导航、预约充电、无感支付、充电状态实时查看等功能。",
      },
      {
        slug: "chapter3",
        title: "运营数据",
        content:
          "平台上线两年，运营数据亮眼：\n\n接入规模：\n• 接入运营商 150+\n• 接入充电桩 50,000+\n• 覆盖城市 200+\n\n效益提升：\n• 运营商平均收益提升 18%\n• 设备故障率下降 45%\n• 用户充电体验满意度 96%\n\n技术指标：\n• 设备在线率 99.5%\n• API 响应时间 < 100ms\n• 数据实时同步延迟 < 3s",
      },
    ],
  },
  {
    id: "case-003",
    title: "跨境电商独立站解决方案",
    summary: "面向 DTC 品牌的多语言、多币种独立站，集成支付、物流、CRM 与营销自动化。",
    description:
      "基于 Next.js + Shopify Hydrogen 构建的高性能 Storefront，支持 20+ 语言与 30+ 币种。集成 Stripe、PayPal 及本地支付方式，页面 LCP ≤ 1.2s。内置营销自动化引擎，用户复购率提升 34%。",
    cover:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    tags: ["电商", "Next.js", "SaaS"],
    author: "苏晓",
    publishedAt: "2026-01-21",
    stats: { views: 15203, likes: 476 },
    chapters: [
      {
        slug: "chapter1",
        title: "DTC 品牌出海的核心挑战",
        content:
          "传统跨境电商依赖第三方平台面临诸多限制：\n\n平台规则风险：\n平台政策多变，账号封禁、佣金上涨等风险不可控，品牌数据和用户关系都不属于自己。\n\n用户体验割裂：\n• 页面加载慢，LCP 普遍 > 3s\n• 多语言多币种支持差\n• 支付方式单一，转化率低\n\n营销成本高：\n第三方平台流量成本持续上涨，缺乏私域运营能力，用户复购率低。",
      },
      {
        slug: "chapter2",
        title: "技术方案选型",
        content:
          "采用 Next.js + Shopify Hydrogen + Vercel 技术栈：\n\n前端架构：\n• Next.js App Router + React Server Components\n• Shopify Hydrogen 提供电商原语\n• TailwindCSS + shadcn/ui 组件库\n• 页面 LCP ≤ 1.2s，TTFB < 200ms\n\n国际化能力：\n• 基于 Next.js i18n 支持 20+ 语言\n• 动态汇率 + 30+ 币种自动切换\n• 区域化内容和定价策略\n\n全球基础设施：\n• 部署在 Vercel Edge Network\n• 全球 300+ CDN 节点\n• 图片自动优化与格式转换",
      },
      {
        slug: "chapter3",
        title: "增长引擎与成效",
        content:
          "内置营销自动化与 CRM 系统，驱动业务增长：\n\n营销自动化：\n• 遗弃购物车召回邮件，转化率 15%\n• 基于用户行为的个性化推荐\n• 节日营销自动化流程\n• 用户复购率提升 34%\n\n支付与物流：\n• 集成 Stripe、PayPal 及 10+ 本地支付\n• 智能分单与全球物流追踪\n• 平均支付成功率 92%\n\n客户案例：\n服务 50+ DTC 品牌，平均 GMV 增长 2.3 倍，ROI 达到 1:8。",
      },
    ],
  },
  {
    id: "case-004",
    title: "医疗影像智能辅助诊断",
    summary: "基于 3D 医学影像与多模态大模型的辅助诊断系统，覆盖肺结节、脑出血等场景。",
    description:
      "系统接入 CT、MRI 等影像数据，通过自研分割模型与大模型推理，对 6 类常见病灶实现秒级检出与结构化报告生成。已在 12 家三甲医院试点，医生阅片效率提升 40%，误诊率下降 12%。",
    cover:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["医疗", "AI", "大模型"],
    author: "陈朗",
    publishedAt: "2026-03-08",
    stats: { views: 21540, likes: 712 },
    chapters: [
      {
        slug: "chapter1",
        title: "医疗影像诊断的痛点",
        content:
          "影像科医生面临巨大的工作压力：\n\n阅片负荷过大：\n三甲医院影像科医生日均阅片超 200 份，高峰时段可达 400 份，长期高强度工作易导致疲劳误诊。\n\n诊断一致性差：\n• 不同年资医生诊断准确率差异可达 20%\n• 对于罕见病、复杂病例，经验依赖严重\n• 基层医院诊断水平参差不齐\n\n效率瓶颈：\n一份 CT 影像包含数百张切片，人工阅片需 15-30 分钟，报告书写又需 10-15 分钟，严重影响就诊效率。",
      },
      {
        slug: "chapter2",
        title: "多模态大模型方案",
        content:
          "采用 3D 分割网络 + 医疗大模型的多模态架构：\n\n影像分割模块：\n• 基于 nnUNet 改进的 3D 分割网络\n• 支持 CT、MRI、PET 等多种影像模态\n• 对肺结节、脑出血、肝占位等 6 类病灶实现像素级分割\n• Dice 系数达 0.92+，秒级检出\n\n医疗大模型：\n• 在百万份医学影像报告上微调\n• 支持自然语言问诊与医学知识问答\n• 自动生成结构化诊断报告\n• 提供循证医学证据和参考依据\n\n工作流：\n影像上传 → AI 预分析 → 病灶标注 → 报告初稿 → 医生审核 → 最终报告",
      },
      {
        slug: "chapter3",
        title: "临床验证与应用",
        content:
          "已在 12 家三甲医院完成临床试点：\n\n效率提升：\n• 医生阅片效率提升 40%\n• 报告生成时间从 15 分钟缩短至 2 分钟\n• 日均处理量提升 60%\n\n准确率改善：\n• 肺结节检出灵敏度 96.3%（医生平均 88%）\n• 误诊率下降 12%\n• 漏诊率下降 18%\n\n多场景覆盖：\n• 体检中心：大规模筛查，初筛阳性自动预警\n• 急诊：快速排除脑出血、主动脉夹层等急重症\n• 基层医院：AI 辅助 + 远程会诊，提升诊断水平",
      },
    ],
  },
  {
    id: "case-005",
    title: "月度经营数据可视化",
    summary: "使用 ECharts 实现公司 1-12 月销售额与利润率的双 Y 轴趋势分析图表。",
    description:
      "该案例展示了如何使用 ECharts 构建复杂的经营数据可视化图表。采用双 Y 轴设计，左侧展示销售额柱状图（垂直线性渐变），右侧展示利润率平滑折线图。集成 dataZoom 区域缩放组件，支持交互式数据探索。图表支持响应式布局，自适应容器宽度，高度固定为 400px。",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["数据可视化", "ECharts", "数据分析"],
    author: "数据团队",
    publishedAt: "2026-05-27",
    stats: { views: 3420, likes: 156 },
    chartType: "monthly-business",
  },
  {
    id: "case-006",
    title: "季度品类销量分析",
    summary: "使用堆叠柱状图与折线图组合展示电子产品、家居用品、服装、食品四个品类的季度销量与总销量趋势。",
    description:
      "该案例展示了如何使用 ECharts 构建堆叠柱状图与折线图的组合图表。采用堆叠柱状图展示四个品类（电子产品、家居用品、服装、食品）在四个季度（Q1-Q4）的销量构成，柱子使用圆角矩形和柔和配色（浅绿、橙黄、浅紫、天蓝）。在每个堆叠柱顶部显示该季度的总销量数值。额外增加一条虚线样式的折线图表示总销量趋势，使用右侧第二 Y 轴，数据点显示实心圆标记。图例置于图表上方，支持点击切换品类堆叠及总销量趋势线的显隐。图表背景设置为浅灰色（#f5f5f5），并带有细微的网格线。",
    cover:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1200&q=80",
    tags: ["数据可视化", "ECharts", "堆叠柱状图"],
    author: "数据团队",
    publishedAt: "2026-05-27",
    stats: { views: 2850, likes: 132 },
    chartType: "quarterly-sales",
  },
  {
    id: "case-007",
    title: "品类销售额占比",
    summary: "使用南丁格尔玫瑰图展示电商六大品类销售额占比，数据总和 2.5 亿元。",
    description:
      "该案例展示了如何使用 ECharts 构建南丁格尔玫瑰图。采用 roseType: 'area' 模式，扇区面积与数据值成正比，直观反映各品类销售额差异。中心显示总销售额文字（2.5 亿），扇区通过引导线展示品类名称与百分比标签。配色采用莫兰迪色系，扇区间以 2px 白色边框分隔。鼠标悬停时扇区外偏 8px 并添加阴影，同时高亮当前扇区、其余透明度降低。图例竖直排列于右侧，支持点击显隐。",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["数据可视化", "ECharts", "玫瑰图"],
    author: "数据团队",
    publishedAt: "2026-05-27",
    stats: { views: 2180, likes: 98 },
    chartType: "category-sales-rose",
  },
  {
    id: "case-008",
    title: "电商销售监控看板",
    summary: "使用 ECharts dataset 组件实现饼图、柱状图、折线图三种图表的联动交互。",
    description:
      "该案例展示了 ECharts dataset 数据管理与图表联动交互的最佳实践。包含三个图表：饼图展示各品类销售额占比、柱状图展示子品牌销售额排行、折线图展示各品类日销售额趋势。点击饼图扇区时，柱状图只显示该品类下的子品牌数据，折线图只显示该品类的趋势线，实现数据钻取功能。所有图表支持窗口大小自适应，tooltip 自定义格式化显示。",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["数据可视化", "ECharts", "dashboard", "联动交互"],
    author: "数据团队",
    publishedAt: "2026-05-29",
    stats: { views: 1850, likes: 125 },
    chartType: "sales-dashboard",
  },
];

export default cases;
