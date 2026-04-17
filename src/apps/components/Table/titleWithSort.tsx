import React, { useCallback } from 'react';
import styled from 'styled-components';

import IconSortDown from 'src/components/Icons/sortDown';
import IconSortwUp from 'src/components/Icons/sortUp';
import { OrderDir } from 'src/constants/consts';

import { ThemeType } from 'js/theme';

export default function TitleWithSort({
  title,
  dir,
  onChangeDir,
  hasEmptyState,
  align = 'left',
}: {
  title: any;
  dir: OrderDir;
  onChangeDir: (v: OrderDir) => void;
  hasEmptyState?: boolean;
  align?: 'left' | 'center' | 'right';
}) {
  const change = useCallback(() => {
    if (!dir) {
      onChangeDir('asc');
    } else if (dir === 'asc') {
      onChangeDir('desc');
    } else if (dir === 'desc') {
      onChangeDir(hasEmptyState ? '' : 'asc');
    }
  }, [dir, onChangeDir, hasEmptyState]);

  return (
    <StyledSortTitle onClick={change} align={align} className="sort-title">
      {title}
      <div className="sort-items">
        <IconSortwUp className={`sort-asc ${dir === 'asc' ? 'active' : ''}`} />
        <IconSortDown
          className={`sort-desc ${dir === 'desc' ? 'active' : ''}`}
        />
      </div>
    </StyledSortTitle>
  );
}

const StyledSortTitle = styled.div<{ align: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  justify-content: ${({ align }) => {
    if (align === 'left') {
      return 'flex-start;';
    }
    if (align === 'right') {
      return 'flex-end;';
    }
    return 'center;';
  }};
  .sort-items {
    margin-left: 5px;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .sort-asc {
      margin-bottom: 0px;
    }
    .sort-asc,
    .sort-desc {
      &.active {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
`;
