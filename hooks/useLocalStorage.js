/**
 * Custom hook that returns an item from localStorage for a given key.
 * Handles setting, getting and removing items in localStorage.
 *
 * @param {string} key - Key to use when getting/setting in localStorage
 * @param {any} initialValue - Optional initial value if nothing found in localStorage
 * @returns {Array} - An array with the current value and a setter function
 */
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const intitalValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKetinLocalStorage() {
      console.debug("hooks useLocalStorage useEffect", "item=", item);

      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
