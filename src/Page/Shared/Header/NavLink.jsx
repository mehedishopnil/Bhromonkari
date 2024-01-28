// NavLink.js
import { Link } from 'react-router-dom';

const NavLink = ({ to, label, isActive }) => {
    return (
        <Link
            to={to}
            className={`hover:text-[#f4b664] ${isActive(to) ? 'text-[#f4b664]  *:underline' : ''}`}
        >
            {label}
        </Link>
    );
};

export default NavLink;
