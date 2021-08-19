import { useCallback, useEffect, useState } from "react";

type Storage = {
  setItem: (key: string, value: string) => void;
  getItem(key: string): string | null;
};
type ReturnType = [value: string | null, setValue: (val: string) => void];

const MockStorage: Storage = { getItem: () => null, setItem: () => {} };

const useStorage = (key: string, storage: Storage): ReturnType => {
  const [value, setValue] = useState(() => storage.getItem(key));

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(e.newValue);
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [key]);

  const setStorageValue = useCallback(
    (val: string) => {
      setValue(val);
      storage.setItem(key, val);
    },
    [key, storage]
  );
  return [value, setStorageValue];
};

export const useSessionStorage = (key: string) =>
  useStorage(key, typeof window !== "undefined" ? sessionStorage : MockStorage);

export const useLocalStorage = (key: string) =>
  useStorage(key, typeof window !== "undefined" ? localStorage : MockStorage);

export default useStorage;
