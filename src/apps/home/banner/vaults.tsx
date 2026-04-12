import React from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import BannerVaultItem from './bannerVaultItem';

export default function VaultBanner({ banners }: { banners: any[] }) {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  return (
    <StyledVaultBannes>
      <div className="section-title">
        <div className="title-text">{intl.turboRange.Simple_Earn}</div>
        <div
          className="title-more"
          onClick={() => {
            navigate('/simple-earn');
          }}
        >
          {intl.view_all} <IconRightOutlined />
        </div>
      </div>
      <div className="vault-list">
        {banners.slice(0, 2).map((banner) => {
          return (
            <div key={banner.id} className="vault-item">
              <BannerVaultItem banner={banner} />
            </div>
          );
        })}
      </div>
    </StyledVaultBannes>
  );
}

const StyledVaultBannes = styled.div`
  margin-top: 20px;
  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-more {
      ${(props) => props.theme.fontRegular};
      color: ${(props) => props.theme.t_b7b};
      font-size: 14px;
      line-height: 24px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
  }
  .vault-list {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    width: 100%;
    height: 90px;

    .vault-item {
      width: ${({ theme }: { theme: ThemeType }) =>
        theme.windowWidth > 1120 ? 1080 : theme.windowWidth - 40}px;
      height: 100%;
    }
  }
`;
