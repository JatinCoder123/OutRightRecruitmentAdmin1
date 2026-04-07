import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candidateAPI } from '../../services/api';

const initialState = {
  candidates: [],
  selectedCandidate: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    role: 'all',
    round: 'all',
    dateRange: null,
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await candidateAPI.getAll();
      return data.candidates;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch candidates');
    }
  }
);

export const fetchCandidateById = createAsyncThunk(
  'candidates/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await candidateAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch candidate');
    }
  }
);

export const updateCandidate = createAsyncThunk(
  'candidates/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await candidateAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update candidate');
    }
  }
);

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSelectedCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCandidateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCandidate = action.payload;
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        const index = state.candidates.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.candidates[index] = action.payload;
        }
        if (state.selectedCandidate?.id === action.payload.id) {
          state.selectedCandidate = action.payload;
        }
      });
  },
});

export const { setFilters, clearFilters, setPagination, setSelectedCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
