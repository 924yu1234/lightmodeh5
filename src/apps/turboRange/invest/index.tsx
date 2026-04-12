import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';

export default function TurboRangeInvest() {
  const { poolAddress } = useParams();
  const navigate = useCustomNavigate();
  const createPosition = useCreatePosition();

  useEffect(() => {
    createPosition({
      poolAddress: poolAddress as string,
    });
    navigate('/turbo-range');
  }, [createPosition, poolAddress, navigate]);

  return null;
}
