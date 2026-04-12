import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { Input, Popover, UIInputProps } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { isLessThan } from 'src/utils/numberUtils';

interface inputProps extends UIInputProps {
  decimals?: number;
  hideTips?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLimitDecimals(props: inputProps) {
  const intl = useIntl();
  const { decimals, onChange, hideTips, onTouchMove, onTouchStart, ...reset } =
    props;
  const [showTips, setShowTips] = useState(false);
  const showTipsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (decimals) {
        const formatValue = digit.formatWithDecimals(value, decimals, {
          floor: true,
        });
        if (isLessThan(formatValue, value)) {
          setShowTips(true);
          if (showTipsTimerRef.current) clearTimeout(showTipsTimerRef.current);
          showTipsTimerRef.current = setTimeout(() => {
            setShowTips(false);
          }, 3000);
          e.target.value = formatValue;
          onChange(e);
          return;
        }
      }
      onChange(e);
    },
    [showTipsTimerRef, decimals, onChange]
  );
  return (
    <Popover opened={showTips && !hideTips} position="top-end" offset={2}>
      <Popover.Target>
        <StyledInput>
          <Input
            {...(reset as any)}
            onChange={(e: any) => change(e) as any}
            onTouchMove={(e: React.TouchEvent<HTMLInputElement>) => {
              e.stopPropagation();
              onTouchMove?.(e);
            }}
            onTouchStart={(e: React.TouchEvent<HTMLInputElement>) => {
              e.stopPropagation();
              onTouchStart?.(e);
            }}
          />
        </StyledInput>
      </Popover.Target>
      <StyledDropdown>
        {intl.maximum_decimal_reached}
        <IconWrapper
          size={38}
          onClick={() => {
            setShowTips(false);
          }}
        >
          <Close />
        </IconWrapper>
      </StyledDropdown>
    </Popover>
  );
}

const StyledDropdown = styled(Popover.Dropdown)`
  &.mantine-Popover-dropdown {
    padding-right: 45px;
    max-width: none;
    .dg-icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;
    }
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;

const StyledInput = styled.div`
  .mantine-TextInput-section {
    width: auto;
  }
`;
