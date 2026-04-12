import React from 'react';
import styled from 'styled-components';

import TermsOfServiceContent from 'js/components/terms/TermsOfServiceContent';

import Header from '../components/header';

export default function TermsOfService() {
  return (
    <StyledDiv>
      <Header title="Terms of Service" backUrl="/home" />
      <div className="page-inner">
        <TermsOfServiceContent />
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 100%;
  padding: 52px 16px 40px;
  .page-inner {
    height: calc(100vh - 52px);
    width: 100%;
    overflow: hidden auto;
  }
  .icon-m-back {
    display: none;
  }
`;
