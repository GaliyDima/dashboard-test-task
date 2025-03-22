import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { UsersState, UsersResponse } from "../../types";

export const fetchUsers = createAsyncThunk<
  UsersResponse,
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<UsersResponse>("/users");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error loading users");
  }
});

const initialState: UsersState = {
  usersList: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UsersResponse>) => {
          state.loading = false;
          state.usersList = action.payload.users;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading users";
      });
  },
});

export default usersSlice.reducer;
