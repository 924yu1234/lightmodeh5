import { detect } from 'detect-browser';

const MININUM_WORKING_STICKY_VERSION = '15.5.0';

// iOS Safari below 15.5.0 has issue with position:sticky while scrolling
export const isBuggySticky = () => {
  const browserInfo = detect();
  return (
    browserInfo.name.toLowerCase() === 'ios' &&
    browserInfo.version < MININUM_WORKING_STICKY_VERSION
  );
};
