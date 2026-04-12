import styled from 'styled-components';

export const StyledHistory = styled.div`
  padding: 15px 15px 30px;
  .history-empty {
    margin-top: 230px;
  }
  .mantine-Tabs-root {
    .mantine-Tabs-list {
      padding: 0 20px;
      margin-bottom: 10px;
    }
  }
  .history-tabs.mantine-Tabs-root {
    margin-top: 30px;
    & > .mantine-Tabs-list {
      &:before {
        display: none;
      }
      margin-bottom: 25px;
      padding: 0;
      .mantine-Tabs-tab {
        ${(props) => props.theme.fontMedium};
        min-width: 80px;
        padding: 0 20px;
        height: 27px;
        line-height: 27px;
        cursor: pointer;
        border-radius: 14px;
        font-size: 18px;
        color: ${(props) => props.theme.t_b7b};
        & + .mantine-Tabs-tab {
          margin-left: ${(props) =>
            props.theme.viewWidth < 1100 ? '5px' : '12px'};
        }
        &:hover {
          color: ${({ theme }) => theme.t_fff};
        }
      }
      .mantine-Tabs-tab[data-active] {
        color: ${({ theme }) => theme.t_000};
        background-color: ${(props) => props.theme.blue1};
      }
    }
  }
  .tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 17px;
    margin-bottom: 27px;
    .tab-item {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 80px;
      padding: 0 20px;
      height: 27px;
      cursor: pointer;
      border-radius: 14px;
      font-size: 18px;
      color: ${(props) => props.theme.t_b7b};
      margin-right: 30px;
      &.active {
        color: ${({ theme }) => theme.t_000};
        background-color: ${(props) => props.theme.blue1};
      }
    }
    .separator {
      width: 1px;
      height: 13px;
      background-color: ${(props) => props.theme.t_b7b};
      margin: 0 13px;
    }
  }

  .history-items {
    max-width: 650px;
    padding: 0 20px;
  }
  .no-more {
    max-width: 650px;
  }
  .show-time {
    padding: 10px 20px 0;
  }
  .history-day {
    font-size: 14px;
    color: ${(props) => props.theme.t_b7b_80};
    line-height: 18px;
    height: 30px;
    min-width: 140px;
    text-align: left;
  }
  .m-list .history-item-inner {
    padding: 0 20px;
  }
`;
