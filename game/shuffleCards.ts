type SchuffleCards = <T>(cards: Array<T>) => Array<T>;

export const shuffleCards: SchuffleCards = (cards) => {
  const copy = [...cards];

  let currentIndex = copy.length - 1;

  while (currentIndex > 0) {
    const current = copy[currentIndex]
    const randomIndex = Math.floor(currentIndex * Math.random());
    const random = copy[randomIndex]

    copy[currentIndex] = random
    copy[randomIndex] = current
    currentIndex--
  }

  return copy;
};
