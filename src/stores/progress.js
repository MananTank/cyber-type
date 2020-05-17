import { writable } from "svelte/store";

// when you are typing the 2nd word's 3rd character
// the progress should say :

// {
//   word: 2,
//   char: 3
// }

export default (() => {
  let progress = { word: 0, char: 0 };
  const { subscribe, set, update } = writable(progress);

  function reset() {
    progress = { word: 0, char: 0 };
    set(progress);
  }

  function nextChar() {
    progress.char++;
    set(progress);
  }

  function nextWord() {
    progress.word++;
    progress.char = 0;
    set(progress);
  }

  return { subscribe, reset, nextChar, nextWord };
})();
