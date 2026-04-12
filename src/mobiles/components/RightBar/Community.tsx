import React from 'react';
import IconDiscoard from 'imgs/discord.svg';
import IconTelegram from 'imgs/telegram.svg';
import IconTwitter from 'imgs/twitter.svg';

import LinkWrapper from 'src/components/LinkWrapper';

import RightOutlined from 'js/components/Icons/RightOutlined';
import UpOutlined from 'js/components/Icons/UpOutlined';
import { DISCORD, Telegram, Twitter } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import WindowOpen from 'js/utils/windowOpen';

export default function More({
  isShowSelect,
  setIsShowSelect,
}: {
  isShowSelect: boolean;
  setIsShowSelect: () => void;
}) {
  const intl = useIntl();

  return (
    <div className="menu-wrapper">
      <div
        className="menu-item"
        onClick={() => {
          setIsShowSelect();
        }}
      >
        {intl.Community}
        {isShowSelect ? <UpOutlined /> : <RightOutlined />}
      </div>
      <div className={isShowSelect ? 'show' : 'hide'}>
        <LinkWrapper url={DISCORD}>
          <div
            className="menu-item-child"
            onClick={() => {
              WindowOpen(DISCORD);
            }}
          >
            <img src={IconDiscoard} alt="IconDiscoard" className="icon" />
            Discord
          </div>
        </LinkWrapper>
        <LinkWrapper url={Telegram}>
          <div
            className="menu-item-child"
            onClick={() => {
              WindowOpen(Telegram);
            }}
          >
            <img src={IconTelegram} alt="IconTelegram" className="icon" />
            Telegram
          </div>
        </LinkWrapper>
        <LinkWrapper url={Twitter}>
          <div
            className="menu-item-child"
            onClick={() => {
              WindowOpen(Twitter);
            }}
          >
            <img src={IconTwitter} alt="IconTwitter" className="icon" />
            Twitter
          </div>
        </LinkWrapper>
      </div>
    </div>
  );
}
