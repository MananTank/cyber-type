import { writable } from "svelte/store";

// errors
export default (() => {
  let errors = [];
  const { subscribe, set } = writable(errors);

  function reset() {
    errors = [];
    set(errors);
  }

  function update(w, c) {
    if (!errors[w]) {
      errors[w] = [];
    }
    errors[w][c] = true;
    set(errors);
  }

  return { subscribe, reset, update };
})();
