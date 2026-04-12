import styled from 'styled-components';

import { StyledTable } from './index';

export const StyledMiningTable = styled(StyledTable)`
  .dg-table {
    .dg-table-thead {
      background: ${(props) => props.theme.bg_05};
      border-radius: 5px;
      height: 40px;
      tr {
        th {
          font-size: 14px;
          ${(props) => props.theme.fontRegular};
          color: ${(props) => props.theme.t_b7b};
          &:first-child {
            border-radius: 5px 0 0 5px;
            padding-left: ${(props) => props.padding || 40}px;
          }
          &:last-child {
            padding-right: ${(props) => props.padding || 40}px;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
    .dg-table-tbody {
      tr {
        &.grid_mining_status_10 td {
          color: ${(props) => props.theme.t_b7b_50};
        }
        td {
          padding: 0 5px;
          height: 50px;
          font-size: 14px;
          line-height: 22px;
          ${(props) => props.theme.fontRegular};
          color: ${(props) => props.theme.t_d4d};
          &:first-child {
            padding-left: ${(props) => props.padding || 40}px;
            border-radius: 5px 0 0 5px;
          }
          &:last-child {
            padding-right: ${(props) => props.padding || 40}px;
            border-radius: 0 5px 5px 0;
          }
          &:first-child:last-child {
            border-radius: 5px;
          }
        }
      }
    }
  }
`;

export const StyledMiningModalTable = styled(StyledMiningTable)`
  .dg-table {
    .dg-table-thead {
      background: ${(props) => props.theme.bg_313336};
    }
  }
`;
