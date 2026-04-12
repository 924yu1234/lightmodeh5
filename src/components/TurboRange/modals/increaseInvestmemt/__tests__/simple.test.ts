/**
 * 简单的测试示例 - 验证Jest配置是否正常工作
 */

describe('Jest配置测试', () => {
  it('基础测试应该通过', () => {
    expect(1 + 1).toBe(2);
  });

  it('字符串测试应该通过', () => {
    expect('hello').toBe('hello');
  });
});

export {};
