// use session storage to persist state
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(`state`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(`state`, serializedState);
  } catch (error) {
    // ignore errors
  }
};
