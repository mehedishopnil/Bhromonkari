// NavLink.js
import { Link } from 'react-router-dom';

const NavLink = ({ to, label, isActive }) => {
    return (
        <Link
            to={to}
            className={`hover:text-gray-300 ${isActive(to) ? 'text-blue-500 underline' : ''}`}
        >
            {label}
        </Link>
    );
};

export default NavLink;
