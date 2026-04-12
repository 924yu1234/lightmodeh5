import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CardItem from 'src/components/Card/cardItem';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';

import { StyledCardDetail } from './style';

export default function CardDetail() {
  const { cardId, cardName } = useParams();

  const navigate = useCustomNavigate();
  const intl = useIntl();

  useEffect(() => {
    if (!cardId || !cardName) {
      navigate('/home');
    }
  }, [cardId, cardName, navigate]);

  return (
    <StyledCardDetail>
      <CardItem cardId={cardId || ''} size={360} />
      <div className="card-tips">
        {intl.please_open_this_page_on_your_mobile_phone}
      </div>
    </StyledCardDetail>
  );
}
