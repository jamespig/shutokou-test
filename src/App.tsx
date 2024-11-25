import { HashRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import UserModal from "./components/pages/UserModal";
import UserPagination from "./components/pages/UserPagination";
import UserSort from "./components/pages/UserSort";
import UserTable from "./components/pages/UserTable";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div className="flex justify-center h-screen">
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserModal />} />
              <Route path="/users" element={<UserTable />} />
              <Route path="/users/sort" element={<UserSort />} />
              <Route path="/users/pagination" element={<UserPagination />} />
            </Routes>
          </Layout>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
