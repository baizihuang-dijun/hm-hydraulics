# DESIGN.md — HM Hydraulics

## 品牌与视觉方向
- 工业 B2B 风格，克制、专业、以内容为核心
- 意象：精密液压阀体加工车间，金属质感，冷静的深蓝配色
- 不做花哨动效，不用渐变堆砌，靠排版和留白传递专业感

## Design Tokens

### 色彩

#### 全局系统（站点默认）
- 主色（Navy）：#2C4A73 — 信任、工业、精密
- 背景（Warm White）：#FAFAF7 — 温暖但不冷冰冰的白
- 文字层级：#1B1E20（标题）/ #4A4E54（正文）/ #62666C（辅助）
- 边框/分割：rgba(44,74,115,0.10)
- 强调/CTA hover：#1E3A5F（深海军蓝）

#### 首页品牌系统（源自 HM Hydraulics Logo）
Logo 主色为深红 #A31919 与黑色 #000000。首页以此为基础建立独立品牌色盘，保持克制、技术感、高辨识度：
- 品牌红（Brand Red）：#A31919 — 仅用于眉线、关键数字、链接、选中态、主 CTA，作为高亮点缀
- 品牌黑（Brand Black）：#0F0F0F — 标题与主要文字，比纯黑更柔和
- 品牌灰（Brand Gray）：#6B6863 — 正文与辅助文字
- 背景：保留 #FAFAF7
- 红色淡底（Red Tint）：rgba(163, 25, 25, 0.06) — 悬停态背景
- 红色浅边（Red Light）：rgba(163, 25, 25, 0.10) — 高亮边框
- 首页边框：rgba(15, 15, 15, 0.08) — 克制中性分隔
- CTA 悬停：#8A1515（更深红）

首页不使用 Navy 作为主色，让 Logo 红黑系统成为首页视觉识别，同时保持整体页面以留白和中性色为主，红色仅作点缀。

### 字体
- 标题：Space Grotesk（几何感、工业气质）
- 正文：Inter（清晰、高可读性）
- 标签/眉线：IBM Plex Mono（技术感、数据标签）

### 排版节奏
- 眉线标签（eyebrow）：IBM Plex Mono, 11-12px, uppercase, letter-spacing 0.1em
- H1：Space Grotesk, 48-64px, weight 500-600
- H2：Space Grotesk, 32-40px, weight 500
- Body：Inter, 16-18px, line-height 1.6-1.7
- 段落最大宽度：680px（阅读舒适度）

### 间距
- Section padding：96-120px vertical
- Card padding：32-40px
- Grid gap：24-32px

### 圆角
- 卡片/容器：6-8px（克制，不圆润）
- 按钮：4px（工业感）

## 动效与交互
- 仅使用 subtle transition：150-200ms ease
- 无弹跳、无弹性动画
- Hover：微妙的背景色变化或边框加深

## 设计禁忌
- 不用渐变色背景
- 不用大圆角卡片（>12px）
- 不用浮夸阴影
- 不用过度饱和的颜色
- 不用装饰性插画/图标（仅用功能性图标）
