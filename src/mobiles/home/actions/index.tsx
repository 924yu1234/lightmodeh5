/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import IconMobileBack from 'src/components/Icons/mobileBack';
import IconMore from 'src/components/Icons/more';
import FullModal from 'src/components/Modals/fullModal';
import { useIntl } from 'src/locals';
import { useInfo, useRegionInfo } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';
import { compareVersions } from 'src/utils/numberUtils';

import { fetchHomeBtns } from '../service';
import ActionItem from './item';

export default function MobileHomeActions() {
  const [btns, setBtns] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);

  const intl = useIntl();

  const { regionCode } = useRegionInfo();
  const { features } = useDexAccount();

  const info = useInfo();
  const releaseVersion = info?.releaseVersion;

  useEffect(() => {
    fetchHomeBtns().then((res: any) => {
      setBtns(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBtns = useMemo(() => {
    return btns.filter((btn) => {
      const { minVersion, maxVersion, countries, whitelistKey } = btn;

      const versionFlag = (() => {
        if (!minVersion && !maxVersion) return true;
        if (!releaseVersion) return false;
        if (minVersion) {
          if (compareVersions(releaseVersion, minVersion) < 0) {
            return false;
          }
        }
        if (maxVersion) {
          if (compareVersions(releaseVersion, maxVersion) > 0) {
            return false;
          }
        }
        return true;
      })();

      if (!versionFlag) return false;

      const countryFlag = (() => {
        if (!countries?.length) return true;
        if (!regionCode) return false;
        return countries.includes(regionCode);
      })();

      const inWhiteList = (() => {
        if (!whitelistKey) return false;
        if (!features) return false;
        return !!features[whitelistKey];
      })();
      // 如果设置了白名单 但是没有设置国家 则必须检查白名单
      if (whitelistKey && !countries?.length && !inWhiteList) return false;
      if (countryFlag || inWhiteList) return true;
      return true;
    });
  }, [btns, releaseVersion, regionCode, features]);

  const size = showBtns.length;

  if (!size) return null;

  return (
    <StyledActions className="actions" size={size}>
      <div className="actions-container">
        {showBtns.slice(0, size <= 8 ? size : 7).map((btn, i) => (
          <ActionItem btn={btn} key={btn.id + i} />
        ))}
        {size > 8 && (
          <div
            className="more-btn"
            onClick={() => {
              setShowMore(true);
            }}
          >
            <IconMore size={30} />
            <span>{intl.more}</span>
          </div>
        )}

        <FullModal opened={showMore} onClose={() => setShowMore(false)}>
          <StyledModal className="modal-wrapper">
            <div className="modal-title">
              <IconMobileBack onClick={() => setShowMore(false)} />
              {intl.More_Services}
            </div>
            {showBtns.slice(7).map((btn) => (
              <ActionItem
                btn={btn}
                key={btn.id}
                onClick={() => setShowMore(false)}
              />
            ))}
          </StyledModal>
        </FullModal>
      </div>
    </StyledActions>
  );
}

const StyledActions = styled.div<{ size: number }>`
  width: 100%;
  background: ${({ theme }) => theme.bg};
  padding: 40px 20px 30px;
  border-bottom: 4px solid #030303;

  .actions-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px 10px;
    width: 100%;
    ${({ size }) => size === 3 && size3Style}
  }

  .more-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    border-radius: 10px;
    padding: 6px 8px;
    cursor: pointer;
    transition: color 0.15s ease, background-color 0.15s ease;

    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};

    .dg-icon {
      width: 30px;
      height: 30px;
      margin-bottom: 5px;
      border-radius: 8px;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};

        .dg-icon {
          transform: scale(1.06);
          box-shadow: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? 'none' : theme.ghostBtnHoverShadow};
        }
      }
    }

    &:active {
      background: ${({ theme }: { theme: ThemeType }) => theme.hover};
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      .dg-icon {
        transition: none;
      }

      &:hover .dg-icon {
        transform: none;
      }
    }
  }
`;

const size3Style = css`
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledModal = styled.div`
  padding: 0 20px 30px;
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .action-item {
    padding: 0 10px;
    margin: 10px;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
`;
