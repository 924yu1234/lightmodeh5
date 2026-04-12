import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';

import { GhostBtn, UIButton } from 'src/UI';

import CardItem from 'src/components/Card/cardItem';
import { useNavigateAppH5 } from 'src/h5/navigateApp';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import BrowserJumpTips, {
  useNeedJumpOut,
} from 'src/mobiles/components/browserJumpTips';

import { StyledCardDetail } from './style';

export default function CardDetail() {
  const { cardId, cardName } = useParams();
  const { card_key } = queryString.parse(location.search) ?? {};

  const navigate = useCustomNavigate();
  const intl = useIntl();
  const navigateApp = useNavigateAppH5();

  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!cardId) {
      navigate('/home');
    }
  }, [cardId, cardName, navigate]);

  const isNeedJumpOut = useNeedJumpOut();

  const handleOpenApp = () => {
    if (isNeedJumpOut) {
      setShowGuide(true);
    } else {
      navigateApp(
        `${window.location.origin}/card/${cardId}/${cardName}?card_key=${card_key}`
      );
    }
  };

  const handleDownloadApp = () => {
    if (isNeedJumpOut) {
      setShowGuide(true);
    } else {
      navigate('/download');
    }
  };

  return (
    <StyledCardDetail>
      <CardItem cardId={cardId || ''} size={330} />
      <div className="btns">
        <UIButton
          eventName="card_open_with_DeGate_App"
          className="claim-btn"
          onClick={handleOpenApp}
        >
          {intl.open_with_DeGate_App}
        </UIButton>
        <GhostBtn
          eventName="card_download_app"
          className="download-btn"
          onClick={handleDownloadApp}
        >
          {intl.download_app}
        </GhostBtn>
      </div>
      {showGuide && <BrowserJumpTips />}
    </StyledCardDetail>
  );
}
