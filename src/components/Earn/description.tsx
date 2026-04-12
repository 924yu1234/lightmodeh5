import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Vault } from 'src/constants/interface';
import { useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconDown from '../Icons/downIcon';
import IconWrapper from '../Icons/IconWrapper';

export default function EarnDescription({ vault }: { vault: Vault }) {
  const { locale } = useSetLocale();
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
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

  useEffect(() => {
    const checkIfNeedsExpand = () => {
      const element = descriptionRef.current;
      if (element) {
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setNeedsExpand(isOverflowing);
      }
    };

    checkIfNeedsExpand();

    window.addEventListener('resize', checkIfNeedsExpand);

    const timer = setTimeout(checkIfNeedsExpand, 100);

    return () => {
      window.removeEventListener('resize', checkIfNeedsExpand);
      clearTimeout(timer);
    };
  }, [message]);

  if (!vault.descriptions?.length) return null;
  if (!message) return null;

  return (
    <StyledDescription>
      <div className={`description-inner ${expanded ? 'expanded' : ''}`}>
        <div
          ref={descriptionRef}
          className="description-inner-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      {needsExpand && (
        <div className="expand-button" onClick={() => setExpanded(!expanded)}>
          {!expanded && (
            <span className="arrow-down">
              <IconWrapper size={24}>
                <IconDown />
              </IconWrapper>
            </span>
          )}
          {expanded && (
            <span className="arrow-up rotate-180">
              <IconWrapper size={24}>
                <IconDown />
              </IconWrapper>
            </span>
          )}
        </div>
      )}
    </StyledDescription>
  );
}

const StyledDescription = styled.div`
  margin-top: 10px;
  padding: 0 10px;
  position: relative;

  .description-inner {
    padding: 15px 25px 15px 15px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
    border-radius: 8px;
    .description-inner-content {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 14px;
      line-height: 20px;
      max-height: 100px; /* 约等于3行文本的高度 (3 * 20px + 额外空间) */
      overflow: hidden;
      position: relative;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.expanded .description-inner-content {
      max-height: none;
      -webkit-line-clamp: unset;
      overflow: visible;
    }
  }

  .expand-button {
    position: absolute;
    bottom: 5px;
    right: 20px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    z-index: 1;

    .arrow-down,
    .arrow-up {
      font-size: 12px;
    }

    .arrow-up {
      transform: rotate(180deg);
    }
  }
`;
