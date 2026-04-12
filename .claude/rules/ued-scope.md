# UED 修改边界

## 可以修改的文件

| 目录 | 说明 |
|------|------|
| `src/UI/**` | UI 组件库（按钮、输入框、弹窗、Tab 等） |
| `src/wallet/config.ts` | Wallet 配置（账户、token、DA 地址等） |
| `src/theme.tsx` | 主题变量（颜色、字体、间距） |
| `src/style/**` | 全局样式、字体、reset |
| `src/components/*/views/*.tsx` | 页面视图层的样式和布局调整 |
| `src/locals/**` | 国际化文案 |
| `src/imgs/**` | 图片资源 |
| `src/commonComponents/**` | 通用展示组件 |

## 禁止修改的文件

| 目录 | 原因 |
|------|------|
| `src/state/**` | Redux 状态管理，改了会破坏数据流 |
| `src/mock/**` | Mock 系统，改了会导致数据异常 |
| `src/utils/**` | 工具函数，涉及计算逻辑 |
| `src/providers/**` | 全局 Provider，涉及模式切换和钱包状态 |
| `src/bridge/**` | 钱包桥接，UED 不需要 |
| `src/ethers/**` | Web3 工具 |
| `src/constants/**` | 接口定义和常量 |
| `craco.config.cjs` | 构建配置 |
| `package.json` | 依赖配置 |

## 谨慎修改（需确认影响）

| 文件 | 注意事项 |
|------|----------|
| `src/components/*/dataProvider.tsx` | 数据层，只改展示相关的字段传递 |
| `src/components/*/index.tsx` | 入口文件，只改组件组装顺序 |
| `src/containers/**` | 路由容器，改了影响页面结构 |

## 创建新文件的规则

- 可以在 `src/UI/` 下新建 UI 组件
- 可以在 `views/` 下新建视图文件
- **禁止** 创建新的 Provider、Hook、Redux slice
- **禁止** 写真实 API 调用代码

## 验证方式

修改后需要检查三种模式都正常：
1. 点击右下角 ⚙ 切换到 PC 模式
2. 切换到 Mobile 模式
3. 切换到 APP H5 模式
4. 点击 "Reload Now" 刷新页面查看效果
