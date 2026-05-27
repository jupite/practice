import type { CaseItem } from "@/types/case";

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
];

export default cases;
