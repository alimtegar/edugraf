import { NavLink } from 'react-router-dom';
import { FaHome, FaListOl, FaUserCircle, } from 'react-icons/fa';

const BottomNavbar = () => {
    const menu = [
        {
            title: 'Beranda',
            icon: (<FaHome size="1.66rem" className="transform -translate-y-0.25" />),
            to: '/',
        },
        {
            title: 'Peringkat',
            icon: (<FaListOl size="1.66rem" className="transform -translate-y-0.25" />),
            to: '/leaderboard',
        },
        {
            title: 'Profil',
            icon: (<FaUserCircle size="1.66rem" className="transform -translate-y-0.25" />),
            to: '/profile',
        },
    ];

    return (
        <nav className="fixed z-20 bottom-0 bg-white w-full p-4 rounded-t-3xl shadow-default">
            <ul className="flex justify-around">
                {menu.map(({ title, icon, to }) => (
                    <li key={to}>
                        <NavLink
                            className="flex flex-col justify-center items-center text-gray-400 hover:text-blue-500 active:text-blue-500"
                            activeClassName="text-blue-500"
                            to={to}
                            exact
                        >
                            {icon}
                            <span className="text-sm font-bold leading-none mt-2">
                                {title}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default BottomNavbar;