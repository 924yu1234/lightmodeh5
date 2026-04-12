import { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useSelectSwapPair } from 'src/state/swap/pair/hooks';
import { checkSwapPair, searchSwapPairs } from 'src/state/swap/pairs/service';

export default function useSwapPageUrlFormat({ pair, page }) {
  const { base = '', quote = '' } = useParams();
  const location = useLocation();
  const { chain } = queryString.parse(location.search);
  const selectSwapPair = useSelectSwapPair();

  const [hasDone, setHasDone] = useState(false);

  const navigate = useCustomNavigate();

  useEffect(() => {
    setHasDone(false);
  }, [location.pathname]);

  useEffect(() => {
    if (quote && quote.toLowerCase() !== 'usdc') {
      setHasDone(true);
      selectSwapPair({});
      navigate(`/${page || 'swap'}`);
    }
  }, [selectSwapPair, navigate, page, quote, hasDone]);

  const quoteLowerCase = useMemo(() => {
    return quote.toLowerCase();
  }, [quote]);

  const isValid = useMemo(() => {
    if (!base || !quoteLowerCase || !pair?.pairId) return false;
    return (
      base.toLowerCase() === pair?.baseToken?.code?.toLowerCase() &&
      (quoteLowerCase === pair?.quoteToken?.symbol?.toLowerCase() ||
        quoteLowerCase === pair?.quoteToken?.code?.toLowerCase()) &&
      (!chain || pair?.baseToken?.chain?.toLowerCase() === chain?.toLowerCase())
    );
  }, [pair, base, quoteLowerCase, chain]);

  useEffect(() => {
    if (!base || !quote || base === quote || isValid) {
      setHasDone(true);
      return;
    }
    if (hasDone) return;

    Promise.all([
      checkSwapPair({ baseCode: base, chain })
        .then((resp) => {
          if (resp?.pairId) {
            selectSwapPair({
              pairId: resp.pairId,
              baseToken: resp.baseToken,
              quoteToken: resp.quoteToken,
            });
            return true;
          }
          return false;
        })
        .catch(() => false),
      searchSwapPairs({ text: base })
        .then((resp) => {
          const _pair = (resp?.pairs || [])?.find(
            (p) =>
              p.baseToken?.code?.toLowerCase() === base.toLowerCase() &&
              p.baseToken?.chain?.toLowerCase() === chain?.toLowerCase()
          );
          if (_pair?.pairId) {
            selectSwapPair({
              pairId: _pair.pairId,
              baseToken: _pair.baseToken,
              quoteToken: _pair.quoteToken,
            });
            return true;
          }
          if (resp?.pairs?.length > 0 && !chain) {
            const __pair = resp.pairs[0];
            selectSwapPair({
              pairId: __pair.pairId,
              baseToken: __pair.baseToken,
              quoteToken: __pair.quoteToken,
            });
            return true;
          }
          return false;
        })
        .catch(() => false),
    ]).then((results) => {
      if (results.some((success) => success)) {
        setHasDone(true);
      } else {
        navigate(`/${page || 'swap'}`);
      }
    });
  }, [isValid, hasDone, selectSwapPair, navigate, base, page, quote, chain]);
  return {
    done: hasDone || isValid,
  };
}
