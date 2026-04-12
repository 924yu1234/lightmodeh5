# DEG-15433 测试用例文档

## 📋 测试概述

本文档描述了DEG-15433（区间宝追加投入功能）的测试策略和测试用例。

## 🎯 测试目标

1. **功能正确性**：确保追加投入功能按预期工作
2. **用户体验**：验证各种边界条件和错误处理
3. **数据完整性**：确保数据流转正确
4. **性能稳定性**：验证异步操作和状态管理

## 🏗️ 测试架构

```
src/components/TurboRange/modals/increaseInvestmemt/
├── __tests__/
│   ├── dataProvider.test.tsx    # Context和状态管理测试
│   ├── btn.test.tsx             # 按钮组件和交互测试
│   ├── integration.test.tsx     # 集成测试（待完善）
│   └── README.md                # 本文档
├── dataProvider.tsx
├── btn.tsx
└── ...其他组件
```

## 📝 测试用例清单

### 1. dataProvider.test.tsx - 数据管理层测试

#### ✅ 初始化状态测试
- [x] 正确初始化Context数据
- [x] 正确设置用户DA地址
- [x] 初始金额为空字符串
- [x] 初始Max模式为关闭

#### ✅ 金额输入验证测试
- [x] 接受有效的数字输入
- [x] 检测金额低于最小值(0.01)
- [x] 检测金额超过最大值(500,000)
- [x] 拒绝非数字输入

#### ✅ 余额检查测试
- [x] 检测余额不足的情况
- [x] 允许金额小于等于余额
- [x] 正确读取USDC余额

#### ✅ Try接口调用测试
- [x] 有效金额时自动触发Try
- [x] 金额无效时不触发Try
- [x] Try响应正确解析
- [x] Try失败时的错误处理

#### ✅ Max模式测试
- [x] 正确设置Max模式
- [x] Max模式下使用全部余额
- [x] Max模式下的Try调用

#### ✅ 滑点影响检查测试
- [x] 检测过大的滑点影响
- [x] 正常滑点不阻止操作

### 2. btn.test.tsx - 按钮组件测试

#### ✅ 按钮禁用逻辑测试
- [x] 金额为空时禁用按钮
- [x] 余额不足时禁用按钮
- [x] 超过最大值时禁用按钮
- [x] 低于最小值时禁用按钮
- [x] 滑点过大时禁用按钮
- [x] 没有tryResp时禁用按钮
- [x] 正在Try时显示loading

#### ✅ 提示文案测试
- [x] 余额不足时显示正确提示
- [x] 金额无效时显示正确提示
- [x] 滑点过大时显示正确提示
- [x] 正常状态显示"Continue"

#### ✅ 订单创建流程测试
- [x] 有效输入时允许创建订单
- [x] 点击按钮触发订单创建
- [x] 订单创建成功后清空输入
- [x] 订单创建成功后显示进度弹窗

#### ✅ 错误处理测试
- [x] 金额无效时显示错误
- [x] 余额不足时显示错误
- [x] 区域限制时显示错误
- [x] Intent过期时的处理

### 3. integration.test.tsx - 集成测试（待完善）

#### ⏳ 完整流程测试
- [ ] 打开弹窗 → 输入金额 → 确认 → 成功
- [ ] 打开弹窗 → 输入金额 → 确认 → 失败
- [ ] Try接口失败的处理
- [ ] 订单创建失败的处理

#### ⏳ 用户交互测试
- [ ] 输入金额自动触发Try
- [ ] 点击Max填充最大金额
- [ ] 切换USDC重新Try
- [ ] 切换Gas Token重新Try

## 🔧 如何运行测试

### 安装依赖
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy
```

### 运行测试
```bash
# 运行所有测试
npm run test:unit

# 运行特定测试文件
npm run test:unit -- dataProvider.test.tsx

# 运行并查看覆盖率
npm run test:coverage

# 监听模式
npm run test:watch
```

## 📊 测试覆盖率目标

| 类型 | 目标 | 当前 |
|------|------|------|
| 语句覆盖率 | ≥80% | 75% |
| 分支覆盖率 | ≥70% | 65% |
| 函数覆盖率 | ≥80% | 70% |
| 行覆盖率 | ≥80% | 75% |

## 🎓 参考资料

### 测试最佳实践（借鉴Uniswap）

1. **分离关注点**：
   - 单独测试数据逻辑（dataProvider）
   - 单独测试UI交互（btn组件）
   - 分开集成测试

2. **依赖注入**：
   - 通过Mock控制外部依赖
   - 使测试独立可重复

3. **清晰的断言**：
   - 每个测试只验证一个行为
   - 测试名称清晰描述预期结果

4. **避免实现细节**：
   - 测试用户可见的行为
   - 不测试内部实现细节

### Uniswap的测试哲学

引用自 [Uniswap interface/.claude](https://github.com/Uniswap/interface/tree/main/.claude):

> "Breaking these into separate functions would make testing much easier:
> - Test validation without any API mocking
> - Test data fetching with a simple mock response  
> - Test UI updates with fixed data
> 
> Each piece becomes independently testable, and changes stay contained to their specific function."

### 关键测试原则

1. **函数职责单一**：便于独立测试
2. **依赖可注入**：便于Mock
3. **接口清晰**：便于验证
4. **错误处理完善**：便于测试边界条件

## 🚀 后续改进计划

### 短期（1周内）
- [ ] 完善集成测试
- [ ] 添加金额输入组件测试
- [ ] 添加余额显示组件测试
- [ ] 添加费用显示组件测试

### 中期（2周内）
- [ ] 添加E2E测试（使用Playwright）
- [ ] 添加性能测试
- [ ] 添加可访问性测试
- [ ] 提高覆盖率到目标值

### 长期
- [ ] 建立CI/CD自动测试流程
- [ ] 添加视觉回归测试
- [ ] 建立测试监控和报告系统

## 💡 测试编写指南

### 好的测试示例

```typescript
it('应该检测余额不足', () => {
  const { result } = renderHook(() => useIncrease(), { wrapper });

  result.current.setAmount('15000'); // 大于可用余额10000

  expect(result.current.overBalance).toBe(true);
});
```

**为什么这是好的测试**：
- ✅ 测试名称清晰描述预期行为
- ✅ 设置明确（金额15000 > 余额10000）
- ✅ 单一断言
- ✅ 不依赖实现细节

### 需要改进的测试示例

```typescript
// ❌ 不好的示例
it('测试', () => {
  // 多个不相关的断言
  expect(result.current.amount).toBe('');
  expect(result.current.isMaxModel).toBe(0);
  expect(result.current.userDA).toBe('DA123');
});
```

**改进方案**：拆分成多个独立测试，每个测试一个关注点。

## 📞 联系方式

如有测试相关问题，请联系：
- 前端团队
- Slack: #frontend-testing

## 📅 更新日志

- 2026-02-08: 创建测试框架和初始测试用例
- 待续...
