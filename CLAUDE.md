# DeGate UED Design System

> 这是 UED 设计调整项目，不是业务开发项目。
> UED 团队在此项目中调整 UI 组件、主题、样式，开发者同步回 dg-trade-fe。

## 项目定位

- Fork 自 dg-trade-fe (dev 分支)，保留所有页面和路由
- 默认全部使用真实 dev 后端 API（`dev-backend.degate.com`），通过 `src/wallet/config.ts` 中的 `accessToken` 进行认证
- Mock 仅用于 UED 开发新功能时、新接口尚未在后端实现的情况（按单个接口添加到 `src/mock/data/index.ts`）
- 三种访问模式：PC / Mobile / APP H5（通过右下角 ⚙ 设置按钮切换）
- 运行方式：`npm start`（默认端口 3001）

## 共享设计上下文（Figma Test 根目录）

- 与 **同文件夹下其他项目** 共用的 Impeccable 说明：**`../.impeccable.md`**（即 `Figma Test/.impeccable.md`，与 `app-light-mode-main`、`App UI Light Mode` 等并列仓库同级）。
- 本仓库实现以 **`src/theme.tsx`** 为准；共享文档里若出现 `W.*` / `walletTheme.ts` 等路径，对应 **Wallet / App UI Light** 工程；对齐原则（信任、克制、层级、品牌绿语义等）时仍以该文件为准，token 名映射到 `theme.xxx`。

## 核心规则

1. **只改 UI / 样式 / 主题**，不改业务逻辑
2. 样式用 styled-components + `theme.xxx` 变量，禁止硬编码颜色
3. UI 组件只从 `src/UI` 导入，禁止直接 `@mantine/core`
4. 国际化用 `intl.xxx`，禁止 fallback
5. 现有 API 全走真实后端；只有 UED 新功能的新接口才添加到 mock（详见 `mock-api-guide.md`）

## 规则文件

| 文件 | 内容 | 何时读 |
|------|------|--------|
| `../.impeccable.md` | Figma Test 根目录共享：品牌与界面原则（多仓库共用） | 做视觉 / 交互对齐时 |
| `.claude/rules/ued-scope.md` | UED 修改边界（可改 / 禁止） | **必读** |
| `.claude/rules/for-ued-designer.md` | UED 非开发者操作指南（中文） | UED 人员使用时 |
| `.claude/rules/mock-api-guide.md` | Mock 系统说明 | 涉及数据时 |
| `.claude/rules/sync-guide.md` | 同步回 trade-fe 指南 | 同步时 |
| `.claude/rules/ui-and-style.md` | UI 样式规范 | 写 UI 时 |
| `.claude/rules/code-style.md` | 代码规范 | 写代码时 |
| `.claude/rules/architecture.md` | 项目架构 | 了解项目结构时 |
| `.claude/rules/i18n.md` | 国际化规范 | 涉及文案时 |

## 速记

- 改主题色 → `src/theme.tsx`
- 改按钮样式 → `src/UI/Button/buttonStyles.ts`
- 改页面布局 → 对应 `views/` 下的组件
- 添加 UI 组件 → `src/UI/` 下新建
- 改 wallet 配置（账户/token）→ `src/wallet/config.ts`
- 改 mock 数据 → `src/mock/data/`
- 切换显示模式 → 页面右下角 ⚙ 按钮
