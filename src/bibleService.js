import axios from "axios";

const BIBLE_API_BASE = "https://bible-api.com";

// Configurar timeout para evitar travamentos
axios.defaults.timeout = 5000;

export const bibleBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1Samuel",
  "2Samuel",
  "1Kings",
  "2Kings",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Isaiah",
  "Jeremiah",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1Corinthians",
  "2Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1Thessalonians",
  "2Thessalonians",
  "1Timothy",
  "2Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1Peter",
  "2Peter",
  "1John",
  "2John",
  "3John",
  "Jude",
  "Revelation",
];

export const getRandomVerse = async () => {
  const response = await axios.get(`${BIBLE_API_BASE}/data/almeida/random`);
  const verse = response.data.random_verse;
  return {
    text: verse.text.trim(),
    reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
  };
};

export const getVerseOfTheDay = async () => {
  const response = await axios.get(`${BIBLE_API_BASE}/data/almeida/random`);
  const verse = response.data.random_verse;
  return {
    text: verse.text.trim(),
    reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
  };
};

export const searchVerse = async (reference) => {
  const response = await axios.get(`${BIBLE_API_BASE}/${reference}?translation=almeida`);
  return {
    text: response.data.text.trim(),
    reference: response.data.reference,
  };
};
