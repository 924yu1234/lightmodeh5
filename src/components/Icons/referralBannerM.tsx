import React from 'react';
import styled from 'styled-components';

export default function ReferralBannerM({
  className,
  size = 370,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-referral-banner-m`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size}
        height={(size / 300) * 240}
        viewBox="0 0 300 240"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="appFlowGlow"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="240"
          >
            <stop offset="0%" stopColor="rgba(0,160,255,0)"></stop>
            <stop offset="100%" stopColor="#00A0FF"></stop>
          </linearGradient>
          <filter id="appNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur"></feGaussianBlur>
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            ></feComposite>
          </filter>
        </defs>
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="150" y1="0" x2="150" y2="240"></line>
          <line x1="0" y1="100" x2="300" y2="100"></line>
        </g>
        <path
          d="M 150 100 L 150 30"
          fill="none"
          className="app-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>
        <path
          d="M 50 170 L 150 100"
          fill="none"
          className="app-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>
        <path
          d="M 150 170 L 150 100"
          fill="none"
          className="app-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>
        <path
          d="M 250 170 L 150 100"
          fill="none"
          className="app-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>

        <path
          d="M 150 100 L 150 30"
          fill="none"
          className="app-flow-line app-link-layer"
          stroke="url(#appFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M 50 170 L 150 100"
          fill="none"
          className="app-flow-line app-link-layer"
          stroke="url(#appFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M 150 170 L 150 100"
          fill="none"
          className="app-flow-line app-link-layer"
          stroke="url(#appFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M 250 170 L 150 100"
          fill="none"
          className="app-flow-line app-link-layer"
          stroke="url(#appFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>

        <g filter="url(#appNodeGlow)">
          <rect
            x="134"
            y="14"
            width="32"
            height="32"
            rx="4"
            fill="#13132F"
            stroke="#00A0FF"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 150 30"
              to="360 150 30"
              dur="20s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect
            x="140"
            y="20"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke="rgba(0,160,255,0.5)"
            strokeWidth="1"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="45 150 30"
              to="-315 150 30"
              dur="10s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <circle cx="150" cy="30" r="4" fill="#00A0FF">
            <animate
              attributeName="r"
              values="3.5;5;3.5"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </g>
        <rect
          x="140"
          y="90"
          width="20"
          height="20"
          rx="4"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        ></rect>
        <text
          x="150"
          y="125"
          fill="rgba(255,255,255,0.5)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          textAnchor="middle"
        >
          Lv1
        </text>
        <text
          x="170"
          y="103"
          fill="#00A0FF"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          fontWeight="600"
          textAnchor="start"
        >
          + 30%
        </text>
        <rect
          x="42"
          y="162"
          width="16"
          height="16"
          rx="3"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        ></rect>
        <text
          x="50"
          y="190"
          fill="rgba(0,160,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="600"
          textAnchor="middle"
        >
          + 15%
        </text>
        <text
          x="50"
          y="202"
          fill="rgba(255,255,255,0.4)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          textAnchor="middle"
        >
          Lv2
        </text>
        <rect
          x="142"
          y="162"
          width="16"
          height="16"
          rx="3"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        ></rect>
        <text
          x="150"
          y="190"
          fill="rgba(0,160,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="600"
          textAnchor="middle"
        >
          + 15%
        </text>
        <text
          x="150"
          y="202"
          fill="rgba(255,255,255,0.4)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          textAnchor="middle"
        >
          Lv2
        </text>
        <rect
          x="242"
          y="162"
          width="16"
          height="16"
          rx="3"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        ></rect>
        <text
          x="250"
          y="190"
          fill="rgba(0,160,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="600"
          textAnchor="middle"
        >
          + 15%
        </text>
        <text
          x="250"
          y="202"
          fill="rgba(255,255,255,0.4)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          textAnchor="middle"
        >
          Lv2
        </text>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  .app-flow-line {
    stroke-dasharray: 6 12;
    animation: app-flow-anim 1s linear infinite;
  }
  .app-link-layer {
    mix-blend-mode: screen;
  }
  @keyframes app-flow-anim {
    to {
      stroke-dashoffset: -18;
    }
  }
`;
