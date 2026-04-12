import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Balance = lazy(() =>
  import(/* webpackChunkName: "m_AccountBalance" */ './balance')
);

const AccountHistory = lazy(() =>
  import(/* webpackChunkName: "m_AccountHistory" */ './history')
);

export default function Account() {
  return (
    <Routes>
      <Route path="balance" element={<Balance />} />
      <Route path="balance/:tab" element={<Balance />} />
      <Route
        path="history/internalTransfer"
        element={<Navigate to="/account/history/receive" replace />}
      />
      <Route path="history" element={<AccountHistory />} />
      <Route path="history/:tab" element={<AccountHistory />} />
      <Route path="*" element={<Navigate to="balance" replace />} />
    </Routes>
  );
}
