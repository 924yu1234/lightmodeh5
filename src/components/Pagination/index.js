import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconWrapper from '../Icons/IconWrapper';
import LeftOutlined from '../Icons/LeftOutlined';
import RightOutlined from '../Icons/RightOutlined';
import VerticalRightOutlined from '../Icons/VerticalRightOutlined';

export default function Pagination(props) {
  const { current, hasNext, onChange = () => {}, extra, prev, hasData } = props;
  const goToFirst = useCallback(() => {
    onChange(1);
  }, [onChange]);
  const goToPre = useCallback(() => {
    if (current === 1) return;
    onChange(current - 1);
  }, [onChange, current]);
  const goToNext = useCallback(() => {
    if (!hasNext) return;
    onChange(current + 1);
  }, [onChange, current, hasNext]);

  if (!hasData && current === 1) return null;
  if (!hasNext && current === 1) return null;

  return (
    <StyledPagination className="dg-paginatoin">
      {prev && <div className="dg-pagination-all">{prev}</div>}

      <div className="dg-pagination-first">
        {current > 2 && (
          <IconWrapper size={20} onClick={goToFirst} showHoverBG>
            <VerticalRightOutlined disabled={current === 1} size={10} />
          </IconWrapper>
        )}
      </div>
      <IconWrapper size={20} className="item-pre" onClick={goToPre} showHoverBG>
        <LeftOutlined disabled={current === 1} size={10} />
      </IconWrapper>
      <div className="dg-pagination-current">{current}</div>
      {hasNext ? (
        <IconWrapper size={20} onClick={goToNext} showHoverBG>
          <RightOutlined disabled={!hasNext} size={10} />
        </IconWrapper>
      ) : (
        <div className="dg-pagination-p" />
      )}
      {!extra && <div className="dg-pagination-tip">{extra}</div>}
    </StyledPagination>
  );
}

Pagination.propTypes = {
  current: PropTypes.number,
  onChange: PropTypes.func,
  hasNext: PropTypes.bool,
  hasData: PropTypes.bool,
  prev: PropTypes.any,
  extra: PropTypes.any,
};

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  margin-top: 10px;
  line-height: 1;
  height: 20px;
  gap: 10px;
  .dg-pagination-all {
    cursor: pointer;
    color: ${(props) => props.theme.tips};
    font-size: 12px;
    margin-right: 24px;
  }
  .dg-pagination-first {
    width: 20px;
  }
  .dg-pagination-tip {
    color: ${(props) => props.theme.tips};
    font-size: 12px;
  }
  .dg-pagination-current {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_d4d};
    font-size: 12px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .dg-pagination-p {
    width: 20px;
    height: 20px;
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
`;
