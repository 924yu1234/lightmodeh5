# 代码风格规范

## 导入顺序（严格）

```tsx
// 1. React
import React, { useCallback, useMemo, useState } from 'react';
// 2. 第三方库（字母序）
import { useDebounce } from 'ahooks';
import styled from 'styled-components';
// 3. src/ 内部导入（字母序）
import { PrimaryBtn } from 'src/UI';
import { useIntl } from 'src/locals';
// 4. 相对路径
import { useInvest } from './dataProvider';
```

## 组件文件结构

```tsx
// 导入 → 类型 → 组件函数 → styled（底部）
export default function ComponentName() {
  // hooks → state → memo → callback → effect → return JSX
}
const StyledXxx = styled.div`...`;
```

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `InvestProvider` |
| 文件 | camelCase | `dataProvider.tsx` |
| 函数/变量 | camelCase | `doTry` |
| Hook | use 前缀 | `useInvest` |
| 常量 | UPPER_SNAKE | `MAX_AMOUNT` |
| styled | Styled 前缀 | `StyledAmount` |
| 私有函数 | _camelCase | `_setMinPrice` |

## 组件大小

- 单个组件 ≤ 150 行（styled 不计入），超过必须拆到 views/
- dataProvider 可 300-400 行
- 不要在主组件内长期保留多个 `renderXxxView` / `renderXxxSection` 大函数；优先提到独立文件
- 弹窗、页面、复杂卡片的列表视图 / 添加视图 / 空状态视图尽量拆开，便于阅读、复盘和排查问题
- 单个组件的私有样式优先写在组件文件内，和组件一起维护；只有多个组件复用的样式才放到共享 `style.tsx`
- 已拆出的 `listView` / `addView` / `tokenRow` 这类子组件，不要继续把它们的私有 class 样式堆回父级共享样式文件

## TypeScript

- 所有 props 必须类型定义，优先 `interface` 而非 `type`
- 禁止 `any`，用 `unknown` 或具体类型
- 接口定义集中在 `src/constants/interface/index.ts`
- Context 类型定义完整，hooks 有明确返回类型

## 性能要求（必须）

- Provider value 用 `useMemo`
- 传子组件的回调用 `useCallback`
- 计算属性用 `useMemo`
- 频繁输入用 `useDebounce`（ahooks，300-500ms）
- useEffect 中 timer 必须 cleanup 清除
- API 调用必须 `.catch()` 错误处理

## GA 埋点

- 按钮：`<PrimaryBtn eventName="btn_xxx">`
- 代码：`const gaEvent = useGaEvent(); gaEvent('event_name', { ... })`
- 日志：`import { logTurboRange } from 'src/utils/log/swap'`

## 常用工具函数

```tsx
import digit, { isNumber } from 'src/utils/digit';
import { isLessThan, multiply, divide, plus, minus } from 'src/utils/numberUtils';
import { enterNumberCheck } from 'src/utils/numberUtils';
import { formatUnits } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import message from 'src/utils/message';
```

## 质量检查

```bash
npm run lint:eslint      # ESLint 检查+修复
npm run prettier:fix     # 格式化
npm run typecheck        # TypeScript 类型检查
```

提交前必须 0 ESLint 错误、0 TypeScript 错误。

- 组件改方案时，旧的类型、hook、state、memo、props 要一并清掉；不要留下 `unused` warning
- 至少对本次改动文件跑一遍定向 `eslint`，新增 warning 也要在提交前处理掉

## 禁止事项

| 规则 | 替代方案 |
|------|----------|
| ❌ class 组件 | 函数组件 |
| ❌ `any` 类型 | `unknown` 或具体类型 |
| ❌ 直接修改 state | `setState` / `dispatch` |
| ❌ JSX 内定义函数 | 提取到 `useCallback` |
| ❌ index 作 key | 唯一 ID |
| ❌ 硬编码颜色 | `theme.xxx` 变量 |
| ❌ 内联样式 | styled-components |
| ❌ `import { xxx } from '@mantine/core'` | 从 `src/UI` 导入 |
| ❌ `intl.xxx \|\| 'text'` | 直接 `intl.xxx` |
| ❌ `lodash.isNumber` | `src/utils/digit` 的 `isNumber` |
| ❌ `className=dg-xxx` 做样式 | styled-components |
| ❌ 新建配置文件 | 除非明确需要 |
