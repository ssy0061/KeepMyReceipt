import Navigation from './header';
import BookIndex from './domain/Book/Index';
import AlertIndex from './domain/Alert/Index';
import AccountIndex from './domain/Account/Index';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import ClubIndex from './domain/Club/Index';
import ClubCreate from './domain/Club/Create';
import ClubSearch from './domain/Club/Search';
import BookCreate from './domain/Book/Create';

import SettingIndex from './domain/Setting/Index';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<p>랜딩 페이지</p>} />
          <Route path="club" element={<Outlet />}>
            <Route index element={<ClubIndex />} />
            <Route path="create" element={<ClubCreate />} />
            <Route path="search" element={<ClubSearch />} />
          </Route>
          <Route path="book" element={<Outlet />}>
            <Route index element={<BookIndex />} />
            <Route path="create" element={<BookCreate />} />
          </Route>
          <Route path="alert" element={<Outlet />}>
            <Route index element={<AlertIndex />} />
            {/* 추가 */}
          </Route>
          <Route path="account" element={<Outlet />}>
            <Route index element={<AccountIndex />} />
            {/* 추가 */}
          </Route>
          <Route path="setting" element={<Outlet />}>
            <Route index element={<SettingIndex />} />
            {/* 추가 */}
          </Route>
        </Route>

        {/* baseUrl/book이면 book index로 접속 */}
        <Route path="/account/index" element={<AccountIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
