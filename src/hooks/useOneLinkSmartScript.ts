/**
 * @fileoverview React Hook for AppsFlyer OneLink Smart Script Integration
 *
 * This hook provides a React wrapper for AppsFlyer's OneLink Smart Script,
 * enabling automatic generation of OneLink URLs with UTM parameter tracking,
 * QR code generation, and impression tracking capabilities.
 *
 * @see https://dev.appsflyer.com/hc/docs/dl_smart_script_v2
 *
 * @example Basic Usage
 * ```tsx
 * const { clickURL, isLoading } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: {
 *       keys: ['utm_source'],
 *       defaultValue: 'web',
 *     },
 *   },
 * });
 *
 * if (isLoading) return <div>Loading...</div>;
 * return <a href={clickURL || '#'}>Download App</a>;
 * ```
 *
 * @example With Campaign Tracking
 * ```tsx
 * const { clickURL } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: {
 *       keys: ['utm_source', 'source'],
 *       defaultValue: 'organic',
 *     },
 *     campaign: {
 *       keys: ['utm_campaign'],
 *       defaultValue: 'app_launch',
 *     },
 *   },
 * });
 * ```
 *
 * @example QR Code Generation
 * ```tsx
 * const { clickURL, displayQrCode } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: { keys: ['utm_source'], defaultValue: 'qr_code' },
 *   },
 * });
 *
 * useEffect(() => {
 *   if (clickURL) {
 *     displayQrCode('qr-container', {
 *       logo: '/logo.png',
 *       codeColor: '#3670B8',
 *     });
 *   }
 * }, [clickURL, displayQrCode]);
 *
 * return <div id="qr-container" style={{ width: '200px', height: '200px' }} />;
 * ```
 *
 * @example Fire Impression
 * ```tsx
 * const { clickURL, fireImpression } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: { keys: ['utm_source'], defaultValue: 'landing' },
 *   },
 * });
 *
 * useEffect(() => {
 *   if (clickURL) {
 *     fireImpression(); // Note: Only works on mobile devices
 *   }
 * }, [clickURL, fireImpression]);
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import { logger } from 'src/utils/logger';

/**
 * Result returned by Smart Script's generateOneLinkURL function
 */
interface AFSmartScriptResult {
  clickURL: string;
}

/**
 * Configuration object for a single AppsFlyer parameter
 * @property keys - Array of URL parameter names to search for (e.g., ['utm_source', 'source'])
 * @property overrideValues - Optional map to override specific values (e.g., { twitter: 'twitter_int' })
 * @property defaultValue - Default value to use if no matching parameter is found
 */
interface AFParameterConfig {
  keys: string[];
  overrideValues?: Record<string, string>;
  defaultValue: string;
}

/**
 * AppsFlyer attribution and deep linking parameters
 * @see https://dev.appsflyer.com/hc/docs/dl_smart_script_v2#arguments
 */
interface AFParameters {
  /** Media source parameter (required - must have defaultValue) */
  mediaSource?: AFParameterConfig;
  /** Campaign parameter */
  campaign?: AFParameterConfig;
  /** Channel parameter */
  channel?: AFParameterConfig;
  /** Ad parameter */
  ad?: AFParameterConfig;
  /** Ad set parameter */
  adSet?: AFParameterConfig;
  /** Deep link value for in-app routing */
  deepLinkValue?: AFParameterConfig;
  /** Custom sub parameter 1 */
  afSub1?: AFParameterConfig;
  /** Custom sub parameter 2 */
  afSub2?: AFParameterConfig;
  /** Custom sub parameter 3 */
  afSub3?: AFParameterConfig;
  /** Custom sub parameter 4 */
  afSub4?: AFParameterConfig;
  /** Custom sub parameter 5 */
  afSub5?: AFParameterConfig;
  /** Array of custom parameters with custom keys */
  afCustom?: Array<{
    paramKey: string;
    keys?: string[];
    overrideValues?: Record<string, string>;
    defaultValue?: string;
  }>;
  /** Key name for Google Click ID (auto-forwarded if present) */
  googleClickIdKey?: string;
}

/**
 * Parameters for generating OneLink URL
 */
interface GenerateOneLinkParams {
  /** OneLink template URL (e.g., 'https://degate.onelink.me/sjZL') */
  oneLinkURL: string;
  /** AppsFlyer attribution parameters */
  afParameters: AFParameters;
  /** Skip URL generation if HTTP referrer contains these strings */
  referrerSkipList?: string[];
  /** Skip URL generation if current URL contains these strings */
  urlSkipList?: string[];
  /** Key name to store document.referrer value in outgoing URL */
  webReferrer?: string;
}

/**
 * Options for QR code customization
 */
interface QRCodeOptions {
  /** URL or data-URI of logo to display in center of QR code */
  logo?: string;
  /** Hex color code for QR code (e.g., '#3670B8') */
  codeColor?: string;
}

/**
 * Global AppsFlyer Smart Script interface
 * @see https://dev.appsflyer.com/hc/docs/dl_smart_script_v2
 */
interface AFSmartScript {
  /** Generate a OneLink URL based on parameters */
  generateOneLinkURL: (
    params: GenerateOneLinkParams
  ) => AFSmartScriptResult | null;
  /** Display a QR code in the specified div element (available after generateOneLinkURL) */
  displayQrCode?: (divId: string, options?: QRCodeOptions) => void;
  /** Fire an impression link (available after generateOneLinkURL, mobile only) */
  fireImpressionsLink?: () => void;
  /** Smart Script version string */
  version: string;
}

declare global {
  interface Window {
    AF_SMART_SCRIPT?: AFSmartScript;
  }
}

/**
 * Configuration options for useOneLinkSmartScript hook
 */
interface UseOneLinkSmartScriptOptions {
  /** OneLink template URL (e.g., 'https://degate.onelink.me/sjZL') */
  oneLinkURL: string;
  /** AppsFlyer attribution parameters configuration */
  afParameters?: AFParameters;
  /**
   * Skip URL generation if HTTP referrer contains any of these strings
   * Useful for SRNs like Twitter and Meta ads where clicks are already reported
   */
  referrerSkipList?: string[];
  /**
   * Skip URL generation if current URL contains any of these strings
   * Example: ['af_r'] to avoid losing data from original click
   */
  urlSkipList?: string[];
  /** Key name to store document.referrer value in outgoing URL */
  webReferrer?: string;
  /**
   * Whether to automatically generate URL on mount
   * @default true
   */
  autoGenerate?: boolean;
}

/**
 * Return value of useOneLinkSmartScript hook
 */
interface UseOneLinkSmartScriptReturn {
  /** Generated OneLink URL (null if not yet generated or failed) */
  clickURL: string | null;
  /** Whether the Smart Script is still loading */
  isLoading: boolean;
  /** Error message if URL generation failed */
  error: string | null;
  /** Manually trigger URL generation (useful when autoGenerate is false) */
  generateURL: () => string | null;
  /**
   * Display a QR code containing the OneLink URL
   * @param divId - ID of the div element to render QR code into
   * @param options - Optional customization (logo, color)
   */
  displayQrCode: (divId: string, options?: QRCodeOptions) => void;
  /**
   * Fire an impression event
   * Note: Only works on mobile devices
   * Automatically delayed by 1 second as recommended by AppsFlyer
   */
  fireImpression: () => void;
}

/**
 * React Hook for AppsFlyer OneLink Smart Script
 *
 * Automatically generates OneLink URLs that:
 * - Preserve incoming URL parameters (UTM, etc.)
 * - Automatically detect platform (iOS/Android)
 * - Support QR code generation
 * - Track impressions on mobile devices
 *
 * @param options - Configuration options
 * @returns Object containing generated URL and utility functions
 *
 * @example Basic usage with auto-generated URL
 * ```tsx
 * const { clickURL, isLoading } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: {
 *       keys: ['utm_source'],
 *       defaultValue: 'web',
 *     },
 *   },
 * });
 *
 * if (isLoading) return <div>Loading...</div>;
 * return <a href={clickURL || '#'}>Download App</a>;
 * ```
 *
 * @example Manual URL generation
 * ```tsx
 * const { generateURL } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: { keys: ['utm_source'], defaultValue: 'button_click' },
 *   },
 *   autoGenerate: false,
 * });
 *
 * const handleClick = () => {
 *   const url = generateURL();
 *   if (url) window.open(url, '_blank');
 * };
 * ```
 *
 * @example With QR Code
 * ```tsx
 * const { clickURL, displayQrCode } = useOneLinkSmartScript({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: { keys: ['utm_source'], defaultValue: 'qr' },
 *   },
 * });
 *
 * useEffect(() => {
 *   if (clickURL) {
 *     displayQrCode('qr-div', { logo: '/logo.png', codeColor: '#000' });
 *   }
 * }, [clickURL, displayQrCode]);
 * ```
 */
export function useOneLinkSmartScript(
  options: UseOneLinkSmartScriptOptions
): UseOneLinkSmartScriptReturn {
  const [clickURL, setClickURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const impressionFiredRef = useRef(false);

  const {
    oneLinkURL,
    afParameters = {},
    referrerSkipList,
    urlSkipList,
    webReferrer,
    autoGenerate = true,
  } = options;

  /**
   * Load Smart Script dynamically if not already loaded
   * This ensures the script is available before attempting to generate URLs
   */
  useEffect(() => {
    let checkIntervalId: number | null = null;
    let timeoutId: number | null = null;

    const cleanup = () => {
      if (checkIntervalId !== null) {
        window.clearInterval(checkIntervalId);
        checkIntervalId = null;
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const loadSmartScript = async () => {
      try {
        if (window.AF_SMART_SCRIPT) {
          setIsLoading(false);
          return;
        }

        // Import the Smart Script module
        await import('../utils/oneLinkSmartScript');

        // Wait for AF_SMART_SCRIPT to be available
        checkIntervalId = window.setInterval(() => {
          if (window.AF_SMART_SCRIPT) {
            if (checkIntervalId !== null) {
              window.clearInterval(checkIntervalId);
              checkIntervalId = null;
            }
            setIsLoading(false);
          }
        }, 50);

        timeoutId = window.setTimeout(() => {
          if (checkIntervalId !== null) {
            window.clearInterval(checkIntervalId);
            checkIntervalId = null;
          }

          if (!window.AF_SMART_SCRIPT) {
            logger.warn(
              'Smart Script not loaded, OneLink URLs may not be generated'
            );
            setIsLoading(false);
          }
        }, 3000);
      } catch (err) {
        logger.error('Error loading Smart Script:', err);
        logger.warn('Continuing without Smart Script');
        setIsLoading(false);
      }
    };

    loadSmartScript();
    return cleanup;
  }, []);

  /**
   * Generate a OneLink URL using the configured parameters
   * @returns Generated OneLink URL or null if generation failed
   */
  const generateURL = useCallback((): string | null => {
    if (!window.AF_SMART_SCRIPT) {
      logger.error('AF_SMART_SCRIPT is not loaded');
      setError('Smart Script not loaded');
      return null;
    }

    try {
      const result = window.AF_SMART_SCRIPT.generateOneLinkURL({
        oneLinkURL,
        afParameters,
        referrerSkipList,
        urlSkipList,
        webReferrer,
      });

      if (result && result.clickURL) {
        setClickURL(result.clickURL);
        setError(null);
        return result.clickURL;
      }
      setError('Failed to generate OneLink URL');
      return null;
    } catch (err) {
      logger.error('Error generating OneLink URL:', err);
      setError('Error generating OneLink URL');
      return null;
    }
  }, [oneLinkURL, afParameters, referrerSkipList, urlSkipList, webReferrer]);

  /**
   * Auto-generate URL when script is loaded (if autoGenerate is true)
   */
  useEffect(() => {
    if (!isLoading && autoGenerate) {
      generateURL();
    }
  }, [isLoading, autoGenerate, generateURL]);

  /**
   * Display a QR code in the specified div element
   * Must be called after generateURL has successfully created a OneLink URL
   *
   * @param divId - ID of the div element to render the QR code into
   * @param qrOptions - Optional customization options
   * @param qrOptions.logo - URL or data-URI of logo image to display in center
   * @param qrOptions.codeColor - Hex color code for the QR code (default: '#000')
   *
   * @example
   * ```tsx
   * displayQrCode('qr-container', {
   *   logo: '/logo.png',
   *   codeColor: '#3670B8',
   * });
   * ```
   */
  const displayQrCode = useCallback(
    (divId: string, qrOptions?: QRCodeOptions) => {
      if (!window.AF_SMART_SCRIPT || !window.AF_SMART_SCRIPT.displayQrCode) {
        logger.error('displayQrCode is not available');
        return;
      }

      const element = document.getElementById(divId);
      if (!element) {
        logger.error(`Element with ID "${divId}" not found`);
        return;
      }

      try {
        window.AF_SMART_SCRIPT.displayQrCode(divId, qrOptions);
      } catch (err) {
        logger.error('Error displaying QR code:', err);
      }
    },
    []
  );

  /**
   * Fire an impression event for analytics
   *
   * Important Notes:
   * - Only works on mobile devices (not on desktop)
   * - Automatically delayed by 1 second as recommended by AppsFlyer
   * - Can only be fired once per session (subsequent calls are ignored)
   * - Must be called after a OneLink URL has been generated
   *
   * @example
   * ```tsx
   * useEffect(() => {
   *   if (clickURL) {
   *     fireImpression();
   *   }
   * }, [clickURL, fireImpression]);
   * ```
   */
  const fireImpression = useCallback(() => {
    if (
      !window.AF_SMART_SCRIPT ||
      !window.AF_SMART_SCRIPT.fireImpressionsLink
    ) {
      logger.error('fireImpressionsLink is not available');
      return;
    }

    if (impressionFiredRef.current) {
      logger.debug('Impression already fired');
      return;
    }

    try {
      // Wrap with setTimeout as recommended by AppsFlyer
      setTimeout(() => {
        window.AF_SMART_SCRIPT?.fireImpressionsLink?.();
        impressionFiredRef.current = true;
        logger.debug('Impression fired');
      }, 1000);
    } catch (err) {
      logger.error('Error firing impression:', err);
    }
  }, []);

  return {
    clickURL,
    isLoading,
    error,
    generateURL,
    displayQrCode,
    fireImpression,
  };
}
