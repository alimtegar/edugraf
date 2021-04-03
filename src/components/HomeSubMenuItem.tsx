import { Link } from 'react-router-dom';

// Types
import HomeSubMenuItem from '../types/HomeSubMenuItem';

const HomeSubMenuItemComponent = ({ to, icon, title }: HomeSubMenuItem) => (
    <Link to={to}>
        <div className="text-blue-900 rounded-lg shadow overflow-hidden">
            <div className="flex flex-col justify-center items-center bg-blue-200 text-center p-6">
                {icon}
                <h3 className="text-sm font-bold mt-4">
                    {title}
                </h3>
            </div>
        </div>
    </Link>
);

export default HomeSubMenuItemComponent;