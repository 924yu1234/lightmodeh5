import React from 'react';
import gif from 'imgs/DG_loading.gif';

export default function DGLoading({ className }: { className?: string }) {
  return (
    <div
      className={`${className || ''} dg-loading`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <img
        src={gif}
        alt="Loading..."
        style={{ width: '80px', height: '80px' }}
      />
    </div>
  );
}
