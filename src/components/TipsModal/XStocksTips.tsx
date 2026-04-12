import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconStatusDisabled from '../Icons/StatusDisabled';

export default function XStocksTips() {
  const intl = useIntl();
  const { visible, hide, baseToken } = useModals(ModalKeys.tips_xstocks);

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledRegionTips>
        <div className="modal-title"></div>
        <IconStatusDisabled />
        <div className="title">{intl.trading_restriction_notice}</div>
        <div
          className="desc"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: intl.trading_restriction_notice_tips,
          }}
        />
        <div className="token">{baseToken?.symbol}</div>
        <div className="tips">
          <div className="point" />
          {intl.trading_restriction_notice_tips_2}
        </div>
        <PrimaryBtn eventName="btn_region_tips_close" onClick={hide}>
          {intl.btn_confirm}
        </PrimaryBtn>
      </StyledRegionTips>
    </Modal>
  );
}

const StyledRegionTips = styled.div`
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .icon-status-disabled {
    margin: 0 auto 20px;
    display: block;
  }
  .title {
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    line-height: 24px;
    margin-bottom: 3px;
  }
  .desc {
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    text-align: center;
    line-height: 20px;
    a {
      text-decoration: underline dotted;
      text-underline-offset: 4px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
      &:visited {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
      }
    }
  }
  .token {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    line-height: 24px;
    margin: 20px 0;
  }
  .tips {
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    padding: 15px 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    .point {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      margin-top: 8px;
      margin-right: 10px;
    }
  }
  .dg-primary {
    margin-top: 20px;
    width: 100%;
  }
`;
