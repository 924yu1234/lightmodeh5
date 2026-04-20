import { createGlobalStyle, css } from 'styled-components';

/** 配色 视觉规范 * */
export const color = {
  main: '#41A3F7', // 主色/链接色
  error: '#FF6E6E',
};

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  .hideScrollBar, .page-inner, .dg-table-content  {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  input::placeholder, 
  textarea::placeholder {
    color: ${(props) => props.theme.placeholder};
  }

  iframe {
    background: ${({ theme }) => theme.bg_transparent};
  }

  div {
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
  }

  .required-span {
    &:before {
      content: '*';
      color: ${color.error};
    }
  }

  html {
    letter-spacing: 0;
    font-size: 16px;
  }

  .passwordType {
    cursor: pointer;
  }

  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .container {
    width: 100%;
    margin: 0 auto;
  }

  html body {
    ${({ theme }) => theme.fontBody}
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.t_d4d};
    background-color: ${(props) => props.theme.bodyBg};
    line-height: 1;
    font-feature-settings: 'tnum';
    -webkit-font-smoothing: unset;
    #dg, #root {
      height: 100%;
      width: 100%;
      overflow-x: auto;
    }
  }
  
  .dg-icon:hover {
    ${(props) => (props.theme.isMobile ? 'color: none' : '')};
  }  

  .clearfix {
    zoom: 1;

    &::before, &::after {
      content: "";
      display: table;
    }
  }

  .clearfix::after {
    content: '';
    display: table;
    clear: both;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .box-shadow {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.boxShadow};
  }

  html {
    background-color: ${(props) => props.theme.bodyBg};

    input:-internal-autofill-selected {
      background: ${({ theme }) => theme.bg_white} !important;
    }

    input:-webkit-autofill {
      font-size: 18px;
      color: ${(props) => props.theme.green1};
      -webkit-box-shadow: 0 0 0 1000px rgb(255, 255, 255) inset;
      -webkit-text-fill-color: ${(props) => props.theme.green1};
    }
    
  }
  .color-up {
    color: ${(props) => props.theme.up} !important;
  }
  .color-down {
    color: ${(props) => props.theme.down} !important
  }

  .color-buy, .dir-BUY, .color-green {
    color: ${(props) => props.theme.buy} !important;
  }
  .color-sell, .dir-SELL, .color-red {
    color: ${(props) => props.theme.sell} !important
  }

  .text-bold {
    ${(props) => props.theme.fontBold};
  }

  .order-status {
    &.status_completed,
    &.status_completed_part {
      color: ${({ theme }) => theme.blue_7eb};
    }
    &.status_open {
      color: ${(props) => props.theme.t_d4d};
    }
    &.status_canceled {
      color: ${(props) => props.theme.t_c4c4c4};
    }
  }
  .scrollBar:hover::-webkit-scrollbar, ::-webkit-scrollbar {
      width: 5px;
      height: 6px;
  }
  ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.bg_5e6673};
      border-radius: 3px;
      height: 90px;
  }

  a {
    background-color: ${({ theme }) => theme.bg_transparent};
    color: ${(props) => props.theme.bg_41a3f7};
    cursor: pointer;
    outline: none;
    text-decoration: none;
    transition: color .3s;
    text-decoration: none;
    &:-webkit-any-link {
      color: ${(props) => props.theme.bg_41a3f7};
    }
  }

  .token-code {
    ${(props) => props.theme.fontMedium};
  }

  .tr_click {
    cursor: pointer;
  }

  .cursor-pointer {
    cursor: pointer;
  }


  :root:root {
    --adm-color-primary: ${(props) => props.theme.blue};
    --adm-color-success: #00b578;
    --adm-color-warning: #ff8f1f;
    --adm-color-danger: #ff3141;
    --adm-color-white: #ffffff;
    --adm-color-weak: #999999;
    --adm-color-light: #cccccc;
    --adm-border-color: ${({ theme }) => theme.border_eeeeee};
    --adm-font-size-main: 13px;
    --adm-color-text: #333333;
  
    --adm-font-family: ${({ theme }) => theme.admFontFamily};
  }

  .tips-border {
    text-decoration: dotted underline;
    text-underline-offset: 4px;
  }

  .text-underline {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .text-underline-dotted {
    text-decoration: underline dotted;
    text-underline-offset: 4px;
  }

  .hover-text-underline:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  ${({ theme }) => theme.isMobile && MobileStyle};


  .max-btn {
    cursor: pointer;
    background: ${({ theme }) => theme.bg_blue_10};
    border-radius: 2px;
    padding: 0 4px;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }) => theme.blue};
    height: 20px;
    ${({ theme }) => theme.fontRegular};
  }
`;

const MobileStyle = css`
  .hover-text-underline {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
