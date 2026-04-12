import { useCallback, useRef } from 'react';

import { useLogSwapInput } from 'src/hooks/useEventTrack/utils/useLogSwap';

import { enterNumberCheck, isNumber } from 'js/utils/numberUtils';

import { useSwapTypeInput } from './hooks';

const CalcIntervalAfterType = 1000;

export default function useSwapTradeTypeInput() {
  const onUserInput = useSwapTypeInput();
  const logSwapInput = useLogSwapInput();

  const addtionalBaseAmount = useCallback((_baseAmount) => {
    let res = [];
    if (!isNumber(_baseAmount)) {
      res = res.concat([
        {
          field: 'quoteAmount',
          val: '',
        },
      ]);
    }
    return res;
  }, []);

  const baseTimer = useRef(null);

  const handleTypeBaseAmount = useCallback(
    (e) => {
      const val = enterNumberCheck(e.target.value);
      if (isNumber(val) || val === '' || val === '.') {
        onUserInput({
          fields: [
            { field: 'baseAmount', val },
            { field: 'isMaxModel', val: false },
          ],
        });
        if (baseTimer.current) {
          clearTimeout(baseTimer.current);
        }
        baseTimer.current = setTimeout(() => {
          onUserInput({
            fields: addtionalBaseAmount(val),
          });
        }, CalcIntervalAfterType);
      }
    },
    [onUserInput, addtionalBaseAmount]
  );

  const handleBlurBaseAmount = useCallback(
    (e) => {
      logSwapInput('5', { value: e.target.value });
      if (baseTimer.current) {
        clearTimeout(baseTimer.current);
      }
      onUserInput({
        fields: [
          { field: 'baseAmount', val: enterNumberCheck(e.target.value) },
          ...addtionalBaseAmount(e.target.value),
        ],
      });
    },
    [onUserInput, logSwapInput, addtionalBaseAmount]
  );

  const addtionalQuoteAmount = useCallback((_quoteAmount) => {
    let res = [];
    if (!isNumber(_quoteAmount)) {
      res = res.concat([
        {
          field: 'baseAmount',
          val: '',
        },
      ]);
    }
    return res;
  }, []);

  const quoteTimer = useRef(null);

  const handleTypeQuoteAmount = useCallback(
    (e) => {
      const val = enterNumberCheck(e.target.value);
      if (isNumber(val) || val === '' || val === '.') {
        onUserInput({
          fields: [
            { field: 'quoteAmount', val },
            { field: 'isMaxModel', val: false },
          ],
        });
        if (quoteTimer.current) {
          clearTimeout(quoteTimer.current);
        }
        quoteTimer.current = setTimeout(() => {
          onUserInput({
            fields: addtionalQuoteAmount(val),
          });
        }, CalcIntervalAfterType);
      }
    },
    [onUserInput, addtionalQuoteAmount]
  );

  const handleBlurQuoteAmount = useCallback(
    (e) => {
      logSwapInput('6', { value: e.target.value });
      if (quoteTimer.current) {
        clearTimeout(quoteTimer.current);
      }
      onUserInput({
        fields: [
          { field: 'quoteAmount', val: enterNumberCheck(e.target.value) },
          ...addtionalQuoteAmount(e.target.value),
        ],
      });
    },
    [onUserInput, logSwapInput, addtionalQuoteAmount]
  );

  const handleClickMaxQuoteAmount = useCallback(
    (max) => {
      logSwapInput('6', { value: max });
      if (quoteTimer.current) {
        clearTimeout(quoteTimer.current);
      }
      onUserInput({
        fields: [
          { field: 'quoteAmount', val: enterNumberCheck(max) },
          ...addtionalQuoteAmount(max),
        ],
      });
    },
    [onUserInput, logSwapInput, addtionalQuoteAmount]
  );

  const handleClickMaxBaseAmount = useCallback(
    (max) => {
      logSwapInput('6', { value: max });
      if (quoteTimer.current) {
        clearTimeout(quoteTimer.current);
      }
      onUserInput({
        fields: [
          { field: 'baseAmount', val: enterNumberCheck(max) },
          ...addtionalBaseAmount(max),
        ],
      });
    },
    [onUserInput, logSwapInput, addtionalBaseAmount]
  );

  return {
    handleBlurBaseAmount,
    handleTypeBaseAmount,
    handleBlurQuoteAmount,
    handleTypeQuoteAmount,
    handleClickMaxQuoteAmount,
    handleClickMaxBaseAmount,
  };
}
