import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";
import { RootState } from "../types";
import { AppDispatch } from "../store/store";

const useFetchUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersList, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const getUsers = () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users: usersList,
    loading,
    error,
    refetch: getUsers,
  };
};

export default useFetchUsers;
