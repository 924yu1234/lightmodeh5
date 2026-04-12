/* eslint-disable react/no-danger */
/* eslint-disable react/no-unknown-property */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Close from 'src/components/Icons/close';
import IconDown from 'src/components/Icons/downIcon';
import IconFaqQ from 'src/components/Icons/faqQ';
import IconWrapper from 'src/components/Icons/IconWrapper';
import BottomModal from 'src/components/Modals/bottomModal';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType, useThemeParams } from 'src/theme';

import TurboRangeFAQVideo from './video';

export default function AboutTurboRangeModal() {
  const { visible, hide, initQ } = useModals(ModalKeys.turboRangeFAQ);
  const intl = useIntl();

  const [curQuestions, setCurQuestions] = useState<string[]>([initQ || '']);

  useEffect(() => {
    if (visible) {
      setCurQuestions([initQ || '']);
    }
  }, [visible, initQ]);

  const toggle = useCallback((question: string) => {
    setCurQuestions((pre) =>
      pre.includes(question)
        ? pre.filter((item) => item !== question)
        : [...pre, question]
    );
  }, []);

  const { isMobile } = useThemeParams();

  return (
    <BottomModal
      onClose={hide}
      opened={visible}
      className="full-modal turbo-range-faq-modal"
      size={isMobile ? undefined : 445}
    >
      <StyledTipsModal className="modal-wrapper">
        <div className="modal-title">
          {intl.FAQ}
          <Close onClick={hide} />
        </div>
        <div className="modal-content">
          <div className="question-title" onClick={() => toggle('faq_2')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">
              {intl.turboRange.how_does_turbo_range_earn_yield}
            </div>
            <IconDown
              className={curQuestions.includes('faq_2') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_2') && (
            <div className="question-content">
              <TurboRangeFAQVideo visible={visible} isMobile={isMobile} />
              <div
                className="faq-text"
                dangerouslySetInnerHTML={{
                  __html:
                    intl.turboRange
                      .turbo_range_puts_your_funds_into_a_liquidity_pool_within_the_price_range_you_set_when_others_trade_in_that_range_you_earn_fees,
                }}
              ></div>
              <div className="faq-box">
                <div className="faq-bold">{intl.turboRange.example}</div>
                <div className="faq-text">
                  {
                    intl.turboRange
                      .let_s_say_you_invest_1000_USDC_in_the_TSLA_USDC_pool_and_set_a_range_of_270_330_TSLA_s_current_price_is_300
                  }
                  <br />
                  {intl.turboRange.step1}
                  <br />
                  {intl.turboRange.step2}
                  <br />
                  {intl.turboRange.step3}
                </div>
              </div>
              <div className="faq-text">
                {intl.turboRange.what_happens_in_different_price_scenarios}
              </div>
              <div className="rule-title  faq-bold">
                {intl.turboRange.desc_1}
              </div>
              <div className="rule-content">{intl.turboRange.desc_1_1}</div>
              <div className="rule-title  faq-bold">
                {intl.turboRange.desc_2}
              </div>
              <div className="rule-content">{intl.turboRange.desc_2_1}</div>
              <div className="rule-title  faq-bold">
                {intl.turboRange.desc_3}
              </div>
              <div className="rule-content">{intl.turboRange.desc_3_1}</div>
            </div>
          )}
          <div className="question-title" onClick={() => toggle('faq_1')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">{intl.turboRange.faq_1}</div>
            <IconDown
              className={curQuestions.includes('faq_1') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_1') && (
            <div className="question-content">{intl.turboRange.faq_1_text}</div>
          )}
          <div className="question-title" onClick={() => toggle('faq_3')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">{intl.turboRange.faq_3}</div>
            <IconDown
              className={curQuestions.includes('faq_3') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_3') && (
            <div className="question-content">
              <div className="faq-text">{intl.turboRange.faq_3_text1}</div>
              <div className="faq-box">
                <ul>
                  <li
                    className="faq-text"
                    dangerouslySetInnerHTML={{
                      __html: intl.turboRange.faq_3_text2,
                    }}
                  ></li>
                  <li
                    className="faq-text"
                    dangerouslySetInnerHTML={{
                      __html: intl.turboRange.faq_3_text3,
                    }}
                  ></li>
                </ul>
              </div>
              <div>{intl.turboRange.put_simply}</div>
              <div>{intl.turboRange.put_simply_text}</div>
            </div>
          )}

          <div className="question-title" onClick={() => toggle('faq_4')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">{intl.turboRange.faq_4_n}</div>
            <IconDown
              className={curQuestions.includes('faq_4') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_4') && (
            <div className="question-content">
              {intl.turboRange.faq_4_n_text}
              <br />
              <br />
              {intl.turboRange.faq_4_n_text2}
            </div>
          )}

          <div className="question-title" onClick={() => toggle('faq_5')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">{intl.turboRange.faq_4}</div>
            <IconDown
              className={curQuestions.includes('faq_5') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_5') && (
            <div className="question-content">{intl.turboRange.faq_4_text}</div>
          )}

          <div className="question-title" onClick={() => toggle('faq_6')}>
            <IconWrapper size={24}>
              <IconFaqQ />
            </IconWrapper>
            <div className="question-title-text">{intl.turboRange.faq_6}</div>
            <IconDown
              className={curQuestions.includes('faq_6') ? 'show' : ''}
            />
          </div>
          {curQuestions.includes('faq_6') && (
            <div className="question-content">{intl.turboRange.faq_6_text}</div>
          )}
        </div>
      </StyledTipsModal>
    </BottomModal>
  );
}

const StyledTipsModal = styled.div`
  .modal-content {
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }
  .question-title {
    background: ${({ theme }) => theme.bg_131a2a};
    border: 1px solid ${({ theme }) => theme.border_white_10};
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    padding: 13px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 24px;
    min-height: 40px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff}aa;
    margin-bottom: 15px;
    cursor: pointer;
    .icon-down {
      margin-left: auto;
    }
    @media (hover: hover) {
      &:hover {
        border: 1px solid ${({ theme }) => theme.border_blue};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        .icon-faqQ {
          color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
    .icon-faqQ {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    }
  }
  .question-content {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 26px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_90};
    padding: 0 15px 30px;
  }
  .faq-box {
    border: 1px solid ${({ theme }) => theme.border_white_10};
    border-radius: 5px;
    padding: 10px 15px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_90};
  }
  b {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
  ul {
    padding-left: 6px;
    li {
      position: relative;
    }
    li:before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 6px;
      height: 6px;
      left: -10px;
      top: 8px;
      background: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .faq-text {
    margin-bottom: 20px;
  }
  .faq-bold {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
  .rule-title {
    margin-top: 15px;
  }
`;
