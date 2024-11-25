import { fetchAllUsers } from "@/store/usersSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AppDispatch, RootState } from "@/store";

const UserPagination = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userList, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [activeTab, setActiveTab] = useState("0");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">使用者資訊分頁</h1>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {userList.map((_, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                使用者 {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {userList.map((user, index) => (
            <TabsContent key={index} value={index.toString()}>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">使用者資訊</h3>
                <div className="space-y-2">
                  <p>
                    <strong>用戶名：</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email：</strong> {user.email}
                  </p>
                  <p>
                    <strong>Redis值：</strong> {user.redis_value}
                  </p>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default UserPagination;
