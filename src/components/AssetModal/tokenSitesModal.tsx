import React from 'react';
import styled from 'styled-components';

import Close from 'src/components/Icons/close';
import useClientConfig from 'src/hooks/useClientConfig';
import { useIntl, useSetLocale } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType, useThemeParams } from 'src/theme';
import WindowOpen, { formatUrl } from 'src/utils/windowOpen';

import IconMobileBack from '../Icons/mobileBack';
import IconRightOutlined from '../Icons/RightOutlined';
import LinkWrapper from '../LinkWrapper';
import FullModal from '../Modals/fullModal';

export default function TokenSitesModal() {
  const { visible, token, hide } = useModals(ModalKeys.tokenSitesModal);
  const { isMobile } = useThemeParams();

  const clientConfig = useClientConfig(
    `tokenSites_${token?.chain?.toLowerCase()}_${token?.code?.toLowerCase()}`
  );
  const { locale } = useSetLocale();
  const intl = useIntl();

  if (!clientConfig?.data) {
    return null;
  }

  const { sites } = clientConfig.data;

  const sortedSites = (sites || []).sort((a: any, b: any) => {
    return b.rankingScore - a.rankingScore;
  });

  const hideModal = () => {
    hide();
  };

  return (
    <FullModal opened={visible} onClose={hide}>
      <StyledAssetModal className="modal-wrapper">
        <div className="modal-title">
          {isMobile && <IconMobileBack onClick={hideModal} />}
          {intl.External_Sites}
          {!isMobile && <Close onClick={hideModal} />}
        </div>
        <div className="modal-content">
          {sortedSites.map((site: any) => {
            const { title, description } = site;
            const _title = title[locale] || title['en-US'];
            const _desc = description[locale] || description['en-US'];
            return (
              <LinkWrapper url={formatUrl(site.link)}>
                <div
                  key={site.link}
                  className="token-site-item"
                  onClick={() => {
                    WindowOpen(site.link);
                  }}
                >
                  <div key={site.link} className="token-site-info">
                    <div className="token-site-item-title">{_title}</div>
                    <div className="token-site-item-desc">{_desc}</div>
                  </div>
                  <IconRightOutlined />
                </div>
              </LinkWrapper>
            );
          })}
        </div>
      </StyledAssetModal>
    </FullModal>
  );
}

const StyledAssetModal = styled.div`
  padding: 0 20px 30px;
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .token-symbol {
      margin-top: 30px;
      .token-symbol-inner {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
  .token-site-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    cursor: pointer;
    .token-site-info {
      display: flex;
      flex-direction: column;
    }
    .token-site-item-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .token-site-item-desc {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
