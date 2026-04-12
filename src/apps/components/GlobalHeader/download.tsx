import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconDownloadApp from 'src/components/Icons/downloadApp';
import IconWrapper from 'src/components/Icons/IconWrapper';

export default function Download() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/download');
  };

  return (
    <div
      className="download-wrapper"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <IconWrapper size={40}>
        <IconDownloadApp />
      </IconWrapper>
    </div>
  );
}
