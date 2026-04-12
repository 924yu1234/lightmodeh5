import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'js/locals';
import { useShowModalFeedback } from 'js/state/application/hooks';

export default function GlobalHeaderFeedback() {
  const intl = useIntl();
  const feedback = useShowModalFeedback();
  const menus = [
    {
      key: 'Feedback',
      onHander: () => feedback(),
      isActive: false,
      ele: intl.feedback,
    },
  ];
  return (
    <StyledGlobalHeaderMenus className="menus">
      {menus
        .filter((d) => !d.hide)
        .map((menu) => {
          return (
            <div
              key={menu.key}
              onClick={menu.onHander}
              className={`menu-item ${menu.isActive ? 'active' : ''}`}
            >
              {menu.ele}
            </div>
          );
        })}
    </StyledGlobalHeaderMenus>
  );
}

GlobalHeaderFeedback.propTypes = {};

const StyledGlobalHeaderMenus = styled.div`
  ${(props) => props.theme.fontRegular};
  flex: 0;
  display: flex;
  width: 100%;
  height: 100%;
  .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.t_b7b};
    ${(props) => props.theme.fontRegular};
    line-height: ${(props) => (props.theme.isMobile ? '24px' : '24px')};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
    font-size: 14px;
    border-radius: 5px;
    &:hover {
      color: ${(props) => props.theme.blue};
    }
  }
`;
