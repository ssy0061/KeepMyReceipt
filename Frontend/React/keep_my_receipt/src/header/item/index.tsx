import { Link } from 'react-router-dom';

export default function IndexItem() {
  return (
    <div>
      <ul>
        <li className="menu">
          <Link to="/book/index">거래내역</Link>
        </li>
        <li className="menu">
          <Link to="/">분석</Link>
        </li>
        <li className="menu">
          <Link to="/">거래등록</Link>
        </li>
        <li className="menu">
          <Link to="/">모임관리</Link>
        </li>
        <li className="menu">
          <Link to="/">보고서</Link>
        </li>
      </ul>
    </div>
  );
}
