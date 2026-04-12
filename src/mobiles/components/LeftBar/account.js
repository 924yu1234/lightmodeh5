import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { useShowAccount } from 'src/hooks/useShowAccount';

import CopyIcon from 'js/components/Icons/copy';
import IconOpenBrowser from 'js/components/Icons/openBrowser';
import LinkWrapper from 'js/components/LinkWrapper';
import { useGetBrowserUrl } from 'js/ethers/utils';
import { useIntl } from 'js/locals';
import { useWalletWeb3 } from 'js/providers/useWallet';
import { useDexChainId } from 'js/state/application/hooks';
import message from 'js/utils/message/index.tsx';
import WindowOpen from 'js/utils/windowOpen';

export default function Account() {
  const { account } = useWalletWeb3();
  const dexChainId = useDexChainId();
  const intl = useIntl();
  const getBrowserUrl = useGetBrowserUrl();

  const url = getBrowserUrl({ chainId: dexChainId, address: account });
  const showAccount = useShowAccount();

  return (
    <StyledAccount className="account-tpl">
      <div className="addr">{showAccount}</div>
      <CopyToClipboard
        text={account}
        onCopy={() => message.success(intl.copied)}
      >
        <div className="icon-wrapper copy">
          <CopyIcon size={20} />
        </div>
      </CopyToClipboard>
      <div
        className="icon-wrapper"
        onClick={() => {
          WindowOpen(url);
        }}
      >
        <LinkWrapper url={url}>
          <IconOpenBrowser size={20} />
        </LinkWrapper>
      </div>
    </StyledAccount>
  );
}

const StyledAccount = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
  ${(props) => props.theme.fontRegular};

  .icon-wrapper {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.bg_05};
    border-radius: 5px;
    justify-content: center;
    &.copy {
      margin: 0 10px 0 10px;
    }
  }
`;
