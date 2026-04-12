import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
import _ from 'lodash';
import styled from 'styled-components';

import { Input, PrimaryBtn, Textarea } from 'src/UI';

import { ThemeType, useThemeParams } from 'src/theme';

import { DISCORD } from 'js/constants/dex';
import { useIntl, useSetLocale } from 'js/locals';
import {
  useModals,
  useShowModalFeedbackSuccessTip,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import axios, { useCreateHeaders } from 'js/utils/axios';
import message from 'js/utils/message';
import WindowOpen from 'js/utils/windowOpen';

import Delete from '../Icons/delete';
import IconFeedbackEmail from '../Icons/feedbackEmail';
import IconFeedbackTelgram from '../Icons/feedbackTelgram';
import IconFile from '../Icons/File';
import FileImageOutlined from '../Icons/FileImageOutlined';
import LinkWrapper from '../LinkWrapper';
import Loader from '../Loader';

const maxFileSize = 20 * 1024 * 1024; // B

export default function FeedbackInner() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { hide } = useModals(ModalKeys.feedback);
  const feedbackSuccessTip = useShowModalFeedbackSuccessTip();
  const openRef = useRef<() => void>(null);
  const [text, changText] = useState('');
  const [filesMap, changeFiles] = useState({}); // {[timestamp + index]: {}}
  const [showDragger, setShowDragger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [telegram, setTelegram] = useState('');
  const [telegramValid, setTelegramValid] = useState(true);
  const { locale } = useSetLocale();

  const createHeaders = useCreateHeaders();

  const checkEmail = (e: any) => {
    const cur = _.trim(e.target.value);
    // eslint-disable-next-line no-useless-escape
    setEmailValid(!cur || /^[\w\.-]+@[\w\.-]+\.[\w\.-]+$/.test(cur));
  };

  const checkTelegram = (e: any) => {
    const cur = _.trim(e.target.value);
    setTelegramValid(!cur || /^[a-zA-Z0-9_]{5,32}$/.test(cur));
  };

  const files = useMemo(() => {
    return _.orderBy(
      _.values(filesMap).filter((d) => d),
      'index',
      'asc'
    );
  }, [filesMap]);

  const props = {
    name: 'file',
    multiple: true,
    maxSize: maxFileSize,
    accept: ['image/jpg', 'image/jpeg', 'image/png'],
    onDrop(fs: any) {
      const date = Date.now();
      if (files.length + fs.length > 5) {
        message.error(intl.image_upload_rule_3);
      }
      let _filesLength = files.length;
      for (let i = 0; i < fs.length; i += 1) {
        const file = fs[i];
        if (file.size >= maxFileSize) {
          message.error(intl.image_upload_rule_2);
          return;
        }
        // 最多5个文件
        if (_filesLength < 5) {
          _filesLength += 1;
          upload(file, date + i);
        }
      }
    },
  };

  const upload = (file: any, index: number) => {
    const param = new FormData();
    param.append('upload', file);
    changeFiles((pre) => {
      return {
        ...pre,
        [index]: { file, index },
      };
    });

    return axios({
      method: 'post',
      url: '/order-book-api/upload',
      data: param,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res: any) => {
        changeFiles((pre: any) => {
          return {
            ...pre,
            [index]: {
              file,
              imageUrl: res.data?.[0],
              index,
            },
          };
        });
      })
      .catch(() => {
        changeFiles((pre: any) => {
          return {
            ...pre,
            [index]: undefined,
          };
        });
        message.error(intl.feedback_failed);
      });
  };

  useEffect(() => {
    const dragenter = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setShowDragger(true);
    };
    const drop = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setShowDragger(false);
    };
    document.addEventListener('dragenter', dragenter, false);
    document.addEventListener('dragover', dragenter, false);
    document.addEventListener('dragleave', drop, false);
    document.addEventListener('drop', drop, false);
    return () => {
      document.removeEventListener('dragenter', dragenter);
      document.removeEventListener('dragover', dragenter);
      document.removeEventListener('dragleave', drop);
      document.removeEventListener('drop', drop);
    };
  }, []);

  const deleteImages = (index: number) => {
    changeFiles((pre: any) => {
      pre[index] = undefined;
      return {
        ...pre,
        [index]: undefined,
      };
    });
  };

  const submit = () => {
    const headers = createHeaders();
    if (!text) return;
    setLoading(true);
    axios({
      method: 'POST',
      url: `/order-book-api/feedback`,
      data: {
        text,
        email,
        locale,
        telegram,
        image_urls: _.values(files).map((d: any) => d.imageUrl),
      },
      headers,
    })
      .then(() => {
        changText('');
        changeFiles({});
        feedbackSuccessTip();
        setLoading(false);
        hide();
      })
      .catch((err) => {
        setLoading(false);
        if (err?.message) {
          message.error(intl.feedback_failed);
        }
      });
  };

  return (
    <StyledFeedback showDragger={showDragger} className="modal-content">
      <div className="title">
        {isMobile ? null : intl.feedback}
        <LinkWrapper
          url={DISCORD}
          onClick={() => {
            WindowOpen(DISCORD);
          }}
        >
          <div className="link">{intl.go_to_discord}</div>
        </LinkWrapper>
      </div>
      <div className="feedback-tips">{intl.feedback_tips}</div>
      <div className="feedback-inputs">
        <Input
          leftSection={<IconFeedbackTelgram />}
          value={telegram}
          className={`telegram ${telegramValid ? '' : 'err-border'}`}
          placeholder={intl.telegram_optional}
          onChange={(e: any) => {
            setTelegram(e.target.value);
            if (!telegramValid) checkTelegram(e);
          }}
          onBlur={checkTelegram}
        />
        <Input
          leftSection={<IconFeedbackEmail />}
          value={email}
          className={`email ${emailValid ? '' : 'err-border'}`}
          placeholder={intl.email_optional}
          onChange={(e: any) => {
            setEmail(e.target.value);
            if (!emailValid) checkEmail(e);
          }}
          onBlur={checkEmail}
        />
      </div>
      <div className="modal-text">
        <Textarea
          maxLength={3000}
          autosize
          minRows={7}
          maxRows={7}
          value={text}
          placeholder={
            isMobile
              ? intl.feedback_upload_tip_mobile
              : intl.feedback_upload_tip
          }
          onChange={(e) => changText(e.target.value)}
        />
        <Dropzone
          onReject={() => message.error(intl.image_upload_rule_1)}
          openRef={openRef}
          {...props}
        >
          <div className="upload-text">{intl.image_upload_tip}</div>
        </Dropzone>
      </div>

      <div className="image-upload">
        <div className="single-file" onClick={() => openRef.current?.()}>
          <FileImageOutlined />
          {intl.Upload}
        </div>
        <ul className="image-upload-rule">
          <li>{intl.image_upload_rule_1}</li>
          {isMobile ? (
            <>
              <li>{intl.image_upload_rule_2}</li>
              <li>{intl.image_upload_rule_3}</li>
            </>
          ) : (
            <li>{intl.image_upload_rule_2_3}</li>
          )}
        </ul>
      </div>
      <div className="modal-imgs">
        {files.map((item: any) => {
          const { file, imageUrl, index } = item;
          return (
            <div className="imgs-item" key={index}>
              <span className="imgName">
                <IconFile />
                {file?.name}
              </span>
              {imageUrl ? (
                <Delete
                  size={14}
                  onClick={() => deleteImages(index)}
                  className="delete"
                />
              ) : (
                <Loader size={14} />
              )}
            </div>
          );
        })}
      </div>
      <div className="btns">
        <PrimaryBtn
          eventName="btn_feedback_submit"
          loading={loading}
          className="dg-primary"
          disabled={!text || !emailValid || !telegramValid}
          onClick={submit}
        >
          {intl.Submit}
        </PrimaryBtn>
      </div>
    </StyledFeedback>
  );
}

const StyledFeedback = styled.div<{ showDragger: boolean }>`
  width: 100%;
  padding: 0;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  .title {
    margin-bottom: 14px;
    font-size: 18px;
    text-align: left;
    display: ${({ theme }: { theme: ThemeType }) => {
      return theme.isMobile ? 'block' : 'flex';
    }};
    align-items: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    .link-wrapper {
      margin: ${({ theme }: { theme: ThemeType }) => {
        return theme.isMobile ? '10px 0 0' : '0 0 0 20px';
      }};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      line-height: 20px;
      cursor: pointer;
      text-align: center;
      width: fit-content;
      display: flex;
    }
  }
  .feedback-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 10px;
  }
  .feedback-inputs {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? 'column' : 'row'};
    gap: 10px;
    .mantine-Input-wrapper {
      width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? '100%' : 'auto'};
      flex: 1;
    }
  }
  .modal-text {
    position: relative;
    min-height: 176px;
    .mantine-Textarea-root {
      display: ${({ showDragger }) => (showDragger ? 'none' : 'block')};
      .mantine-Textarea-root .mantine-Textarea-input {
        outline: none;
        background: none;
        padding: 10px 12px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        line-height: 24px;
        border: none;
      }
    }

    .mantine-Dropzone-root {
      display: ${({ showDragger }) => (showDragger ? 'block' : 'none')};
      background: rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .mantine-Dropzone-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .upload-text {
          ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
          font-size: 14px;
          color: ${({ theme }: { theme: ThemeType }) => theme.inputDisabled};
        }
      }
    }
    .dg-upload-list-text-container {
      display: none;
    }
  }
  .image-upload {
    display: flex;
    align-items: center;
    flex-direction: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? 'row-reverse' : 'row'};
    margin: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '15px 0 15px 8px' : '15px 0'};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

    .single-file {
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      border-radius: 5px;
      cursor: pointer;
      height: 30px;
      min-width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? '100px' : '150px'};

      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      font-size: 14px;
      margin: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? '0 0 0 auto' : '0 30px 0 0'};
      .icon-file-image-outlined {
        margin-right: 5px;
      }
    }
    .image-upload-rule {
      font-size: 12px;
      line-height: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b}99;
      li {
        position: relative;
        &::before {
          position: absolute;
          content: '•';
          left: -10px;
          top: 0;
          line-height: 16px;
        }
      }
    }
  }
  .modal-imgs {
    overflow: hidden;
    .imgs-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      padding: 0 15px;
      min-height: 26px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      .imgName {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          margin-right: 9px;
        }
      }
      .delete {
        cursor: pointer;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    margin: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '20px 0 0 0' : '30px 0 0'};
    .dg-primary {
      width: 300px;
    }
  }
`;
