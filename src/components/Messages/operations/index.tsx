import React, { useState } from 'react';
import styled from 'styled-components';

import { useOperationMessages } from 'src/state/message/hooks';

import { useIntl } from 'js/locals';

import OperationMessage from './item';

export default function OperationMessages() {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const pageSize = 10;

  const { list, total } = useOperationMessages({
    current,
    pageSize,
  });

  return (
    <StyledList className="list">
      {list.map((l) => {
        return <OperationMessage data={l} key={l.id} />;
      })}
      {list.length === 0 && <div className="empty"></div>}
      {total > list.length ? (
        <div
          className="view-more"
          onClick={() => {
            setCurrent((pre) => pre + 1);
          }}
        >
          {intl.view_more}
        </div>
      ) : (
        <div className="no-more">{intl.thats_all}</div>
      )}
    </StyledList>
  );
}

const StyledList = styled.div`
  .empty {
    height: 60px;
    width: 100%;
  }
`;
