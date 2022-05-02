import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './item';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import classes from '../header/MainNavigation.module.css';
import SettingsIcon from '@mui/icons-material/Settings';

const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Keep my Receipt</Link>
      </div>
      <nav>
        <ul>
          <li className="menu">
            <Link to="/book">거래내역</Link>
          </li>
          <li className="menu">
            <Link to="/">분석</Link>
          </li>
          <li className="menu">
            <Link to="/">거래등록</Link>
          </li>
          <li className="menu">
            <Link to="/club">모임관리</Link>
          </li>
          <li className="menu">
            <Link to="/">보고서</Link>
          </li>
          <div className={classes.mobile}>
            <Link to="/alert">
              <NotificationsActiveIcon />
            </Link>
          </div>
          <div className={classes.mobile}>
            <Link to="/setting">
              <SettingsIcon />
            </Link>
          </div>
        </ul>

        <div className={classes.mobile}></div>
      </nav>
    </header>
  );
};

export default Navigation;
// <header className={classes.header}>
//     <div
//       className={!menuToggle ? 'burger__menu' : 'x__menu'}
//       onClick={() =>
//         menuToggle ? setMenuToggle(false) : setMenuToggle(true)
//       }
//     >
//       <div className="burger_line1"></div>
//       <div className="burger_line2"></div>
//       <div className="burger_line3"></div>
//     </div>

//     <div
//       className={[
//         'menu__box',
//         !menuToggle ? 'menu__box__hidden' : 'menu__box__visible',
//       ].join(' ')}
//     >
//       <div className="menu__list">
//         {menu.map((data) => (
//           <NavItem
//             data={data}
//             key={data.address}
//             offNav={() => setMenuToggle(false)}
//           />
//         ))}
