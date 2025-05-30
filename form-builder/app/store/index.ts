// app/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import { loadFormState, saveFormState } from '../utils/localStorage';

const persistedState = loadFormState();

const rootReducer = combineReducers({
  form: formReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveFormState(store.getState());
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
