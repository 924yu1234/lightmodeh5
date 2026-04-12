import { useCallback, useEffect, useState } from 'react';

import { Type_DAChains } from 'src/da';
import { useDexAccount } from 'src/state/dexAccount/hooks';

// 检查是否已经同步当前chain的DA账户
export default function useDoAfterCheckDA(
  action: (...params: any) => Promise<any>,
  chain: Type_DAChains
) {
  const stableAction = useCallback(action, [action]);
  const { DAs } = useDexAccount();
  const dependency = !!DAs?.[chain?.toUpperCase()]?.address;
  const [resolveFn, setResolveFn] = useState<any>();

  useEffect(() => {
    if (dependency && resolveFn) {
      setResolveFn(() => {
        resolveFn.resolve(stableAction(...resolveFn.params));
        return null;
      });
    }
  }, [stableAction, dependency, resolveFn]);

  const checkAndRun = useCallback(
    async (...params: any) => {
      try {
        if (dependency) {
          return stableAction(...params);
        }
        return new Promise((resolve) => {
          setResolveFn({ resolve, params });
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    [stableAction, dependency]
  );

  return checkAndRun;
}

// // 下单前检查是否已经同步当前chain的DA账户，如果未同步则弹窗提示，确认后继续，evm链不需要检查
// export function useCheckDAHasSynced(chain: Type_DAChains) {
//   const { DAs } = useDexAccount();
//   const dependency = !!DAs?.[chain?.toUpperCase()]?.address;
//   const showModal = useShowModal();

//   return new Promise((resolve) => {
//     if (dependency) {
//       resolve(true);
//     } else {
//       showModal({
//         modal: ModalKeys.tips_syncDA,
//         chain,
//         onConfirm: () => {
//           resolve(true);
//         },
//       });
//     }
//   });
// }
