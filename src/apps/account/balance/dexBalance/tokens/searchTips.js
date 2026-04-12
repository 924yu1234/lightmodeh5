import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'js/locals';
export default function SearchTips() {
  const intl = useIntl();

  return (
    <StyledSearchTips>
      <div className="tips">{intl.no_data}</div>
    </StyledSearchTips>
  );
}

export const StyledSearchTips = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  white-space: nowrap;
  margin-top: 30px;
  .token-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  .tips {
    color: ${(props) => props.theme.t_fff};
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    line-height: 30px;
  }
  .dg-primary {
    margin-top: 20px;
  }
`;
