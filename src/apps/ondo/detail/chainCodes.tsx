import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import ChainIcon from 'src/components/ChainIcon';
import IconCopyGrid2 from 'src/components/Icons/copyGrid2';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMenuMore from 'src/components/Icons/menuMore';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatAddress } from 'src/utils/format';
import message from 'src/utils/message';

import { useOndoDetail } from './dataProvider';

export default function ChainCodes() {
  const { tokenMeta } = useOndoDetail();
  const intl = useIntl();
  const supportedNetworks = tokenMeta?.supportedNetworks || [];
  if (!supportedNetworks.length) {
    return null;
  }
  let main = supportedNetworks.find((network: any) => network.chainId === 1);

  if (!main) {
    main = supportedNetworks[0];
  }
  const others = supportedNetworks.filter(
    (network: any) => network.chainId !== main.chainId
  );
  return (
    <StyledChainCodes className="info-item">
      <div className="info-item-title">{intl.Contract}</div>
      <div className="info-item-value bg">
        <ChainIcon chain={main.network} />
        {formatAddress(main.address)}

        <CopyToClipboard
          text={main.address}
          onCopy={() => message.success(intl.copied)}
        >
          <IconWrapper
            title={intl.icon_copy}
            size={24}
            className="copy"
            hideHoverBg
          >
            <IconCopyGrid2 size={16} />
          </IconWrapper>
        </CopyToClipboard>
        {others?.length > 0 && (
          <Menu position="bottom-end">
            <Menu.Target>
              <div className="info-item-value bg">
                <IconMenuMore />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              {others.map((network: any) => (
                <Menu.Item key={network.chainId}>
                  <StyledChainCodeItem className="info-item-value bg">
                    <ChainIcon chain={network.network} />
                    {formatAddress(network.address)}
                    <CopyToClipboard
                      text={network.address}
                      onCopy={() => message.success(intl.copied)}
                    >
                      <IconWrapper
                        title={intl.icon_copy}
                        size={24}
                        className="copy"
                        hideHoverBg
                      >
                        <IconCopyGrid2 size={16} />
                      </IconWrapper>
                    </CopyToClipboard>
                  </StyledChainCodeItem>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </StyledChainCodes>
  );
}

const StyledChainCodes = styled.div``;

const StyledChainCodeItem = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  word-break: break-all;
  text-align: right;
`;
