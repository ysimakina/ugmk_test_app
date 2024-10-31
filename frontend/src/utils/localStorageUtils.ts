export const getItemFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setItemInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
