import { useState, useEffect } from 'react';

/** useLocalStorage -
 *  Custom hook for access browser local storage
 * @param {string} key
 */
const useLocalStorage = (key) => {
  // getItem returns null if key doesn't exist
  const [state, setState] = useState(() => {
    let value = (localStorage.getItem(key));
    return value;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [ state, setState ];
}

export default useLocalStorage;