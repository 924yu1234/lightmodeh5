import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledManageTokens = styled.div`
  .add-link {
    position: absolute;
    right: 10px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }

  .list-body {
    overflow: auto;
    width: 100%;
    max-height: ${({ theme }: { theme: ThemeType }) => {
      if (theme.isMobile) {
        return theme.windowHeight - theme.modalTop - 100;
      }
      return theme.windowHeight - theme.modalTop * 2 - 100;
    }}px;
  }

  .modal-content {
    position: relative;
  }
`;
