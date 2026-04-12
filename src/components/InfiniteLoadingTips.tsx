import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useIntl } from 'js/locals';
import { ThemeType } from 'js/theme';

export default function InfiniteLoadingTips({
  children,
  loading,
  width,
}: {
  children: ReactElement | null;
  loading: boolean;
  width?: number;
}) {
  const intl = useIntl();
  return (
    <StyledInfiniteLoadingTips className="infinite-loading-tips" width={width}>
      {loading ? intl.loading : children}
    </StyledInfiniteLoadingTips>
  );
}

export const StyledInfiniteLoadingTips = styled.div<{ width?: number }>`
  min-width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  padding: 10px;
  line-height: 20px;
  height: 40px;
  width: ${({ width }: { width?: number }) => (width ? `${width}px` : 'auto')};
  .view_all {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    margin-right: 10px;
  }
`;
