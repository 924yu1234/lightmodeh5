/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ThemeType } from './theme';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
