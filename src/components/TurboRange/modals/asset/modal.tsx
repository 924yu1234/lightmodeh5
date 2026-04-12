import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import Close from 'src/components/Icons/close';
import IconCopyGrid2 from 'src/components/Icons/copyGrid2';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconMTopInfo from 'src/components/Icons/mTopInfo';
import BottomModal from 'src/components/Modals/bottomModal';
import TokenIcons from 'src/components/Token/icons';
import { useIntl } from 'src/locals';
import { useProductSettingByPoolAddress } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';
import { usePoolCreatedString } from 'src/utils/date';
import message from 'src/utils/message';

import Descriptions from './desciprton';
import MarketCap from './marketCap';
import Tvl from './tvl';
import Websites from './websites';

export default function TurboRangeAsset({ product }: { product: any }) {
  const [visible, setVisible] = useState<boolean>(false);
  const intl = useIntl();
  const closeModal = () => {
    setVisible(false);
  };

  const { baseToken, quoteToken } = product;
  const data = useProductSettingByPoolAddress(product?.poolAddress);
  const getPoolAge = usePoolCreatedString();
  if (!product) return null;

  return (
    <StyledTips className="about-turbo-range">
      <IconWrapper2
        size={32}
        onClick={() => {
          setVisible(true);
        }}
      >
        <IconMTopInfo size={16} />
      </IconWrapper2>
      <BottomModal onClose={closeModal} opened={visible}>
        <StyledTipsModal className="modal-wrapper">
          <div className="modal-title">
            {intl.turboRange.on_chain_assets_and_protocol}
            <Close onClick={closeModal} />
          </div>
          <div className="modal-content">
            <div className="pool-token">
              <TokenIcons token1={baseToken} token2={quoteToken} size={30} />
              <div className="pool-token-symbol">
                {baseToken?.symbol}/{quoteToken?.symbol}
              </div>
            </div>
            {data && <Descriptions data={data} />}
            {data && <Websites data={data} />}
            <div className="item-title">{intl.turboRange.liquidity_pool}</div>
            <CopyToClipboard
              text={product?.poolUrl}
              onCopy={() => message.success(intl.copied)}
            >
              <div className="pool-item-content">
                <div className="pool-url">
                  {product?.poolUrl?.slice(0, 30)}
                  {product?.poolUrl?.length > 30 && '...'}
                  <IconCopyGrid2 size={14} />
                </div>
              </div>
            </CopyToClipboard>
            <div className="item-title" style={{ marginTop: '25px' }}>
              {intl.turboRange.liquidity_pool_age}
            </div>
            <div className="item-content">
              {getPoolAge(product?.poolCreatedAt)}
            </div>
            <Tvl product={product} />
            <MarketCap product={product} />
          </div>
        </StyledTipsModal>
      </BottomModal>
    </StyledTips>
  );
}

const StyledTips = styled.div``;

const StyledTipsModal = styled.div`
  .modal-content {
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }
  .pool-title {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid rgba(183, 189, 198, 0.2);
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
  }

  .pool-token {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    .pool-token-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 20px;
      line-height: 20px;
    }
  }

  .item-title {
    opacity: 0.8;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    line-height: 16px;
    margin-bottom: 5px;
  }

  .pool-item-content,
  .item-content {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
  }
  .pool-url {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 6px;
    padding: 0 8px;
    line-height: 20px;
    margin-left: -8px;
    &:hover {
      background: ${({ theme }) => theme.bg_white_10};
    }
  }
`;
