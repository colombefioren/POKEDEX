export const getCardStyle = (index, activeIndex, totalCards) => {
  const position = (index - activeIndex + totalCards) % totalCards;

  switch (position) {
    case 0:
      return {
        zIndex: 10,
        scale: 1,
        y: 0,
        rotate: 0,
        opacity: 1,
        x: 0,
      };
    case 1:
      return {
        zIndex: 5,
        scale: 0.9,
        y: 30,
        rotate: 5,
        opacity: 0.8,
        x: 30,
      };
    case 2:
      return {
        zIndex: 4,
        scale: 0.85,
        y: 50,
        rotate: 8,
        opacity: 0.6,
        x: 50,
      };
    default:
      return {
        zIndex: 0,
        scale: 0,
        y: 0,
        rotate: 0,
        opacity: 0,
        x: 0,
      };
  }
};

export const handleDragEnd = (
  info,
  activeIndex,
  setActiveIndex,
  totalCards
) => {
  const threshold = 50;
  if (info.offset.x > threshold) {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  } else if (info.offset.x < -threshold) {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }
};
