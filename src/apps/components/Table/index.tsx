import React from 'react';
import RcTable from 'rc-table';
import styled from 'styled-components';

import { StyledEmpty } from 'src/components/Empty';

import Spin from 'js/components/Spin';
import { useIntl } from 'js/locals';

export const EXPAND_COLUMN = RcTable.EXPAND_COLUMN;

export default function DgTable({
  dataSource,
  loading,
  className,
  emptyText,
  ...rest
}: {
  dataSource: any[];
  className?: string;
  loading?: boolean;
  emptyText?: any;
  rowClassName?: any;
  onRow?: any;
  disabledHideScrollBar?: boolean;
  signToViewTips?: string;
}) {
  const intl = useIntl();
  let _emptyText = emptyText;
  if (!_emptyText) {
    _emptyText = (
      <StyledEmpty className="dg-empty">
        <div className="empty-text">{intl.no_data}</div>
      </StyledEmpty>
    );
  }
  return (
    <StyledCommonTabale className={`dg-table-wrapper ${className || ''}`}>
      <Spin spinning={!!loading}>
        <RcTable
          data={dataSource}
          prefixCls="dg-table"
          emptyText={_emptyText}
          {...rest}
        />
      </Spin>
    </StyledCommonTabale>
  );
}

export const StyledCommonTabale = styled.div`
  .dg-table table {
    width: 100%;
    text-align: left;
    border-radius: 2px 2px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    .dg-table-expand-icon-col {
      width: 48px;
    }
  }
  .dg-table.dg-table-ping-right {
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      z-index: 1;
      pointer-events: none;
      right: -5px;
      top: 0;
      bottom: 0;
      width: 25px;
      height: 100%;
      opacity: 0.8;
      background-image: linear-gradient(
        90deg,
        rgba(19, 19, 47, 0) 6%,
        #13132f 50%
      );
    }
  }
`;

export const StyledTable = styled(DgTable)<{
  bodyHeight?: number;
  rowHeight?: number;
  columns: any[];
  onRow?: any;
  rowKey?: any;
  scroll?: any;
  padding?: number;
  disabledHideScrollBar?: boolean;
  summary?: any;
}>`
  .dg-table-cell-scrollbar {
    box-shadow: none;
  }
  .table-cancel-btn {
    height: 26px;
    border-radius: 4px;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    letter-spacing: 0;
    text-align: center;
    padding: 0 8px;
    line-height: 18px;
  }
  .dg-table-cell-scrollbar,
  .dg-table-cell-scrollbar:not([rowspan]) {
    box-shadow: none;
  }
  .dg-table-content {
    min-height: ${({ bodyHeight }) =>
      bodyHeight ? `${bodyHeight}px` : 'auto'};
  }

  .dg-table-pagination.dg-pagination {
    margin: 10px 0 0 20px;
    .dg-pagination-total-text {
      color: ${(props) => props.theme.t_b7b};
      margin-right: 14px;
    }
  }
  .dg-table {
    background: none;
    .dg-empty-description {
      color: ${(props) => props.theme.t_b7b};
    }
    .dg-table-thead {
      tr th {
        color: ${(props) => props.theme.tips};
        ${(props) => props.theme.fontRegular};
        font-size: 12px;
        background: none;
        border: none;
        padding: 0 4px;
        line-height: 24px;
        white-space: nowrap;
        &.th-left-12 {
          padding-left: 12px;
        }
        &.th-r-28 {
          padding-right: 28px !important;
        }
        &.td-right-10 {
          padding-right: 0;
        }
      }
    }
    .dg-table-body {
      &::-webkit-scrollbar {
        display: ${(props) => (props.disabledHideScrollBar ? 'block' : 'none')};
      }
    }
    .dg-table-tbody {
      tr {
        td {
          border: none;
          color: ${(props) => props.theme.t_b7b};
          ${(props) => props.theme.fontRegular};
          font-size: 12px;
          background: none;
          white-space: nowrap;
          height: ${(props) => props.rowHeight || 28}px;
          padding: 0 4px;
          &.td-no-padding {
            padding: 0;
          }
          &.td-left-10 {
            padding-left: 10px;
          }
          &.td-right-10 {
            padding-right: 10px;
          }
        }
        &.tr_SELL {
          td {
            color: ${(props) => props.theme.red};
            &.td-time {
              color: ${(props) => props.theme.t_b7b};
            }
          }
        }
        &.tr_BUY {
          td {
            color: ${(props) => props.theme.green};
            &.td-time {
              color: ${(props) => props.theme.t_b7b};
            }
          }
        }
        &:hover {
          td {
            background: ${(props) =>
              props?.onRow ? 'rgba(255, 255, 255, 0.1);' : 'inherit'};
          }
        }
        &.top-token {
          td {
            border-bottom: 1px solid ${(props) => props.theme.innerBorder};
          }
        }
      }
      .dg-table-placeholder {
        height: 100%;
        &:hover {
          td {
            background: ${({ theme }) => theme.bg_transparent};
          }
        }
      }
    }
  }
  .dg-pagination.mini {
    .dg-pagination-item {
      background: none;
      border: none;
      margin-top: 2px;
      a {
        color: ${(props) => props.theme.t_b7b};
      }
      &.dg-pagination-item-active {
        //background-color: ${(props) => props.theme.blue1};
        background: none;
      }
      &.dg-pagination-item-active a {
        color: ${(props) => props.theme.blue};
      }
    }
    .dg-pagination-jump-next,
    .dg-pagination-jump-prev {
      .dg-pagination-item-ellipsis {
        color: ${(props) => props.theme.border3};
      }
    }
    .dg-pagination-item-link {
      color: ${(props) => props.theme.border3};
    }
  }
`;
