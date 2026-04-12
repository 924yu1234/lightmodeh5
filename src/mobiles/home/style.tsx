import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledMobileHome = styled.div<{
  showDownload: boolean;
  cardSize: number;
}>`
  padding-bottom: 80px;
  padding-top: ${(props) => (props.showDownload ? '96px' : '52px')};
  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - 132 - (props.showDownload ? 44 : 0)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
  }
  .views-container {
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .item-title {
    font-size: 16px;
    line-height: 46px;
    ${({ theme }) => theme.fontBold};
    color: ${({ theme }) => theme.t_fff};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon-right-outlined {
      color: ${({ theme }) => theme.t_fff};
    }
  }
  .more-card {
    background: ${({ theme }) => theme.bg_white_06};
    border-radius: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    width: 70px;
  }
`;

export const StyledViewItem = styled.div<{ cardSize: number }>`
  width: ${({ cardSize }: { cardSize: number }) => cardSize}px;
  background: ${({ theme }) => theme.bg_white_06};
  border-radius: 5px;
  padding: 15px 20px;
  cursor: pointer;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.border_transparent};
  &:active {
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
  }
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
    font-size: 18px;
    line-height: 20px;
    .apy-value-tips {
      font-size: 12px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
