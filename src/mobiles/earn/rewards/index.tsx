import React from 'react';

import Empty from 'src/components/Empty';
import Spin from 'src/components/Spin';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import {
  useCheckGetEarnDetail,
  useIsFetchingDetails,
  useKaminoRewards,
  useMorphoRewards,
} from 'src/state/intent/earn/hooks';

import { StyledDetail } from './style';
import Kamino from './views/Kamino';
import MorphoWrapper from './views/MorphoWrapper';

export default function EarnRewards() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  useCheckGetEarnDetail();
  const isLoading = useIsFetchingDetails();
  const showList = useMorphoRewards();
  const kaminoList = useKaminoRewards();

  return (
    <StyledDetail>
      {showH5Header && <Header title={intl.Claim} backUrl="/simple-earn" />}
      <Spin spinning={isLoading}>
        <div className="rewards">
          {isLoading || showList?.length || kaminoList?.length ? (
            <>
              <MorphoWrapper />
              <Kamino />
            </>
          ) : (
            <Empty>
              <div className="empty-text">{intl.no_data}</div>
            </Empty>
          )}
        </div>
      </Spin>
    </StyledDetail>
  );
}
