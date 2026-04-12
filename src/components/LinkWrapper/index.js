import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useSetLocale } from 'src/locals';

export default function LinkWrapper(props) {
  const { className, url, onClick, colorInherit, children, style } = props;
  const { languagePath } = useSetLocale();

  const showUrl = useMemo(() => {
    if (url.startsWith('http')) return url;
    if (url.startsWith('degate://browser'))
      return decodeURIComponent(url.split('?')[1].split('=')[1]);
    return `${window.location.protocol}//${window.location.host}/${languagePath}${url}`;
  }, [url, languagePath]);

  if (!url) return children;

  return (
    <StyledA
      colorInherit={colorInherit}
      href={showUrl || '#'}
      className={`${className || ''} link-wrapper`}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {props.children}
    </StyledA>
  );
}

LinkWrapper.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  colorInherit: PropTypes.bool,
  style: PropTypes.any,
};

const StyledA = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.colorInherit ? 'inherit !important' : props.theme.blue};
  &:hover {
    color: inherit;
  }
`;
