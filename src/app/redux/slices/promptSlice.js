import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promptAPI } from '../../services/api';
import { mockPrompts } from '../../utils/mockData';

const initialState = {
  prompts: mockPrompts,
  selectedPrompt: null,
  loading: false,
  error: null,
};

export const fetchPrompts = createAsyncThunk(
  'prompts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await promptAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch prompts');
    }
  }
);

export const updatePrompt = createAsyncThunk(
  'prompts/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await promptAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update prompt');
    }
  }
);

export const generateQuestions = createAsyncThunk(
  'prompts/generateQuestions',
  async (promptId, { rejectWithValue }) => {
    try {
      const response = await promptAPI.generateQuestions(promptId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to generate questions');
    }
  }
);

const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    setSelectedPrompt: (state, action) => {
      state.selectedPrompt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePrompt.fulfilled, (state, action) => {
        const index = state.prompts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.prompts[index] = action.payload;
        }
      });
  },
});

export const { setSelectedPrompt } = promptSlice.actions;
export default promptSlice.reducer;
