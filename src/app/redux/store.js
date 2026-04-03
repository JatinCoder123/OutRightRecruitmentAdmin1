import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import candidateReducer from './slices/candidateSlice';
import resultReducer from './slices/resultSlice';
import questionReducer from './slices/questionSlice';
import promptReducer from './slices/promptSlice';
import roleReducer from './slices/roleSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer,
    results: resultReducer,
    questions: questionReducer,
    prompts: promptReducer,
    roles: roleReducer,
    ui: uiReducer,
  },
});

export default store;
