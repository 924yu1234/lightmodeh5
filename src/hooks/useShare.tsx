import React, { useCallback, useState } from 'react';
import { toPng } from 'html-to-image';

import { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { logAPPH5 } from 'src/utils/log';
import message from 'src/utils/message';

import { useIntl } from 'js/locals';

interface UseShareParams {
  targetRef: React.RefObject<HTMLDivElement>;
  fileNamePrefix?: string;
  downloadImage?: boolean;
  width?: number;
  height?: number;
  pixelRatio?: number;
}

async function convertDomToPngBase64({
  node,
  width,
  height,
  pixelRatio,
}: {
  node: HTMLDivElement;
  width: number;
  height: number;
  pixelRatio: number;
}) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  return toPng(node, {
    cacheBust: true,
    canvasHeight: height,
    canvasWidth: width,
    height,
    pixelRatio,
    width,
  });
}

export default function useShare({
  targetRef,
  fileNamePrefix = 'share',
  downloadImage = false,
  width = 420,
  height = 585,
  pixelRatio = 2,
}: UseShareParams) {
  const intl = useIntl();
  const isAppH5 = useIsAppH5();
  const { callAppPromise } = useWalletOprs();
  const [loading, setLoading] = useState(false);

  const share = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
      const node = targetRef.current;
      if (!node) {
        throw new Error('share node not found');
      }

      const base64 = await convertDomToPngBase64({
        node,
        width,
        height,
        pixelRatio,
      });

      if (downloadImage) {
        const anchor = document.createElement('a');
        anchor.href = base64;
        anchor.download = `${fileNamePrefix}-${Date.now()}.png`;
        anchor.click();
      }

      if (isAppH5) {
        await callAppPromise('share', base64);
      }
    } catch (error) {
      logAPPH5({
        event: 'share error',
        error,
      });
      const errMsg = ((error as any)?.message || error) as any;
      if (errMsg?.includes('unimplemented function')) {
        message.warning(intl.please_update_your_app_to_the_latest_version);
        return;
      }
      message.error(intl.common_err);
    } finally {
      setLoading(false);
    }
  }, [
    callAppPromise,
    downloadImage,
    fileNamePrefix,
    height,
    intl.common_err,
    intl.please_update_your_app_to_the_latest_version,
    isAppH5,
    loading,
    pixelRatio,
    targetRef,
    width,
  ]);

  return {
    loading,
    share,
  };
}
