/**
 * @fileoverview AppsFlyer OneLink Smart Script Initialization
 *
 * This module initializes the AppsFlyer OneLink Smart Script by importing
 * the core library directly. The core library sets up window.AF_SMART_SCRIPT
 * automatically when imported.
 *
 * The Smart Script automatically:
 * - Saves incoming URL parameters to localStorage
 * - Tracks web referrer information
 * - Generates OneLink URLs with proper attribution
 *
 * @see https://dev.appsflyer.com/hc/docs/dl_smart_script_v2
 *
 * @example
 * ```typescript
 * import './utils/oneLinkSmartScript';
 *
 * // After import, window.AF_SMART_SCRIPT is available
 * const result = window.AF_SMART_SCRIPT.generateOneLinkURL({
 *   oneLinkURL: 'https://degate.onelink.me/sjZL',
 *   afParameters: {
 *     mediaSource: { keys: ['utm_source'], defaultValue: 'web' }
 *   }
 * });
 * ```
 */

// Import the core Smart Script library
// This will execute the script and set up window.AF_SMART_SCRIPT
import { logger } from './logger';

import './onelink-smart-script-latest';

// Verify that the script loaded successfully
if (typeof window !== 'undefined') {
  if (!window.AF_SMART_SCRIPT) {
    logger.error('[OneLink] AppsFlyer Smart Script failed to initialize');
  } else {
    logger.debug(
      `[OneLink] AppsFlyer Smart Script v${window.AF_SMART_SCRIPT.version} loaded successfully`
    );
  }
}

export {};
