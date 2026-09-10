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

---

## Home 页 Design System v3（Industrial / Premium / Clean / Technical / Restrained）

> 目标：从「完整网站」提升为「专业工业 OEM 技术供应商网站」。参考 Bosch Rexroth（工程信息层级）、Parker（工程伙伴定位）、SKF（留白与粗体字层级），但比三者更简洁克制。

### 视觉策略
- 以 Logo 红黑系统为唯一品牌锚点，红色仅用于按钮、链接、眉线、关键数字
- 通过字重与字号对比建立层级，不靠颜色堆叠
- 大量留白 + 克制边框 + 微阴影，传递精密工业感
- 白色背景配深色文字保证 4.5:1 以上对比度；Hero 深色遮罩配纯白文字与白色 Logo
- 关键 section 用极淡暖灰（#F8F8F5）制造呼吸节奏
- 所有交互 150–200ms ease，无弹跳、无弹性

### 设计原则
- Design System 先行，页面落地在后
- 组件化样式：颜色、字体、间距、卡片、按钮、链接全部通过 token/utility 管理
- 不是「设计页面」，而是「应用系统」

### 颜色系统

#### 背景
- 页面底：#FAFAF7
- Alt section 底：#F8F8F5
- 卡片底：#FFFFFF

#### 文字
- 标题/主要文字：#0F0F0F（Brand Black）
- 正文：#4A4E54（深灰，确保白底可读）
- 辅助文字：#6B6863（Brand Gray，14px 层级）
- Hero 遮罩上文字：#FFFFFF（纯白，保证深色背景可见）

#### 强调
- 品牌红（Brand Red）：#A31919 — 仅用于按钮、链接、眉线、关键数字、强调线
- 深红（Brand Red Deep）：#8A1515 — Primary Button hover
- 红色淡底：rgba(163, 25, 25, 0.06) — 悬停态背景
- 红色浅边：rgba(163, 25, 25, 0.10) — 高亮边框

#### 边框/分割
- 卡片边框：#E5E5E5（rgba(15,15,15,0.10)）
- Section 分隔：rgba(15, 15, 15, 0.08)
- Hover 边框加深：rgba(15, 15, 15, 0.18)

### 字体层级
- H1 Hero：Space Grotesk, 2.5–3rem（40–48px）, weight 700, letter-spacing -0.02em, line-height 1.1
- H2 Section：Space Grotesk, 1.5–2rem（24–32px）, weight 700, letter-spacing -0.01em, line-height 1.15
- H3 Card/子标题：Space Grotesk, 1.125–1.25rem（18–20px）, weight 600, line-height 1.25
- Lead：Inter, 18px, weight 400, line-height 1.65, color #6B6863
- Body：Inter, 16px（底线）, weight 400, line-height 1.6, color #4A4E54
- Small/辅助：Inter, 14px, weight 400, line-height 1.5, color #6B6863
- Eyebrow：IBM Plex Mono, 11px, weight 500, letter-spacing 0.14em, uppercase, color #A31919

> 标题与正文形成明确粗细对比：标题 600–800，正文 400。

### 间距系统（4px 基准）
- 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
- Section padding：80–120px vertical（移动端 80px，桌面 96–120px）
- Section 标题区与内容区间距：32–48px
- Card padding：24–32px
- Grid gap：16–24px
- Card image 与文字间距：16–20px

### 卡片系统
- 背景：#FFFFFF
- 边框：1px solid #E5E5E5
- 圆角：6px
- 静态阴影：0 1px 3px rgba(15, 15, 15, 0.04)
- Hover：border #D4D4D4、阴影 0 12px 24px rgba(15,15,15,0.06)、translateY(-2px)
- 过渡：200ms ease

### 按钮系统
- Primary：bg #A31919, text white, radius 4px, padding 14px 28px, font-weight 500, 静态阴影 0 1px 2px rgba(163,25,25,0.2)
- Primary Hover：bg #8A1515, 阴影 0 4px 12px rgba(163,25,25,0.25)
- Secondary：透明底、#0F0F0F 边框、#0F0F0F 文字；Hover：bg rgba(15,15,15,0.04), border 加深
- 链接箭头：Hover 时箭头右移 3px，transition 200ms ease

### Logo 场景适配
- 白色背景 Header：使用 `/images/hm-logo.png`（深色版本）
- Hero 深色遮罩：使用 `/images/hm-logo-white.png`（白色版本）
- 深色 Footer：使用 `/images/hm-logo-white.png`（白色版本）

### Section 节奏
- 默认 section：#FAFAF7 背景
- Alt section：#F8F8F5 背景
- 分隔线：1px rgba(15, 15, 15, 0.08)

### 交互原则
- Hover 只改变边框、阴影、位移、颜色，不动效夸张
- 卡片统一使用 transform + shadow 组合
- 链接统一使用箭头右移动效
- 所有 transition 使用 ease 曲线

### 保留不变
- 文案、产品数据、页面结构、URL、图片素材
- 首页品牌色盘（红黑）
- 字体族（Space Grotesk / Inter / IBM Plex Mono）
- 工业克制的整体气质

### 设计禁忌
- 不在 Home 页引入 Navy 蓝或其他品牌色
- 不使用渐变背景或装饰性图形
- 不使用图标库图标，保持纯文字/功能性标记
- 不增加新的图片素材或改变图片裁切比例
- 不做大面积红色色块
- 不在浅色背景上使用浅色文字
