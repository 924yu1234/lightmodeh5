/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-danger */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl, useSetLocale } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Spin from '../Spin';
import { getExplanations } from './service';

export enum ExplanationsType {
  AboutSignature = 'explantion_about_signature',
  DeGateBalance = 'explantion_degate_balance',
  AssetKey = 'explantion_asset_key',
  PrivyAssetKey = 'explantion_asset_key_privy',
  StopLimit = 'explantion_stop_limit',
  DCA = 'explantion_dca',
  Fees = 'explantion_fees',
  GridTutorial = 'grid_tutorial',
}

export interface Explanation {
  [key: string]: {
    is_html: boolean;
    value: any;
  };
}

export default function Explanations() {
  const {
    visible,
    hide,
    type,
    top,
    ratio = 1,
  } = useModals(ModalKeys.explanations) as {
    visible: boolean;
    hide: () => void;
    type: ExplanationsType;
    top: number;
    ratio: number;
  };

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<Explanation>({} as Explanation);
  const { locale } = useSetLocale();

  useEffect(() => {
    setLoading(true);
    getExplanations().then((resp: any) => {
      setContent(resp[`${type}_mobile`] || resp[type]);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intl = useIntl();

  const hideModal = () => {
    hide();
  };

  const title = useMemo(() => {
    return {
      [ExplanationsType.AboutSignature]: intl.learn_more_about_signatures,
      [ExplanationsType.DeGateBalance]: intl.degate_balance,
      [ExplanationsType.AssetKey]: intl['account.what_is_asset_key'],
      [ExplanationsType.PrivyAssetKey]: intl.about_asset_key,
      [ExplanationsType.StopLimit]: intl['trade.what_is_stop_limit'],
      [ExplanationsType.DCA]: intl['dca.dca_explain'],
      [ExplanationsType.Fees]: intl.fees,
      [ExplanationsType.GridTutorial]: intl.Tutorial,
    }[type];
  }, [type, intl]);

  const message = useMemo(() => {
    const localeRes = {
      value: intl[type],
      is_html: true,
    };
    if (
      type === ExplanationsType.Fees ||
      type === ExplanationsType.PrivyAssetKey
    ) {
      return localeRes;
    }

    if (!content) return localeRes ?? null;
    return content[locale] || localeRes || content['en-US'];
  }, [content, locale, type, intl]);

  return (
    <StyledModal
      title={null}
      onClose={hideModal}
      opened={visible}
      top={top}
      ratio={ratio}
    >
      <div className="modal-title">
        {title}
        <Close onClick={hideModal} />
      </div>
      <Spin spinning={loading}>
        <div className="content">
          {!!message && (
            <>
              {message?.is_html ? (
                <div
                  className="msg-content"
                  dangerouslySetInnerHTML={{ __html: message.value }}
                />
              ) : (
                <div className="msg-content">{message?.value}</div>
              )}
            </>
          )}
        </div>
      </Spin>
      <PrimaryBtn eventName="btn_explanations_back" onClick={hideModal}>
        {intl.Back}
      </PrimaryBtn>
    </StyledModal>
  );
}

const ModalTopGap = 50;

const StyledModal = styled(Modal)<{ top: number; ratio: number }>`
  --paddingTop: ${(props: any) => {
    let _top;
    if (!props.theme.isMobile) {
      _top = 150;
    } else {
      const gap = (props.theme.windowHeight - 600) / 2;
      if (gap < 50) {
        return 50;
      }
      _top = 100;
    }
    return (props.top || _top) + ModalTopGap * props.ratio;
  }}px;
  &.mantine-Modal-root {
    .mantine-Modal-inner {
      padding-top: var(--paddingTop);
      padding-bottom: 0;
      overflow-y: auto;
    }
    .mantine-Modal-content {
      min-width: ${({ theme }: { theme: ThemeType }) => {
        return theme.isMobile ? `${theme.windowWidth - 32}px` : '450px';
      }};
      max-width: ${({ theme }: { theme: ThemeType }) =>
        theme.windowWidth * 0.33 + 30}px;
      flex: auto;
    }
  }

  &.mantine-Modal-root .mantine-Modal-content .mantine-Modal-body {
    width: 100%;
    padding: ${({ ratio }) => `${ratio * 22}px 0 ${ratio * 30}px`};

    .modal-title {
      margin-bottom: ${({ ratio }) => `${ratio * 32}px`};
      padding: ${({ ratio }) => `0 ${ratio * 16}px`};
      font-size: ${({ ratio }) => `${ratio * 14}px`};
      line-height: ${({ ratio }) => `${ratio * 19}px`};
      height: ${({ ratio }) => `${ratio * 19}px`};
      text-align: center;
    }

    .content {
      padding: ${({ ratio }) => `0 ${ratio * 16}px`};
      min-height: 100px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.modalDesc};
      font-size: ${({ ratio }) => `${ratio * 14}px`};
      line-height: ${({ ratio }) => `${ratio * 24}px`};
      width: 100%;
      overflow: auto;
      max-height: ${({ theme, ratio }: { theme: ThemeType; ratio: number }) =>
        `calc(${theme.windowHeight}px - 2 * var(--paddingTop) - ${
          150 * ratio
        }px)`};

      h4 {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        color: ${({ theme }: { theme: ThemeType }) => theme.modalText};
        margin-bottom: ${({ ratio }) => `${ratio * 10}px`};
      }
      h3 {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        color: ${({ theme }: { theme: ThemeType }) => theme.modalText};
        font-size: ${({ ratio }) => `${ratio * 18}px`};
        margin-bottom: ${({ ratio }) => `${ratio * 15}px`};
      }
      ul {
        margin: ${({ ratio }) => `${ratio * 10}px 0`};
        list-style-type: disc;
        padding-left: ${({ ratio }) => `${ratio * 30}px`};
        li {
          margin: ${({ ratio }) => ` 0 0 ${ratio * 10}px 0`};
        }
      }
      b {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      }
    }

    .line-through {
      text-decoration: line-through;
      font-style: normal;
    }

    .dg-primary.mantine-Button-root {
      width: 100%;
      margin-top: ${({ ratio }) => `${ratio * 30}px`};
      margin-left: auto;
      margin-right: auto;
      max-width: ${({ ratio }) => `${ratio * 320}px`};
      height: ${({ ratio }) => `${ratio * 40}px`};
      min-height: ${({ ratio }) => `${ratio * 40}px`};
      border-radius: ${({ ratio }) => `${ratio * 6}px`};
      font-size: ${({ ratio }) => `${ratio * 14}px`};
      line-height: ${({ ratio }) => `${ratio * 40}px`};
    }
  }
`;
