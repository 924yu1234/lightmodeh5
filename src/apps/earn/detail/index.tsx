import React from 'react';
import { useParams } from 'react-router-dom';

import EarnDepositWarning from 'src/components/Earn/depositWarning';
import IconLeftOutlined from 'src/components/Icons/LeftOutlined';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useCheckGetEarnDetail, useVault } from 'src/state/intent/earn/hooks';

import { StyledDetail } from './style';
import Opr from './views/opr';
import EarnDetailTop from './views/top';

export default function EarnDetail() {
  const { id } = useParams();
  useCheckGetEarnDetail();
  const vault = useVault(Number(id));
  const navigate = useCustomNavigate();
  const intl = useIntl();

  return (
    <StyledDetail>
      <EarnDepositWarning vault={vault} />
      <div className="detail-inner">
        <div className="go_back">
          <div
            className="go_back_inner"
            onClick={() => {
              navigate('/simple-earn');
            }}
          >
            <IconLeftOutlined size={12} />
            {intl.go_back}
          </div>
        </div>
        <div className="detail-content">
          <EarnDetailTop id={Number(id)} />
          <Opr id={Number(id)} />
        </div>
      </div>
    </StyledDetail>
  );
}
