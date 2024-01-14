const ALPHA_CHARS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const CODE_MAP = Object.fromEntries(
  ALPHA_CHARS.map((char, i) => [char, i + 1])
);

interface CodeChar {
  char: string;
  code: number;
}

export const stringToCodeWords = (val: string): CodeChar[][] => {
  const words = val.toLowerCase().split(" ");

  return words.map((word) => {
    const chars = word.split("");

    return chars.map((char) => ({ char, code: CODE_MAP[char] }));
  });
};
