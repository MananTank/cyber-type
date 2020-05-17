import { writable } from "svelte/store";
import data from "../data.js";
// import progress from "./progress.js";

// util
export const getRandomWords = () => {
  let totalWords = 12;
  let words = [];
  for (let i = 0; i < totalWords; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    words.push(data[randomIndex] + " ");
  }
  return words;
};

export default (() => {
  let words = getRandomWords();
  let charCount = null;
  const { subscribe, set } = writable(words);

  function onChange() {
    // progress.reset();
  }

  function setCharCount() {
    charCount = 0;
    for (let i = 0; i < words.length; i++) {
      charCount += words[i].length;
    }
  }

  function change() {
    // set new words
    words = getRandomWords();
    set(words);
    setCharCount();
    onChange();
  }

  return { subscribe, change, charCount };
})();
