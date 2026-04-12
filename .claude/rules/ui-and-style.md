# UI 组件与样式规范

## UI 引用边界

- 业务代码**只从 `src/UI` barrel 导入**，禁止 `import { xxx } from '@mantine/core'`
- `@mantine/*` 仅允许在 `src/UI/**` 内部封装时使用
- 新样式优先落到 `src/UI/*`，不往 `src/UI/MantineStyles/*` 加业务样式
- 缺少的 Mantine 基础控件（如 `Switch`）先在 `src/UI` 建统一包装组件，再给业务侧复用；不要在业务组件里手写临时替代控件

## Button 组件

优先使用具名按钮，禁止 `className=dg-xxx` 做样式：

| 组件 | 用途 |
|------|------|
| `PrimaryBtn` | 主操作按钮 |
| `GhostBtn` | 次要操作 |
| `BuyBtn` / `SellBtn` | 买卖按钮 |
| `MiniBtn` | 小按钮 |
| `OrderBtn` | 订单按钮 |

所有按钮带 `eventName`：`<PrimaryBtn eventName="btn_turbo_range_invest">`

## Tab 组件

统一用 `PillTabs`（胶囊 Tab）：

```tsx
<PillTabs value={mode} onChange={(v) => setMode(v)}>
  <Tabs.List>
    <Tabs.Tab value="single">{intl.turboRange.investModeSingle}</Tabs.Tab>
    <Tabs.Tab value="dual">{intl.turboRange.investModeDual}</Tabs.Tab>
  </Tabs.List>
</PillTabs>
```

## Modal 规范

### BottomModal（推荐用于业务弹窗）

PC 居中弹窗 + Mobile 底部抽屉：

```tsx
import Close from 'src/components/Icons/close';
import BottomModal from 'src/components/Modals/bottomModal';

// 1. 注册 key：src/state/application/modalKeys.ts
// 2. 注册组件：src/components/TurboRange/modals/index.tsx
// 3. 打开：showModal({ modal: ModalKeys.xxx, ...params })
// 4. 读取：const { visible, hide, ...params } = useModals(ModalKeys.xxx) as any;

<StyledBottomModal opened={visible} onClose={hide} noHeader={isMobile}>
  <div className="modal-wrapper">
    {!isMobile && (
      <div className="modal-title">
        <Close onClick={hide} />
      </div>
    )}
    <div className="modal-content">{/* 内容 */}</div>
  </div>
</StyledBottomModal>
```

### 宽弹窗（含 K 线等）

```tsx
import { Modal } from 'src/UI';
const StyledWideModal = styled(Modal)<{ isMobile: boolean }>`
  &.mantine-Modal-root {
    .mantine-Modal-content {
      max-width: ${({ isMobile }) => isMobile ? '100%' : '960px'} !important;
    }
  }
`;
```

### Modal 注意事项

- 禁止直接 `import { Modal } from '@mantine/core'`
- Mobile 端 BottomModal 设 `noHeader={isMobile}`（自动底部抽屉 + 拖拽手柄）
- 移动端“管理 / 筛选 / 更多操作”这类操作菜单，优先使用 `BottomModal` 实现，不再用 `Menu + Drawer` 的二段式拼装
- 移动端多级操作流（如 管理菜单 -> 网络筛选）优先拆成多个职责单一的 `BottomModal`，不要在一个 modal 里堆多层 view 状态
- PC 端关闭按钮用 `<Close onClick={hide} />`，放在 `.modal-title` 内
- 可复用 modal 必须接入 `src/containers/modals.js` + `useShowModal` + `ModalKeys`
- 复制交互用 `react-copy-to-clipboard`，不写 `navigator.clipboard`
- 多视图弹窗里，父层只负责 modal shell：标题、关闭按钮、共享尺寸、定位容器、层级
- `listView / addView / confirmView` 这类子视图只负责自己的内容布局和样式；不要把子视图 spacing 拆到父层再用 inline style 临时覆盖
- 长按快捷操作这类临时浮层（遮罩 + 快捷按钮 + 浮起卡片）要拆成独立组件，列表/页面主文件只负责状态、portal 挂载和业务编排

## styled-components 规范

```tsx
const StyledComponent = styled.div`
  /* 字体 */
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  /* 颜色 — 必须用主题变量 */
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};          /* 主文字 */
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};      /* 次要 */
  color: ${({ theme }: { theme: ThemeType }) => theme.red};            /* 错误 */
  color: ${({ theme }: { theme: ThemeType }) => theme.green};          /* 成功 */
  background: ${({ theme }) => theme.bg_white_05};
  border: 1px solid ${({ theme }) => theme.border_b7b_20};
`;
```

- 禁止硬编码颜色（`#ffffff` → `theme.t_fff`）
- 禁止内联样式
- styled 组件放文件底部
- 类型标注：`${({ theme }: { theme: ThemeType }) => theme.xxx}`

## 响应式

```tsx
const { isMobile } = useThemeParams();
if (!isMobile) return null;
<div className={isMobile ? 'mobile-view' : 'pc-view'}>
```

## TypeScript 规范（UI 目录）

- `src/UI/**` 禁止隐式 `any`
- styled-components 插值参数必须显式类型
- 主题类型统一 `ThemeType`
- 通用组件优先 `React.forwardRef` 并显式声明类型

## 设计稿取值规则

- 本地设计包 (`~/Downloads/DEG-xxxxx/index.html`) 可用时，必须从 index.html 结构化数据提取参数
- 禁止只根据截图目测
- 先落地关键参数：尺寸/位置、字体/字重、颜色、间距、圆角、边框
- 预览图仅用于最终验收

## Share Poster / DOM-to-Image

- 海报渲染在同一 React 树内（不单独 mount），复用 Redux/Intl/Theme
- 使用 `html-to-image`，`width`/`height` 与设计稿一致
- 图片资源必须同源或 `data:` URL
- 使用 `src/hooks/useShare.tsx` 作为默认分享管线

## 双项目 UI 一致性

- `src/UI/` 改动需同步到 `dg-wallet/src/UI/`
- 无法同步时在 commit message 中注明差异原因
