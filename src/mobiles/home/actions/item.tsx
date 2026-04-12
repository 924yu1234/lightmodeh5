import React from 'react';
import styled from 'styled-components';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useSetLocale } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import useSend from 'src/state/dexAccount/opr/useSend';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { ThemeType } from 'src/theme';
import WindowOpen, { formatUrl } from 'src/utils/windowOpen';

export default function ActionItem({
  btn,
  onClick,
}: {
  btn: any;
  onClick?: () => void;
}) {
  const navigate = useCustomNavigate();
  const receive = useReceive();
  const send = useSend();
  const { locale } = useSetLocale();
  const checkRegion = useCheckRegion();

  const { icon, title, url } = btn;

  const handleClick = () => {
    if (!checkRegion()) return;
    gaEvent?.('home_action_click', { url });

    if (url.includes('degate://commonweb?url=')) {
      const _url = url.split('degate://commonweb?url=')[1];
      navigate(`/${_url}`);
      return;
    }

    if (url.includes('degate://browser?url=')) {
      const _url = formatUrl(url);
      WindowOpen(_url);
      return;
    }

    if (url.includes('https://') || url.includes('http://')) {
      WindowOpen(url);
      return;
    }

    if (url === '/receive') {
      receive();
    } else if (url === '/send') {
      send({ token: undefined });
    } else if (url) {
      navigate(url);
    }
    if (onClick) {
      onClick();
    }
  };

  const showTitle = title[locale] || title['en-US'];
  const gaEvent = useGaEvent();

  return (
    <StyledActions className="action-item" onClick={handleClick}>
      <img src={icon} alt={btn.title} className="item-icon" />
      {showTitle}
    </StyledActions>
  );
}

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
  white-space: nowrap;

  .item-icon {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
  }
`;
