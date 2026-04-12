import styled from 'styled-components';

import { StyledTable } from './index';

export const StyledBotsTable = styled(StyledTable)`
  &.dg-table-wrapper .dg-table {
    .dg-table-thead {
      background: ${(props) => props.theme.bg_05};
      border-radius: 5px;
      height: 40px;

      tr {
        th {
          font-size: 14px;
          ${(props) => props.theme.fontRegular};
          &:first-child {
            border-radius: 5px 0 0 5px;
            padding-left: 20px;
          }
          &:last-child {
            padding-right: 20px;
            border-radius: 0 5px 5px 0;
            &.th-r-28 {
              padding-right: 28px;
            }
          }
        }
      }
    }
    .dg-table-tbody {
      tr {
        &.tr_click {
          cursor: pointer;
        }

        &.dg-table-placeholder {
          td {
            padding: 0;
            &:first-child {
              padding: 0;
            }
            &:last-child {
              padding: 0;
            }
          }
        }
        &.fungible-usdc-row td {
          border-bottom: 1px solid ${(props) => props.theme.innerBorder2};
        }
        td {
          padding: 0 4px;
          height: 50px;
          font-size: 14px;
          line-height: 22px;
          ${(props) => props.theme.fontRegular};
          color: ${(props) => props.theme.t_d4d};
          &:first-child {
            padding-left: 20px;
            border-radius: 5px 0 0 5px;
          }
          &.td-color-up {
            color: ${(props) => props.theme.up} !important;
          }
          &:last-child {
            padding-right: 20px;
            border-radius: 0 5px 5px 0;
          }
          &:first-child:last-child {
            border-radius: 5px;
          }
          &.td-left-10 {
            padding-left: 10px;
          }
          &.td-right-10 {
            padding-right: 10px;
          }
        }
        &.tr_closed {
          .dg-table-cell,
          .dg-table-cell div {
            color: ${({ theme }) => theme.t_b7b_80} !important;
          }
        }
      }
    }
  }
`;
