import React, { useState } from 'react';
import logo_dark from 'imgs/logo_dark.svg';
import { useParams } from 'react-router-dom';

import { GhostBtn, UIButton } from 'src/UI';

import InviteContent from 'src/components/invite/content';
import { useNavigateAppH5 } from 'src/h5/navigateApp';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import BrowserJumpTips, {
  useNeedJumpOut,
} from 'src/mobiles/components/browserJumpTips';
import { useThemeParams } from 'src/theme';

import { StyledCardDetail } from './style';

export default function Invite() {
  const { code } = useParams();
  const { viewWidth } = useThemeParams();

  const navigate = useCustomNavigate();
  const intl = useIntl();
  const navigateApp = useNavigateAppH5();
  const [showGuide, setShowGuide] = useState(false);
  const isNeedJumpOut = useNeedJumpOut();

  const handleOpenApp = () => {
    if (isNeedJumpOut) {
      setShowGuide(true);
    } else {
      navigateApp(`${window.location.origin}/invite/${code}`);
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
      <img src={logo_dark} alt="logo" className="logo" />
      <InviteContent width={viewWidth} />
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
