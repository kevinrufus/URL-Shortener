/**
 *
 * A function to retrieve a value from local storage.
 * If the value doesn't exist or an error occurs while retrieving the value, undefined is returned.
 */
function getItem<T>(key: string): T | undefined {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch {
    return undefined;
  }
}

/**
 *
 * A function to set a value in local storage.
 * If an error occurs while retrieving the value, the error is logged.
 */
function setItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error while setting item in local storage", e);
  }
}

/**
 *
 * A function to retrieve a value from local storage.
 * If an error occurs while retrieving the value, the error is logged.
 */
function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.error("Error while removing item from local storage", e);
  }
}

export const localStorageFn = {
  getItem,
  setItem,
  removeItem,
};
