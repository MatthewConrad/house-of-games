export const alphabetize = (phrase: string) => {
  const words = phrase.split(" ");

  const sorted = words.sort((a, b) =>
    a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
  );

  return sorted.join(" ");
};
