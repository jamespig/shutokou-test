import { fetchAllUsers, setSortBy } from "@/store/usersSlice";
import { SingleUser } from "@/types/userType";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import { RootState, AppDispatch } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const UserSort = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sortedUsers, loading, error, sortBy } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">使用者資訊排序</h1>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-4">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="username">按用戶名排序</option>
              <option value="email">按Email排序</option>
              <option value="redis_value">按Redis值排序</option>
            </select>
          </div>
          <Table className="min-w-full text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UserName
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Redis Value
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user: SingleUser, index: number) => (
                <TableRow key={index}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {user.redis_value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default UserSort;
