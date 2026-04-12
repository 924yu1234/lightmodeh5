# UED 设计师操作指南

> 面向不懂前端开发的 UED 设计师，通过 AI 工具（Claude Code / Cursor）操作本项目。

## 如何启动项目

```bash
npm start
```

启动后浏览器打开 http://localhost:3001 即可看到页面。

## 如何切换 PC / Mobile / H5 模式

1. 页面右下角有一个 ⚙ 齿轮按钮
2. 点击打开设置面板
3. 在 "Display Mode" 中选择 PC / Mobile / APP H5
4. 点击 "Reload Now" 刷新页面

## 常见操作的 prompt 模板

### 修改主题色
> "把主色调从绿色改成蓝色，修改 src/theme.tsx 中的 green 相关变量"

### 调整按钮样式
> "把主按钮的圆角从 8px 改成 12px，字号从 14px 改成 16px"

### 修改页面布局
> "在 swap 页面的订单表单区域，把买入/卖出按钮改成上下排列"

### 添加新的 UI 组件
> "在 src/UI/ 下新建一个 Badge 组件，支持 success/warning/error 三种状态"

### 修改文案
> "把首页的 'Swap' 标签改成 'Trade'，修改 src/locals/en.tsx"

### 调整间距
> "把交易页面顶部导航和内容区域的间距从 16px 改成 24px"

## 重要注意事项

1. **只改 UI 相关的文件**：src/UI/、src/theme.tsx、src/style/、views/ 下的文件
2. **不要让 AI 写 API 调用**：所有数据来自 mock，如果需要更多 mock 数据，修改 src/mock/data/ 下的文件
3. **改完后三种模式都要看一下**：PC、Mobile、H5 可能布局不同
4. **遇到报错不要慌**：让 AI 帮你看错误信息，通常是语法问题

## 常见问题

**Q: 页面一片空白？**
A: 可能是 mock 数据格式不对。检查浏览器控制台（F12）有没有红色错误。

**Q: 样式没生效？**
A: 确认用的是 styled-components + theme 变量，不是硬编码的 CSS 值。

**Q: 怎么添加图片？**
A: 把图片放到 `src/imgs/` 或 `public/` 目录，然后在组件中 import。

**Q: 改了代码但页面没变？**
A: 保存文件后页面会自动热更新。如果没有，刷新浏览器。
