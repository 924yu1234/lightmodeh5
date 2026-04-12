export const getCardValue = (cardId: string) => {
  const cardType = cardId.slice(0, 1)?.toUpperCase();
  if (cardType === 'A') {
    return '5';
  }
  if (cardType === 'B') {
    return '10';
  }
  if (cardType === 'C') {
    return '20';
  }
  return '';
};
