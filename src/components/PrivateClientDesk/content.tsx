import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import IconChoose from 'src/components/Icons/choose';
import IconOpenBrowser from 'src/components/Icons/openBrowser';
import IconPrivateClientDeskVipBig from 'src/components/Icons/privateClientDeskVipBig';
import IconPrivateClientDeskVipEmail from 'src/components/Icons/privateClientDeskVipEmail';
import IconPrivateClientDeskVipSignal from 'src/components/Icons/privateClientDeskVipSignal';
import IconPrivateClientDeskVipTelegram from 'src/components/Icons/privateClientDeskVipTelegram';
import IconPrivateClientDeskVipWhatsapp from 'src/components/Icons/privateClientDeskVipWhatsapp';
import IconStar from 'src/components/Icons/star';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import IconCopy2 from '../Icons/copy2';
import usePrivateClientDeskContacts from './usePrivateClientDeskContacts';

interface ContactRow {
  key: 'telegram' | 'whatsapp' | 'signal' | 'email' | string;
  label: string;
  value: string;
  openUrl?: string;
}

export default function PrivateClientDeskContent({
  showHideEntryBtn,
  onClickHideEntryBtn,
  className,
}: {
  showHideEntryBtn?: boolean;
  onClickHideEntryBtn?: () => void;
  className?: string;
}) {
  const intl = useIntl();
  const contacts = usePrivateClientDeskContacts();
  const [copiedKey, setCopiedKey] = useState('');

  useEffect(() => {
    if (!copiedKey) return () => {};
    const timer = window.setTimeout(() => {
      setCopiedKey('');
    }, 2000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copiedKey]);

  const buildOpenUrl = useCallback(
    (key: ContactRow['key'], value: string, signalLink?: string) => {
      const trimmed = value.trim();
      if (!trimmed) return '';

      if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) {
        return trimmed;
      }

      if (key === 'telegram') {
        const handle = trimmed.replace(/^@/, '');
        return handle ? `https://t.me/${handle}` : '';
      }

      if (key === 'whatsapp') {
        const phone = trimmed.replace(/[^\d+]/g, '').replace('+', '');
        return phone ? `https://wa.me/${phone}` : '';
      }

      if (key === 'signal') {
        if (signalLink) {
          return signalLink;
        }
        if (value.includes('@')) {
          return ``;
        }
        const phone = trimmed.replace(/[^\d+]/g, '');
        if (!phone) return '';
        const normalized = phone.startsWith('+') ? phone : `+${phone}`;
        return `https://signal.me/#p/${normalized}`;
      }

      return '';
    },
    []
  );

  const rows = useMemo((): ContactRow[] => {
    const values = contacts || {};

    return [
      {
        key: 'telegram',
        label: intl.Telegram,
        value: values.telegram || '',
        openUrl: buildOpenUrl('telegram', values.telegram || ''),
      },
      {
        key: 'whatsapp',
        label: intl.WhatsApp,
        value: values.whatsapp || '',
        openUrl: buildOpenUrl('whatsapp', values.whatsapp || ''),
      },
      {
        key: 'signal',
        label: intl.Signal,
        value: values.signal || '',
        openUrl: buildOpenUrl(
          'signal',
          values.signal || '',
          values.signalLink || ''
        ),
      },
      {
        key: 'email',
        label: intl.Email,
        value: values.email || '',
      },
    ].filter((item) => Boolean(item.value));
  }, [
    buildOpenUrl,
    contacts,
    intl.Email,
    intl.Signal,
    intl.Telegram,
    intl.WhatsApp,
  ]);

  const handleOpen = useCallback((url?: string) => {
    if (!url) return;
    WindowOpen(url, 'externalBrowser');
  }, []);

  const handleOpenClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { url } = event.currentTarget.dataset;
      handleOpen(url);
    },
    [handleOpen]
  );

  const handleCopy = useCallback((key: ContactRow['key']) => {
    setCopiedKey(key);
  }, []);

  return (
    <StyledPrivateClientDeskContent className={className}>
      <div className="hero">
        <IconPrivateClientDeskVipBig size={70} />
      </div>

      <div className="title">{intl.private_client_desk}</div>

      <div className="body">
        <div className="intro-column">
          <div className="slogan">{intl.through_this_desk_you_may}</div>
          <div className="intro-card">
            <ul className="intro-list">
              <li>
                <IconStar />
                <span>{intl.receive_priority_operational_support}</span>
              </li>
              <li>
                <IconStar />
                <span>
                  {
                    intl.direct_communication_with_our_strategy_and_operations_team
                  }
                </span>
              </li>
              <li>
                <IconStar />
                <span>{intl.early_access_to_new_products}</span>
              </li>
              <li>
                <IconStar />
                <span>
                  {intl.access_exclusive_privileges_and_customized_benefits}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-column">
          {!!rows.length && (
            <div className="contacts-card">
              {rows.map((row) => {
                const showCopied = copiedKey === row.key;
                return (
                  <div key={row.key} className="contact-row">
                    <div className="channel-icon">
                      {row.key === 'telegram' && (
                        <IconPrivateClientDeskVipTelegram size={32} />
                      )}
                      {row.key === 'whatsapp' && (
                        <IconPrivateClientDeskVipWhatsapp size={32} />
                      )}
                      {row.key === 'signal' && (
                        <IconPrivateClientDeskVipSignal size={32} />
                      )}
                      {row.key === 'email' && (
                        <IconPrivateClientDeskVipEmail size={32} />
                      )}
                    </div>

                    <div className="text-area">
                      <div className="label">{row.label}</div>
                      {showCopied ? (
                        <div className="value copied">
                          {intl.copied} <IconChoose />
                        </div>
                      ) : (
                        <div className="value">{row.value}</div>
                      )}
                    </div>

                    <div className="actions">
                      {row.key !== 'email' && Boolean(row.openUrl) && (
                        <button
                          className="action-btn"
                          type="button"
                          data-url={row.openUrl}
                          onClick={handleOpenClick}
                        >
                          <IconOpenBrowser size={14} />
                        </button>
                      )}
                      <CopyToClipboard
                        text={row.value}
                        onCopy={() => {
                          handleCopy(row.key);
                        }}
                      >
                        <button className="action-btn" type="button">
                          <IconCopy2 size={14} />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showHideEntryBtn && (
        <button
          className="hide-entry-btn"
          type="button"
          onClick={onClickHideEntryBtn}
        >
          {intl.tips_hide_forever}
        </button>
      )}
    </StyledPrivateClientDeskContent>
  );
}

const StyledPrivateClientDeskContent = styled.div`
  width: 100%;
  border-radius: 20px;
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  padding: 26px 34px 18px;

  .hero {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 42px;
  }

  .body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
  }

  .intro-column {
    width: 48%;
  }

  .slogan {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_90};
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 14px;
  }

  .intro-card {
    padding: 0;
  }

  .intro-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 20px;

      .icon-star {
        margin-top: 4px;
      }

      span {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .contact-column {
    width: 48%;
  }

  .contacts-card {
    width: 100%;
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    .channel-icon {
      width: 36px;
      min-width: 36px;
      line-height: 0;
    }

    .text-area {
      min-width: 0;
      flex: 1;
    }

    .label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 19px;
    }

    .value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_40};
      font-size: 12px;
      line-height: 18px;
      word-break: break-word;
      display: flex;
      align-items: center;
      gap: 4px;

      &.copied {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }

      .icon-choose {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;

      .icon-open-browser,
      .icon-copy2 {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
        &:hover {
          color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
  }

  .no-contact-card {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    font-size: 14px;
    line-height: 20px;
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_20};
    border-radius: 12px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
    padding: 14px 12px;
  }

  .hide-entry-btn {
    width: 315px;
    height: 46px;
    margin: 26px auto 0;
    display: block;
    border-radius: 6px;
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_20};
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_black};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;
