import React from 'react';
import styled from 'styled-components';

import { PortalProps } from 'src/UI';

import { ThemeType, useThemeParams } from 'src/theme';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconWrapper from './Icons/IconWrapper';
import IconInfo from './Icons/info';
import Tooltip from './Tooltip';

export default function DeTooltip(props: {
  title: React.ReactNode; // tooltip内容
  childrenTitle?: React.ReactNode; // 显示文字
  hideInfoIcon?: boolean;
  children?: React.ReactNode;
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;
  infoSize?: number;
  modalTitle?: any; // 移动端弹窗标题
  position?: any;
  withArrow?: boolean;
  showInnerTitle?: boolean;
  align?: 'left' | 'right' | 'center';
  onShow?: () => void;
  onHide?: () => void;
}) {
  const {
    modalTitle = '',
    childrenTitle,
    hideInfoIcon = false,
    infoSize = 24,
    title = '',
    children,
    position,
    withArrow,
    showInnerTitle = true,
    align = 'center',
    onShow,
    onHide,
    portalProps,
  } = props;
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const showTips = useShowModal();
  let _showInnerTitle = showInnerTitle;
  if (modalTitle === null) {
    _showInnerTitle = false;
  }

  let _children = children;
  if (!children) {
    if (isMobile) {
      _children = (
        <>
          {childrenTitle}
          {!hideInfoIcon && (
            <IconWrapper size={infoSize}>
              <IconInfo />
            </IconWrapper>
          )}
        </>
      );
    } else if (!isMobile) {
      if (hideInfoIcon) {
        _children = childrenTitle;
      } else {
        _children = (
          <>
            <IconWrapper size={infoSize}>
              <IconInfo />
            </IconWrapper>
          </>
        );
      }
    }
  }

  if (isMobile) {
    return (
      <StyledTooltip align={align} className="dg-tooltip">
        <span
          className="dg-tooltip-m-inner"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (title) {
              if (onShow) {
                onShow();
              }
              showTips({
                onHide,
                modal: ModalKeys.tips_common,
                content: title,
                title: _showInnerTitle ? modalTitle || intl.Tips : '',
              });
            }
          }}
        >
          {_children}
        </span>
      </StyledTooltip>
    );
  }
  return (
    <StyledTooltip align={align} className="dg-tooltip">
      {!hideInfoIcon && childrenTitle}
      <Tooltip
        portalProps={portalProps}
        title={
          title
            ? ((
                <StyledTooltipInner>
                  {_showInnerTitle && modalTitle && (
                    <div className="inner-title">{modalTitle}</div>
                  )}
                  {title}
                </StyledTooltipInner>
              ) as any)
            : null
        }
        withArrow={withArrow}
        position={position}
        onShow={onShow}
        onHide={onHide}
      >
        {_children}
      </Tooltip>
    </StyledTooltip>
  );
}

const StyledTooltip = styled.span<{ align?: 'left' | 'right' | 'center' }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: ${({ align }) => {
    if (align === 'left') {
      return 'flex-start;';
    }
    if (align === 'right') {
      return 'flex-end;';
    }
    return 'center;';
  }};
  .dg-tooltip-m-inner {
    display: flex;
    align-items: center;
  }
`;

const StyledTooltipInner = styled.div`
  .inner-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    margin-bottom: 8px;
  }
  b {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;
