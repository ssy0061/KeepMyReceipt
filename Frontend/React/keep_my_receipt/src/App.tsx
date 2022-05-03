import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupIndex from './domain/Group/Index';
import GroupCreate from './domain/Group/Create';
import GroupSearch from './domain/Group/Search';
import BookIndex from './domain/Book/Index';
import BookCreate from './domain/Book/Create';
import BookUpdate from './domain/Book/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route path="/group/index" element={<GroupIndex />} />
        <Route path="/group/create" element={<GroupCreate />} />
        <Route path="/group/search" element={<GroupSearch />} />
        <Route path="/book/index" element={<BookIndex />} />
        <Route path="/book/create" element={<BookCreate />} />
        <Route path="/book/update" element={<BookUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
