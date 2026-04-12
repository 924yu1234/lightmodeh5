# 同步指南：dg-ued ↔ dg-trade-fe

## 同步范围

UED 修改后可以同步回 trade-fe 的目录：

| 目录 | 同步方式 |
|------|----------|
| `src/UI/**` | 直接同步（文件完全相同） |
| `src/theme.tsx` | 直接同步 |
| `src/style/**` | 直接同步 |
| `src/components/*/views/*.tsx` | Review diff 后 cherry-pick |
| `src/locals/**` | Review diff 后合并 |
| `src/imgs/**` | 直接同步 |

## 不能同步的文件

这些文件在两个项目中实现不同：

| 文件 | UED 版本 | trade-fe 版本 |
|------|----------|---------------|
| `src/providers/useWallet.tsx` | Mock wallet (MockModeContext) | 真实 wallet bridge |
| `src/providers/useWebsocket.tsx` | Mock WS (no-op) | 真实 WebSocket |
| `src/state/index.tsx` | 禁用 redux-persist | 启用 redux-persist |
| `src/index.js` | UEDSettingsProvider + mock | 真实 Provider stack |
| `src/hooks/useGaEvent.ts` | no-op | 真实 GA 追踪 |
| `src/utils/axios.ts` | 含 mock 拦截器 | 真实 API |
| `src/utils/axiosHub.ts` | 含 mock 拦截器 | 真实 API |

## 同步工作流

1. UED 在 dg-ued 修改 → 推分支
2. 开发者 review diff：
   - 确认只涉及 UI/样式/主题 变更
   - 排除上述不能同步的文件
3. Cherry-pick 或 rsync 相关文件到 trade-fe
4. 在 trade-fe 运行验证：
   ```bash
   npm run typecheck    # 0 errors
   npm run lint:eslint  # 0 errors
   ```

## 同步脚本

```bash
# 从 dg-ued 同步 UI/theme/style 到 trade-fe
rsync -av --delete \
  dg-ued/src/UI/ dg-trade-fe/src/UI/ \
  --exclude='__tests__'

cp dg-ued/src/theme.tsx dg-trade-fe/src/theme.tsx

rsync -av --delete \
  dg-ued/src/style/ dg-trade-fe/src/style/
```

## 注意事项

- `src/UI/Button/BaseButton.tsx` 两个项目**完全相同**（GA 接口保留，useGaEvent 实现不同）
- `src/UI/Provider/MantineProvider.tsx` 两个项目**完全相同**（notification limit 来自不同来源但接口一致）
- 同步后在 trade-fe 中必须测试 PC 和 Mobile 模式
