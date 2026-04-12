import React from 'react';
import styled from 'styled-components';

import FeedbackInner from 'src/components/Feedback/inner';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { ThemeType } from 'src/theme';

import { useShowH5Header } from '../utils';

export default function Feedback() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();

  return (
    <StyledPairInfo>
      {showH5Header && <Header title={intl.feedback} />}
      <div className="page-inner">
        <FeedbackInner />
      </div>
    </StyledPairInfo>
  );
}

const StyledPairInfo = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;
  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 0 20px 30px;
  }
`;
