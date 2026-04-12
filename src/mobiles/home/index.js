import React, { useEffect, useState } from 'react';

import BannerMessage from 'src/components/ServerMessages/banner';
import { useCheckAndShowUserInterview } from 'src/state/notification/hooks';
import { useShowMHomeDownloadBanner } from 'src/state/user/hooks';

import GlobalFooter from 'js/mobiles/components/GlobalFooter';

import Top from '../components/top';
import MobileHomeActions from './actions';
import HomeList from './list';
import { fetchConfigs } from './service';
import { StyledMobileHome } from './style';
import Airdrops from './views/airdrops';
import Earn from './views/earn';
import Stocks from './views/stocks';
import TurboRange from './views/turboRange';

export default function MobileHome() {
  const checkAndShow = useCheckAndShowUserInterview();

  useEffect(() => {
    checkAndShow();
  }, [checkAndShow]);
  const { show } = useShowMHomeDownloadBanner();

  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    fetchConfigs('homeCards_Mobile').then((res) => {
      setConfigs(res);
    });
  }, []);

  return (
    <StyledMobileHome showDownload={show} cardSize={210}>
      <Top />
      <div className="page-inner">
        <BannerMessage />
        <MobileHomeActions />
        <div className="views-container">
          {configs.map((item) => (
            <div key={item.key}>
              {item.key === 'turboRange' && <TurboRange config={item} />}
              {item.key === 'stocks' && <Stocks config={item} />}
              {item.key === 'earn' && <Earn config={item} />}
              {item.key === 'airdrops' && <Airdrops config={item} />}
            </div>
          ))}
        </div>
        <HomeList />
      </div>
      <GlobalFooter />
    </StyledMobileHome>
  );
}
