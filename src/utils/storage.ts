export const setToLS = <T>(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = <T>(key: string): T | null => {
  const value: string | null = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return null;
};
