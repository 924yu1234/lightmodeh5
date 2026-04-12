import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledViewItem = styled.div`
  width: ${({ cardSize }: { cardSize: number }) => cardSize}px;
  background: ${({ theme }) => theme.bg_white_10};
  border-radius: 5px;
  padding: 15px 20px;
  cursor: pointer;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .token-info {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    line-height: 20px;
    height: 40px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    display: flex;
    align-items: center;
    gap: 5px;
    .token-symbol {
      display: flex;
      flex-direction: column;
      .token-symbol-text {
        max-width: ${({ cardSize }: { cardSize: number }) => cardSize - 60}px;
      }
      .token-name {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        max-width: ${({ cardSize }: { cardSize: number }) => cardSize - 60}px;
        font-size: 12px;
        line-height: 16px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      }
    }
  }
  .apy-value {
    margin-top: 5px;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    font-size: 24px;
    line-height: 24px;
    padding-left: 33px;
    .apy-value-tips {
      font-size: 12px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    }
  }
`;
