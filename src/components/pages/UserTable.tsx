import { fetchAllUsers } from "@/store/usersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import { SingleUser } from "@/types/userType";
import { AppDispatch, RootState } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userList, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">使用者列表展示</h1>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UserName</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redis Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user: SingleUser, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-6 py-4 whitespace-nowrap">{user.username}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{user.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{user.redis_value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserTable;
