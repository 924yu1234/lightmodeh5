import { createGlobalStyle } from 'styled-components';

import OpenSans600 from './font/Open_Sans/OpenSans-Bold_600.ttf';
import OpenSans500 from './font/Open_Sans/OpenSans-Medium_500.ttf';
import OpenSans400 from './font/Open_Sans/OpenSans-Regular_400.ttf';
import OpenSansSemi600 from './font/OpenSans_SemiCondensed/OpenSans_SemiCondensed-Bold_600.ttf';
import OpenSansSemi400 from './font/OpenSans_SemiCondensed/OpenSans_SemiCondensed-Regular_400.ttf';
import OxanimuBold from './font/webFonts/oxanium/Oxanium-Bold.ttf';
import SFProMedium from './font/webFonts/SF-Pro.ttf';

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`

@font-face {
  font-family: 'OpenSansRegular';
  font-display: swap;
  font-weight: 400;
  src: url(${OpenSans400}) format('truetype');
}

@font-face {
  font-family: 'OpenSansMedium';
  font-display: swap;
  font-weight: 500;
  src: url(${OpenSans500}) format('truetype');
}

@font-face {
  font-family: 'OpenSansBold';
  font-display: swap;
  font-weight: 600;
  src: url(${OpenSans600}) format('truetype');
}

@font-face {
  font-family: 'OpenSansSemiRegular';
  font-display: swap;
  font-weight: 400;
  src: url(${OpenSansSemi400}) format('truetype');
}

@font-face {
  font-family: 'OpenSansSemiBold';
  font-display: swap;
  font-weight: 600;
  src: url(${OpenSansSemi600}) format('truetype');
}

@font-face {
  font-family: 'oxanimuBold';
  font-display: swap;
  font-weight: 600;
  src: url(${OxanimuBold}) format('truetype');
}

@font-face {
  font-family: 'SFProMedium';
  font-display: swap;
  font-weight: 500;
  src: url(${SFProMedium}) format('truetype');
}
`;
