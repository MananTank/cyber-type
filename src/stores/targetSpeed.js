import { writable } from "svelte/store";
import progress from "./progress";
import errors from "./errors";
import stats from "./stats";
// import typed from "./typed";

export default (() => {
  let targetSpeed = 50;
  const { subscribe, set } = writable(targetSpeed);

  function onChange() {
    // typed.reset();
    progress.reset();
    errors.reset();
    stats.reset();
  }

  function setSpeed(s) {
    set(s);
    onChange();
  }

  return { subscribe, setSpeed };
})();
