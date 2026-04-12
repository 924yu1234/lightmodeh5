# UI Components

这个目录用于沉淀“基于 Mantine + 项目主题”的通用 UI 组件，作为后续统一切换白天样式的基础层。

当前已预创建：

- `Button/*`
  - `PrimaryBtn`
  - `GhostBtn`
  - `BuyBtn`
  - `SellBtn`
  - `OrderBtn`（`side: buy | sell`）
  - `MiniBtn`（`small` 尺寸）
  - `BaseButton`（底层统一样式）
  - `UIButton`（兼容入口，默认导出）
  - 内置 GA 点击上报（兼容 `eventName/eventData`，默认事件名 `web_button_click`）

- `UISegmentedTabs`
  - 基于 `@mantine/core` 的 `SegmentedControl`
  - 统一胶囊样式，支持 `uiSize: default | small`

- `Tabs/*`
  - `PillTabs`
  - `UnderlineTabs`

- `Input/*`
  - `UITextInput`

- `Checkbox/*`
  - `UICheckbox`（兼容 `DeCheckbox` 现有用法）

- `Provider/*`
  - `UIMantineProvider`（Mantine 主题与全局样式入口）
  - `MantineStyles/*`（原 `src/components/Mantine/style` 已迁入）

- `UISectionCard`
  - 通用内容卡片容器（背景、圆角、padding）

- `UISectionTitle`
  - 通用标题行（左标题 + 右操作区）

- 统一导出：
  - `src/UI/index.ts`

---

## 扫描结果（src/apps + src/mobiles）

根据当前扫描，最适合优先统一的重复模式：

1. Button
   - 大量 `.dg-primary` / `.dg-ghost` / `.dg-buy` / `.dg-sell`
   - 主要分布：`Earn`、`Gift`、`CopyTrade`、`TurboRange`、`Referral`

2. Segmented Tabs
   - 多处 `SegmentedControl` 重复样式（`CopyTrade`、`Raffle` 等）
   - 可优先统一为 `UISegmentedTabs` 或 `PillTabs`

3. Tabs
   - 多处 `Tabs.List / Tabs.Tab / Tabs.Panel` 样式分散
   - 可优先用 `UnderlineTabs` 收敛

4. 卡片/标题/信息行
   - 多处 `background + radius + padding` 和 `item-title` 重复
   - `UISectionCard / UISectionTitle` 可先用于新功能，老页面逐步迁移

---

## 本次范围说明

- 已将 `Mantine Provider + Checkbox` 主入口迁移到 `src/UI`。
- `src/components/Mantine` 仅保留兼容层（薄转发文件），后续可安全删除。
- 页面样式与行为保持不变。
