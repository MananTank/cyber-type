import { writable } from "svelte/store";
// stores that will be changed when chaseMode changes
import progress from "./progress";
import typed from "./typed.js";
import stats from "./stats.js";
import errors from "./errors.js";

// when chase MOde changes reset errors

export default (() => {
  // default off
  let value = false;
  const { set, subscribe } = writable(value);

  function onChange() {
    progress.reset();
    typed.reset();
    stats.reset();
    errors.reset();
  }

  function toggle() {
    value = !value;
    set(value);
    onChange();
  }

  return { toggle, subscribe };
})();
