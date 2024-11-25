import { fetchUser } from "@/store/usersSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/store";

const UserModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { singleUser, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!userId || Number.isNaN(Number(userId))) {
      dispatch({ type: "users/setError", payload: "請輸入有效的數字ID" });
      return;
    }
    await dispatch(fetchUser(Number(userId))).unwrap();
    dispatch({ type: "users/clearError" });
    setIsOpen(true);
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 size-80 flex flex-col justify-center content-center">
        <h1 className="text-2xl font-bold mb-4 text-white">使用者資訊展示</h1>
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="輸入使用者ID"
            className="p-2 border rounded bg-white"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-white rounded disabled:bg-gray-400"
          >
            查詢
          </Button>
        </div>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>使用者資訊</DialogTitle>
            </DialogHeader>
            <DialogDescription>顯示取得用戶資訊。</DialogDescription>
            <div className="p-4">
              {singleUser && (
                <div>
                  <p>
                    <strong>用戶名：</strong> {singleUser.username}
                  </p>
                  <p>
                    <strong>Email：</strong> {singleUser.email}
                  </p>
                  <p>
                    <strong>Redis值：</strong> {singleUser.redis_value}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserModal;
