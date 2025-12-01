export const saveToLocalStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const addItemToLocalStorage = <T extends { id: string }>(
  key: string,
  item: T
): void => {
  const existing = getFromLocalStorage<T>(key);
  existing.push(item);
  saveToLocalStorage<T>(key, existing);
};

export const updateItemInLocalStorage = <T extends { id: string }>(
  key: string,
  updatedItem: T
): void => {
  const existing = getFromLocalStorage<T>(key);

  const updated = existing.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );

  saveToLocalStorage<T>(key, updated);
};

export const deleteItemFromLocalStorage = (key: string, id: string): void => {
  const existing = getFromLocalStorage(key);
  const filtered = existing.filter((item: any) => item.id !== id);

  saveToLocalStorage(key, filtered);
};
