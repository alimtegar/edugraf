import { NavLink, } from 'react-router-dom';

const UpdateUserNavbar = () => {
    const menu = [
        {
            title: 'Edit Profil',
            to: '/edit-profile',
        },
        {
            title: 'Ubah Kata Sandi',
            to: '/change-password',
        },
    ];

    return (
        <nav className="-mt-4 mb-8">
            <ul className="flex">
                {menu.map(({ title, to }) => (
                    <li className="inline-flex flex-1" key={to}>
                        <NavLink
                            className="w-full font-bold text-center text-gray-400 p-4 border-b-3 border-gray-200"
                            activeClassName="text-blue-500 border-blue-500"
                            to={to}>
                            {title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default UpdateUserNavbar;