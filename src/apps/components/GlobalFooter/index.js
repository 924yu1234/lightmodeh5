import React from 'react';
import styled from 'styled-components';

import { ExplanationsType } from 'src/components/Explanations';
import DiscordIcon from 'src/components/Icons/discordIcon';
import MediumIcon from 'src/components/Icons/mediumIcon';
import TelegramIcon from 'src/components/Icons/telegramIcon';
import TwitterIcon from 'src/components/Icons/twitterIcon';
import YoutubeIcon from 'src/components/Icons/youtubeIcon';
import usePrivateClientDeskContacts from 'src/components/PrivateClientDesk/usePrivateClientDeskContacts';

import LinkWrapper from 'js/components/LinkWrapper';
import {
  ABOUT_LINK,
  Blog,
  DISCORD,
  DOC_LINK,
  Telegram,
  Twitter,
  Youtube,
} from 'js/constants/dex';
import { useIntl } from 'js/locals';
import {
  useInfo,
  useShowExplantion,
  useShowModal,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import windowOpen from 'js/utils/windowOpen';

import MenuSelect from './menuSelect';

export default function GlobalFooter() {
  const intl = useIntl();
  const info = useInfo();
  const showModal = useShowModal();
  const releaseVersion = info?.releaseVersion;
  const showExplanation = useShowExplantion(ExplanationsType.Fees);
  const privateClientContacts = usePrivateClientDeskContacts();
  const showPrivateClientDesk = privateClientContacts?.hasConfig;

  // const [visibleFeedback, setVisibleFeedback] = useState(false);
  const menus = [
    {
      key: 'fees',
      onHander: showExplanation,
      ele: intl.fees,
    },
    {
      key: 'About',
      ele: intl.About,
      childs: [
        {
          key: 'About',
          onHander: () => windowOpen(ABOUT_LINK),
          ele: intl.about_degate,
          url: ABOUT_LINK,
        },
        {
          key: 'Document',
          onHander: () => windowOpen(DOC_LINK),
          ele: intl.document,
          url: DOC_LINK,
        },
      ],
    },
    ...(showPrivateClientDesk
      ? [
          {
            key: 'privateClientDesk',
            ele: intl.private_client_desk,
            onHander: () => {
              showModal({ modal: ModalKeys.privateClientDesk });
            },
          },
        ]
      : []),

    // {
    //   key: 'API',
    //   onHander: () => windowOpen(DOC_LINK),
    //   ele: 'API',
    // },
  ];

  const icons = [
    {
      key: 'Discord',
      onHander: () => windowOpen(DISCORD),
      ele: <DiscordIcon />,
      url: DISCORD,
    },
    {
      key: 'Twitter',
      onHander: () => windowOpen(Twitter),
      ele: <TwitterIcon />,
      url: Twitter,
    },
    {
      key: 'Telegram',
      onHander: () => windowOpen(Telegram),
      ele: <TelegramIcon />,
      url: Telegram,
    },
    {
      key: 'Blog',
      onHander: () => windowOpen(Blog),
      ele: <MediumIcon />,
      url: Blog,
    },
    {
      key: 'Youtube',
      onHander: () => windowOpen(Youtube),
      ele: <YoutubeIcon />,
      url: Youtube,
    },
  ];

  return (
    <StyledGlobalFooter>
      {menus.map((menu) => {
        if (menu.childs) {
          return <MenuSelect menu={menu} key={menu.key} />;
        }
        return menu.url ? (
          <LinkWrapper
            key={menu.key}
            url={menu.url}
            className="menu-item"
            onClick={menu.onHander}
          >
            {menu.ele}
          </LinkWrapper>
        ) : (
          <div key={menu.key} onClick={menu.onHander} className="menu-item">
            {menu.ele}
          </div>
        );
      })}
      <div className="menu-icons">
        {icons.map((menu) => {
          return (
            <LinkWrapper
              key={menu.key}
              url={menu.url}
              className="menu-icon"
              onClick={menu.onHander}
            >
              {menu.ele}
            </LinkWrapper>
          );
        })}
      </div>
      <div className="release-version">
        {!!releaseVersion && (
          <>
            {intl.release}
            {releaseVersion}
          </>
        )}
      </div>
    </StyledGlobalFooter>
  );
}
GlobalFooter.propTypes = {};
const StyledGlobalFooter = styled.div`
  width: 100%;
  min-width: ${(props) => props.theme.viewWidth}px;
  height: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.border};
  position: relative;

  .menu-item {
    cursor: pointer;
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
    height: 100%;
    min-width: 80px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.t_b7b};
    letter-spacing: 0;
    border-right: 1px solid ${(props) => props.theme.border};
    &:hover {
      background: ${(props) => props.theme.bgMenuHover};
    }
  }
  .menu-icons {
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 2px 0 0 0;
    .menu-icon {
      margin-left: 20px;
      .dg-icon {
        color: ${({ theme }) => theme.t_b7b};
      }
      &:hover .dg-icon {
        color: ${({ theme }) => theme.t_fff};
      }
    }
  }
  .release-version {
    margin: 0 20px 0 0;
    min-width: 120px;
    text-align: right;
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
    color: ${({ theme }) => theme.t_b7b_50};
  }
`;
