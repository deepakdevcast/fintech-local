import { useEffect, useState } from "react";

// export const useDebouncing = (fn, dependency, timer) => {
//   const [data, setData] = useState([]);
//   useEffect(()=> {
//     const timerId = setTimeout(async () => {
//       setData(await fn());
//     }, timer*1000);
//     return () => clearTimeout(timerId);
//   }, dependency);
//   return data;
// };

export const useDebouncing= (value, timerMillSecond) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, timerMillSecond);
    return () => clearTimeout(timerId);
  }, [value, timerMillSecond]);
  return debouncedValue;
}

