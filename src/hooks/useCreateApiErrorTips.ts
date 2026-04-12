import { SIGNATURE_ERR, USER_NOT_FUND } from 'js/constants/apiErr';
import { UserCancel } from 'js/providers/useWallet';

export default function createApiErrorTips({
  error,
  intl,
}: {
  error: any;
  intl?: any;
}) {
  if (!error) return '';
  const _intl = intl || window.intl;
  if (error?.code === 429) {
    return _intl?.rate_limit_err;
  }

  if (error?.code === 451) return '';
  if (error?.code === UserCancel) return '';
  if (error?.code === 401) return '';
  if (error?.code === 401401) return '';
  if (error?.code === SIGNATURE_ERR) return '';
  if (error?.code === USER_NOT_FUND) return '';

  return _intl?.common_err;
}
