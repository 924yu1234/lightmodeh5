import React from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import IconWrapper from 'js/components/Icons/IconWrapper';
import IconMinus from 'js/components/Icons/minus';

import { useLongPress } from '../../hooks/useLongPress';
import IconPlus from '../Icons/plus';

export default function InputWithPM({
  value,
  onChange,
  onBlur,
  handleMinusAmount,
  handlePlusAmount,
  ...rest
}: {
  value: string;
  decimals?: number;
  onChange: (value: string) => void;
  onBlur: (e: any) => void;
  handleMinusAmount: (accelerationLevel?: number) => void;
  handlePlusAmount: (accelerationLevel?: number) => void;
}) {
  // 长按处理逻辑
  const minusLongPress = useLongPress({
    onLongPress: (accelerationLevel) => handleMinusAmount(accelerationLevel),
    onClick: () => handleMinusAmount(1),
    threshold: 300,
    accelerationInterval: 300,
    maxAcceleration: 100,
  });

  const plusLongPress = useLongPress({
    onLongPress: (accelerationLevel) => {
      handlePlusAmount(accelerationLevel);
    },
    onClick: () => handlePlusAmount(1),
    threshold: 300,
    accelerationInterval: 300,
    maxAcceleration: 100,
  });

  return (
    <StyledInput>
      <Input
        leftSection={
          <IconWrapper size={40} {...minusLongPress}>
            <IconMinus />
          </IconWrapper>
        }
        rightSection={
          <IconWrapper size={40} {...plusLongPress}>
            <IconPlus />
          </IconWrapper>
        }
        inputMode="decimal"
        className="center-input"
        value={value}
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        {...rest}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  .mantine-Input-wrapper {
    height: 50px;
    .mantine-Input-section[data-position='left'] {
      width: 60px;
      padding: 0 10px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      user-select: none;
    }
    .mantine-Input-section[data-position='right'] {
      width: 60px;
      padding: 0 10px;
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      user-select: none;
    }
    .mantine-Input-section {
      & + .mantine-Input-input {
        padding-left: 40px;
      }
    }
    .mantine-Input-input {
      height: 50px;
      text-align: center;
      font-size: 16px;
      padding-left: 60px;
      padding-right: 60px;
    }
  }
`;
