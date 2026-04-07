import { createSlice } from "@reduxjs/toolkit";
import { roleAPI } from "../../services/api";

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    selectedRole: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
    message: null,
  },
  reducers: {
    // =========================
    // 📥 FETCH ROLES
    // =========================
    getRolesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getRolesSuccess(state, action) {
      state.loading = false;
      state.roles = action.payload;
    },
    getRolesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // ➕ CREATE ROLE
    // =========================
    createRoleRequest(state) {
      state.creating = true;
      state.error = null;
    },
    createRoleSuccess(state, action) {
      state.creating = false;
      state.roles.unshift(action.payload);
    },
    createRoleFailed(state, action) {
      state.creating = false;
      state.error = action.payload;
    },

    // =========================
    // ✏️ UPDATE ROLE
    // =========================
    updateRoleRequest(state) {
      state.updating = true;
      state.error = null;
    },
    updateRoleSuccess(state, action) {
      state.updating = false;

      const index = state.roles.findIndex(
        (r) => r.id === action.payload.id
      );

      if (index !== -1) {
        state.roles[index] = action.payload;
      }

      if (state.selectedRole?.id === action.payload.id) {
        state.selectedRole = action.payload;
      }
    },
    updateRoleFailed(state, action) {
      state.updating = false;
      state.error = action.payload;
    },

    // =========================
    // ❌ DELETE ROLE
    // =========================
    deleteRoleRequest(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteRoleSuccess(state, action) {
      state.deleting = false;

      state.roles = state.roles.filter(
        (r) => r.id !== action.payload
      );

      if (state.selectedRole?.id === action.payload) {
        state.selectedRole = null;
      }
    },
    deleteRoleFailed(state, action) {
      state.deleting = false;
      state.error = action.payload;
    },

    // =========================
    // 🎯 SELECT ROLE
    // =========================
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },
});


// ==========================
// 🚀 ASYNC ACTIONS (LIKE DEALS)
// ==========================

// 🔹 Fetch Roles
export const getRoles = () => async (dispatch) => {
  dispatch(roleSlice.actions.getRolesRequest());

  try {
    const roles = await roleAPI.getAll();
    dispatch(roleSlice.actions.getRolesSuccess(roles));
  } catch (error) {
    dispatch(
      roleSlice.actions.getRolesFailed(
        error.response?.data || "Failed to fetch roles"
      )
    );
  }
};

// 🔹 Create Role
export const createRole = (data) => async (dispatch) => {
  dispatch(roleSlice.actions.createRoleRequest());

  try {
    const response = await roleAPI.create(data);
    dispatch(roleSlice.actions.createRoleSuccess(response.data));
  } catch (error) {
    dispatch(
      roleSlice.actions.createRoleFailed(
        error.response?.data || "Failed to create role"
      )
    );
  }
};

// 🔹 Update Role
export const updateRole = ({ id, data }) => async (dispatch) => {
  dispatch(roleSlice.actions.updateRoleRequest());

  try {
    const response = await roleAPI.update(id, data);
    dispatch(roleSlice.actions.updateRoleSuccess(response.data));
    dispatch(getRoles())
  } catch (error) {
    dispatch(
      roleSlice.actions.updateRoleFailed(
        error.response?.data || "Failed to update role"
      )
    );
  }
};

// 🔹 Delete Role
export const deleteRole = (id) => async (dispatch) => {
  dispatch(roleSlice.actions.deleteRoleRequest());

  try {
    await roleAPI.delete(id);
    dispatch(roleSlice.actions.deleteRoleSuccess(id));
  } catch (error) {
    dispatch(
      roleSlice.actions.deleteRoleFailed(
        error.response?.data || "Failed to delete role"
      )
    );
  }
};


// ==========================
export const { setSelectedRole, clearError } = roleSlice.actions;
export default roleSlice.reducer;