import React from 'react';
import styled from 'styled-components';

export default function ReferralBanner({
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
      className={`${className} dg-icon icon-referral-banner`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size}
        height={(size / 300) * 200}
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="webFlowGlow" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(0,160,255,0)"></stop>
            <stop offset="100%" stopColor="#00A0FF"></stop>
          </linearGradient>
          <filter id="webNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur"></feGaussianBlur>
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            ></feComposite>
          </filter>
        </defs>
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="0" y1="100" x2="300" y2="100"></line>
          <line x1="70" y1="0" x2="70" y2="200"></line>
        </g>
        <path
          d="M 240 140 L 160 100 L 70 100"
          fill="none"
          className="web-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>
        <path
          d="M 240 60 L 160 100"
          fill="none"
          className="web-link-layer"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        ></path>
        <path
          d="M 240 140 L 160 100 L 70 100"
          fill="none"
          className="web-flow-line web-link-layer"
          stroke="url(#webFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <path
          d="M 240 60 L 160 100"
          fill="none"
          className="web-flow-line web-link-layer"
          stroke="url(#webFlowGlow)"
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
        <g filter="url(#webNodeGlow)">
          <rect
            x="54"
            y="84"
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
              from="0 70 100"
              to="360 70 100"
              dur="20s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <rect
            x="60"
            y="90"
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
              from="45 70 100"
              to="-315 70 100"
              dur="10s"
              repeatCount="indefinite"
            ></animateTransform>
          </rect>
          <circle cx="70" cy="100" r="4" fill="#00A0FF">
            <animate
              attributeName="r"
              values="3.5;5;3.5"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </g>
        <rect
          x="150"
          y="90"
          width="20"
          height="20"
          rx="4"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        ></rect>
        <text
          x="160"
          y="125"
          fill="rgba(255,255,255,0.5)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          textAnchor="middle"
        >
          Lv1
        </text>
        <text
          x="160"
          y="78"
          fill="#00A0FF"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          fontWeight="600"
          textAnchor="middle"
        >
          + 30%
        </text>
        <rect
          x="230"
          y="50"
          width="16"
          height="16"
          rx="3"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        ></rect>
        <text
          x="260"
          y="60"
          fill="rgba(255,255,255,0.4)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          textAnchor="start"
        >
          Lv2
        </text>
        <text
          x="260"
          y="50"
          fill="rgba(0,160,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="600"
          textAnchor="start"
        >
          + 15%
        </text>
        <rect
          x="230"
          y="132"
          width="16"
          height="16"
          rx="3"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        ></rect>
        <text
          x="260"
          y="142"
          fill="rgba(255,255,255,0.4)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          textAnchor="start"
        >
          Lv2
        </text>
        <text
          x="260"
          y="132"
          fill="rgba(0,160,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="8"
          fontWeight="600"
          textAnchor="start"
        >
          + 15%
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

  color: ${({ theme }) => theme.blue};
  @keyframes flow-anim {
    to {
      stroke-dashoffset: -18;
    }
  }

  .web-flow-line {
    stroke-dasharray: 6 12;
    animation: flow-anim 1s linear infinite;
  }
  .web-link-layer {
    mix-blend-mode: screen;
  }
`;
