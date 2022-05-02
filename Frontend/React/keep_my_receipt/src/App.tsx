import Navigation from './header';
import BookIndex from './domain/Book/Index';
import AlertIndex from './domain/Alert/Index';
import AccountIndex from './domain/Account/Index';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import ClubIndex from './domain/Club/Index';
import ClubCreate from './domain/Club/Create';
import ClubSearch from './domain/Club/Search';
import BookCreate from './domain/Book/Create';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route
        // path="/"
        // element={
        // <Container maxWidth="md">
        //   <p>전체 페이지 nav bar</p>
        //   <ul>
        //     <li>
        //       <Link to="/">Home</Link>
        //     </li>
        //     <li>
        //       <Link to="/club">Club</Link>
        //     </li>
        //     <li>
        //       <Link to="/book">Book</Link>
        //     </li>
        //   </ul>
        //   <Outlet />
        // </Container>
        // }
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
        <Route path="/book/index" element={<BookIndex />} />
        <Route path="/book/create" element={<BookCreate />} />
        <Route path="/alert/index" element={<AlertIndex />} />
        <Route path="/account/index" element={<AccountIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
