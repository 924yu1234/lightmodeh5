import { createGlobalStyle } from 'styled-components';

// import '@mantine/dates/styles.css';
// import '@mantine/notifications/styles.css';
// import '@mantine/dropzone/styles.css';

export default createGlobalStyle`
  html {
    .m-b37d9ac7 {
      width: calc(100% - var(--mantine-spacing-md) * 2);
      position: fixed;
      z-index: var(--notifications-z-index);
      top: var(--notifications-top);
      left: var(--notifications-left);
      right: var(--notifications-right);
      bottom: var(--notifications-bottom);
      transform: var(--notifications-transform);
      max-width: var(--notifications-container-width);
    }    
  }
`;
