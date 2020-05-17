import { writable } from "svelte/store";
import ms from "../utils/ms";
import targetSpeed from "./targetSpeed.js";

// if the key a is typed 12 times in 2000ms
// the keys value for should be :

// {
//    a: {
//       typed: 12,
//       time: 2000ms,
//       speed: typed/time,
//    }
// }

let $targetSpeed;
targetSpeed.subscribe((ts) => ($targetSpeed = ts));

export const labelizeSpeed = (speed, targetSpeed = 50) => {
  const ratio = speed / targetSpeed;
  if (ratio >= 1) return "fastest";
  if (ratio >= 0.9) return "fast";
  if (ratio >= 0.8) return "normal";
  if (ratio >= 0.7) return "slow";
  else return "slowest";
};

// make the keys object
let keys = {};

function reset() {
  for (let i = 97; i < 123; i++) {
    keys[String.fromCharCode(i)] = {
      typed: 0,
      time: 0,
      speed: 0,
    };
  }
}

reset();

export default (() => {
  let prevKeyTypedTime = null;
  const { subscribe, set } = writable(keys);
  // relabelize accrording to new target speed

  function labelizeAll(ts) {
    for (let key in keys) {
      // do not labelize keys that are not typed
      if (keys[key].typed === 0) continue;
      keys[key].label = labelizeSpeed(keys[key].speed, ts);
    }
  }

  // when target speed changes, relabelize all
  targetSpeed.subscribe((ts) => {
    labelizeAll(ts);
    set(keys);
  });

  function getSpeed(x) {
    return Math.round((x.typed / x.time) * 12000);
  }

  function updateKey(t) {
    // console.log("update called with", t);
    // if key is not a - z update nothing
    if (!keys[t.key]) return;

    if (!prevKeyTypedTime) {
      prevKeyTypedTime = new Date();
      return;
    }

    keys[t.key].typed++;
    keys[t.key].time += ms(t.time) - ms(prevKeyTypedTime);
    keys[t.key].speed = getSpeed(keys[t.key]);
    keys[t.key].label = labelizeSpeed(keys[t.key].speed, $targetSpeed);
    prevKeyTypedTime = new Date();
    set(keys);
  }

  return { subscribe, updateKey, reset };
})();
