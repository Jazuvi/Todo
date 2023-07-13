import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialState: T
): readonly [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const items = localStorage.getItem(key);
    const localStorageItem = items ? JSON.parse(items) : state;
    setState(localStorageItem);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
