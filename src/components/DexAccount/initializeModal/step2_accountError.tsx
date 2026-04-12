import React, { useEffect } from 'react';
import styled from 'styled-components';

import { EventType } from 'src/hooks/useEventTrack/service';
import { useLogInitializeStep } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';

export default function Step2AccountError({
  ratio,
  hideModal,
}: {
  ratio: number;
  hideModal: any;
}) {
  const intl = useIntl();
  const { order } = useModals(ModalKeys.register);
  const logInitializeStep = useLogInitializeStep({ isFull: !!order });

  useEffect(() => {
    logInitializeStep(EventType.unable_to_initialize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = intl.unable_to_create_account;
  const desc = intl['menu.register_err'];

  return (
    <StyledAccountError ratio={ratio}>
      <div className="modal-title">
        <Close onClick={hideModal} />
      </div>
      <div className="title">{title}</div>
      <div className="desc">{desc}</div>
    </StyledAccountError>
  );
}

const StyledAccountError = styled.div<{ ratio: number }>`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 24}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    line-height: 1.375;
    height: ${({ ratio }) => `${ratio * 51}px`};
    line-height: ${({ ratio }) => `${ratio * 51}px`};
    margin-bottom: ${({ ratio }) => `${ratio * 30}px`};
  }

  .desc {
    background: ${(props) => props.theme.bg_38384f};
    border-radius: 5px;
    padding: ${({ ratio }) => `${ratio * 10}px ${ratio * 15}px`};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 1.375;
    margin-bottom: ${({ ratio }) => `${ratio * 30}px`};
  }
`;
