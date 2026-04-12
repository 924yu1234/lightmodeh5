import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import TokenIcon from 'src/components/Token/icon';
import { Type_DAChains } from 'src/da';
import { isEth, useGetBrowserUrl } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import { ThemeType } from 'src/theme';
import { formatTokenName, formatTokenSymbol } from 'src/utils/format';

import IconCopy from 'js/components/Icons/copy';
import IconOpenBrowser from 'js/components/Icons/openBrowser';
import LinkWrapper from 'js/components/LinkWrapper';
import message from 'js/utils/message';
import WindowOpen from 'js/utils/windowOpen';

export default function Token({ token }: { token: any }) {
  const intl = useIntl();
  const getBrowserUrl = useGetBrowserUrl();
  const tokenUrl = getBrowserUrl({
    chainId: token?.chain,
    code: token?.code,
    tx_hash: '',
    address: '',
  });

  const isChainNativeToken = useIsDAChainGasToken({ token });
  const chainInfosMap = useChainInfosMap();

  const isNoTokenContract = useMemo(() => {
    return isEth({ code: token?.code }) || isChainNativeToken;
  }, [token?.code, isChainNativeToken]);

  const ref = useRef<HTMLDivElement>(null);

  const [wrapperWidth, setWrapperWidth] = useState(335);

  useEffect(() => {
    if (ref.current) {
      setWrapperWidth(ref.current.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  const { preCode, sufCode } = useMemo(() => {
    if (!token?.code) {
      return {
        preCode: '',
        sufCode: '',
      };
    }
    const width = wrapperWidth - 150;

    if (width > (token?.code?.length || 42) * 10) {
      return {
        preCode: token?.code?.slice(0, -8),
        sufCode: token?.code?.slice(-8),
      };
    }

    const pre = Math.floor((width - 80) / 10);
    return {
      preCode: token?.code?.slice(0, pre),
      sufCode: `...${token?.code?.slice(-8)}`,
    };
  }, [wrapperWidth, token?.code]);

  return (
    <StyledToken className="item-token" ref={ref}>
      <div className="token-inner">
        <TokenIcon token={token} size={40} />
        <div className="token-right">
          <div className="item-symbol">
            <div className="item-symbol-text">
              {formatTokenSymbol(token?.symbol)}
            </div>
            <div className="item-name">{formatTokenName(token?.name)}</div>
          </div>
          <div className="item-code-wrap">
            {!isNoTokenContract ? (
              <div className="item-code">
                <div className="code-prefix">{preCode}</div>
                <div className="code-suffix">{sufCode}</div>
              </div>
            ) : (
              <div className="item-code">{intl.no_token_contract}</div>
            )}
            {!isNoTokenContract && (
              <div className="item-opr">
                <CopyToClipboard
                  text={token?.code}
                  onCopy={() => message.success(intl.copied)}
                >
                  <IconWrapper
                    title={intl.icon_copy}
                    size={24}
                    className="copy"
                    hideHoverBg
                  >
                    <IconCopy size={20} />
                  </IconWrapper>
                </CopyToClipboard>
                <LinkWrapper url={tokenUrl}>
                  <IconWrapper
                    title={intl.icon_view_explorer}
                    size={24}
                    onClick={() => {
                      WindowOpen(tokenUrl);
                    }}
                    hideHoverBg
                  >
                    <IconOpenBrowser className="view" size={20} />
                  </IconWrapper>
                </LinkWrapper>
              </div>
            )}
          </div>
        </div>
      </div>
      {isChainNativeToken && (
        <div className="token-native">
          {intl.native_token_of_XXX_chain.replace(
            'XXX',
            chainInfosMap[token?.chain as Type_DAChains]?.name ??
              token?.chain ??
              ''
          )}
        </div>
      )}
    </StyledToken>
  );
}

const StyledToken = styled.div`
  width: 100%;
  margin-bottom: 15px;

  .token-inner {
    padding: 0 10px 0 10px;
    width: 100%;
    display: flex;
    align-items: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 20px;
    min-height: 44px;
  }

  .token-icon {
    margin-right: 15px;
  }
  .item-symbol {
    display: flex;
    align-items: flex-start;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    .item-symbol-text {
      white-space: nowrap;
    }
    .item-name {
      margin-left: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
  .token-right {
    flex: 1;
    width: 100%;
    overflow: hidden;
    .item-code-wrap {
      display: flex;
      min-height: 24px;
      align-items: center;
    }
  }
  .item-code {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    .code-prefix {
      overflow: hidden;
      white-space: nowrap;
      min-width: 0;
    }
    .code {
      margin-right: auto;
    }
    .code-suffix {
      position: relative;
      margin-right: 10px;
    }
    .dg-icon-wrapper.copy {
      margin: 0 0 0 auto;
    }
  }
  .item-opr {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    .link-wrapper {
      margin-left: 10px;
    }
  }

  .token-native {
    padding: 0 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: -10px;
  }
`;
