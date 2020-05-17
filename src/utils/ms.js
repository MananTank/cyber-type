export default (t) =>
  t.getMilliseconds() + t.getSeconds() * 1000 + t.getMinutes() * 60000;
