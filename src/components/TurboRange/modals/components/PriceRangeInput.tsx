import React from 'react';
import styled from 'styled-components';

import Input from 'src/components/Input';
import { ThemeType } from 'src/theme';

interface PriceRangeInputProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

export default function PriceRangeInput({
  value,
  onChange,
  step = 0.01,
  min = 0,
  max = Infinity,
}: PriceRangeInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') return;

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, min), max);
      onChange(clampedValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      // 如果输入为空或无效，重置为当前值
      e.target.value = value.toFixed(2);
      return;
    }

    const numValue = parseFloat(inputValue);
    const clampedValue = Math.min(Math.max(numValue, min), max);
    onChange(clampedValue);
    e.target.value = clampedValue.toFixed(2);
  };

  return (
    <StyledPriceRangeInput>
      <button
        type="button"
        className="step-button decrement"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        —
      </button>
      <div className="input-container">
        <Input
          inputMode="decimal"
          value={value.toFixed(2)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="price-input"
        />
      </div>
      <button
        type="button"
        className="step-button increment"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </StyledPriceRangeInput>
  );
}

const StyledPriceRangeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  .step-button {
    width: 50px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.border_white_20};
    background: ${({ theme }) => theme.bg_white_10};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &.decrement {
      border-radius: 5px 0 0 5px;
      border-right: none;
    }

    &.increment {
      border-radius: 0 5px 5px 0;
      border-left: none;
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.bg_white_20};
      border-color: ${({ theme }) => theme.border_blue};
    }

    &:active:not(:disabled) {
      background: ${(props) => props.theme.bg_white_30};
      transform: translateY(1px);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .input-container {
    flex: 1;

    .price-input {
      border-radius: 0;
      text-align: center;
      font-weight: 600;

      &.rc-input-affix-wrapper {
        border-left: none;
        border-right: none;

        input.rc-input {
          text-align: center;
          font-weight: 600;
        }

        &:focus {
          border-color: ${({ theme }) => theme.border_blue};
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
`;
