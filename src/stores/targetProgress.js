import { writable } from "svelte/store";
import userProgress from "./progress";
import chaseMode from "./chaseMode";
import targetSpeed from "./targetSpeed";
import words from "./words";

let $chaseMode;
let $words;
let $targetSpeed;

words.subscribe((x) => {
  $words = x;
});

// target Progress
export default (() => {
  // start with 0,0
  let progress = { word: 0, char: 0 };

  // create the store
  const { subscribe, set } = writable(progress);

  // for clearing interval
  let interval;

  function stop() {
    clearInterval(interval);
  }

  function reset() {
    progress = { word: 0, char: 0 };
    set(progress);
  }

  targetSpeed.subscribe((x) => {
    $targetSpeed = x;
    reset();
    stop();
  });

  chaseMode.subscribe((x) => {
    $chaseMode = x;
    reset();
    stop();
  });

  function start() {
    // before starting make sure to clear prev intervals if any

    if (interval) stop();
    // start incrementing
    interval = setInterval(() => {
      // if not the last word, can do w++
      // if not the last char, can do c++
      if (progress.char < $words[progress.word].length - 1) {
        progress.char++;
        set(progress);
      } else if (progress.word < $words.length - 1) {
        progress.word++;
        progress.char = 0;
        set(progress);
      } else {
        stop();
      }
    }, (1000 * 60) / 6.2 / $targetSpeed);
  }

  // when the user's progress is (0, 1) and if the chaseMode is on, start typing
  // when user completes typing reset()
  userProgress.subscribe((s) => {
    if (!$chaseMode) return;
    const lastWordIndex = $words.length - 1;
    const lastWordLastCharIndex = $words[lastWordIndex].length - 1;

    if (s.char === 1 && s.word === 0) {
      start();
    } else if (s.word === lastWordIndex && s.char === lastWordLastCharIndex) {
      reset();
    }
  });

  return { subscribe, reset, stop };
})();
