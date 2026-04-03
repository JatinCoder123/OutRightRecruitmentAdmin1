import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roleAPI } from '../../services/api';

const initialState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk(
  'roles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const roles = await roleAPI.getAll();
      return roles;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch roles');
    }
  }
);

export const createRole = createAsyncThunk(
  'roles/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await roleAPI.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create role');
    }
  }
);

export const updateRole = createAsyncThunk(
  'roles/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await roleAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update role');
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/delete',
  async (id, { rejectWithValue }) => {
    try {
      await roleAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete role');
    }
  }
);

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.unshift(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        if (state.selectedRole?.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(r => r.id !== action.payload);
        if (state.selectedRole?.id === action.payload) {
          state.selectedRole = null;
        }
      });
  },
});

export const { setSelectedRole } = roleSlice.actions;
export default roleSlice.reducer;
