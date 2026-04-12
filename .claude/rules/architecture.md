# 架构与组件模式

## 双仓库架构

| 仓库 | 职责 | 接口定义 |
|------|------|----------|
| **dg-trade-fe** (本仓库) | UI + 业务逻辑 | `src/constants/interface/index.ts`（源头） |
| **dg-wallet** | 签名 + 确认弹窗 | `src/constants/interface.ts`（需同步） |

开发顺序：先 trade-fe → 再 wallet → 确保接口一致。

## 技术栈

React 18 + TypeScript + styled-components + Mantine(封装在 src/UI/) + Redux + Context/Provider + craco + intl(13种语言)

路径别名：`src/*` → `src/*`，`js/*` → `src/*`，`imgs/*` → `src/imgs/*`

## 核心目录

```
src/
├── UI/               # UI 组件层（封装 Mantine）
├── apps/             # 路由级页面模块
├── components/       # 业务组件（三层架构）
├── state/            # Redux 状态管理（reducer + hooks + service + updater）
├── constants/        # 常量和接口定义
├── hooks/            # 通用 hooks
├── locals/           # 国际化文件（13种语言）
├── providers/        # 全局 Provider
├── ethers/           # Web3 工具
├── containers/       # 路由容器 + 全局 modal 注册
├── mobiles/          # 移动端页面
└── utils/            # 工具函数
```

## 三层组件架构（核心模式）

```
功能模块/
├── index.tsx           # 入口：组装 Provider + 子组件，不写业务逻辑
├── dataProvider.tsx    # 数据层：Context + 状态 + 校验 + API 调用（300-400行可接受）
└── views/              # 视图层：从 Provider hook 取数据，只负责渲染
    ├── amount.tsx
    ├── btn.tsx
    └── ...
```

## UI 视图拆分规则

- UI 主文件优先只做状态编排、数据流组合、事件分发，不要在一个文件里堆多个大段 `renderXxxView`。
- 当页面/弹窗内出现 2 个及以上独立视图片区块时，优先拆成独立视图文件，例如 `listView.tsx`、`addView.tsx`、`emptyView.tsx`。
- 行项、卡片、表单区块、头部区块等可复用或可单独排查的部分，优先拆成独立组件。
- 主入口文件应尽量保持 orchestrator 角色，方便查看、复盘、定位 bug。
- 视图拆分后，业务状态和副作用仍放在入口 / provider，子视图只接收 props 并负责渲染。

### Provider 写法

```tsx
// 1. 定义 Context 接口
export interface XxxContext { ... }
// 2. 创建 Context
const SetContext = React.createContext<XxxContext>({} as XxxContext);
// 3. Provider 组件（value 必须 useMemo）
export default function XxxProvider({ children }: { children: React.ReactElement }) {
  const value = useMemo(() => ({ ... }), [deps]);
  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}
// 4. 导出 hook
export function useXxx() { return useContext(SetContext); }
```

多层 Provider 外层包内层：`<ApyProvider><InvestProvider><Inner/></InvestProvider></ApyProvider>`

### 视图组件

```tsx
export default function Amount() {
  const intl = useIntl();
  const { product } = useApyContext();      // 外层 Provider
  const { amount, setAmount } = useInvest(); // 内层 Provider
  return <StyledAmount>...</StyledAmount>;
}
const StyledAmount = styled.div`...`;
```

## 状态管理

- **Redux（全局）**：`src/state/模块/` 下 `reducer.tsx` + `hooks.tsx` + `service.ts` + `updater.tsx`
- **Context/Provider（模块局部）**：见三层架构
- **模态框**：`useShowModal` + `ModalKeys` 打开，key 注册在 `src/state/application/modalKeys.ts`
- 可复用 modal 必须接入 `src/containers/modals.js`，不要用页面局部 state 管理

## API 调用模式

- 无需鉴权：`export function getXxx() { return axios(...) }`
- 需要鉴权：`export function useGetXxx() { const createHeaders = useCreateHeaders(); return useCallback(...) }`
- Intent 流程：`用户输入 → debounce → tryKey → postIntentTry → 确认 → createOrder → wallet签名 → postIntentCreate → sign → postIntentSign`

## API 字段映射规则

- 不允许为了兼容“可能的后端返回”在 Hook / utils / 组件里猜多个字段名。
- 同一业务语义只允许一个标准字段 key。
- 如果后端字段已经固定，前端直接统一使用该字段 key，不要再包一层语义相同的内部别名。
- 如果后端字段还未最终确认，先在 service / mapping 层定义一个明确的后端字段常量。
- service 层只负责做必要的结构整理；不要在字段名已经固定时再额外映射出第二个同义字段。
- 后续 API 字段变更时，只改字段常量和 service 映射，不要在业务层追加 fallback 判断。

## 新功能开发模板

```
src/components/NewFeature/
├── index.tsx               # Provider + 子组件组装
├── dataProvider.tsx        # 数据层
├── views/                  # UI 子组件
└── modals/                 # 确认弹窗

src/apps/newFeature/
├── dashboard/
│   ├── index.tsx           # 页面入口
│   └── views/              # 页面子视图
└── detail/

src/state/newFeature/
├── reducer.tsx / hooks.tsx / service.ts / updater.tsx / utils.ts
```
