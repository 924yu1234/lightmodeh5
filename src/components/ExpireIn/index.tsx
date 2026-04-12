import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { HoverCard, Input } from 'src/UI';

import { ThemeType, useThemeParams } from 'src/theme';

import { useIntl } from 'js/locals';
import { isNumber } from 'js/utils/digit';

import DeTooltip from '../DeTooltip';
import IconDown from '../Icons/downIcon';
import IconStatusSuccess from '../Icons/StatusSuccess';
import MobilePeriodSelect from './mSelect';
import PeriodSelect from './pcSelect';

const periodMap = {
  day: 'period_day_s',
  hour: 'period_hour_s',
  minute: 'period_minute_s',
};

export default function ExpireIn({
  validPeriodNum,
  onChangeNum,
  validPeriodUnit,
  onChangeUnit,
}: {
  validPeriodNum: string;
  onChangeNum: (num: string) => void;
  validPeriodUnit: string;
  onChangeUnit: (unit: string) => void;
}) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const [focus, setFocus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [num, setNum] = useState('');
  const [showSaved, setShowSaved] = useState(0);

  useLayoutEffect(() => {
    setNum(validPeriodNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSaved = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    clearSaved.current = setTimeout(() => {
      if (Date.now() > showSaved) setShowSaved(0);
    }, 3000);
    return () => {
      if (clearSaved.current) clearTimeout(clearSaved.current);
    };
  }, [showSaved]);

  const periodOptions = useMemo(() => {
    return [
      {
        value: 'day',
        label: intl[`trade.period_day`],
      },
      {
        value: 'hour',
        label: intl[`trade.period_hour`],
      },
      {
        value: 'minute',
        label: intl[`trade.period_minute`],
      },
    ];
  }, [intl]);

  const showErr = useMemo(() => {
    if (!num) return {};
    if (!isNumber(num)) {
      return {
        error: intl['trade.period_err_input_tips'],
      };
    }
    if (validPeriodUnit === 'minute' && Number(num) > 5256000) {
      return {
        error: intl['trade.max_peroid_XXX'].replace('XXX', 5256000),
        num: '5256000',
      };
    }
    if (validPeriodUnit === 'hour' && Number(num) > 87600) {
      return {
        error: intl['trade.max_peroid_XXX'].replace('XXX', 87600),
        num: '87600',
      };
    }
    if (validPeriodUnit === 'day' && Number(num) > 3650) {
      return {
        error: intl['trade.max_peroid_XXX'].replace('XXX', 3650),
        num: '3650',
      };
    }
    return {};
  }, [validPeriodUnit, num, intl]);

  return (
    <StyledExpireIn className={`expire-in ${showSettings ? 'show' : ''}`}>
      <div
        className="period-setting"
        onClick={() => {
          setShowSettings(!showSettings);
        }}
      >
        <div className="label">
          <DeTooltip
            modalTitle={intl.expire_in}
            position="left"
            title={intl['trade.expire_in_tips']}
            childrenTitle={intl.expire_in}
            infoSize={20}
          />
        </div>
        <div className="value">
          {num}
          {intl[`trade.${periodMap[validPeriodUnit as 'day']}`] ||
            validPeriodUnit}
        </div>
        <div className="setting-value">
          <IconDown className="expire-in-down-icon" />
        </div>
      </div>
      {showSettings && (
        <>
          <div
            className={`expire-in-input ${focus ? 'focus' : ''} ${
              showErr.error ? 'err' : ''
            }`}
          >
            <HoverCard position="top-start">
              <HoverCard.Target>
                <Input
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  value={num}
                  placeholder=""
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const val = e.target.value;
                    if (val === '') {
                      setNum('');
                      return;
                    }
                    if (isNumber(val) && /^[0-9]*$/.test(val)) {
                      if (parseInt(val, 10) !== Number(val)) return;
                      setNum(val);
                    }
                  }}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const val = e.target.value;
                    setFocus(false);
                    let _val: any = val;
                    if (!isNumber(val) || Number(val) === 0) {
                      _val = 1;
                    } else if (showErr?.num) {
                      _val = showErr?.num;
                    }
                    if (_val !== validPeriodNum) {
                      setShowSaved(Date.now() + 3000);
                    }
                    setNum(_val);
                    onChangeNum(_val);
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                />
              </HoverCard.Target>
              {showErr?.error && (
                <HoverCard.Dropdown style={{ padding: '10px' }}>
                  {showErr?.error}
                </HoverCard.Dropdown>
              )}
            </HoverCard>

            {isMobile ? (
              <MobilePeriodSelect
                options={periodOptions}
                value={validPeriodUnit}
                onChange={(val: string) => {
                  onChangeUnit(val);
                }}
              />
            ) : (
              <PeriodSelect
                options={periodOptions}
                value={validPeriodUnit}
                onChange={(val: string) => {
                  onChangeUnit(val);
                }}
              />
            )}
          </div>
          {!!showSaved && (
            <div className="saved">
              <IconStatusSuccess size={14} />
              {intl.Saved}
            </div>
          )}
        </>
      )}
    </StyledExpireIn>
  );
}

const StyledExpireIn = styled.div`
  &.show {
    .expire-in-down-icon {
      transform: rotate(180deg);
    }
  }
  .expire-in-down-icon {
    margin-left: 5px;
    width: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
  .period-setting {
    display: flex;
    align-items: center;
    cursor: pointer;
    .label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      height: 20px;
      display: inline-block;
      font-size: 14px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-right: auto;
    }
    .value {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
  .expire-in-input {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    padding-left: 5px;
    background: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
    border-radius: 5px;
    height: 36px;
    margin-left: auto;
    width: 100%;
    margin-top: 10px;
    .period-select {
      flex: 1;
      margin-left: 5px;
    }
    .mantine-Input-wrapper .mantine-Input-input {
      background: none;
      height: 28px;
      padding: 0 5px 0 10px;
      text-align: center;
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.border_01};
      &:hover {
        border-color: ${({ theme }: { theme: ThemeType }) =>
          theme.inputHoverBorder};
      }
      &:focus {
        border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
    &.err .mantine-Input-wrapper .mantine-Input-input {
      border-color: ${({ theme }) => theme.sell};
    }
  }

  .saved {
    display: flex;
    align-items: center;
    margin-top: 5px;
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.green};
    font-size: 14px;
    line-height: 20px;
    .dg-icon {
      margin-right: 5px;
    }
  }

  .expire_in_err {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.error};
    line-height: 16px;
    margin-top: 10px;
  }
`;
