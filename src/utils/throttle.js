const throttle = (fn, limit) => {
  let id;
  let now;
  let limitTime;
  const execFn = () => {
    limitTime = now + limit;
    fn();
  };
  return () => {
    now = Date.now();
    if (!limitTime || limitTime <= now) {
      execFn();
    } else {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(execFn, limitTime - now);
    }
  };
};

export default throttle;
