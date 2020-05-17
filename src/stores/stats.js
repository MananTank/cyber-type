import { writable } from "svelte/store";
import ms from "../utils/ms";

// {
//   time: 4000ms,
//   words : 34,
//   speed: 45 WPM
//   reset
//   log(time)
// }

export default (() => {
  let stats = { time: 0, words: 0, speed: 0 };
  let typingStartedTime;
  const { subscribe, set } = writable(stats);

  function reset() {
    stats = { time: 0, words: 0, speed: 0 };
    set(stats);
    typingStartedTime = null;
  }

  function typingStarted() {
    if (!typingStartedTime) {
      typingStartedTime = ms(new Date());
    }

    // stats.words = 0;
    set(stats);
  }

  function log() {
    stats.words++;
    stats.time = ms(new Date()) - typingStartedTime;
    stats.speed = (stats.words / stats.time) * 1000 * 60;
    set(stats);
  }

  return { subscribe, reset, log, typingStarted };
})();
