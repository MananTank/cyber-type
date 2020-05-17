import { writable } from "svelte/store";
import words from "./words";
import progress from "./progress";
import keys from "./keys";
import errors from "./errors";

let $progress;
let $words;
progress.subscribe((x) => ($progress = x));
words.subscribe((x) => ($words = x));

// {
//   key: 'a',
//   time: Date()
// }

export default (() => {
  let typed = { key: null, time: null };

  function ontypingComplete() {
    progress.reset();
    words.change();
    errors.reset();
  }

  function onTypedIncorrectly() {
    errors.update($progress.word, $progress.char);
  }

  // key typed correctly
  function onTypedCorrectly() {
    // update key of keys
    keys.updateKey(typed);

    // if not the last char of the word
    if ($progress.char < $words[$progress.word].length - 1) {
      progress.nextChar();
    }
    // if not the last word of words
    else if ($progress.word < $words.length - 1) {
      progress.nextWord();
    } else {
      ontypingComplete();
    }
  }

  // key typed
  function keyTyped() {
    if (typed.key === $words[$progress.word][$progress.char]) {
      onTypedCorrectly();
    } else {
      onTypedIncorrectly();
    }
  }

  // create store
  const { subscribe, set } = writable(typed, (set) => {
    function handleKeyDown(e) {
      typed = { key: e.key, time: new Date() };
      set(typed);
      keyTyped();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // reset
  function reset() {
    typed = { key: null, time: null };
    set(typed);
  }

  return { subscribe, reset };
})();
