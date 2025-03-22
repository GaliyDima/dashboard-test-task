import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token?: string;
  phone?: string;
  address?: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    postalCode?: string;
    state?: string;
  };
  age?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  usersList: User[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  users: UsersState;
}

export interface ApiError {
  message: string;
  status?: number;
  [key: string]: any;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Помилка входу";
    return rejectWithValue(errorMessage);
  }
});
