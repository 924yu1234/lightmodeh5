---
name: start-feature-dev
description: 基于当前分支的JIRA编号，自动从Notion获取需求文档、分析UI设计，制定并执行开发计划。用于快速开始新功能开发。
---

# 开始新功能开发（双仓库模式）

本技能自动化新功能开发的启动流程，从需求分析到代码实现。

## 使用场景

当你切换到一个新的feature分支（如 `feature/DEG-15433`）准备开始开发时，使用此技能。

**双仓库模式说明**：
- `dg-trade-fe`：UI 和业务页面实现
- `dg-wallet`：钱包连接、签名、授权等交互
- 同一个JIRA任务可能需要同时修改两边

## 自动化流程

### 1. 识别需求信息

自动执行以下操作：

```bash
# 获取当前分支
git branch --show-current

# 从分支名提取JIRA编号（如 DEG-15433）
# 格式：feature/DEG-xxxxx 或 DEG-xxxxx
```

### 2. 查找并获取Notion需求文档

**Notion数据库**：https://www.notion.so/2298dab9fad580cc9205d5908f40742e

**查找策略（多层次）**：

1. **首次尝试：直接搜索JIRA编号**
   ```javascript
   user-notionApi-API-post-search({
     "query": "DEG-xxxxx",
     "filter": { "property": "object", "value": "page" }
   })
   ```

2. **如果失败：搜索编号部分（如 "15535"）**
   ```javascript
   user-notionApi-API-post-search({
     "query": "15535",
     "filter": { "property": "object", "value": "page" }
   })
   ```

3. **如果仍失败：暂停并请求用户提供**
   - 告诉用户搜索未找到结果
   - 请求用户提供Notion文档链接
   - 从链接中提取页面ID

4. **获取文档内容**：
   - 先获取页面基本信息：`user-notionApi-API-retrieve-a-page`
   - 再获取子内容：`user-notionApi-API-get-block-children`
   - 如果包含数据库，使用：`user-notionApi-API-query-data-source`

5. **提取关键信息**：
   - 🎯 需求目标和背景
   - 📋 业务流程和用户场景
   - 🎨 UI/UX 要求
   - 📊 数据结构和接口
   - ⚠️ 技术约束和边界条件
   - ✅ 验收标准（AC）

### 3. 查找并分析UI设计稿

**查找路径**：`~/Downloads/DEG-xxxxx/`

**步骤**：

1. **检查目录是否存在**：
   ```bash
   ls -la ~/Downloads/DEG-xxxxx/
   ```

2. **查找UI文件**：
   - 查看 `preview/` 文件夹中的PNG预览图
   - 读取关键页面的设计稿（使用 Read 工具读取图片）
   - 重点关注：
     - 主要交互页面（如投入、追加、历史等）
     - 不同状态的设计（默认、填写中、错误、成功等）
     - 中英文版本对比

3. **分析设计细节**：
   - 📐 **布局结构**：组件层级、间距、对齐
   - 🎨 **视觉样式**：颜色、圆角、阴影、字体大小
   - 🔘 **交互元素**：按钮样式、输入框样式、Tab切换样式
   - 📊 **数据展示**：数值格式、单位、Token图标位置
   - 🌐 **国际化文本**：提取所有需要翻译的文本

4. **记录关键设计要点**：
   - 输入框高度、背景色、边框
   - Tab切换的激活状态样式
   - Token图标的位置和大小
   - 余额显示的格式
   - 错误提示的样式和位置

### 4. 制定开发计划（双仓库）

基于需求文档和UI设计，制定详细的开发计划：

**组件架构设计**：
```
trade-fe (UI层)
└── src/components/功能模块/
    ├── index.tsx              # 主入口组件
    ├── apyProvider.tsx        # 高层Provider（共用数据）
    ├── single/                # 单一模式
    │   ├── index.tsx
    │   ├── dataProvider.tsx   # 模式特有数据
    │   └── views/
    └── dual/                  # 双重模式（如适用）
        ├── index.tsx
        ├── dataProvider.tsx
        └── views/

wallet (钱包交互层)
└── src/xxx/
    ├── hooks/                 # 钱包连接/签名 hooks
    ├── providers/             # 钱包状态管理
    └── services/              # 签名/授权服务
```

**实现顺序**：
1. 📐 架构设计（双仓库职责划分、数据流）
2. 📦 接口定义（TypeScript interfaces）
3. 🔧 数据层（Provider、hooks、API调用）
4. 🎨 UI层实现（trade-fe）
5. 🔐 钱包交互实现（wallet）
6. 🔄 交互逻辑（状态切换、表单验证）
7. 💅 样式优化（符合设计稿细节）
8. 🌐 国际化文本
9. ✅ ESLint检查和修复

**复用组件清单**：
- 检查 `src/components/` 中可复用的组件
- 查看类似功能的现有实现
- 列出需要新建的组件

### 5. **⚠️ 向用户确认（重要！）**

**在开始任何代码实现前，必须先向用户确认以下内容：**

```markdown
## 📋 需求理解确认

### JIRA信息
- 编号：DEG-xxxxx
- 标题：xxx
- 需求目标：xxx

### 核心功能
1. xxx
2. xxx
3. xxx

### 关键技术点
- 数据结构：xxx
- API调用：xxx
- 状态管理：xxx

### 📄 后端技术文档
- **是否有后端 API 文档？**（如有，请提供）
- API 端点：xxx
- 请求参数：xxx
- 响应数据：xxx
- 错误码定义：xxx

## 🎨 UI设计理解

### 页面组成
- 页面A：xxx（共x个状态）
- 页面B：xxx
- 弹窗C：xxx

### 设计细节（基于设计稿）
- Tab切换样式：圆角胶囊 / 方形按钮
- 输入框高度：xxpx
- Token图标位置：左侧 / 右侧
- 数据展示顺序：xxx在上，xxx在下

### 交互逻辑
- 切换逻辑：xxx
- 验证规则：xxx
- 错误处理：xxx

## 🏗️ 技术方案

### 架构设计（双仓库）
- trade-fe：
  - apyProvider（高层，提供xxx）
  - singleProvider（单币特有）
  - dualProvider（双币特有）
- wallet：
  - walletProvider（钱包连接状态）
  - signService（签名/授权）
  - connectHooks（连接/断开）
  
### 组件拆分
- trade-fe：
  - single/ - 单币模块
  - dual/ - 双币模块
  - apy/ - 共用APY组件
- wallet：
  - hooks/ - 钱包连接/签名
  - services/ - 授权/签名实现

### 数据流
- trade-fe UI → wallet 签名 → 结果回传 UI

## 📦 需要创建/修改的文件
- trade-fe：
  - [ ] src/components/xxx/index.tsx
  - [ ] src/components/xxx/dataProvider.tsx
  - [ ] src/state/xxx/hooks.ts
  - [ ] src/constants/interface/index.ts
- wallet：
  - [ ] src/hooks/xxx.ts
  - [ ] src/providers/xxx.tsx
  - [ ] src/services/xxx.ts

---

**请确认：**
1. 需求理解是否正确？
2. UI设计细节是否准确？
3. 技术方案是否合理？
4. 有无遗漏的功能点？
5. **是否有后端技术文档/API文档？**（如果有，请提供链接或文档）
6. **本次开发是否需要修改 wallet 项目？**（如果需要，我会在 trade-fe 完成后提醒你）

确认无误后再开始实现。
```

**⚠️ 开发顺序（重要）**：
1. **先完成 `trade-fe` 侧的所有开发**
   - UI 组件
   - 数据层（Provider/Context）
   - 接口定义（`src/constants/interface/index.ts`）
   - 业务逻辑（hooks）
   - 确认弹窗（H5/移动端使用）

2. **如果需要 `wallet` 侧开发（Web端确认弹窗、签名逻辑）**
   - **暂停并提醒用户**："trade-fe 开发完成，现在需要在 wallet 项目中同步接口并实现签名逻辑，是否继续？"
   - **等待用户确认**后再开始 wallet 侧的修改
   - 同步接口定义到 `wallet/src/constants/interface.ts`
   - 实现确认弹窗和签名 hooks

3. **两边完成后统一验证**

### 6. 开始实现（双仓库）

**⚠️ 用户确认后，按照计划开始实现**

#### 🔗 跨仓库接口同步策略（重要！）

**问题场景**：
- `trade-fe` 定义了新的接口类型（如 `TurboRangeOrderParams`）
- `wallet` 项目中的确认弹窗需要使用这些接口
- 两个项目是独立仓库，接口需要手动同步

**同步策略**：

1. **接口定义源头（trade-fe）**
   - `trade-fe` 是接口定义的主仓库
   - 新增或修改接口类型时，先在 `trade-fe/src/constants/interface/index.ts` 中定义
   - 完整定义所有相关类型（如 `TurboRangeDualDepositOrderParams`, `TurboRangeDualIncreaseInvestmentOrderParams` 等）

2. **接口同步到 wallet**
   - **方式1（推荐）**：在 `wallet` 项目中创建镜像接口文件
     ```typescript
     // wallet/src/constants/interface.ts 或单独创建 turboRangeInterface.ts
     // 从 trade-fe 复制相关接口定义
     export interface TurboRangeOrderParams {
       type: 'deposit' | 'dualDeposit' | 'withdraw' | 'claim' | 'increaseInvestment' | 'dualIncreaseInvestment';
       product: TurboRangeProduct;
       depositOrderParams?: TurboRangeDepositOrderParams;
       dualDepositOrderParams?: TurboRangeDualDepositOrderParams;
       // ... 其他字段
     }
     ```
   
   - **方式2（未来优化）**：创建共享 npm 包（`@degate/types`）供两个项目引用

3. **同步检查清单**
   当在 `start-feature-dev` 中发现需要跨仓库接口同步时：
   
   **第一步：在 trade-fe 中完成接口定义**
   - [ ] 在 `trade-fe/src/constants/interface/index.ts` 中添加/更新接口
   - [ ] 确保类型定义完整（包括所有 `Params` 类型）
   - [ ] 运行 TypeScript 检查确保无错误
   
   **第二步：识别 wallet 需要使用的接口**
   - [ ] 检查 wallet 项目中哪些文件需要使用这些接口（通常是确认弹窗、hooks、services）
   - [ ] 在 Notion 需求文档中确认 wallet 侧的实现范围
   
   **第三步：同步接口到 wallet**
   - [ ] 在 `wallet/src/constants/interface.ts` 中添加相同的接口定义
   - [ ] 复制所有依赖的类型（如 `TurboRangeProduct`, `IntentTryItemResp` 等）
   - [ ] 确保类型名称、字段、注释完全一致
   
   **第四步：在 wallet 中实现对应功能**
   - [ ] 更新确认弹窗组件以使用新接口
   - [ ] 更新签名 hooks 以处理新的订单类型
   - [ ] 运行 TypeScript 和 ESLint 检查
   
   **第五步：验证接口一致性**
   ```bash
   # 在 trade-fe 中
   grep -A 20 "export interface TurboRangeOrderParams" src/constants/interface/index.ts
   
   # 在 wallet 中
   grep -A 20 "export interface TurboRangeOrderParams" src/constants/interface.ts
   
   # 对比确保一致
   ```

4. **skill 执行时的处理**
   - 如果在 `trade-fe` 中执行 `start-feature-dev`，且识别到需要修改 wallet：
     1. 先完成 `trade-fe` 的接口定义和实现
     2. **暂停并提示用户**：需要在 `wallet` 项目中同步接口
     3. 生成接口同步清单（包含需要复制的接口定义代码）
     4. 提示用户在 `wallet` 项目中运行 `start-feature-dev` 或手动同步
   
   - 如果在 `wallet` 中执行 `start-feature-dev`：
     1. 检查 `trade-fe` 项目是否已有相关接口定义
     2. 如果有，直接复制到 `wallet`
     3. 如果没有，提示用户先在 `trade-fe` 中定义接口

5. **常见问题处理**
   - **问题1**：`wallet` 中引用了 `trade-fe` 的类型但没有同步
     - **错误**：`Cannot find name 'TurboRangeOrderParams'`
     - **修复**：从 `trade-fe` 复制接口定义到 `wallet/src/constants/interface.ts`
   
   - **问题2**：两边接口定义不一致导致运行时错误
     - **预防**：在 skill 的验收步骤中增加"跨仓库类型一致性检查"
     - **修复**：以 `trade-fe` 为准，更新 `wallet` 的接口定义
   
   - **问题3**：新增了 `order.type`（如 `dualDeposit`）但 wallet 确认弹窗未处理
     - **修复**：在 `wallet` 的确认弹窗中添加对应的条件渲染分支

#### 代码规范（必须遵循）

**⚠️ 开发前必读**：`.cursor/rules/CODING_GUIDE.md` — 包含完整的架构模式、Provider 写法、代码风格、禁止事项等。

1. **代码风格**：
   - ✅ 参考现有代码的写法（如相似组件）
   - ✅ 导入顺序：React → 第三方库 → 项目内部 → 相对路径
   - ✅ 使用 `useCallback`, `useMemo` 优化性能
   - ✅ Context Provider 的 value 使用 useMemo
   - ✅ 组件拆分：单个组件不超过150行

2. **TypeScript规范**：
   - ✅ 完整的类型定义（不使用 `any` 除非必要）
   - ✅ 接口定义放在 `src/constants/interface/index.ts`（trade-fe）或 `src/constants/interface.ts`（wallet）
   - ✅ Props 使用内联类型或接口
   - ✅ 导出的 hook 有明确的返回类型
   - ✅ **跨仓库接口保持一致**（trade-fe 为源头）

3. **样式规范**：
   - ✅ 使用 styled-components
   - ✅ 使用主题变量（`theme.xxx`）
   - ✅ 样式组件放在文件底部
   - ✅ className 使用语义化命名
   - ✅ 严格按照UI设计稿实现（高度、间距、颜色等）

4. **国际化规范（重要！）**：
   
   **文档来源**：需求文档底部通常有"国际化"模块，包含中英文对照
   
   **trade-fe 国际化处理**：
   - ✅ 文件路径：`src/locals/en.ts` 和 `src/locals/zh.ts`
   - ✅ **添加所有国际化文案**（即使当前未使用，也要添加需求文档中的所有文案）
   - ✅ 使用方式：`intl.turboRange.investModeSingle`（**不使用 fallback**）
   - ❌ **禁止使用**：`{intl.turboRange?.investModeSingle || 'Single Currency'}`
   - ✅ 结构化组织：按功能模块嵌套（如 `turboRange.xxx`, `earn.xxx`）
   
   **wallet 国际化处理**：
   - ✅ 文件路径：`src/locals/en.ts` 和 `src/locals/zh.ts`
   - ✅ **只添加使用到的文案**（wallet 只实现确认弹窗，不需要所有文案）
   - ✅ 使用方式：`intl.amount`, `intl.est_network_fee`
   - ❌ **禁止使用** fallback 模式
   
   **国际化添加示例**：
   
   ```typescript
   // trade-fe/src/locals/en.ts
   export default {
     // ... 其他文案
     turboRange: {
       investModeSingle: 'Single Currency',
       investModeDual: 'Dual Currency',
       investAmount: 'Investment Amount',
       baseAmount: 'Base Amount',
       quoteAmount: 'Quote Amount',
       price_range: 'Price Range',
       // ... 从需求文档提取的所有文案
     },
   };
   
   // trade-fe/src/locals/zh.ts
   export default {
     // ... 其他文案
     turboRange: {
       investModeSingle: '单币',
       investModeDual: '双币',
       investAmount: '投入金额',
       baseAmount: '基础币种金额',
       quoteAmount: '计价币种金额',
       price_range: '价格区间',
       // ... 对应的中文
     },
   };
   
   // wallet/src/locals/en.ts （只添加使用到的）
   export default {
     // ... 其他文案
     amount: 'Amount',
     est_network_fee: 'Est. Network Fee',
     Confirm: 'Confirm',
     Close: 'Close',
     // 只添加确认弹窗中使用到的文案
   };
   ```
   
   **国际化处理流程**：
   1. 从需求文档底部提取"国际化"模块的中英文对照表
   2. trade-fe：将所有文案添加到 `locals/` 下（中英文）
   3. wallet：只添加确认弹窗中使用到的文案
   4. 代码中只使用 `intl.xxx` 格式，禁止使用 `||` fallback
   5. 如果文案缺失，优先添加到 `locals/` 文件而非使用 fallback

#### 实现流程

1. **创建文件结构（两边仓库）**
   - trade-fe：UI组件和Provider结构
   - wallet：钱包交互hooks和service

2. **实现数据层**
   - trade-fe：接口定义（`interface/index.ts`）、Provider、Context
   - wallet：连接/签名hooks、service

3. **实现UI组件（trade-fe）**
   - 按照设计稿逐个实现组件
   - 先实现结构，再添加样式
   - 确保每个组件职责单一

4. **实现交互逻辑**
   - trade-fe：表单验证、状态切换、错误处理
   - wallet：签名流程、授权失败处理

5. **样式优化**
   - 对照设计稿微调
   - 响应式适配
   - 主题适配

6. **添加国际化（关键步骤）**
   
   **步骤1：从需求文档提取国际化文案**
   - 需求文档底部通常有"国际化"或"i18n"模块
   - 提取所有中英文对照文案
   
   **步骤2：trade-fe 添加国际化**
   ```bash
   # 1. 打开国际化文件
   # src/locals/en.ts
   # src/locals/zh.ts
   
   # 2. 找到或创建对应模块（如 turboRange）
   # 3. 添加所有文案（即使当前未使用）
   # 4. 确保中英文键名完全一致
   ```
   
   **示例**：
   ```typescript
   // en.ts
   turboRange: {
     investModeSingle: 'Single Currency',
     investModeDual: 'Dual Currency',
     investAmount: 'Investment Amount',
     // ... 添加需求文档中的所有文案
   }
   
   // zh.ts
   turboRange: {
     investModeSingle: '单币',
     investModeDual: '双币',
     investAmount: '投入金额',
     // ... 对应中文
   }
   ```
   
   **步骤3：wallet 添加国际化（仅使用到的）**
   - 只添加确认弹窗中实际使用的文案
   - 通常包括：`amount`, `Confirm`, `Close`, `est_network_fee` 等
   
   **步骤4：代码中使用**
   - ✅ 正确：`{intl.turboRange.investModeSingle}`
   - ❌ 错误：`{intl.turboRange?.investModeSingle || 'Single Currency'}`
   
   **步骤5：验证**
   - 检查所有硬编码文本是否已替换为 `intl.xxx`
   - 确保中英文切换正常显示

7. **代码质量检查（每次实现后必做）**
   ```bash
   # 自动格式化
   npx prettier --write "src/components/xxx/**/*.{ts,tsx}"
   
   # 自动修复ESLint错误
   npx eslint --fix "src/components/xxx/**/*.{ts,tsx}"
   
   # 检查剩余错误
   ReadLints(["src/components/xxx"])

   # wallet 仓库（示例）
   npx prettier --write "src/**/*.{ts,tsx}"
   npx eslint --fix "src/**/*.{ts,tsx}"
   ```

### 7. 代码质量检查（每次代码生成后必做）

**⚠️ 关键：每次生成代码后都必须运行以下检查并修复所有错误**

#### 步骤1：自动格式化
```bash
npx prettier --write "修改的文件路径/**/*.{ts,tsx}"
```

#### 步骤2：自动修复ESLint
```bash
npx eslint --fix "修改的文件路径/**/*.{ts,tsx}"
```

#### 步骤3：检查剩余错误
```bash
ReadLints(["修改的目录"])
```

#### 步骤4：手动修复（如果还有错误）
常见问题和修复：
- **导入未使用** → 删除未使用的导入
- **缺少依赖** → 添加到 useEffect/useCallback 依赖数组
- **Button缺少type** → 添加 `type="button"`
- **any类型** → 使用具体类型或泛型
- **箭头函数返回** → 确保有明确的返回类型

### 8. 最终验收检查

实现完成后确认：
- ✅ **代码质量**
  - 无 ESLint 错误
  - 无 TypeScript 类型错误
  - 代码格式符合 Prettier 规范
- ✅ **功能完整性**
  - 所有需求点已实现
  - 接口定义完整
  - Hooks 创建完成
- ✅ **UI一致性**
  - 严格对照设计稿
  - 样式细节正确（高度、间距、颜色等）
  - 交互状态完整
- ✅ **代码规范**
  - 符合项目现有代码风格
  - 组件职责单一
  - 适当的代码拆分

## 关键注意事项

### Notion API使用技巧

**数据库信息**：
- 主数据库ID: `2298dab9fad580cc9205d5908f40742e`
- 数据库类型：包含多个子页面和数据库

**搜索策略**：
1. 先搜索完整JIRA编号："DEG-15535"
2. 如失败，搜索数字部分："15535"
3. 如仍失败，请用户提供链接

**API调用顺序**：
```
user-notionApi-API-post-search (搜索)
  ↓
user-notionApi-API-retrieve-a-page (获取页面)
  ↓
user-notionApi-API-get-block-children (获取子内容)
  ↓
如果包含 child_database:
  ↓
user-notionApi-API-retrieve-a-database (获取数据库结构)
  ↓
user-notionApi-API-query-data-source (查询数据)
```

**常见错误**：
- ❌ 用 database_id 调用 retrieve-a-page（会报错）
- ❌ 用 page_id 调用 query-data-source（会报错）
- ✅ 先判断是 page 还是 database，再调用对应API

### UI设计文件

- 优先查找 `~/Downloads/DEG-xxxxx/` 目录
- 如果未找到，询问用户UI设计文件路径
- 支持Figma导出的HTML和图片格式

### 代码规范

严格遵循项目规范（详见 `.cursor/rules/CODING_GUIDE.md`）：
- 导入顺序：React → 第三方库 → 项目内部 → 相对路径
- 组件默认导出，使用函数组件
- Props使用内联类型定义
- 样式组件放在文件底部
- Context Provider使用useMemo优化

### 错误处理和常见问题

#### Notion API 相关

**问题1：搜索不到文档**
- 解决：尝试搜索编号的数字部分（如"15535"而不是"DEG-15535"）
- 解决：请用户提供直接链接
- 从链接提取页面ID并使用 `retrieve-a-page`

**问题2：返回的是Page而非Database**
- 解决：先 `retrieve-a-page` 获取页面
- 再 `get-block-children` 查找 child_database
- 最后用正确的database_id调用 `query-data-source`

#### UI设计相关

**问题1：设计文件未找到**
- 检查 `~/Downloads/DEG-xxxxx/` 目录
- 询问用户UI设计文件位置
- 如果用户无法提供，根据需求文档和类似功能推断

**问题2：设计细节不清晰**
- 询问用户具体的设计意图
- 参考类似功能的现有实现
- 向用户确认后再实现

#### 代码实现相关

**问题1：不确定实现方式**
- 查看类似功能的现有代码
- 向用户确认技术方案
- 不要自作主张修改已有逻辑

**问题2：用户要求调整方案**
- 立即停止当前实现
- 撤销不符合要求的修改（git checkout）
- 按照新方案重新实现

**问题3：ESLint错误多**
- 每次代码生成后立即运行 prettier + eslint
- 不要等到最后才修复
- 使用自动修复工具而不是手动改

## 示例调用

在Cursor中：
```
@start-feature-dev 请帮我开始实现当前分支的需求
```

或者指定JIRA编号：
```
@start-feature-dev 请帮我开始实现 DEG-15433
```

## 输出示例

```markdown
🎯 正在分析需求...

✅ 识别到需求编号：DEG-15433
✅ 从Notion获取需求文档成功
   - 标题：区间宝-追加投入
   - 目标：方便用户调整持仓
   
✅ 找到UI设计：/Users/xxx/Downloads/DEG-15433
   - 包含20个设计文件
   - 识别到3个主要页面
   
📋 开发计划：
1. 创建追加投入模态框组件
2. 修改详情页添加按钮
3. 实现History列表
4. 添加统计数据展示
5. 实现API调用

是否开始实现？
```

## 最佳实践（基于实际经验）

### 1. 需求分析阶段
- ✅ 先完整读取需求文档，理解业务背景
- ✅ 查看所有相关的UI设计稿（不同状态、中英文）
- ✅ 识别与现有功能的关联和区别
- ⚠️ 不要急于开始编码，先确认理解

### 2. 方案设计阶段
- ✅ 查看类似功能的现有实现
- ✅ 设计清晰的组件层级和数据流
- ✅ 考虑代码复用和可维护性
- ⚠️ 向用户确认方案，避免返工

### 3. 代码实现阶段
- ✅ 先实现架构（Provider、接口定义）
- ✅ 再实现UI组件（参考设计稿）
- ✅ 最后添加样式和交互细节
- ⚠️ 每个阶段完成后运行质量检查

### 4. 质量保证阶段
- ✅ **每次生成代码后立即**运行 prettier + eslint
- ✅ 修复所有 lint 错误后再继续
- ✅ 对照设计稿检查UI细节
- ✅ 测试各种交互场景
- ⚠️ 不要堆积问题到最后处理

### 5. 常见错误避免
- ❌ 不要修改已有的单币逻辑（保持向后兼容）
- ❌ 不要自作主张拆分/合并组件
- ❌ 不要猜测设计意图，有疑问就询问
- ❌ 不要忽略 ESLint 错误
- ❌ 不要跳过用户确认环节
- ❌ **不要在 wallet 开发前未提醒用户**
- ❌ **不要使用国际化 fallback 模式**（`{intl.xxx || 'text'}`）
- ❌ **不要在 trade-fe 中只添加部分国际化文案**

### 6. 沟通要点
- 💬 实现方案有多种时，列出方案让用户选择
- 💬 设计细节不明确时，向用户确认
- 💬 遇到技术难点时，说明问题并征求意见
- 💬 用户要求调整时，先撤销再重做
- 💬 **开始实现前，询问是否有后端 API 文档**
- 💬 **trade-fe 完成后，明确提醒：现在需要修改 wallet，是否继续？**

## 快速检查清单

在提交代码前，确认以下所有项：

### 📋 需求检查
- [ ] 已从Notion获取需求文档
- [ ] 已查看所有相关UI设计稿
- [ ] **已询问是否有后端 API 文档**
- [ ] **已向用户确认理解和方案**
- [ ] **已确认本次是否需要修改 wallet**
- [ ] 所有AC验收标准已覆盖

### 💻 代码检查
- [ ] 接口定义已添加到 `interface/index.ts`
- [ ] 所有 Hooks 已创建（TryData + Order）
- [ ] Provider 层级设计合理
- [ ] 组件拆分清晰，职责单一

### 🎨 UI检查
- [ ] 严格对照设计稿实现
- [ ] 输入框高度、间距正确
- [ ] Token图标位置正确
- [ ] Tab切换样式正确
- [ ] 各种状态（默认、错误、loading）完整

### ✅ 质量检查
- [ ] ✅ 已运行 `prettier --write`
- [ ] ✅ 已运行 `eslint --fix`
- [ ] ✅ ReadLints 无错误
- [ ] ✅ 代码风格符合现有代码
- [ ] ✅ 无 TypeScript 类型错误

### 🌐 国际化检查
- [ ] **已从需求文档底部提取国际化模块**
- [ ] **trade-fe：添加了所有国际化文案**（即使未使用）
- [ ] **wallet：只添加了使用到的文案**（如需要）
- [ ] **所有文本使用 `intl.xxx`（无 fallback）**
- [ ] ❌ **未使用** `{intl.xxx || 'fallback'}` 模式
- [ ] 中英文键名完全一致
- [ ] 错误提示文案完整

## 相关技能

- `dg-trade-fe-dev` - 项目开发规范和代码模式
- `check-implementation-progress` - 检查实现完成度
