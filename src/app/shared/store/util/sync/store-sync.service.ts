const STORAGE_KEY = '__dnd';

export function StoredState() {
  const storedState = localStorage.getItem(STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : {};
}

export function StoreState(state: any): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
