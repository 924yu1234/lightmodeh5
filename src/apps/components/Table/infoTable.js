import styled from 'styled-components';

import { StyledTable } from './index';

export const StyledMobileInfoTable = styled(StyledTable)`
  .dg-table {
    .dg-table-thead {
      tr {
        th {
          font-size: 12px;
          ${(props) => props.theme.fontRegular};
          color: ${(props) => props.theme.t_b7b_60};
          padding: 0 4px 0 0;
        }
      }
    }
    .dg-table-tbody {
      tr {
        &:hover {
          td {
            background: none;
          }
        }
        td {
          padding: 0 5px 0 0;
          height: 48px;
          font-size: 14px;
          line-height: 22px;
          ${(props) => props.theme.fontRegular};
          color: ${(props) => props.theme.t_f4f};
          &.td-amount,
          &.td-price {
            ${(props) => props.theme.fontBold};
          }
        }
      }
    }
  }
`;
