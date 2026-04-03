import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { questionAPI } from '../../services/api';
import { mockQuestions } from '../../utils/mockData';

const initialState = {
  questions: mockQuestions,
  selectedQuestion: null,
  loading: false,
  error: null,
  filters: {
    type: 'all',
    difficulty: 'all',
    tags: [],
  },
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await questionAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch questions');
    }
  }
);

export const createQuestion = createAsyncThunk(
  'questions/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await questionAPI.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create question');
    }
  }
);

export const updateQuestion = createAsyncThunk(
  'questions/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await questionAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update question');
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await questionAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete question');
    }
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.unshift(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(q => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(q => q.id !== action.payload);
      });
  },
});

export const { setFilters, setSelectedQuestion } = questionSlice.actions;
export default questionSlice.reducer;
