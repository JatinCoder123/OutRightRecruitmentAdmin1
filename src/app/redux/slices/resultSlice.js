import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resultAPI } from '../../services/api';
import { mockResults } from '../../utils/mockData';

const initialState = {
  results: mockResults,
  leaderboard: [],
  loading: false,
  error: null,
};

export const fetchResults = createAsyncThunk(
  'results/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await resultAPI.getAll(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch results');
    }
  }
);

export const exportResults = createAsyncThunk(
  'results/export',
  async (format, { rejectWithValue }) => {
    try {
      const response = await resultAPI.export(format);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to export results');
    }
  }
);

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLeaderboard } = resultSlice.actions;
export default resultSlice.reducer;
