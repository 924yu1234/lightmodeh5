import React from 'react';
import styled from 'styled-components';

import IconOpenBrowser from 'src/components/Icons/openBrowser';
import LinkWrapperWithBg from 'src/components/LinkWrapper/wrap2';
import { useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';
export default function Descriptions({ data }: { data: any }) {
  const { description, descriptionLinks } = data || {};
  const { locale } = useSetLocale();
  const descriptionText = description?.[locale] || description?.['en-US'];
  if (!descriptionText) return null;
  return (
    <StyledDescriptions>
      <div className="description-text">{descriptionText}</div>
      {!!descriptionLinks?.length && (
        <div className="description-links">
          {descriptionLinks.map((link: any) => (
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
      )}
    </StyledDescriptions>
  );
}

const StyledDescriptions = styled.div`
  margin-bottom: 25px;
  .description-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .description-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: -8px;
  }
`;
