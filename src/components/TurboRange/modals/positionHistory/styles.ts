import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const HistoryListWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100px;
  overflow: auto;
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '0 20px' : ''};
  max-height: ${(props: any) => {
    return props.theme.windowHeight - 52 - props.theme.modalTop * 2 - 30 - 82;
  }}px;
`;

export const HistoryItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;
  cursor: pointer;
  height: 20px;
  position: relative;
`;

export const HistoryItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HistoryTitle = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  line-height: 20px;
`;

export const HistoryItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HistoryTime = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  line-height: 18px;
`;

export const HistoryPanelWrap = styled.div`
  width: 350px;
  min-width: 350px;
  background: #2a2a42;
  border-radius: 0px 12px 12px 0px;
  position: relative;
  left: -360px;
  margin-right: -360px;
  transition: left 0.3s ease, margin-right 0.3s ease;

  &.show {
    left: 0;
    margin-right: 0;
    &:before {
      content: '';
      position: absolute;
      left: -10px;
      top: 0;
      width: 10px;
      height: 100%;
      background: #2a2a42;
    }
  }
`;

export const HistoryPanelTitle = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  font-size: 18px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 52px;
  gap: 10px;
  .dg-icon-wrapper:hover {
    border-radius: 18px;
  }
`;

export const StyledModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 30px;
  .modal-content {
    padding: 0 0 0;
    overflow: auto;
    max-height: ${(props: any) => {
      return props.theme.windowHeight - 52 - props.theme.modalTop * 2 - 30;
    }}px;
  }
  .modal-footer {
    padding: 0 20px 0;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

export const ModalFooter = styled.div`
  padding: 10px 20px 20px;

  .close-btn {
    width: 100%;
  }
`;
