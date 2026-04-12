import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'js/locals';

export default function NotStart() {
  const intl = useIntl();
  return (
    <StyledDiv>
      <div className="notStartBox">
        <div className="notStartConBox">
          <h1 className="notStartTitle">{intl.service_maintenance}</h1>
        </div>
      </div>
    </StyledDiv>
  );
}

NotStart.propTypes = {};

const StyledDiv = styled.div`
  height: 100%;
  padding: 30px;
  width: 100%;
  .notStartBox {
    height: 100%;
    .notStartConBox {
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      display: flex;
      margin: auto;
      text-align: center;
      letter-spacing: 0;
      color: ${(props) => props.theme.t_b7b};
      .notStartIcon {
        width: 64px;
        margin-bottom: 16px;
      }
      .notStartTitle {
        padding: 0 10px;
        margin-bottom: 8px;
        line-height: 33px;
        font-size: 24px;
        color: ${(props) => props.theme.t_b7b};
      }
      .notStartTitleTips {
        padding: 0 10px;
        margin-bottom: 8px;
        line-height: 33px;
        font-size: 14px;
        color: ${(props) => props.theme.t_b7b};
      }
      .notStartDesc {
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
`;
