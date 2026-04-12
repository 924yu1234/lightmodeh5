import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function TradeInput(props: any) {
  const { value, placeholder, onFocus, ...rest } = props;
  const setSelection0 = useCallback((event: any) => {
    if (event) {
      const target = event.target;
      if (target?.setSelectionRange) target?.setSelectionRange(0, 0);
    }
  }, []); // 依赖数组为空，因此此效应只在组件挂载时运行一次

  const { showValue, showPlaceholder } = useMemo(() => {
    if (!value) {
      return {
        showValue: placeholder,
        showPlaceholder: true,
      };
    }
    return {
      showValue: value,
      showPlaceholder: false,
    };
  }, [value, placeholder]);

  return (
    <StyledWrapInput
      showPlaceholder={showPlaceholder}
      value={showValue}
      onFocus={(e: any) => {
        onFocus(e);
        if (!value) setSelection0(e);
      }}
      onChange={(e: any) => {
        if (!e.target.value) {
          setSelection0(e);
        }
      }}
      onClick={(e: any) => {
        if (!value) setSelection0(e);
      }}
      {...rest}
    />
  );
}

const StyledWrapInput = styled(Input)`
  &.mantine-Input-wrapper .mantine-Input-input {
    ${({
      showPlaceholder,
      theme,
    }: {
      showPlaceholder: boolean;
      theme: ThemeType;
    }) => (showPlaceholder ? `color: ${theme.placeholder}` : '')};
  }
`;
