import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useApiCache from 'src/hooks/useApiCache';
import { fetchBanners } from 'src/mobiles/home/service';

import ImageBanner from './images';
import VaultBanner from './vaults';

export default function Banner({ width }: { width: number }) {
  const [banners, setBanners] = useState<any[]>([]);

  const fetch = useApiCache('home-banners', fetchBanners);

  useEffect(() => {
    fetch({ page: 1 }).then((resp) => {
      setBanners(resp);
    });
  }, [fetch]);

  if (!banners?.length) {
    return null;
  }

  const imageWidth = width / 2 - 10;

  const imageHeight = (imageWidth / 67) * 14 + 2;

  const imageBanners = banners.filter((banner) => banner.type === 'image');
  const vaultBanners = banners.filter((banner) => banner.type === 'vault');

  return (
    <StyledBanner>
      {imageBanners.length > 0 && (
        <ImageBanner banners={imageBanners} height={imageHeight} />
      )}
      {vaultBanners.length > 0 && <VaultBanner banners={vaultBanners} />}
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;
