import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ModalKeys } from 'src/state/application/reducer';

import OprDetail from 'js/components/Icons/oprDetail';
import Tooltip from 'js/components/Tooltip';
import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';

export default function Oprs({ order }: { order: any }) {
  const intl = useIntl();
  const showModal = useShowModal();

  const oprs = [
    {
      text: intl.Details,
      tooltip: intl.view_details,
      icon: <OprDetail />,
      handle: () => {
        showModal({
          modal: ModalKeys.swapOrderDetail,
          orderId: order.order_id,
          listData: order,
        });
      },
    },
  ];

  return (
    <StyledBtns>
      {oprs.map((opr) => {
        return (
          <div key={opr.text} className="txt-btn" onClick={opr.handle}>
            <Tooltip title={opr.tooltip || opr.text}>{opr.icon}</Tooltip>
          </div>
        );
      })}
    </StyledBtns>
  );
}

Oprs.propTypes = {
  order: PropTypes.object,
};

const StyledBtns = styled.div`
  display: flex;
  align-items: center;
  .txt-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${(props) => props.theme.t_b7b};
    &:hover {
      color: ${(props) => props.theme.blue};
    }
    margin-right: 8px;
    &:first-child {
      margin-right: 20px;
    }
    &:last-child {
      margin-right: 0px;
    }
  }
`;
