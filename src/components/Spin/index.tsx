import React from 'react';
import styled from 'styled-components';

export default function Spin({
  spinning,
  children,
  style,
  className,
}: {
  spinning: boolean;
  children?: React.ReactNode;
  style?: object;
  className?: string;
}) {
  return (
    <StyledSpin
      className={`spin-root ${spinning ? '' : 'hide'} ${className ?? ''}`}
      style={style}
    >
      {spinning && (
        <div key="loading">
          <div className="spin-inner">
            <span className="spin-dot spin-dot-spin">
              <i className="spin-dot-item" />
              <i className="spin-dot-item" />
              <i className="spin-dot-item" />
              <i className="spin-dot-item" />
            </span>
          </div>
        </div>
      )}
      <div className={`spin-container ${spinning ? 'spin-blur' : ''}`}>
        {children}
      </div>
    </StyledSpin>
  );
}
const StyledSpin = styled.div`
  position: relative;
  .spin-blur {
    clear: both;
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
  .spin-container {
    position: relative;
    transition: opacity 0.3s;
    height: 100%;
  }
  .spin-inner {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;

    .spin-dot-spin {
      transform: rotate(45deg);
      animation: antRotate 1.2s infinite linear;
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }

    .spin-dot {
      position: relative;
      display: inline-block;
      font-size: 20px;
      width: 1em;
      height: 1em;
    }

    .spin-dot-item {
      position: absolute;
      display: block;
      width: 9px;
      height: 9px;
      background-color: ${(props) => props.theme.bg_41a3f7};
      border-radius: 100%;
      transform: scale(0.75);
      transform-origin: 50% 50%;
      opacity: 0.3;
      animation: antSpinMove 1s infinite linear alternate;
    }

    .spin-dot-item:nth-child(1) {
      top: 0;
      left: 0;
    }

    .spin-dot-item:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.4s;
    }

    .spin-dot-item:nth-child(3) {
      right: 0;
      bottom: 0;
      animation-delay: 0.8s;
    }

    .spin-dot-item:nth-child(4) {
      bottom: 0;
      left: 0;
      animation-delay: 1.2s;
    }

    @keyframes antRotate {
      to {
        transform: rotate(405deg);
      }
    }

    @keyframes antSpinMove {
      to {
        opacity: 1;
      }
    }
  }
`;
