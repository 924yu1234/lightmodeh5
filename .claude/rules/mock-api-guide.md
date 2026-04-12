# Mock API 使用指南

## 当前策略：全部使用真实 API

所有接口默认走真实 dev 后端（`dev-backend.degate.com`），使用 `public/index.html` 中配置的真实 `accessToken` 进行认证。

**不需要 mock 数据来展示现有功能。**

## 何时使用 Mock

**只在 UED 开发新功能、且新接口尚未在后端实现时**，才添加 mock 端点。

### 生命周期

```
1. UED 设计新功能 → 新接口后端还没实现
2. 在 src/mock/data/index.ts 的 mockRoutes 中添加 mock 端点
3. 在 src/mock/data/ 下创建对应的 mock 数据文件
4. UED 完成设计调整
5. trade-fe 实现真实接口后 → 从 mockRoutes 删除该端点
6. 同步代码回 trade-fe
```

### 添加 Mock 端点

1. 在 `src/mock/data/` 下创建数据文件：
```ts
// src/mock/data/newFeature.ts
export const mockNewFeatureData = {
  list: [
    { id: 1, name: 'Example', ... },
  ],
};
```

2. 在 `src/mock/data/index.ts` 注册路由：
```ts
import { mockNewFeatureData } from './newFeature';

export const mockRoutes: MockRoute[] = [
  { pattern: '/new-feature/list', data: mockNewFeatureData.list },
];
```

3. Mock 数据格式必须匹配后端 API 的预期响应格式（参考 service.ts 中的 converter）

### 当前 mockRoutes 为空

所有现有接口走真实 API，无需 mock。

## 真实 API 配置

- `DG_API`: `https://dev-backend.degate.com` — 主 API
- `HUB_API`: `https://api-hub.dev.degate.tech` — Hub API (xstocks/ondo)
- `WS_API`: `wss://dev-ws.degate.com/ws` — WebSocket
- `accessToken`: 在 `public/index.html` 的 `window._ued_config.accessToken` 中配置

### Wallet 配置文件 (`src/wallet/config.ts`)

账户信息统一在 `src/wallet/config.ts` 的 `walletSnapshot` 中管理。

**更新方式：从 dg-wallet 控制台复制粘贴**
1. 打开 dg-wallet 项目浏览器，打开 DevTools Console
2. 找到 `console.log('walletSnapshot', walletSnapshot)` 输出
3. 右键点击对象 → "Copy object"
4. 替换 `src/wallet/config.ts` 中 `walletSnapshot` 的值
5. 保存即可，UED 项目会使用新的钱包身份

`walletSnapshot` 包含：
- `accessToken` — `{ token, da_owner }` 认证信息
- `account` — 钱包地址
- `DAs` — 各链的 DA 地址
- `solverAddresses` — solver 地址
- `providerInfo` — 钱包显示信息
- `allowQuickTrading` / `hasUnlocked` — 行为配置
- `locale` / `isMobile` / `isApp` — 环境配置（被 UED 设置面板覆盖）

## 重要规则

- **禁止在组件/service 中硬编码 mock 数据**，统一使用 mock 系统
- mock 只针对单个新接口，不要全量 mock
- 新功能的 mock 数据在 trade-fe 实现真实接口后必须移除
