import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Vault } from 'src/constants/interface';
import { useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function EarnDescriptionPC({ vault }: { vault: Vault }) {
  const { locale } = useSetLocale();
  const descriptionRef = useRef<HTMLDivElement>(null);

  const message = useMemo(() => {
    const en = (vault.descriptions || []).find(
      (t: any) => t.locale === 'en-US'
    );
    return (
      (vault.descriptions || []).find((t: any) => t.locale === locale)
        ?.content || en?.content
    );
  }, [vault.descriptions, locale]);

  if (!vault.descriptions?.length) return null;
  if (!message) return null;

  return (
    <StyledDescription className="earn-description">
      <div className="description-inner">
        <div
          ref={descriptionRef}
          className="description-inner-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </StyledDescription>
  );
}

const StyledDescription = styled.div`
  padding: 0 10px;
  margin-top: 10px;
  position: relative;

  .description-inner {
    padding: 15px 15px 15px 15px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
    border-radius: 8px;

    .description-inner-content {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 14px;
      line-height: 20px;
      max-height: 250px;
      overflow-y: auto;
      position: relative;
    }
  }
`;
