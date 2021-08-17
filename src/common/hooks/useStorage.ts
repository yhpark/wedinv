import { useCallback, useEffect, useState } from "react";

type UseStorage = (key: string) => [string | null, (val: string) => void];

const useStorage: UseStorage = (key: string) => {
  const initialValue = () =>
    typeof window === "undefined" ? null : localStorage.getItem(key);
  const [value, setValue] = useState(initialValue);

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
      localStorage.setItem(key, val);
    },
    [key]
  );
  return [value, setStorageValue];
};

export default useStorage;
