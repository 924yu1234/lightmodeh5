import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

const KeyboardContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  min-width: 300px;
  margin: 0 auto;
`;

const KeyButton = styled.button<{ isSpecial?: boolean }>`
  background: ${({ theme }) => theme.bg_transparent};
  border: none;
  color: white;
  padding: 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-height: 60px;
  ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  font-size: 32px;

  &:hover {
    background: ${(props) => props.theme.bg_3b82f6_10};
  }

  ${(props) =>
    props.isSpecial &&
    `
    font-size: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_9ca3af};
  `}
`;

const DeleteIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.t_9ca3af};
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z' /%3E%3C/svg%3E")
    center/contain no-repeat;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z' /%3E%3C/svg%3E")
    center/contain no-repeat;
`;

export default function NumberKeyboard({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleNumberClick = (num: string) => {
    // 防止多个前导零
    if (value === '0' && num !== '.') {
      onChange(num);
      return;
    }

    // 处理小数点
    if (num === '.') {
      if (value.includes('.')) return; // 已经有小数点了
      if (value === '') {
        onChange('0.');
        return;
      }
    }

    onChange(value + num);
  };

  const handleDelete = () => {
    if (value.length === 0) return;

    const newValue = value.slice(0, -1);
    onChange(newValue);
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'delete'],
  ];

  return (
    <KeyboardContainer>
      {keypadNumbers.flat().map((key) => (
        <KeyButton
          key={key}
          isSpecial={key === '.' || key === 'delete'}
          onClick={() => {
            if (key === 'delete') {
              handleDelete();
            } else {
              handleNumberClick(key);
            }
          }}
        >
          {key === 'delete' ? <DeleteIcon /> : key}
        </KeyButton>
      ))}
    </KeyboardContainer>
  );
}
