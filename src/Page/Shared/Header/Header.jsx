import { Link, useLocation } from 'react-router-dom';
import  NavLink  from "./NavLink"

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className='grid grid-cols-6 items-center bg-gray-800 text-white p-4'>
            <div className=' flex col-span-1 items-center'>
                <h2 className='text-2xl font-bold'>BHROMONKARI</h2>
            </div>
            <div className='col-span-3 flex justify-center space-x-4'>
                <NavLink to='/' label='Home' isActive={isActive} />
                <NavLink to='/dashboard' label='Dashboard' isActive={isActive} />
                <NavLink to='/tour-location' label='Tour Location' isActive={isActive} />
            </div>
            <div className='col-span-2 flex justify-end items-center gap-5'>
                {/* Add your login and registration components here */}
                <Link><button>Login</button></Link>
                <Link><button>Registration</button></Link>
            </div>
        </div>
    );
};



export default Header;
