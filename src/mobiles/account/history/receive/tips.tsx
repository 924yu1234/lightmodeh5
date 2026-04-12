import React from 'react';
import styled from 'styled-components';

import { GhostBtn } from 'src/UI';

import LinkWrapper from 'src/components/LinkWrapper';
import { Type_DAChains } from 'src/da';
import { useGetBrowserUrl } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useUserFlag } from 'src/state/user/hooks';
import WindowOpen from 'src/utils/windowOpen';

export default function ReceiveTips() {
  const intl = useIntl();
  const chain = useUserFlag('receive_history_filter_chain');
  const chainInfo = useChainInfosMap();
  const getBrowserUrl = useGetBrowserUrl();
  const { DAs } = useDexAccount();
  const url = getBrowserUrl({
    chainId: chain as Type_DAChains,
    address: DAs?.[chain as Type_DAChains]?.address,
    tx_hash: '',
    code: '',
  });
  return (
    <StyledReceive>
      <div className="text">
        {intl.History_is_currently_unavailable_for_CHAIN.replace(
          '{CHAIN}',
          chainInfo[chain as Type_DAChains]?.name || chain
        )}
      </div>
      <LinkWrapper url={url}>
        <GhostBtn
          eventName="btn_check_on_explorer"
          onClick={() => {
            WindowOpen(url, '_blank');
          }}
        >
          {intl.Check_on_Explorer}
        </GhostBtn>
      </LinkWrapper>
    </StyledReceive>
  );
}

const StyledReceive = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 100px;

  .text {
    display: flex;
    align-items: center;
    text-align: center;
    ${({ theme }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }) => theme.t_b7b};
    line-height: 19px;
    margin-bottom: 15px;
    max-width: 320px;
  }

  .dg-ghost {
    margin-top: 15px;
    min-width: 180px;
  }
`;
