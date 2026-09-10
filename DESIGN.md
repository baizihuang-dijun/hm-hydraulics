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

## Home 页视觉升级 v2（Visual & UX Refresh）

> 目标：Industrial / Premium / Clean / Technical / Restrained。参考 Bosch Rexroth（工程导向、真实工业摄影、清晰结构）、Parker（工程伙伴定位）、SKF（留白、粗体字层级、工业高级感）。

### 视觉策略
- 以 Logo 红黑系统为锚点，不做二次品牌色，只把红色用得更加克制、精确
- 通过字重、字号、留白建立层级，不靠颜色堆叠
- 卡片使用极浅阴影 + 边框，悬浮时通过微抬升和阴影加深传递品质感
- 全页保持温暖白底，关键 section 用极淡暖灰（#F8F8F5）做呼吸节奏
- 所有交互 150–200ms ease，无弹跳、无弹性

### 升级后的 Tokens

#### 字体层级
- H1 Hero：Space Grotesk, 40–64px, weight 500, letter-spacing -0.03em, line-height 1.05
- H2 Section：Space Grotesk, 32–44px, weight 500, letter-spacing -0.02em, line-height 1.1
- H3 Card：Space Grotesk, 17–18px, weight 500
- Lead：Inter, 18px, line-height 1.65, color #6B6863
- Body：Inter, 15–16px, line-height 1.6
- Eyebrow：IBM Plex Mono, 11px, weight 500, letter-spacing 0.14em, uppercase, color #A31919

#### 间距
- Section padding：80–128px vertical（移动端 80px，桌面 128px）
- Section 内部标题区与内容区间距：40–48px
- Card padding：24–32px
- Grid gap：16–24px
- Card image 与文字间距：20px

#### 卡片
- 背景：#FFFFFF
- 边框：1px solid rgba(15, 15, 15, 0.08)
- 圆角：8px
- 静态阴影：0 1px 2px rgba(15, 15, 15, 0.04)
- Hover：border rgba(15,15,15,0.14)、阴影 0 12px 32px rgba(15,15,15,0.07)、translateY(-2px)
- 过渡：200ms ease

#### 按钮
- Primary：bg #A31919, text white, radius 4px, padding 14px 28px, 静态阴影 0 1px 2px rgba(163,25,25,0.2)
- Primary Hover：bg #8A1515, 阴影 0 4px 12px rgba(163,25,25,0.25)
- Secondary：透明底、深色边框、深色文字；Hover：bg rgba(15,15,15,0.04), border 加深
- 链接箭头：Hover 时箭头右移 3px

#### Section 节奏
- 默认 section：#FAFAF7 背景
- Alt section：#F8F8F5 背景，制造视觉呼吸
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

### 新增禁忌
- 不在 Home 页引入 Navy 蓝或其他品牌色
- 不使用渐变背景或装饰性图形
- 不使用图标库图标，保持纯文字/功能性标记
- 不增加新的图片素材或改变图片裁切比例
