---
name: i18n-translation
description: 处理国际化翻译文件的导入导出。将CSV翻译文件导入到locals目录的各语言文件中，或使用 node scripts/exportI18nCsv.js 导出缺失翻译 CSV。当用户提供翻译CSV文件、需要添加多语言翻译、或提到locals翻译文件时使用。
---

# 国际化翻译工具

处理 `src/locals/` 目录下的多语言翻译文件。

## 支持的语言文件

| 文件 | 语言 | CSV列名 |
|------|------|---------|
| en.tsx | 英语 | en |
| zh-CN.tsx | 简体中文 | zh-CN |
| zh-TW.tsx | 繁体中文 | zh-TW |
| ja-JP.tsx | 日语 | ja |
| kr.tsx | 韩语 | kr |
| fr.tsx | 法语 | fr |
| es.tsx | 西班牙语 | es |
| de.tsx | 德语 | de |
| it.tsx | 意大利语 | it |
| ru.tsx | 俄语 | ru |
| uk-UA.tsx | 乌克兰语 | uk |
| tr.tsx | 土耳其语 | tr |
| vi.tsx | 越南语 | vi |

## 功能一：从CSV导入翻译

### CSV格式要求

```csv
key, en, zh-CN, zh-TW, ja, kr, fr, es, de, it, ru, uk, tr, vi
some_key,English text,中文,繁體,日本語,한국어,Français,Español,Deutsch,Italiano,Русский,Українська,Türkçe,Tiếng Việt
```

- 第一行为表头
- key列支持两种格式：
  - 顶层key: `some_key`
  - 嵌套对象key: `turboRange.APY_Backtest` (表示 turboRange 对象下的 APY_Backtest)

### 导入流程

1. **读取CSV文件**
2. **验证 key 存在性**: 先在 `en.tsx` 中检查每个 key 是否存在
   - ✅ 如果 key 存在：继续处理该 key
   - ❌ 如果 key 不存在：跳过该 key，不添加到任何语言文件
3. **解析key位置**: 在 `en.tsx` 中找到key的确切位置
4. **更新各语言文件**: 在对应位置插入翻译（en.tsx不修改）

### 关键规则

- **en.tsx 不做任何修改** - 仅作为参考
- **⚠️ 必须以 en.tsx 为准**: 只有在 en.tsx 中存在的 key，才能添加到其他语言文件中
  - 导入前必须先检查 en.tsx 中是否包含该 key
  - CSV 中的 key 如果在 en.tsx 中不存在，则跳过该 key，不添加到任何其他语言文件
  - 这是为了保持所有语言文件与 en.tsx 的结构一致性
- **按位置插入**: 在 en.tsx 中找到 key 的位置，在其他文件的相同位置插入
- **以 CSV 为准覆盖**: 若目标语言文件中已存在该 key，必须用 CSV 值覆盖（不保留旧译文）
- **多份 CSV 冲突**: 同一 key 以最新提供的 CSV 为准进行覆盖
- **修改后跑 lint**: 完成导入或规则变更后，需要执行 `npm run lint:eslint`
- **只做搬运不做翻译**: AI 只从 CSV 复制翻译，不自行翻译

### 示例：处理嵌套key

CSV中 `turboRange.APY_Backtest` 表示：
```typescript
turboRange: {
  // ... 其他key
  APY_Backtest: '翻译内容',  // 在这里插入
}
```

查找方法：
1. 在 en.tsx 中找到 `turboRange` 对象
2. 在该对象中找到 `APY_Backtest` 的位置（或前一个key的位置）
3. 在其他语言文件的相同位置插入

## 功能二：导出缺失翻译到 CSV

### 使用方法（推荐）

在项目根目录执行：

```bash
node scripts/exportI18nCsv.js
```

- **默认输出**：`~/Downloads/trade_<时间戳>.csv`（脚本会在控制台打印完整路径）
- **自定义路径**（可选）：`node scripts/exportI18nCsv.js /绝对或相对路径/文件名.csv`

### 工作原理

脚本通过 `src/locals/intlUtils` 的 `buildCsvString` 汇总各语言与 `en` 的差异，逻辑与历史上在 `src/locals/index.tsx` 里临时调用 `toCsv` 等价；**日常导出请统一用本脚本**，无需改 `index.tsx`。

### 嵌套对象处理

特殊处理的嵌套对象（在 `intlUtils.tsx` 中定义）：
- `meme`
- `ct`
- `stocks`
- `swap_error`
- `gift`
- `turboRange`

## 工作流程示例

### 导入翻译

用户提供 CSV 文件后：

1. **读取 CSV 内容**
2. **读取 en.tsx 文件**，获取所有已存在的 key
3. **过滤 CSV 中的 key**：
   - 对于每个 key，检查是否在 en.tsx 中存在
   - 只保留 en.tsx 中已存在的 key 进行处理
   - 如果某个 key 不存在，输出警告信息，说明该 key 被跳过
4. **对于每个有效的 key**：
   - 在 en.tsx 中查找精确位置
   - 确定插入点（通常是相邻key之后）
5. **更新所有非 en.tsx 的语言文件**
6. 使用 `StrReplace` 工具在正确位置插入翻译

### 查找插入位置

```bash
# 搜索 key 在各文件中的位置
grep -n "key_name" src/locals/*.tsx
```

### 插入策略

找到前一个 key，在其后插入新的翻译：

```typescript
// 原文件
  previous_key: '前一个翻译',
};

// 插入后
  previous_key: '前一个翻译',
  new_key: '新翻译',
};
```

## 实际示例：验证 key 是否存在

假设 CSV 文件包含以下 key：
```csv
key, en, zh-CN
turboRange.increase_investment, Increase Investment, 追加投入
turboRange.total_principal, Total Principal, 总本金
```

处理步骤：

1. **检查 en.tsx 中的 turboRange 对象**：
```typescript
turboRange: {
  Turbo_Range: 'Turbo Range',
  price_range: 'Price Range',
  increase_investment: 'Increase Investment',  // ✅ 存在
  // total_principal 不存在 ❌
}
```

2. **处理结果**：
   - ✅ `turboRange.increase_investment`: 存在于 en.tsx，添加到所有语言文件
   - ❌ `turboRange.total_principal`: 不存在于 en.tsx，跳过，不添加到任何语言文件

3. **输出信息**：
```
✅ 已添加: turboRange.increase_investment (1/2)
⚠️  跳过: turboRange.total_principal - 该 key 不存在于 en.tsx 中
```

## 注意事项

1. **⚠️ 必须以 en.tsx 为准**: 这是最重要的规则，确保所有语言文件结构一致
2. **检查key是否已存在**: 避免重复添加
3. **保持代码格式**: 遵循原文件的缩进和引号风格
4. **处理特殊字符**: CSV中的引号、换行等需要正确转义
5. **验证结果**: 导入后检查文件语法是否正确

## 引号规则（重要）

**当翻译内容包含单引号 `'` 时，必须使用双引号包裹字符串：**

```typescript
// ❌ 错误 - 单引号内包含单引号会导致语法错误
increase_investment: 'Augmenter l'investissement',

// ✅ 正确 - 使用双引号包裹
increase_investment: "Augmenter l'investissement",
```

常见需要注意的语言：
- **法语 (fr)**: 大量使用撇号，如 `l'`, `d'`, `n'`
- **意大利语 (it)**: 如 `l'intervallo`, `dell'`
- **英语 (en)**: 如 `don't`, `it's`, `you're`

**处理流程：**
1. 检查翻译内容是否包含 `'` 字符
2. 如果包含，使用双引号 `"` 包裹整个字符串
3. 如果不包含，可使用单引号 `'` 或双引号 `"`
