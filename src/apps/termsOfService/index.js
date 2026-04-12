import React from 'react';
import styled from 'styled-components';

import TermsOfServiceContent from 'js/components/terms/TermsOfServiceContent';
import { useIntl } from 'js/locals';

export default function TermsOfService() {
  const intl = useIntl();
  return (
    <StyledDiv>
      <div className="title">{intl.terms_of_service}</div>
      <TermsOfServiceContent />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 710px;
  margin: 0 auto;
  padding: 40px 20px 40px;
  .title {
    font-size: 18px;
    text-align: center;
    ${(props) => props.theme.fontBold};
    color: ${(props) => props.theme.t_f4f};
    margin-bottom: 35px;
  }
`;
