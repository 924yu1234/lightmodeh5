import { logger } from './logger';

export default function WindowOpen(url, target = '') {
  if (target === 'browser' && window.isApp) {
    if (typeof url !== 'string') {
      window.windowOpen(url, target);
      return;
    }
    if (!url.includes('degate://browser')) {
      window.location.href = `degate://browser?url=${encodeURIComponent(url)}`;
    } else {
      window.location.href = url;
    }
    return;
  }
  if (target === 'externalBrowser' && window.isApp) {
    if (typeof url !== 'string') {
      window.windowOpen(url, target);
      return;
    }
    if (!url.includes('degate://browser')) {
      const newUrl = `degate://browser?url=${encodeURIComponent(
        url
      )}&type=external`;
      window.location.href = newUrl;
    } else {
      window.location.href = `${url}&type=external`;
    }
    return;
  }
  if (window.isApp) {
    window.windowOpen(url, target);
    return;
  }
  const formattedUrl = formatUrl(url);
  const formatedTarget = target === 'externalBrowser' ? '_blank' : target;
  if (window.windowOpen) {
    window.windowOpen(formattedUrl, formatedTarget);
    return;
  }
  if (window.isMobile) {
    window.location.href = formattedUrl;
  } else {
    window.open(formattedUrl);
  }
}

export function formatUrl(url) {
  try {
    if (typeof url === 'string' && url.startsWith('degate://browser')) {
      return decodeURIComponent(url.split('?')[1].split('=')[1]);
    }
  } catch (error) {
    logger.error(error);
  }
  return url;
}

export function getUrl(url, target = '') {
  if (target === 'externalBrowser' && window.isApp) {
    return `degate://browser?url=${encodeURIComponent(url)}&type=external`;
  }
  if (target === 'browser' && window.isApp) {
    return `degate://browser?url=${encodeURIComponent(url)}`;
  }
  return url;
}
