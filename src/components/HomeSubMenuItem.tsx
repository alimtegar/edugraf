import { Link } from 'react-router-dom';

// Types
import HomeSubMenuItem from '../types/HomeSubMenuItem';

const HomeSubMenuItemComponent = ({ to, icon, title }: HomeSubMenuItem) => (
    <Link to={to}>
        <div className="bg-white text-gray-700 rounded-xl shadow-default overflow-hidden">
            <div className="flex flex-col justify-center items-center text-center p-6">
                {icon}
                <h3 className="font-bold mt-2">
                    {title}
                </h3>
            </div>
        </div>
    </Link>
);

export default HomeSubMenuItemComponent;