import React from 'react';
import styled from 'styled-components';

import useClientConfig from 'src/hooks/useClientConfig';
import { useIntl, useSetLocale } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

export default function TokenSites({ token }: { token: any }) {
  const clientConfig = useClientConfig(
    `tokenSites_${token?.chain?.toLowerCase()}_${token?.code?.toLowerCase()}`
  );
  const { locale } = useSetLocale();
  const intl = useIntl();
  const showModal = useShowModal();

  if (!clientConfig?.data || !clientConfig.data.sites) {
    return null;
  }

  const { sites } = clientConfig.data;

  const sortedSites = (sites || []).sort((a: any, b: any) => {
    return b.rankingScore - a.rankingScore;
  });

  return (
    <StyledTokenSites>
      <div className="token-sites-title">{intl.External_Sites}</div>
      <div className="token-sites-list">
        {sortedSites.slice(0, 2).map((site: any) => {
          const { title, description } = site;
          const _title = title[locale] || title['en-US'];
          const _desc = description[locale] || description['en-US'];
          return (
            <div
              key={site.link}
              className="token-site-item"
              onClick={() => {
                showModal({
                  modal: ModalKeys.tokenSitesModal,
                  token,
                });
              }}
            >
              <div className="token-site-item-title">{_title}</div>
              <div className="token-site-item-desc">{_desc}</div>
            </div>
          );
        })}
      </div>
    </StyledTokenSites>
  );
}

const StyledTokenSites = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  .token-sites-list {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .token-sites-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
  .token-site-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid ${(props) => props.theme.border3};
    border-radius: 5px;
    min-height: 60px;
    padding: 10px;
    cursor: pointer;
    flex: 1;
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
