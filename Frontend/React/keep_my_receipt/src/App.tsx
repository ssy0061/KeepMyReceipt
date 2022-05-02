import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import ClubIndex from './domain/Club/Index';
import ClubCreate from './domain/Club/Create';
import ClubSearch from './domain/Club/Search';
import BookIndex from './domain/Book/Index';
import BookCreate from './domain/Book/Create';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route
          path="/"
          element={
            <Container maxWidth="md">
              <p>전체 페이지 nav bar</p>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/club">Club</Link>
                </li>
                <li>
                  <Link to="/book">Book</Link>
                </li>
              </ul>
              <Outlet />
            </Container>
          }
        >
          <Route index element={<p>랜딩 페이지</p>} />
          <Route path="club" element={<Outlet />}>
            <Route index element={<ClubIndex />} />
            <Route path="create" element={<ClubCreate />} />
            <Route path="search" element={<ClubSearch />} />
          </Route>
          <Route path="book" element={<Outlet />}>
            <Route index element={<BookIndex />} />
          </Route>
        </Route>

        {/* <Route path="/club/index" element={<ClubIndex />} />
        <Route path="/club/create" element={<ClubCreate />} />
        <Route path="/club/search" element={<ClubSearch />} /> */}
        <Route path="/book/index" element={<BookIndex />} />
        <Route path="/book/create" element={<BookCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
