import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .section-card {
    width: 100%;
    border-radius: 12px;
    background-image: linear-gradient(
      180deg,
      rgba(0, 160, 255, 0.3) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
  }

  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .summary-card,
  .rate-card {
    padding: 20px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 8px;
  }
`;
