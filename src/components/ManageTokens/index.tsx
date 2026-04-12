import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebouncedValue } from '@mantine/hooks';

import IconBack from 'src/components/Icons/back';
import {
  createManagedTokenKey,
  useManagedAssetCollections,
} from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import {
  quickSearchSwapTokens,
  searchSwapTokens,
} from 'src/state/swap/tokens/service';
import { useThemeParams } from 'src/theme';

import GALinkWrapper from '../GA/LinkWrapper';
import Close from '../Icons/close';
import FullModal from '../Modals/fullModal';
import Spin from '../Spin';
import ManageTokensAddView from './addView';
import ManageTokensAssetsList from './assetsList';
import ManageTokensSearchList from './searchList';
import { StyledManageTokens } from './style';
import ManageTokensToolbar from './toolbar';

type ViewMode = 'list' | 'add';

function matchesSearch(token: any, search: string) {
  if (!search) return true;
  const text = search.toLowerCase();
  return [token?.symbol, token?.name, token?.code, token?.chain].some((item) =>
    (item || '').toLowerCase().includes(text)
  );
}

export default function ManageTokens() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.manageTokens);
  const showModal = useShowModal();
  const [view, setView] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const [quickResults, setQuickResults] = useState<any[]>([]);
  const [remoteResults, setRemoteResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const [network, setNetwork] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [candidateToken, setCandidateToken] = useState<any>(null);
  const [candidateErr, setCandidateErr] = useState('');
  const searchRequestIdRef = useRef(0);
  const candidateRequestIdRef = useRef(0);

  const [debouncedSearch] = useDebouncedValue(search, 250);
  const [debouncedAddress] = useDebouncedValue(contractAddress, 300);

  const {
    myAssets,
    otherAssets,
    allTokens,
    hydrateToken,
    isMyAsset,
    isRemovedZeroBalanceToken,
    addToken,
  } = useManagedAssetCollections();

  const handleRequestRemove = useCallback(
    (token: any) => {
      showModal({
        modal: ModalKeys.manageTokensRemoveConfirm,
        token,
      });
    },
    [showModal]
  );

  useEffect(() => {
    if (!visible) {
      searchRequestIdRef.current += 1;
      candidateRequestIdRef.current += 1;
      setView('list');
      setSearch('');
      setQuickResults([]);
      setRemoteResults([]);
      setSearching(false);
      setNetwork('');
      setContractAddress('');
      setCandidateToken(null);
      setCandidateErr('');
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || !debouncedSearch) {
      searchRequestIdRef.current += 1;
      setQuickResults([]);
      setRemoteResults([]);
      setSearching(false);
      return;
    }
    const requestId = ++searchRequestIdRef.current;
    setSearching(true);
    quickSearchSwapTokens({ text: debouncedSearch })
      .then((resp) => {
        if (requestId !== searchRequestIdRef.current) return;
        setQuickResults(
          (resp?.list || [])
            .map((token: any) => hydrateToken(token))
            .filter((token: any) => !isRemovedZeroBalanceToken(token))
        );
      })
      .catch(() => {
        setQuickResults([]);
      });

    searchSwapTokens({ text: debouncedSearch, limit: 30 })
      .then((resp) => {
        if (requestId !== searchRequestIdRef.current) return;
        setRemoteResults(
          (resp?.list || [])
            .map((token: any) => hydrateToken(token))
            .filter((token: any) => !isRemovedZeroBalanceToken(token))
        );
        setSearching(false);
      })
      .catch(() => {
        setRemoteResults([]);
        setSearching(false);
      });
  }, [visible, debouncedSearch, hydrateToken, isRemovedZeroBalanceToken]);

  useEffect(() => {
    if (!visible || view !== 'add' || !network || !debouncedAddress) {
      candidateRequestIdRef.current += 1;
      setCandidateToken(null);
      setCandidateErr('');
      return;
    }
    const requestId = ++candidateRequestIdRef.current;
    const address = debouncedAddress.toLowerCase();

    searchSwapTokens({ text: debouncedAddress, limit: 30 })
      .then((resp) => {
        if (requestId !== candidateRequestIdRef.current) return;

        const matched = (resp?.list || []).find((token: any) => {
          return (
            token?.chain === network && token?.code?.toLowerCase() === address
          );
        });
        if (!matched) {
          setCandidateToken(null);
          setCandidateErr(intl.manage_tokens_not_found);
          return;
        }

        const nextToken = hydrateToken(matched);
        setCandidateToken(nextToken);
        if (isMyAsset(nextToken)) {
          setCandidateErr(
            intl.manage_tokens_added.replace(
              '{TOKEN}',
              nextToken?.symbol || nextToken?.code || '--'
            )
          );
          return;
        }
        setCandidateErr('');
      })
      .catch(() => {
        if (requestId !== candidateRequestIdRef.current) return;
        setCandidateToken(null);
        setCandidateErr(intl.manage_tokens_not_found);
      });
  }, [
    visible,
    view,
    network,
    debouncedAddress,
    hydrateToken,
    isMyAsset,
    intl.manage_tokens_added,
    intl.manage_tokens_not_found,
  ]);

  const searchResults = useMemo(() => {
    if (!debouncedSearch) return [];
    const foundMap = new Map();
    quickResults.forEach((token) => {
      foundMap.set(createManagedTokenKey(token), token);
    });
    allTokens
      .filter(
        (token) =>
          !isRemovedZeroBalanceToken(token) &&
          matchesSearch(token, debouncedSearch)
      )
      .forEach((token) => {
        const key = createManagedTokenKey(token);
        if (!foundMap.has(key)) {
          foundMap.set(key, token);
        }
      });
    remoteResults.forEach((token) => {
      const key = createManagedTokenKey(token);
      if (!foundMap.has(key)) {
        foundMap.set(key, hydrateToken(token));
      }
    });
    return Array.from(foundMap.values());
  }, [
    allTokens,
    debouncedSearch,
    hydrateToken,
    isRemovedZeroBalanceToken,
    quickResults,
    remoteResults,
  ]);
  const { isMobile } = useThemeParams();
  return (
    <FullModal opened={visible} onClose={hide} className="bg13" size={460}>
      <StyledManageTokens className="modal-wrapper">
        <div className={`modal-title ${view === 'add' ? 'has-back' : ''}`}>
          {(isMobile || view === 'add') && (
            <IconBack
              onClick={() => {
                if (view === 'add') {
                  setView('list');
                  return;
                }
                hide();
              }}
            />
          )}
          {view === 'add'
            ? intl.manage_tokens_add_btn
            : intl.manage_tokens_title}
          {view === 'list' && isMobile ? (
            <GALinkWrapper
              eventName="manage_tokens_add_btn"
              className="add-link"
              onClick={() => {
                setView('add');
              }}
            >
              {intl.manage_tokens_add_btn}
            </GALinkWrapper>
          ) : null}
          {view === 'list' ? (
            <Close className="manage-trigger-icon" size={16} onClick={hide} />
          ) : null}
        </div>
        <div className="modal-content" style={{ padding: 0 }}>
          <ManageTokensToolbar
            search={search}
            setSearch={setSearch}
            onShowAddView={() => setView('add')}
          />
          <Spin spinning={searching}>
            <div className="list-body" id="manageTokensBody">
              {search ? (
                <ManageTokensSearchList
                  searchResults={searchResults}
                  searching={searching}
                  isMyAsset={isMyAsset}
                  addToken={addToken}
                  onRequestRemove={handleRequestRemove}
                />
              ) : (
                <ManageTokensAssetsList
                  myAssets={myAssets}
                  otherAssets={otherAssets}
                  addToken={addToken}
                  onRequestRemove={handleRequestRemove}
                />
              )}
            </div>
          </Spin>
          {view === 'add' && (
            <ManageTokensAddView
              network={network}
              setNetwork={setNetwork}
              contractAddress={contractAddress}
              setContractAddress={setContractAddress}
              candidateErr={candidateErr}
              candidateToken={candidateToken}
              isMyAsset={isMyAsset}
              addToken={addToken}
              onBackToList={() => {
                setView('list');
                setCandidateToken(null);
                setCandidateErr('');
              }}
            />
          )}
        </div>
      </StyledManageTokens>
    </FullModal>
  );
}
