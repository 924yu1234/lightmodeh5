import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';

import IconMobileBack from 'js/components/Icons/mobileBack';

export default function Header({ title, extraEle, backUrl = '', goBack }) {
  const navigate = useCustomNavigate();
  const isAppH5 = useIsAppH5();
  const { callAppPromise } = useWalletOprs();
  return (
    <StyledHeader className="m-header">
      <IconMobileBack
        onClick={() => {
          if (isAppH5) {
            callAppPromise('appBack');
            return;
          }
          if (goBack) {
            goBack();
            return;
          }
          if (!backUrl) {
            navigate(-1);
            return;
          }
          navigate(backUrl);
        }}
      />
      {title}
      <div className="extra-ele">{extraEle}</div>
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  extraEle: PropTypes.any,
  backUrl: PropTypes.string,
  goBack: PropTypes.func,
};

export const StyledHeader = styled.div`
  ${(props) => props.theme.fontRegular};
  background: ${(props) => props.theme.bg_main_80};
  font-size: 18px;
  color: ${(props) => props.theme.t_f4f};
  text-align: center;
  padding: 0 15px 0;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-m-back {
    position: absolute;
    left: 15px;
  }

  .extra-ele {
    position: absolute;
    right: 15px;
  }
`;
