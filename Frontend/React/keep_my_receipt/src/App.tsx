import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Navigation from './header';
import SimpleBottomNavigation from './footer';
import Landing from './domain/Landing';

import BookIndex from './domain/Book/Index';
import AlertIndex from './domain/Alert/Index';
import LoginIndex from './domain/Account/Login';
import SignUpIndex from './domain/Account/SignUp';
import ClubIndex from './domain/Club/Index';
import ClubCreate from './domain/Club/Create';
import ClubSearch from './domain/Club/Search';
import BookCreate from './domain/Book/Create';
import BookUpdate from './domain/Book/Update';

import SettingIndex from './domain/Setting/Index';
import CameraIndex from './domain/Receipt/Camera';
import RequestIndex from './domain/Receipt/Request';
import RequestListIndex from './domain/Receipt/RequestList';
import ApproveIndex from './domain/Receipt/Approve';
import ManageIndex from './domain/Manage';
import MainChartIndex from './domain/Analytics';
import SubChartIndex from './domain/Analytics/MediumTagChart';
import BudgetReport from './domain/Report/Budget';
import AssetReport from './domain/Report/Asset';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route path="/" element={<RootPage />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Outlet />}>
            <Route index element={<LoginIndex />} />
          </Route>
          <Route path="signup" element={<Outlet />}>
            <Route index element={<SignUpIndex />} />
          </Route>

          <Route path="alert" element={<Outlet />}>
            <Route index element={<AlertIndex />} />
          </Route>
          <Route path="club" element={<Outlet />}>
            <Route index element={<ClubIndex />} />
            <Route path="create" element={<ClubCreate />} />
            <Route path="search" element={<ClubSearch />} />
            <Route path=":id" element={<Outlet />}>
              <Route path="setting" element={<Outlet />}>
                <Route index element={<SettingIndex />} />
                {/* 추가 */}
              </Route>
              <Route path="book" element={<Outlet />}>
                <Route index element={<BookIndex />} />
                <Route path="create" element={<BookCreate />} />
                <Route path="update" element={<BookUpdate />} />
              </Route>
              <Route path="receipt" element={<Outlet />}>
                <Route path="camera" element={<CameraIndex />} />
                <Route path="request" element={<RequestIndex />} />
                <Route path="requestList" element={<RequestListIndex />} />
                <Route path="approve" element={<ApproveIndex />} />
              </Route>
              <Route path="analytics" element={<Outlet />}>
                <Route path="mainChart" element={<MainChartIndex />} />
                <Route path="subChart" element={<SubChartIndex />} />
                {/* 추가 */}
              </Route>
              <Route path="report" element={<Outlet />}>
                <Route path="asset" element={<AssetReport />} />
                <Route path="budget" element={<BudgetReport />} />
              </Route>
              <Route path="manage" element={<Outlet />}>
                <Route index element={<ManageIndex />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* baseUrl/book이면 book index로 접속 */}
        <Route path="/login/index" element={<LoginIndex />} />
        <Route path="/setting/index" element={<SettingIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

function RootPage() {
  const accessToken = sessionStorage.getItem('accessToken');
  useEffect(() => {
    // header accessToken 설정
    axios.defaults.headers.common['Authorization'] = `${accessToken}`;
  }, []);
  return (
    <>
      <Navigation />
      <Outlet />
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
