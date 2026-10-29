import { useState, useEffect } from 'react';

// Works like useState, but the value is also saved in the browser (localStorage),
// so it is still there after a refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      // Storage is blocked, or the saved text is not valid JSON
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is full or blocked (e.g. private mode): the app still works
    }
  }, [key, value]);

  return [value, setValue];
}