import React from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import Delete from '../Icons/delete';
import IconSearch from '../Icons/serch';

const SearchInput = React.forwardRef((props: any, ref: any) => {
  const { allowClear, onChange, value } = props;
  return (
    <StyledSearchInput
      leftSection={<IconSearch />}
      {...props}
      ref={ref}
      onChange={onChange}
      rightSection={
        allowClear &&
        value && (
          <Delete
            onClick={() => {
              onChange({ target: { value: '' } });
            }}
          />
        )
      }
    />
  );
});

export default SearchInput;

SearchInput.displayName = 'SearchInput';

const StyledSearchInput = styled(Input)`
  &.mantine-Input-wrapper {
    .mantine-Input-withIcon {
      & + .mantine-Input-input {
        padding-left: 40px;
      }
    }
    .mantine-Input-input {
      ${(props) => props.theme.fontRegular};
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b};
      border-radius: 15px;
      height: 100%;
    }
  }
`;
