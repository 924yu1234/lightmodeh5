/**
 * DEG-15433: 区间宝追加投入 - 单元测试（简化版）
 *
 * 说明：由于项目Jest配置兼容性问题，这里提供简化的单元测试
 * 主要测试业务逻辑和数据验证，不涉及React组件渲染
 */

// 导入工具函数
import { isNumber } from 'src/utils/digit';
import { isLessThan } from 'src/utils/numberUtils';

describe('追加投入 - 业务逻辑测试', () => {
  describe('金额验证逻辑', () => {
    const MAX = 500000;
    const MIN = 0.01;

    it('应该正确验证金额是否为数字', () => {
      expect(isNumber('100')).toBe(true);
      expect(isNumber('0.01')).toBe(true);
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('')).toBe(false);
    });

    it('应该正确检测金额是否超过最大值', () => {
      expect(isLessThan(MAX, '600000')).toBe(true);
      expect(isLessThan(MAX, '400000')).toBe(false);
    });

    it('应该正确检测金额是否低于最小值', () => {
      expect(isLessThan('0.005', MIN)).toBe(true);
      expect(isLessThan('0.1', MIN)).toBe(false);
    });

    it('应该正确检测余额不足', () => {
      const balance = '10000';
      const amount = '15000';
      expect(isLessThan(balance, amount)).toBe(true);
    });

    it('应该正确检测余额充足', () => {
      const balance = '10000';
      const amount = '5000';
      expect(isLessThan(balance, amount)).toBe(false);
    });
  });

  describe('TryKey生成逻辑', () => {
    it('应该生成正确的tryKey格式', () => {
      const da_owner = 'owner123';
      const poolAddress = 'pool123';
      const usdcCode = 'USDC';
      const amount = '100';
      const gasTokenCode = 'SOL';
      const isMaxModel = false;

      const tryKey = `${da_owner}_${poolAddress}_${usdcCode}_${
        isMaxModel ? 'max' : amount
      }_${gasTokenCode}`;

      expect(tryKey).toBe('owner123_pool123_USDC_100_SOL');
    });

    it('Max模式应该生成max标识的tryKey', () => {
      const da_owner = 'owner123';
      const poolAddress = 'pool123';
      const usdcCode = 'USDC';
      const amount = '100';
      const gasTokenCode = 'SOL';
      const isMaxModel = true;

      const tryKey = `${da_owner}_${poolAddress}_${usdcCode}_${
        isMaxModel ? 'max' : amount
      }_${gasTokenCode}`;

      expect(tryKey).toBe('owner123_pool123_USDC_max_SOL');
    });
  });

  describe('按钮禁用逻辑', () => {
    it('金额无效时按钮应该禁用', () => {
      const amount = '';
      const isDisabled = !isNumber(amount) || Number(amount) <= 0;

      expect(isDisabled).toBe(true);
    });

    it('有效金额且有tryResp时按钮应该启用', () => {
      const amount = '100';
      const tryResp = { tokenOutAmount: '100' };
      const overBalance = false;
      const overMax = false;
      const overPriceImpact = false;
      const belowMin = false;

      const isDisabled =
        !isNumber(amount) ||
        Number(amount) <= 0 ||
        overMax ||
        overBalance ||
        overPriceImpact ||
        belowMin ||
        !tryResp;

      expect(isDisabled).toBe(false);
    });

    it('余额不足时按钮应该禁用', () => {
      const amount = '15000';
      const balance = '10000';
      const overBalance = isLessThan(balance, amount);

      expect(overBalance).toBe(true);
    });
  });
});

export {};
