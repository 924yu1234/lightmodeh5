/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import styled from 'styled-components';

import { SegmentedControl } from 'src/UI';

import DeTooltip from 'src/components/DeTooltip';
import IconDown from 'src/components/Icons/downIcon';
import { useIntl } from 'src/locals';

export default function ModeSelectMobile({
  options = [],
  value = '',
  onChange,
}: {
  options: any[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const intl = useIntl();
  const cur = options.find((d) => d?.value === value);

  return (
    <StyledQuickTradingSetting className="quick-trading-setting">
      <div className="quick-trading-setting-tpl">
        <div className="label">
          <DeTooltip
            position="left"
            title={
              <div
                dangerouslySetInnerHTML={{
                  __html: intl.authorization_mode_tips,
                }}
              />
            }
            childrenTitle={intl.authorization_mode}
            infoSize={20}
          />
        </div>
        <StyledSelect
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {cur?.label}
          <IconDown className={`settings-down-icon ${visible ? 'show' : ''}`} />
        </StyledSelect>
      </div>
      {visible && (
        <SegmentedControl
          data={options}
          value={value}
          onChange={(val) => {
            onChange(val);
          }}
        />
      )}
    </StyledQuickTradingSetting>
  );
}

const StyledQuickTradingSetting = styled.div`
  padding: 15px 0;
  .quick-trading-setting-tpl {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .mantine-SegmentedControl-root {
    margin-top: 10px;
  }
  .label {
    ${(props) => props.theme.fontRegular};
    height: 20px;
    display: inline-block;
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.t_b7b_80};
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-right: auto;
    white-space: normal;
  }
`;

const StyledSelect = styled.div`
  white-space: nowrap;
  position: relative;
  height: 30px;
  display: flex;
  padding-left: 5px;

  ${(props) => props.theme.fontMedium};
  font-size: 14px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0;
  line-height: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;

  border-left: none;
  .settings-down-icon.show {
    transform: rotate(180deg);
  }
  .settings-down-icon {
    width: 16px;
    margin-left: 2px;
  }
`;
