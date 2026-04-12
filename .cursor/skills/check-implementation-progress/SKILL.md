---
name: check-implementation-progress
description: 检查当前功能的实现完成度，对比需求文档和UI设计，生成详细的完成度报告和改进建议。用于验收和自查。
---

# 检查实现完成度

本技能自动检查当前功能的实现情况，生成详细的完成度报告。

## 使用场景

- 功能开发完成，准备提交前的自查
- 代码Review前的预检查
- 阶段性验收
- 排查遗漏的功能点
- **跨仓库验收**（trade-fe + wallet 双仓库项目）
- 国际化文案完整性检查

## 自动化检查流程

### 1. 识别需求信息

自动执行：

```bash
# 获取当前分支
git branch --show-current

# 提取JIRA编号
# 格式：feature/DEG-xxxxx

# 查找UI设计文件
find ~/Downloads -name "DEG-xxxxx*"
```

### 2. 获取需求文档

**Notion数据库**：https://www.notion.so/2298dab9fad580cc9205d5908f40742e

**查找策略（多层次）**：

1. **首次尝试：搜索完整JIRA编号**
   ```javascript
   user-notionApi-API-post-search({
     "query": "DEG-xxxxx",
     "filter": { "property": "object", "value": "page" }
   })
   ```

2. **如果搜索失败：立即暂停并请求用户提供**
   - ⚠️ **立即暂停执行，不要继续后续步骤**
   - 告诉用户：
     ```
     ❌ 未找到 DEG-xxxxx 的需求文档
     
     请提供以下文档链接以便生成完成度报告：
     1. 需求文档链接（必需）
     2. 技术文档/API文档链接（如有）
     ```
   - 等待用户提供链接后再继续

3. **用户提供链接后，获取完整需求内容**：
   ```javascript
   user-notionApi-API-post-search({
     "query": "15535",  // 只用数字部分
     "filter": { "property": "object", "value": "page" }
   })
   ```

3. **如果仍失败：请求用户提供链接**
   - 告知用户搜索结果为空
   - 请求Notion文档直接链接

4. **正确的API调用顺序**：
   ```
   post-search → retrieve-a-page → get-block-children
   如果有 child_database:
     → retrieve-a-database → query-data-source
   ```

5. **提取需求清单**：
   - ✅ 验收标准（Acceptance Criteria）
   - 📋 功能点列表
   - 🎨 UI/UX 要求
   - 🔄 交互流程
   - 📊 数据结构
   - ⚠️ 边界条件和约束

### 3. 分析Git改动（双仓库）

**trade-fe 仓库**：
```bash
# 查看改动的文件（基于 testnet 分支对比）
git diff --name-only HEAD $(git merge-base HEAD origin/testnet)

# 查看详细改动
git diff HEAD $(git merge-base HEAD origin/testnet)

# 查看提交历史
git log --oneline HEAD ^origin/testnet
```

**wallet 仓库**（如果本次任务涉及）：
```bash
cd /Users/chenguangliang/dg/dg-wallet
git diff --name-only HEAD $(git merge-base HEAD origin/testnet)
```

**分析内容**：
- 新建的文件
- 修改的文件
- 删除的文件
- 代码行数变化
- 提交记录
- **跨仓库接口一致性**（trade-fe 和 wallet 的 interface 定义是否一致）

### 4. UI设计对比

**查找UI设计文件**：

1. **查找路径**：`~/Downloads/DEG-xxxxx/preview/`
2. **读取关键设计稿**：
   - 使用 Read 工具读取 PNG 图片
   - 重点查看中文版（xxx-cn1.png, xxx-cn2.png）
   - 对比不同状态的设计（默认、填写中、错误等）

**详细检查项**：

#### 布局结构
- [ ] 所有页面/组件已实现
- [ ] 组件顺序正确（如：TSLAx在上，USDC在下）
- [ ] 间距符合设计（上下边距、左右边距）
- [ ] 对齐方式正确

#### 视觉样式
- [ ] **输入框**：高度、背景色、圆角、边框
- [ ] **按钮**：样式、圆角、激活状态
- [ ] **Tab切换**：样式类型（圆角胶囊/方形）、激活效果
- [ ] **Token图标**：位置（左侧/右侧）、大小
- [ ] **颜色**：主题色、文字色、错误色使用正确

#### 交互状态
- [ ] 默认状态
- [ ] Hover状态
- [ ] Active/选中状态
- [ ] Disabled/禁用状态
- [ ] Loading状态
- [ ] Error/错误状态

#### 数据展示
- [ ] 数值格式正确（小数位、千分位）
- [ ] 单位显示正确
- [ ] 余额显示位置和格式
- [ ] 错误提示文案和位置

#### 国际化
- [ ] 所有文本已提取
- [ ] 中英文对照检查
- [ ] Fallback文本提供

### 5. 代码质量全面检查

#### A. ESLint 和格式检查（优先级最高）

**⚠️ 必须通过的检查**：

1. **运行自动格式化**：
   ```bash
   npx prettier --write "改动的文件/**/*.{ts,tsx}"
   ```

2. **运行ESLint自动修复**：
   ```bash
   npx eslint --fix "改动的文件/**/*.{ts,tsx}"
   ```

3. **检查剩余错误**：
   ```bash
   ReadLints(["改动的目录"])
   ```

4. **TypeScript类型检查**：
   - 无类型错误
   - 无 `any` 滥用
   - 接口定义完整

**常见ESLint错误**：
- ❌ 导入未使用 → 删除
- ❌ Button缺少type → 添加 `type="button"`
- ❌ 依赖数组不完整 → 补充依赖
- ❌ 导入顺序错误 → 自动修复
- ❌ 格式不一致 → prettier修复

#### B. 代码风格检查

**与现有代码保持一致**：
- [ ] 参考类似功能的现有实现
- [ ] 导入顺序：React → 第三方 → 项目内部 → 相对路径
- [ ] 命名规范：组件用PascalCase，函数/变量用camelCase
- [ ] 文件组织：Provider在上层，views在子目录
- [ ] 样式组件在文件底部

#### C. 组件拆分检查

- [ ] 单个组件不超过150行
- [ ] 复杂视图已拆分（如 single/dual 模块分离）
- [ ] 共用逻辑提取到上层（如 apyProvider）
- [ ] 每个组件职责单一明确
- [ ] 使用Provider管理复杂状态

#### D. TypeScript规范检查

- [ ] 所有接口定义在 `constants/interface/index.ts`
- [ ] Props有明确类型（内联或interface）
- [ ] Hooks有返回类型标注
- [ ] 避免使用 `any`（除非确实需要）
- [ ] Context类型定义完整

#### E. 样式规范检查

- [ ] 使用 styled-components
- [ ] 使用主题变量（`theme.t_fff`, `theme.blue`等）
- [ ] 按照设计稿的精确数值（高度、圆角、间距）
- [ ] 响应式适配（isMobile判断）
- [ ] 无内联样式（除非动态计算）

#### F. 功能完整性检查

- [ ] 所有需求点已实现
- [ ] UI严格符合设计稿
- [ ] 交互逻辑完整（表单验证、状态切换）
- [ ] 错误状态处理（余额不足、输入错误等）
- [ ] Loading状态处理
- [ ] 边界情况考虑（最小值、最大值）

#### G. API和数据层检查

- [ ] Hooks已创建（TryData + Order）
- [ ] API调用有错误处理
- [ ] 接口参数完整
- [ ] tryKey生成正确（包含所有关键参数）
- [ ] 日志记录完整（成功、失败、pending）

#### H. 性能优化检查

- [ ] Provider的value使用useMemo
- [ ] 传递给子组件的函数使用useCallback
- [ ] 计算值使用useMemo缓存
- [ ] 避免不必要的re-render
- [ ] useDebounce用于频繁变化的输入

#### I. 国际化检查

- [ ] 所有用户可见文本使用 `intl.xxx`
- [ ] 提供英文fallback
- [ ] 错误提示文案完整
- [ ] 按钮文案、标题、提示都已国际化

- [ ] API调用有try-catch或.catch
- [ ] 用户输入有验证（金额、地址等）
- [ ] 边界值有检查（最小/最大投入等）
- [ ] 异常情况有用户友好的提示
- [ ] 网络错误有重试机制（如需要）

### 6. 后端API对比检查（如有文档）

如果需求文档中有后端API文档或技术文档：

**检查项**：
- [ ] API端点调用正确
- [ ] 请求参数结构符合文档
- [ ] 响应数据解析正确
- [ ] 错误码处理完整
- [ ] 字段映射正确（前端字段 ↔ 后端字段）

**常见问题**：
- API文档中的字段名与实际代码不一致
- 缺少某些必填参数
- 响应数据结构理解错误
- 错误码未全部处理

### 7. 跨仓库一致性检查（关键！）

**接口定义一致性**：
```bash
# 对比 trade-fe 和 wallet 的接口定义
# trade-fe
grep -A 20 "export interface TurboRangeOrderParams" src/constants/interface/index.ts

# wallet
grep -A 20 "export interface TurboRangeOrderParams" ../dg-wallet/src/constants/interface.ts

# 确保两边完全一致
```

**检查清单**：
- [ ] `TurboRangeOrderParams.type` 字段两边一致
- [ ] 新增的Params接口两边都存在
- [ ] 字段类型完全相同
- [ ] 可选/必填标记一致

**确认弹窗一致性**：
- [ ] trade-fe的 `app/confirmModal/` 与 wallet的 `modals/TurboRange/` 显示内容一致
- [ ] 双币模式都显示两行金额
- [ ] 金额格式、Token符号显示一致

### 8. 生成完成度报告

生成详细的Markdown报告，包含：

```markdown
# 🎯 功能实现完成度报告

## 📋 需求信息
- JIRA编号：DEG-xxxxx
- 需求标题：xxx
- 分支：feature/DEG-xxxxx

## ✅ 已完成功能 (x/y)

### 核心功能
- [x] 功能A - 完成 ✅
  - 文件：src/xxx/xxx.tsx
  - 说明：已实现并通过测试
- [x] 功能B - 完成 ✅
- [ ] 功能C - 未完成 ⚠️

### UI实现
- [x] 页面A - 完成 ✅
  - 设计稿：deg-15535-xxx-1.png
  - 实现文件：src/components/xxx/
  - 符合度：95%
- [x] 页面B - 完成 ✅

### API和数据层
- [x] 接口定义 - 完成 ✅
- [x] TryData Hooks - 完成 ✅
- [x] Order Hooks - 完成 ✅

## 🔍 代码质量评估

### ESLint检查
- 状态：✅ 通过 / ❌ 有错误
- 错误数：0
- 警告数：0

### 样式符合度
- Tab切换：✅ 符合设计稿
- 输入框样式：✅ 高度56px，圆角8px
- Token图标：✅ 位置正确
- 间距和布局：✅ 符合设计

### 代码规范
- 导入顺序：✅
- TypeScript类型：✅
- 组件拆分：✅
- 性能优化：✅

## 📊 完成度统计

- 整体完成度：85%
- 核心功能：100%
- UI实现：90%
- 代码质量：95%

## 💡 优化建议

### 必须修复（Priority: High）
1. xxx - 原因：xxx
2. xxx - 原因：xxx

### 建议改进（Priority: Medium）
1. xxx
2. xxx

### 可选优化（Priority: Low）
1. xxx

## 🚀 下一步行动

1. [ ] 修复必须项
2. [ ] 完成剩余功能
3. [ ] 添加国际化文本
4. [ ] 自测所有场景
5. [ ] 准备提交PR
```

### 7. **⚠️ 向用户展示报告并确认**

展示报告后，询问用户：

1. **完成度是否满意？**
2. **发现的问题是否准确？**
3. **优化建议是否合理？**
4. **是否需要立即修复问题？**

根据用户反馈决定下一步行动。

### 10. 国际化文案完整性检查（关键！）

**步骤1：检查需求文档**
- 打开Notion需求文档
- 滚动到底部找到"国际化"或"i18n"模块
- 提取所有中英文对照文案

**步骤2：检查trade-fe文案覆盖**
```bash
# 查看locals文件
cat src/locals/en.ts | grep -A 50 "turboRange"
cat src/locals/zh.ts | grep -A 50 "turboRange"

# 对比需求文档，确保所有文案都已添加
```

**步骤3：检查代码中的文案使用**
```bash
# 查找所有intl使用
grep -r "intl\." src/components/xxx/

# 查找fallback模式（应该为空）
grep -r "intl\.[^}]*||" src/components/xxx/
grep -r "intl\.\?[^}]*||" src/components/xxx/
```

**步骤4：检查wallet文案（如涉及）**
```bash
cd /Users/chenguangliang/dg/dg-wallet

# 确认只添加了使用到的文案
grep -r "intl\." src/modals/TurboRange/

# 确认无fallback
grep -r "intl\.[^}]*||" src/modals/TurboRange/
```

**在报告中列出**：
- ✅ 已添加的文案清单
- ❌ 缺失的文案（对比需求文档）
- ⚠️ 使用fallback的位置（需修复）

## 关键注意事项

### 对比标准

#### 功能完整性
- **需求文档**：逐项对照验收标准（AC）
- **业务逻辑**：所有场景和分支都已覆盖
- **边界条件**：最大值、最小值、空值处理
- **错误处理**：网络错误、余额不足、参数错误等

#### UI一致性（像素级检查）
- **严格对照设计稿**：
  - 输入框高度（如56px）
  - 圆角大小（如8px）
  - 间距（如margin-top: 10px）
  - 颜色（使用主题变量）
- **交互细节**：
  - Tab切换的样式和动画
  - 按钮的激活状态
  - 输入框的focus状态
- **Token图标**：
  - 位置（左侧/右侧）
  - 大小（如20px/24px）
  - 是否隐藏链图标

#### 代码规范
- **参考现有代码**：查看类似功能的实现方式
- **遵循项目规范**：`.cursor/rules/RULE.md` + `.cursor/rules/CODING_GUIDE.md`
- **风格一致性**：与项目其他代码保持一致
- **架构模式**：三层架构（index + dataProvider + views/），详见 CODING_GUIDE.md
- **组件设计**：Provider层级、数据流清晰

#### 质量标准
- **✅ 必须通过**：
  - 0 ESLint错误
  - 0 TypeScript错误
  - 代码格式符合Prettier
- **🎯 建议达到**：
  - 性能优化合理
  - 组件拆分清晰
  - 注释适当

### 报告详细度要求

**提供具体信息**：
- ✅ 具体文件名和路径
- ✅ 问题所在的行号（如果适用）
- ✅ 明确的修复建议
- ✅ 相关设计稿引用

**优先级分类**：
- 🔴 **必须修复**：ESLint错误、功能缺失、严重bug
- 🟡 **建议改进**：样式细节、性能优化、代码重构
- 🟢 **可选优化**：更好的实现方式、额外功能

### 错误处理策略

#### Notion相关
- ❌ API搜索失败 → 尝试其他搜索词 → 请求用户链接
- ❌ 页面类型错误 → 判断page/database → 使用正确API
- ❌ 权限不足 → 提示用户检查Notion集成配置

#### UI设计相关
- ❌ 设计文件未找到 → 询问用户路径
- ❌ 设计稿不清晰 → 询问用户具体要求
- ⚠️ 跳过UI对比 → 在报告中标注

#### Git相关
- ❌ 改动为空 → 检查是否在正确分支
- ❌ 分支名格式错误 → 请用户手动提供JIRA编号
- ❌ 未提交的改动 → 提示用户先提交

### 实用技巧

#### 快速定位问题
```bash
# 查找特定组件的实现
Glob("**/ComponentName.tsx")

# 搜索特定功能的代码
Grep("functionName", path="src/")

# 查看最近的改动
git diff --name-only
```

#### 对比设计稿
1. 在 `~/Downloads/DEG-xxxxx/preview/` 读取设计稿
2. 逐个对照UI细节
3. 记录不符合的地方
4. 提供具体的修改建议

## 示例调用

在Cursor中：
```
@check-implementation-progress 请检查当前实现完成度
```

## 🔍 Code Review 检查

在生成完成度报告后，对改动的核心代码进行详细的 Code Review。

### Code Review 流程

1. **读取改动文件**：逐个读取本次改动的核心组件文件
2. **逐项检查**：按照下面的检查清单逐项分析
3. **生成报告**：输出详细的 Code Review 报告，包含问题和建议

### Code Review 检查清单

#### A. 代码规范检查（详见 `.cursor/rules/CODING_GUIDE.md`）

**导入顺序**：
```typescript
// 1. React imports
import React, { useMemo, useCallback } from 'react';
// 2. 第三方库（字母顺序）
import dayjs from 'dayjs';
import styled from 'styled-components';
// 3. src/ 内部导入（字母顺序）
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
// 4. 相对路径导入
import ProductName from '../../productName';
import PriceRangeSlider from './priceRangeSlider';
```

**检查项**：
- [ ] 导入顺序是否正确
- [ ] 是否有未使用的导入
- [ ] 同层文件是否使用相对路径

#### B. TypeScript 类型检查

- [ ] Props 接口是否完整定义
- [ ] 是否有 `any` 类型滥用
- [ ] 可选属性标记是否正确（`?`）
- [ ] 泛型使用是否正确

#### C. 性能优化检查

**useMemo 使用场景**：
- [ ] 复杂计算是否使用 `useMemo`
- [ ] 依赖数组是否完整

**useCallback 使用场景**：
- [ ] 传递给子组件的函数是否使用 `useCallback`
- [ ] 事件处理函数是否需要缓存

**常见问题示例**：
```typescript
// ❌ 不好：每次渲染都重新计算
let leftPercent = 0;
if (currentPrice > maxPrice) {
  leftPercent = 1;
} else {
  leftPercent = (currentPrice - minPrice) / (maxPrice - minPrice);
}

// ✅ 好：使用 useMemo 缓存
const leftPercent = useMemo(() => {
  if (currentPrice > maxPrice) return 100;
  if (currentPrice < minPrice) return 0;
  return ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;
}, [currentPrice, minPrice, maxPrice]);
```

#### D. 健壮性检查

- [ ] 除零保护：分母是否可能为 0
- [ ] 空值保护：对象属性访问是否安全
- [ ] 边界条件：最大值、最小值、空数组等

**常见问题示例**：
```typescript
// ❌ 除零风险
const percent = (current - min) / (max - min);

// ✅ 添加保护
const range = max - min;
const percent = range > 0 ? (current - min) / range : 0.5;
```

#### E. 样式规范检查

**styled-components**：
- [ ] 样式组件是否放在文件底部
- [ ] 是否使用主题变量（`theme.t_xxx`）
- [ ] 是否有硬编码颜色值（海报等特殊场景可接受）
- [ ] 是否有未使用的样式类

**常见问题**：
```css
/* ❌ 未使用的样式 */
.share-token-icon { ... }  /* JSX 中没有使用 */

/* ❌ 冗余写法 */
padding: 20px 20px 20px;  /* 应简化为 padding: 20px */

/* ❌ 硬编码颜色（非特殊场景） */
color: #ffffff;  /* 应使用 theme.t_fff */
```

#### F. 组件设计检查

**纯展示组件原则**：
- [ ] 海报/分享组件是否为纯展示组件
- [ ] 是否通过 props 传入所有数据（而非内部使用 Hook 获取）
- [ ] forwardRef 是否正确使用

**常见问题示例**：
```typescript
// ❌ 不好：内部使用 Hook，可能导致截图时数据不一致
function SharePoster({ position }) {
  const { currentPrice } = useTurboRangeProduct(position.poolAddress);
  // ...
}

// ✅ 好：通过 props 传入，保持纯展示
function SharePoster({ position, currentPrice }) {
  // ...
}
```

#### G. 国际化检查

- [ ] 所有用户可见文本是否使用 `intl.xxx`
- [ ] 是否有 fallback 模式（`intl.xxx || 'text'`）应避免
- [ ] 动态替换是否正确（`.replace('{TSLA}', symbol)`）

### Code Review 报告模板

```markdown
# 🔍 Code Review 报告

## 📁 文件: `xxx.tsx`

### ✅ 优点
1. xxx
2. xxx

### ⚠️ 需要改进

#### 1. 🔴 **问题标题** (Priority: High/Medium/Low)

代码位置和问题描述...

**建议修复**：
代码示例...

### 📊 总结

| 类别 | 评分 | 说明 |
|------|------|------|
| 代码规范 | ⭐⭐⭐⭐ | xxx |
| TypeScript | ⭐⭐⭐⭐⭐ | xxx |
| 性能 | ⭐⭐⭐ | xxx |
| 健壮性 | ⭐⭐⭐ | xxx |
| 可维护性 | ⭐⭐⭐⭐ | xxx |

### 🔧 修复清单

| 优先级 | 问题 | 文件 |
|--------|------|------|
| 🔴 High | xxx | xxx.tsx |
| 🔴 Medium | xxx | xxx.tsx |
| 🟡 Low | xxx | xxx.tsx |
```

### Code Review 优先级说明

- **🔴 High**：必须修复，可能导致 Bug 或严重问题
  - 除零错误、空指针
  - Hook 使用导致数据不一致
  - 安全漏洞

- **🔴 Medium**：建议修复，影响代码质量
  - 未使用的代码
  - 缺少性能优化
  - 不符合规范

- **🟡 Low**：可选修复，锦上添花
  - 代码简化
  - 命名优化
  - 注释完善

## 检查清单速查表

### 🚀 提交前必查（5分钟快速检查）

```bash
# 1. 代码格式（1分钟）
npx prettier --write "src/**/*.{ts,tsx}" && npx eslint --fix "src/**/*.{ts,tsx}"

# 2. Lint检查（1分钟）
ReadLints(["src/components/xxx"])

# 3. Git状态（1分钟）
git status
git diff --name-only

# 4. UI对比（2分钟）
对照设计稿检查关键页面

# 5. 功能自测（根据情况）
测试主要交互流程
```

### ✅ 完整检查项（详细检查）

#### 代码质量
- [ ] 0 ESLint错误
- [ ] 0 TypeScript错误
- [ ] Prettier格式化通过
- [ ] 代码风格一致

#### 功能完整
- [ ] 所有AC已实现
- [ ] 主流程可用
- [ ] 边界情况处理
- [ ] 错误提示完整

#### UI一致
- [ ] 布局正确
- [ ] 样式精确
- [ ] 交互完整
- [ ] 状态齐全

#### 性能优化
- [ ] useMemo使用合理
- [ ] useCallback使用正确
- [ ] 无性能警告

#### 国际化
- [ ] 所有文本已国际化
- [ ] 英文fallback完整

## 实战经验总结

### 成功案例：DEG-15535 双币投入

**挑战**：
1. Notion搜索失败 → 用数字部分搜索成功
2. 架构方案调整 → 及时撤销重做
3. ESLint错误多 → 每次生成后立即修复

**经验**：
- ✅ 架构要和用户充分沟通确认
- ✅ 参考现有代码的实现模式
- ✅ 每次代码生成后立即质量检查
- ✅ 严格按照设计稿实现UI
- ✅ 保持与现有代码风格一致

**最终成果**：
- 清晰的三层架构（apyProvider → single/dual → views）
- 0 ESLint错误
- UI完全符合设计稿
- 功能完整可用

## 相关技能

- `start-feature-dev` - 开始新功能开发（使用相同的规范）
- `dg-trade-fe-dev` - 项目开发规范和代码模式

## 真实案例总结（DEG-15535）

基于 DEG-15535 双币投入功能的验收经验：

### 发现的问题
1. ❌ 初始实现中使用了 `{intl.xxx || 'fallback'}` 模式
2. ❌ trade-fe 只添加了部分国际化文案
3. ❌ wallet 接口同步时差点忘记同步
4. ⚠️ Tab切换样式与设计稿有细微差异

### 修复措施
1. ✅ 移除所有fallback，统一使用 `intl.xxx`
2. ✅ 从需求文档提取所有国际化文案
3. ✅ 在 skill 中增加"暂停提醒"机制
4. ✅ 像素级对比设计稿并调整

### 经验教训
- 📝 **国际化要一次性做完整**，不要等到后面再补
- 📝 **跨仓库要明确提醒用户**，避免漏掉wallet
- 📝 **设计稿要仔细对比**，1-2px的差异也要修正
- 📝 **每次代码生成后立即运行质量检查**，不要堆积问题
