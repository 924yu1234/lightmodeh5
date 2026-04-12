import React, { useEffect } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import BridgeUsdcProvider from 'src/components/BridgeUsdc/dataProvider';
import BridgeUsdcInner from 'src/components/BridgeUsdc/inner';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import { useSetTitle } from 'src/providers/useWallet';

import Header from '../components/header';

export default function BridgeUsdcH5() {
  const { from = '' } = queryString.parse(location.search) ?? {};
  const setDocumentTitle = useSetTitle();
  const intl = useIntl();
  useEffect(() => {
    setDocumentTitle(intl.Bridge);
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl.Bridge]);
  const showH5Header = useShowH5Header();

  return (
    <BridgeUsdcProvider fromTokenId={Number(from)}>
      <StyledBridgeUsdc>
        {showH5Header && (
          <Header title={intl.Bridge} backUrl="/account/balance" />
        )}
        <div className="panel-inner">
          <BridgeUsdcInner />
        </div>
      </StyledBridgeUsdc>
    </BridgeUsdcProvider>
  );
}

const StyledBridgeUsdc = styled.div`
  height: ${(props) => props.theme.windowHeight}px;
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;
  .panel-inner {
    padding: 0 15px;
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    overflow: hidden auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
