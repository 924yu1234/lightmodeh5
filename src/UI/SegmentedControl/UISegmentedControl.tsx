import React, { useMemo } from 'react';
import { SegmentedControl, SegmentedControlProps } from '@mantine/core';
import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

export type UISegmentedControlAppearance =
  | 'default'
  | 'swap'
  | 'compact'
  | 'pill';

export type UISegmentedControlProps = SegmentedControlProps & {
  /**
   * `swap` — App Swap Buy/Sell bar (sliding ink→green / ink→red pill).
   * `compact` — Create Position 24H/7D/30D dense segment.
   * `pill` — PillTabs (Single/Dual, dashboard main tabs): sliding pill + track.
   * `default` — theme-safe neutral track (replaces legacy hard-coded black).
   */
  appearance?: UISegmentedControlAppearance;
  /** When `appearance="swap"`, pill gradient; defaults from `value` buy/sell. */
  swapVisual?: 'buy' | 'sell';
  /** Inner segment height when `appearance="pill"` (outer = inner + 6px padding). */
  pillInnerHeight?: number;
};

const swapIndicatorBg = (theme: ThemeType, side: 'buy' | 'sell') =>
  side === 'buy'
    ? `linear-gradient(135deg, ${theme.ink} 0%, ${theme.segmentPillGreen} 100%)`
    : `linear-gradient(135deg, ${theme.ink} 0%, ${theme.swapSellCta} 100%)`;

const swapIndicatorShadow = (theme: ThemeType, side: 'buy' | 'sell') =>
  side === 'buy' ? theme.pillTabsActiveShadow : theme.swapSellPillShadow;

const StyledSegmentedControl = styled(SegmentedControl).withConfig({
  shouldForwardProp: (prop: PropertyKey) =>
    !String(prop).startsWith('$') &&
    String(prop) !== 'appearance' &&
    String(prop) !== 'swapVisual' &&
    String(prop) !== 'pillInnerHeight',
})<{
  $appearance: UISegmentedControlAppearance;
  $swapVisual: 'buy' | 'sell';
  $pillInnerHeight: number;
}>`
  &.mantine-SegmentedControl-root {
    -webkit-tap-highlight-color: transparent;

    ${({ $appearance, theme }) =>
      $appearance === 'default' &&
      css`
        background: ${theme.darkMode
          ? 'rgba(255, 255, 255, 0.08)'
          : theme.tabTrack};
        padding: 4px;
        border-radius: 10px;

        .mantine-SegmentedControl-control {
          height: 44px;
        }

        .mantine-SegmentedControl-label {
          line-height: 44px;
          padding: 0 8px;
          ${theme.fontRegular};
          font-size: 14px;
          color: ${theme.darkMode
            ? `${theme.t_b7b}cc`
            : theme.pillTabsInactiveText};
          transition: color 180ms ease;

          &[data-active] {
            color: ${theme.t_fff};
            ${theme.fontMedium};
          }
        }

        .mantine-SegmentedControl-indicator {
          border-radius: 8px;
          height: 44px;
          background: ${theme.darkMode
            ? 'rgba(255, 255, 255, 0.14)'
            : theme.bg_buy_10};
        }
      `}

    ${({ $appearance, $swapVisual, theme }) =>
      $appearance === 'swap' &&
      css`
        min-width: ${theme.swapSegmentedMinWidth};
        height: 42px;
        padding: 3px;
        border-radius: 999px;
        background: ${theme.tabTrack};

        .mantine-SegmentedControl-control {
          height: 36px;
          padding: 0;
        }

        .mantine-SegmentedControl-label {
          height: 36px;
          line-height: 36px;
          padding: 0 6px;
          font-size: 15px;
          letter-spacing: 0.01em;
          color: ${theme.pillTabsInactiveText};
          transition: transform 150ms cubic-bezier(0.25, 1, 0.5, 1),
            color 240ms cubic-bezier(0.25, 1, 0.5, 1),
            font-weight 240ms cubic-bezier(0.25, 1, 0.5, 1),
            letter-spacing 240ms cubic-bezier(0.25, 1, 0.5, 1);
          ${theme.fontRegular};

          &[data-active] {
            color: ${theme.bg_white};
            font-weight: 600;
            letter-spacing: -0.01em;
          }
        }

        .mantine-SegmentedControl-control:active
          .mantine-SegmentedControl-label {
          transform: scale(0.94);
        }

        .mantine-SegmentedControl-indicator {
          border-radius: 999px;
          height: calc(100% - 6px);
          top: 3px;
          background: ${swapIndicatorBg(theme, $swapVisual)};
          box-shadow: ${swapIndicatorShadow(theme, $swapVisual)};
          transition: transform 320ms cubic-bezier(0.34, 1.36, 0.64, 1),
            background 240ms cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 240ms cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}

    ${({ $appearance, $pillInnerHeight, theme }) =>
      $appearance === 'pill' &&
      css`
        height: ${$pillInnerHeight + 6}px;
        padding: 3px;
        border-radius: 999px;
        background: ${theme.pillTabsTrack};

        .mantine-SegmentedControl-control {
          height: ${$pillInnerHeight}px;
          padding: 0;
        }

        .mantine-SegmentedControl-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: ${$pillInnerHeight}px;
          line-height: 1.2;
          padding: 0 12px;
          font-size: 15px;
          letter-spacing: 0.01em;
          color: ${theme.pillTabsInactiveText};
          transition: transform 150ms cubic-bezier(0.25, 1, 0.5, 1),
            color 240ms cubic-bezier(0.25, 1, 0.5, 1),
            font-weight 240ms cubic-bezier(0.25, 1, 0.5, 1),
            letter-spacing 240ms cubic-bezier(0.25, 1, 0.5, 1);
          ${theme.fontRegular};

          &[data-active] {
            color: ${theme.pillTabsActiveText};
            font-weight: 600;
            letter-spacing: -0.01em;
          }
        }

        .mantine-SegmentedControl-control:active
          .mantine-SegmentedControl-label {
          transform: scale(0.94);
        }

        .mantine-SegmentedControl-indicator {
          border-radius: 999px;
          height: calc(100% - 6px);
          top: 3px;
          background: ${theme.pillTabsActiveBg};
          box-shadow: ${theme.pillTabsActiveShadow};
          transition: transform 320ms cubic-bezier(0.34, 1.36, 0.64, 1),
            box-shadow 240ms cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}

    ${({ $appearance, theme }) =>
      $appearance === 'compact' &&
      css`
        min-height: 28px;
        height: 28px;
        padding: 1px;
        border-radius: 10px;
        background: ${theme.segmentedCompactTrackBg};
        box-shadow: ${theme.segmentedCompactInsetShadow};

        .mantine-SegmentedControl-control {
          height: calc(100% - 2px);
          min-height: 24px;
        }

        .mantine-SegmentedControl-label {
          height: 100%;
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          ${theme.fontMedium};
          color: ${theme.ink};
          transition: transform 150ms cubic-bezier(0.25, 1, 0.5, 1),
            color 240ms cubic-bezier(0.25, 1, 0.5, 1);

          &[data-active] {
            color: ${theme.accent};
          }
        }

        .mantine-SegmentedControl-indicator {
          border-radius: 8px;
          height: calc(100% - 2px);
          top: 1px;
          background: ${theme.segmentedCompactActiveBg};
          box-shadow: ${theme.segmentedCompactActiveShadow};
          transition: transform 320ms cubic-bezier(0.34, 1.36, 0.64, 1),
            background-color 240ms ease, box-shadow 240ms ease;
        }

        .mantine-SegmentedControl-control:active
          .mantine-SegmentedControl-label {
          transform: scale(0.94);
        }
      `}
  }
`;

const UISegmentedControl = React.forwardRef<
  HTMLDivElement,
  UISegmentedControlProps
>(
  (
    {
      appearance = 'default',
      swapVisual,
      pillInnerHeight = 42,
      transitionDuration,
      radius,
      value,
      ...rest
    },
    ref
  ) => {
    const inferredSwap: 'buy' | 'sell' = useMemo(() => {
      if (swapVisual) return swapVisual;
      if (value === 'sell') return 'sell';
      return 'buy';
    }, [swapVisual, value]);

    let defaultTransition = 200;
    if (
      appearance === 'swap' ||
      appearance === 'compact' ||
      appearance === 'pill'
    ) {
      defaultTransition = 320;
    }
    const td = transitionDuration ?? defaultTransition;

    const r =
      radius ??
      (appearance === 'swap' || appearance === 'pill'
        ? ('xl' as const)
        : ('md' as const));

    const segmentProps = {
      ref: ref as any,
      $appearance: appearance,
      $swapVisual: inferredSwap,
      $pillInnerHeight: pillInnerHeight,
      transitionDuration: td,
      radius: r,
      withItemsBorders: false,
      value,
      ...rest,
    };

    return <StyledSegmentedControl {...(segmentProps as any)} />;
  }
);

UISegmentedControl.displayName = 'UISegmentedControl';

export default UISegmentedControl;
