import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleUser, UserType } from "../types/userType";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_BASE_URL = `${CORS_PROXY}${import.meta.env.VITE_API_URL}`;

// 因為我有部署到Github Page上，https無法取得http來源的內容，所以要透過這種方式處理
const enableCORSProxy = async () => {
  try {
    const response = await fetch(CORS_PROXY, { method: "GET" });
    if (response.ok) {
      console.log("CORS Proxy 已啟用！");
    } else {
      console.error("CORS Proxy 啟用失敗：", response.statusText);
    }
  } catch (error) {
    console.error("無法啟用 CORS Proxy:", error);
  }
};

// 有指定id
export const fetchUser = createAsyncThunk<
  SingleUser, // fulfilled 的返回類型
  number, // 傳入參數的類型
  { rejectValue: { status: number; message: string } } // rejected 的 payload 類型
>(
  "users/fetchUser", // Action 的名稱
  async (userId: number, thunkAPI) => {
    try {
      enableCORSProxy() // 開始呼叫API前先去取得憑證
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);

      if (!response.ok) {
        // Response 的 ok 為 false，根據 status 做處理
        if (response.status === 400) {
          return thunkAPI.rejectWithValue({
            status: response.status,
            message: "Bad Request：請檢查輸入ID是否正確！",
          });
        } else if (response.status === 404) {
          return thunkAPI.rejectWithValue({
            status: response.status,
            message: "Not Found：使用者不存在！",
          });
        } else {
          return thunkAPI.rejectWithValue({
            status: response.status,
            message: `Unexpected Error: ${response.statusText}`,
          });
        }
      }

      const data = await response.json();
      return data; // fulfilled 時返回的數據
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: 500,
        message: `伺服器錯誤，請稍後再試！ ${error}`,
      }); // rejected 時返回的錯誤
    }
  }
);
// 全部抓取
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      enableCORSProxy() // 開始呼叫API前先去取得憑證
      // 同時發送多支 API 請求
      const responses = await Promise.all([
        fetch(`${API_BASE_URL}/users/1`),
        fetch(`${API_BASE_URL}/users/2`),
      ]);

      const dataList: Array<SingleUser> = await Promise.all(
        responses.map((res) => res.json() as Promise<SingleUser>)
      );
      return dataList;
    } catch (error) {
      // 如果其中一支 API 發生錯誤，統一處理
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState: UserType = {
  singleUser: {
    username: "",
    email: "",
    redis_value: "",
  },
  userList: [],
  sortedUsers: [],
  sortBy: "username",
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  // 內部行為
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.sortedUsers = [...state.userList].sort((a, b) => {
        // 有符合三個欄位時使用三個欄位做排序，沒有預設使用username做排序
        if (
          Object.prototype.hasOwnProperty.call(
            initialState.singleUser,
            state.sortBy
          )
        ) {
          return a[state.sortBy].localeCompare(b[state.sortBy], undefined, {
            sensitivity: "base",
          }); // 忽略大小寫
        } else {
          return a.username.localeCompare(b.username, undefined, {
            sensitivity: "base",
          });
        }
      });
    },
    setError: (state, action) => {
      state.error = action.payload; // 更新錯誤訊息
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  // 有使用到外部API資料的行為
  extraReducers: (builder) => {
    builder
      // fetchUser cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // fetchAllUsers cases
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
        state.sortedUsers = [...action.payload].sort((a, b) => {
          if (
            Object.prototype.hasOwnProperty.call(
              initialState.singleUser,
              state.sortBy
            )
          ) {
            return a[state.sortBy].localeCompare(b[state.sortBy], undefined, {
              sensitivity: "base",
            }); // 忽略大小寫
          } else {
            return a.username.localeCompare(b.username, undefined, {
              sensitivity: "base",
            });
          }
        });
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, clearError } = usersSlice.actions;
export default usersSlice.reducer;
