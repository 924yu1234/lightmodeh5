import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .summary-grid {
    display: flex;
    gap: 20px;
  }

  .summary-card,
  .rate-card {
    flex: 1 1;
    min-height: 230px;
    padding: 30px;
    background-image: linear-gradient(
      178deg,
      #202439 0%,
      rgba(23, 25, 73, 0) 100%
    );
    border: 1px solid rgba(183, 189, 198, 0.15);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
  }
`;
