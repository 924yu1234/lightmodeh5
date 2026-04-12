import React from 'react';
import styled from 'styled-components';

import IconOpenBrowser from 'src/components/Icons/openBrowser';
import LinkWrapperWithBg from 'src/components/LinkWrapper/wrap2';
import { useIntl, useSetLocale } from 'src/locals';
import WindowOpen from 'src/utils/windowOpen';
export default function Websites({ data }: { data: any }) {
  const { websites } = data;
  const { locale } = useSetLocale();
  const intl = useIntl();
  if (!websites?.length) return null;

  return (
    <StyledWebsites>
      <div className="item-title">{intl.turboRange.websites}</div>
      <div className="websites-links">
        {websites.map((link: any) => (
          <LinkWrapperWithBg
            key={link.url}
            url={link.url}
            onClick={() => {
              WindowOpen(link.url, 'externalBrowser');
            }}
          >
            {link.name[locale] || link.name['en-US']} <IconOpenBrowser />
          </LinkWrapperWithBg>
        ))}
      </div>
    </StyledWebsites>
  );
}

const StyledWebsites = styled.div`
  margin-bottom: 25px;
  .websites-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: -8px;
  }
`;
