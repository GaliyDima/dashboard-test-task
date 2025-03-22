import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../store/slices/authSlice";
import { RootState } from "../types";
import { AppDispatch } from "../store/store";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (username: string, password: string) => {
    return dispatch(
      loginUser({
        username,
        password,
      })
    );
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
  };
};

export default useAuth;
