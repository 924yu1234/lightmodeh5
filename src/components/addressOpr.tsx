import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconCopy from 'src/components/Icons/copy';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconOpenBrowser from 'src/components/Icons/openBrowser';
import LinkWrapper from 'src/components/LinkWrapper';
import { DeChainId } from 'src/constants/interface';
import { useGetBrowserUrl } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import useMessage from 'src/providers/useMessage';
import windowOpen from 'src/utils/windowOpen';

export default function AddressOpr({
  tokenCode,
  address,
  chain,
  size = 20,
}: {
  tokenCode?: string;
  address?: string;
  chain: DeChainId;
  size?: number;
}) {
  const message = useMessage();
  const intl = useIntl();
  const getBrowserUrl = useGetBrowserUrl();

  const url = getBrowserUrl({
    chainId: chain,
    address,
    tx_hash: '',
    code: tokenCode,
  });

  return (
    <>
      <CopyToClipboard
        text={address || tokenCode || ''}
        onCopy={() => message.success(intl.copied)}
      >
        <IconWrapper title={intl.icon_copy} size={30} className="copy">
          <IconCopy size={size} />
        </IconWrapper>
      </CopyToClipboard>
      <LinkWrapper url={url}>
        <IconWrapper
          size={30}
          title={intl.icon_view_explorer}
          onClick={() => {
            windowOpen(url);
          }}
        >
          <IconOpenBrowser size={size} />
        </IconWrapper>
      </LinkWrapper>
    </>
  );
}
