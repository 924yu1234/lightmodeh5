/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo, useState } from 'react';
import { usePagination } from '@mantine/hooks';
import styled from 'styled-components';

import { Input } from 'src/UI';

import CommonSelect from 'js/apps/components/Select/commonSelect';
import { useIntl } from 'js/locals';
import { isNumber } from 'js/utils/digit';

import IconWrapper from '../Icons/IconWrapper';
import LeftOutlined from '../Icons/LeftOutlined';
import RightOutlined from '../Icons/RightOutlined';

export default function PaginationWithTotal({
  current,
  onChange,
  total,
  pageSize = 20,
  setPageSize,
  extra,
  hideGoTo,
  options = [20, 50, 100],
  hidePageSizeSelect = false,
}: {
  current: number;
  onChange: (c: number) => void;
  total: number;
  pageSize: number;
  setPageSize: (c: number) => void;
  extra?: string;
  hideGoTo?: boolean;
  options?: number[];
  hidePageSizeSelect?: boolean;
}) {
  const intl = useIntl();
  const [input, setInput] = useState('');

  const maxPage = useMemo(() => {
    return Math.ceil((total || 1) / pageSize);
  }, [total, pageSize]);

  const hasNext = maxPage > current;
  const hasData = total > 0;

  const pagination = usePagination({ total: maxPage, page: current });
  const range = useMemo(() => {
    if (!total) return [current];
    let _range = pagination.range;
    while (_range[_range.length - 1] === 'dots') {
      _range = _range.slice(0, -1);
    }
    return _range;
  }, [pagination, total, current]);

  const pageSizeOptions = useMemo(() => {
    return options.map((option) => {
      return { label: option + intl.page, key: `${option}` };
    });
  }, [intl, options]);

  const handleChange = useCallback(
    (n: number) => {
      if (n < 1) {
        onChange(1);
        return;
      }
      if (n > maxPage) {
        onChange(maxPage);
        return;
      }
      onChange(n);
    },
    [onChange, maxPage]
  );

  const goToPre = useCallback(() => {
    if (current === 1) return;
    handleChange(current - 1);
  }, [handleChange, current]);
  const goToNext = useCallback(() => {
    if (!hasNext) return;
    handleChange(current + 1);
  }, [handleChange, current, hasNext]);

  if (!hasData && current === 1) return null;
  if (maxPage === 1) return null;

  const _size = 30;

  return (
    <StyledPagination className="dg-paginatoin">
      {current > 1 ? (
        <IconWrapper size={_size} onClick={goToPre} showHoverBG>
          <LeftOutlined disabled={current === 1} size={10} />
        </IconWrapper>
      ) : (
        <div className="dg-pagination-p" />
      )}
      {range.map((n, i) => {
        const isDots = n === 'dots';
        return (
          <div
            className={`dg-pagination-item ${
              Number(current) === n ? 'active' : ''
            } ${isDots ? 'dots' : ''}`}
            onClick={() => {
              if (!isDots) {
                handleChange(n);
              }
            }}
            key={`${i}_${n}`}
          >
            {isDots ? '•••' : n}
          </div>
        );
      })}
      {hasNext ? (
        <IconWrapper
          size={_size}
          className="item-next"
          onClick={goToNext}
          showHoverBG
        >
          <RightOutlined disabled={!hasNext || current === maxPage} size={10} />
        </IconWrapper>
      ) : (
        <div className="dg-pagination-p" />
      )}
      {total > 0 && !hidePageSizeSelect && (
        <CommonSelect
          options={pageSizeOptions as any}
          value={`${pageSize}`}
          onChange={(v: any) => {
            setPageSize(Number(v));
          }}
          iconSize={10}
          width={100}
          position="top"
        />
      )}
      {maxPage > 1 && !hideGoTo && (
        <>
          <div className="goToLabel">{intl.go_to}</div>
          <Input
            size="sm"
            className="small"
            value={input}
            onChange={(e: any) => {
              if (isNumber(e.target.value)) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={(e: any) => {
              const val = Number(e.target.value);
              if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                if (val > 0) onChange(val > maxPage ? maxPage : val);
                setInput('');
                e.preventDefault();
              }
              if (e.code === 'Space') {
                e.preventDefault();
              }
            }}
            onBlur={(e: any) => {
              const val = Number(e.target.value);
              if (val > 0) onChange(Number(e.target.value));
              setInput('');
            }}
          />
        </>
      )}
      {extra && <div className="dg-pagination-tip">{extra}</div>}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  --size: 30px;
  --font-size: 14px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  margin-top: 10px;
  line-height: 1;
  height: var(--size);
  ${(props) => props.theme.fontRegular};
  color: ${(props) => props.theme.t_d4d_60};
  font-size: var(--font-size);
  gap: 10px;
  .dg-icon-wrapper:hover {
    border-radius: 50%;
    color: ${({ theme }) => theme.t_fff};
    .dg-icon {
      color: ${({ theme }) => theme.t_fff};
    }
  }
  .dg-pagination-all {
    cursor: pointer;
    color: ${(props) => props.theme.tips};
    font-size: 14px;
    margin-right: 24px;
  }
  .dg-pagination-p {
    width: var(--size);
    height: var(--size);
  }
  .dg-pagination-item {
    ${(props) => props.theme.fontRegular};
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    color: ${(props) => props.theme.t_d4d_60};
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    &:last-child {
      margin: 0;
    }
    &.active {
      color: ${(props) => props.theme.t_d4d};
    }
    &:hover {
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 50%;
    }
    &.dots {
      cursor: default;
      inset-inline-end: 0;
      inset-inline-start: 0;
      display: block;
      text-align: center;
      transition: all 0.2s;
      line-height: var(--size);
    }
  }
  .dg-icon {
    color: ${(props) => props.theme.t_d4d};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.blue};
    }
    &[disabled] {
      color: ${(props) => props.theme.tips};
    }
  }
  .goToLabel {
    white-space: nowrap;
  }
  .common-select {
    height: var(--size);
    font-size: var(--font-size);
    min-width: 75px;
    padding: 0 5px;

    width: auto;

    .icon-down {
      width: 12px;
      margin-left: 10px;
      &:hover {
        color: ${(props) => props.theme.t_d4d};
      }
    }
  }
  .mantine-Menu-dropdown {
    padding: 5px 0;
    .mantine-Menu-item {
      font-size: var(--font-size);
      height: var(--size);
      line-height: var(--size);
    }
  }
  .mantine-Input-wrapper.small .mantine-Input-input {
    height: var(--size);
    line-height: 16px;
    font-size: var(--font-size);
    width: 50px;
  }
  .dg-pagination-tip {
    color: ${(props) => props.theme.tips};
    font-size: var(--font-size);
  }
`;
