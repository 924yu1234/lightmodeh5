import React from 'react';

import Empty from 'src/components/Empty';
import IconLeftOutlined from 'src/components/Icons/LeftOutlined';
import Spin from 'src/components/Spin';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import {
  useCheckGetEarnDetail,
  useIsFetchingDetails,
  useKaminoRewards,
  useMorphoRewards,
} from 'src/state/intent/earn/hooks';

import { StyledList } from './style';
import Kamino from './views/Kamino';
import MorphoWrapper from './views/MorphoWrapper';
import Rewards from './views/top';

export default function EarnRewards() {
  useCheckGetEarnDetail();

  const showList = useMorphoRewards();
  const kaminoList = useKaminoRewards();
  const isLoading = useIsFetchingDetails();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  return (
    <StyledList>
      <div className="list-inner">
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
        <Rewards />
        <Spin spinning={isLoading}>
          {isLoading || showList?.length || kaminoList?.length ? (
            <div className="rewards">
              <MorphoWrapper />
              <Kamino />
            </div>
          ) : (
            <Empty>
              <div className="empty-text">{intl.no_data}</div>
            </Empty>
          )}
        </Spin>
      </div>
    </StyledList>
  );
}
