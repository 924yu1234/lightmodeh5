import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  Checkbox,
  Checkbox as DeCheckbox,
  Input,
  Modal,
  UIButton,
} from 'src/UI';

import { useSendLeaveSurvey } from 'src/state/send/sendService';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function LeaveSurveyModal() {
  const intl = useIntl();
  const sendLeaveSurvey = useSendLeaveSurvey();
  const { visible, hide } = useModals(ModalKeys.leaveSurvey);
  const [reason, setReason] = useState<string[]>([]);
  const [other, setOther] = useState<string>('');
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      className="survey-modal"
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledFeedbackModal>
        <div className="modal-title">
          <Close
            onClick={() => {
              sendLeaveSurvey({ reason, other });
              hide();
            }}
          />
        </div>
        <StyledFeedbackTitle
          color={!isComplete ? 'rgba(0, 160, 255, 1)' : 'white'}
        >
          {!isComplete ? intl.leave_survey_title : intl.Submitted}
        </StyledFeedbackTitle>
        <StyledFeedbackSubtitle>
          {!isComplete
            ? intl.leave_survey_subtitle
            : intl.leave_survey_thanks_for_feedback}
        </StyledFeedbackSubtitle>

        {!isComplete ? (
          <>
            <StyledCheckbox>
              <Checkbox.Group w="100%" value={reason} onChange={setReason}>
                <DeCheckbox
                  height={34}
                  showHoverBg
                  value="no_needed_token"
                  label={intl.leave_survey_no_needed_token}
                />
                <div className="divider"></div>
                <DeCheckbox
                  height={34}
                  showHoverBg
                  value="no_yield"
                  label={intl.leave_survey_no_yield}
                />
                <div className="divider"></div>
                <DeCheckbox
                  height={34}
                  showHoverBg
                  value="bad_experience"
                  label={intl.leave_survey_bad_experience}
                />
                <div className="divider"></div>
                <DeCheckbox
                  height={34}
                  showHoverBg
                  value="other_is_fine"
                  label={intl.leave_survey_other_is_fine}
                />
                <div className="divider"></div>
                <DeCheckbox
                  height={34}
                  showHoverBg
                  value="not_leaving"
                  label={intl.leave_survey_not_leaving}
                />
                <div className="divider"></div>
              </Checkbox.Group>
            </StyledCheckbox>
            <div className="other-reason">
              <DeCheckbox
                height={34}
                showHoverBg
                checked={openInput}
                label={intl.leave_survey_other_reason}
                onChange={(e) => {
                  setOpenInput(e.target.checked);
                }}
              />
            </div>
            <Input
              w="100%"
              mb="20px"
              value={other}
              onChange={(e: any) => {
                setOpenInput(true);
                if (e.target.value.length > 50) return;
                setOther(e.target.value);
              }}
            />
          </>
        ) : (
          <></>
        )}

        <UIButton
          eventName="btn_leave_survey_submit"
          w="100%"
          mt="15px"
          disabled={reason.length === 0 && !openInput && !other}
          onClick={() => {
            if (!isComplete) {
              sendLeaveSurvey({ reason, other }).then(() => {
                setIsComplete(true);
              });
            } else {
              hide();
            }
          }}
        >
          {!isComplete ? intl.Submit : intl.Close}
        </UIButton>
      </StyledFeedbackModal>
      {!isComplete && <GlobalStyle />}
    </Modal>
  );
}

const StyledFeedbackModal = styled.div`
  width: 100%;
  padding: 0 20px 20px;
  ${(props) => props.theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .other-reason {
    margin-bottom: 3px;
    width: 100%;
  }
  .mantine-Checkbox-root {
    margin-left: -7px;
  }
`;

const StyledFeedbackTitle = styled.div<{
  color?: string;
}>`
  font-size: 16px;
  font-weight: 500;
  line-height: 21.79px;
  text-align: center;
  color: ${(props) => props.color};
  margin-top: 20px;
  margin-bottom: 8px;
`;

const StyledFeedbackSubtitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledCheckbox = styled.div`
  width: 100%;
  .divider {
    height: 1px;
    background-color: ${({ theme }) => theme.bg_b7b_10};
    margin: 3px 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  html .mantine-Modal-root.survey-modal .mantine-Modal-inner {
    .mantine-Modal-content {
      width: 375px;
      min-width: 100px;
      max-width: 90%;
    }
  }
`;
