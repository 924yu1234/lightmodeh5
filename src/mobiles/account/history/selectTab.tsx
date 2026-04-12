import React, { useState } from 'react';
import styled from 'styled-components';

import IconArrowDown from 'src/components/Icons/arrowDown';
import Close from 'src/components/Icons/close';
import BottomModal from 'src/components/Modals/bottomModal';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function SelectTab({
  tab,
  options,
}: {
  tab: string;
  options: any[];
}) {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const [visible, setVisible] = useState(false);
  const cur = options.find((d) => d?.value === tab);
  return (
    <StyledSelectTab className="select-tab">
      <div
        className="tab-inner"
        onClick={() => {
          setVisible(true);
        }}
      >
        {cur?.label} <IconArrowDown />
      </div>
      <BottomModal
        opened={visible}
        onClose={() => {
          setVisible(false);
        }}
        size={200}
      >
        <StyledPopup className="modal-wrapper">
          <div className="modal-title">
            {intl.filter}
            <Close onClick={() => setVisible(false)} />
          </div>
          <div className="modal-content" style={{ padding: '0 15px 30px' }}>
            <div className="items">
              {options.map((option) => {
                return (
                  <div
                    key={option.value}
                    className={`item ${option.value === tab ? 'active' : ''}`}
                    onClick={() => {
                      setVisible(false);
                      navigate(`/account/history/${option.value}`, {
                        replace: true,
                      });
                    }}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        </StyledPopup>
      </BottomModal>
    </StyledSelectTab>
  );
}

const StyledSelectTab = styled.div`
  .tab-inner {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.t_fff};
  }
`;

const StyledPopup = styled.div`
  .items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px 10px;
  }
  .item {
    background: ${({ theme }) => theme.bg_white_05};
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 5px;
    height: 44px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    letter-spacing: 0;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    white-space: nowrap;
    &.active {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }
`;
