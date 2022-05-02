import '../styles/navigation.css';
import { Link } from 'react-router-dom';

interface NavProps {
  data: {
    name: string;
    address: string;
  };
  offNav: Function;
}

export default function NavItem({ data, offNav }: NavProps): JSX.Element {
  const { name, address } = data;

  return (
    <Link to={`${address}`} className="menu__item" onClick={() => offNav()}>
      {name}
    </Link>
  );
}
