import React from 'react';
import iconHide from 'imgs/icon_hide.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useIntl } from 'src/locals';

import Asset from './asset';

export default function QuickActionLayer({ token, rect, onClose, onRemove }) {
  const intl = useIntl();

  return (
    <StyledQuickActionLayer onClick={onClose}>
      <div className="overlay-mask" />
      <button
        type="button"
        className="remove-action"
        style={{
          left: 10,
          top: Math.max(rect.top - 48, 0),
        }}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <span className="remove-text">
          {intl.manage_tokens_remove_confirm_btn}
        </span>
        <img src={iconHide} alt="" className="remove-icon" />
      </button>
      <div
        className="floating-card"
        style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Asset token={token} floating />
      </div>
    </StyledQuickActionLayer>
  );
}

QuickActionLayer.propTypes = {
  token: PropTypes.object.isRequired,
  rect: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const StyledQuickActionLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 260;

  .overlay-mask {
    position: absolute;
    inset: 0;
    background: rgba(7, 10, 26, 0.22);
    backdrop-filter: blur(10px);
    animation: fadeIn 0.18s ease;
  }

  .remove-action {
    position: fixed;
    width: 172px;
    height: 40px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    color: ${(props) => props.theme.t_fff};
    animation: liftUp 0.2s ease;

    background: #13132f;
    border: 1px solid rgba(183, 189, 198, 0.1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .remove-text {
    ${(props) => props.theme.fontMedium};
    font-size: 16px;
    line-height: 24px;
  }

  .remove-icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }

  .floating-card {
    position: fixed;
    padding: 0 10px;
    animation: liftUp 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes liftUp {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
