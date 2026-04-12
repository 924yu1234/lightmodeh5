import React from 'react';
import styled from 'styled-components';

export default function IconConnectWallet2({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-connectWallet2`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="60"
        height="93"
        viewBox="0 0 60 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.4747 0C58.3597 0 59.8877 1.52804 59.8877 3.41297L59.8874 13.2355L38.8743 13.2371C37.9991 13.2371 37.2779 13.8959 37.1793 14.7446L37.1678 14.9436V30.4377C37.1678 31.3802 37.9318 32.1442 38.8743 32.1442L59.8874 32.1433V28.3618L59.966 28.3628V17.0185L59.8874 17.0171V28.3618L42.1043 28.3628C41.6854 28.3628 41.3371 28.0609 41.2648 27.6629L41.2511 27.5095V17.8718C41.2511 17.4005 41.6331 17.0185 42.1043 17.0185L59.8874 17.0171V13.2355L60 13.2371V32.1442L59.8874 32.1433L59.8877 40.9556C59.8877 42.8406 58.3597 44.3686 56.4747 44.3686H3.41297C1.52804 44.3686 0 42.8406 0 40.9556V3.41297C0 1.52804 1.52804 0 3.41297 0H56.4747ZM50.1535 20.7999C48.9953 20.7999 48.0565 21.6694 48.0565 22.7419C48.0565 23.8144 48.9953 24.6839 50.1535 24.6839C51.3116 24.6839 52.2504 23.8144 52.2504 22.7419C52.2504 21.6694 51.3116 20.7999 50.1535 20.7999Z"
          fill="url(#paint0_linear_16_5017)"
          fillOpacity="0.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.4747 48C58.3597 48 59.8877 49.528 59.8877 51.413L59.8874 61.2355L38.8743 61.2371C37.9991 61.2371 37.2779 61.8959 37.1793 62.7446L37.1678 62.9436V78.4377C37.1678 79.3802 37.9318 80.1442 38.8743 80.1442L59.8874 80.1433V76.3618L59.966 76.3628V65.0185L59.8874 65.0171V76.3618L42.1043 76.3628C41.6854 76.3628 41.3371 76.0609 41.2648 75.6629L41.2511 75.5095V65.8718C41.2511 65.4005 41.6331 65.0185 42.1043 65.0185L59.8874 65.0171V61.2355L60 61.2371V80.1442L59.8874 80.1433L59.8877 88.9556C59.8877 90.8406 58.3597 92.3686 56.4747 92.3686H3.41297C1.52804 92.3686 0 90.8406 0 88.9556V51.413C0 49.528 1.52804 48 3.41297 48H56.4747ZM50.1535 68.7999C48.9953 68.7999 48.0565 69.6694 48.0565 70.7419C48.0565 71.8144 48.9953 72.6839 50.1535 72.6839C51.3116 72.6839 52.2504 71.8144 52.2504 70.7419C52.2504 69.6694 51.3116 68.7999 50.1535 68.7999Z"
          fill="url(#paint1_linear_16_5017)"
          fillOpacity="0.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear_16_5017"
            x1="31.2"
            y1="135.6"
            x2="31.2"
            y2="-58.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.1" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_16_5017"
            x1="30"
            y1="69.6"
            x2="30"
            y2="14.4"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
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
  color: ${({ theme }) => theme.t_b7b};
`;
