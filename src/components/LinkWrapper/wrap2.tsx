import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useSetLocale } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

export default function LinkWrapperWithBg({
  className,
  url,
  onClick,
  children,
  style,
}: {
  className?: string;
  url?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { languagePath } = useSetLocale();
  const isAppH5 = useIsAppH5();

  const showUrl = useMemo(() => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('degate://browser')) {
      if (isAppH5) {
        return url;
      }
      return decodeURIComponent(url.split('?')[1].split('=')[1]);
    }
    return `${window.location.protocol}//${window.location.host}/${languagePath}${url}`;
  }, [url, languagePath, isAppH5]);

  return (
    <StyledA
      href={showUrl || '#'}
      className={`${className || ''} link-wrapper`}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
          return;
        }
        if (!url) return;
        WindowOpen(url);
      }}
    >
      {children}
    </StyledA>
  );
}

const StyledA = styled.a`
  display: flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  border-radius: 6px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  border-radius: 5px;
  line-height: 20px;
  gap: 4px;
  &:hover {
    background: ${({ theme }) => theme.bg_white_10};
  }
`;
