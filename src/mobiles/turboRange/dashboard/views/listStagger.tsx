import styled, { keyframes } from 'styled-components';

/**
 * Turbo Range H5 list reveal — aligned with `../.impeccable.md`:
 * calm ease-out, short travel, no bounce / no gamified overshoot.
 */
const turboRangeListReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const STAGGER_STEP_MS = 42;
const STAGGER_MAX_INDEX = 14;

export const TurboRangeStaggerItem = styled.div<{ $index: number }>`
  width: 100%;
  animation: ${turboRangeListReveal} 0.44s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $index }) =>
    `${Math.min($index, STAGGER_MAX_INDEX) * STAGGER_STEP_MS}ms`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export { STAGGER_MAX_INDEX, STAGGER_STEP_MS, turboRangeListReveal };
