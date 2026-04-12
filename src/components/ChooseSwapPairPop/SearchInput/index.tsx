import React, { useRef } from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import IconSearch from 'src/components/Icons/serch';
import { useIntl } from 'src/locals';

import SearchChainSelect from './SearchChainSelect';

export default function PairSearchInput(props: any) {
  const {
    onChange,
    value,
    popupHeight,
    hideCancel,
    isFocusSearchInput,
    setIsFocusSearchInput,
    isInSearchPage,
  } = props;
  const intl = useIntl();
  const ref = useRef<HTMLInputElement>(null);

  const showFilter = isInSearchPage || isFocusSearchInput;

  return (
    <StyledSearchInput className="pair-search-input">
      <Input
        placeholder={intl['trade.pair_search']}
        leftSection={<IconSearch />}
        value={value}
        ref={ref}
        onChange={onChange}
        onFocus={() => {
          if (setIsFocusSearchInput) setIsFocusSearchInput(true);
        }}
        rightSection={
          showFilter && <SearchChainSelect maxHeight={popupHeight - 100} />
        }
        autoFocus={false}
      />
      {!hideCancel && isFocusSearchInput && (
        <div
          className="cancel"
          onClick={() => {
            onChange({ target: { value: '' } });
            if (setIsFocusSearchInput) setIsFocusSearchInput(false);
          }}
        >
          {intl.Cancel}
        </div>
      )}
    </StyledSearchInput>
  );
}

const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
  .mantine-Input-wrapper {
    flex: 1;
    height: 32px;
    .mantine-Input-withIcon {
      & + .mantine-Input-input {
        padding-left: 40px;
      }
    }
    .mantine-Input-input {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b};
      border-radius: 18px;
      padding-right: 70px;
      height: 100%;
    }
  }
  .cancel {
    cursor: pointer;
    color: ${(props) => props.theme.t_fff};
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    @media (hover: hover) {
      &:hover {
        color: ${(props) => props.theme.blue};
      }
    }
  }
`;
