// utils/localStorage.ts
export const loadFormState = () => {
  try {
    const serializedState = localStorage.getItem("formState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load form state", err);
    return undefined;
  }
};

export const saveFormState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("formState", serializedState);
  } catch (err) {
    console.error("Failed to save form state", err);
  }
};
