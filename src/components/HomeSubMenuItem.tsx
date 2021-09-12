import { Link } from 'react-router-dom';

// Utils
import { getStageCategoryColor } from '../Utils';

// Types
import HomeSubMenuItem from '../types/HomeSubMenuItem';


const HomeSubMenuItemComponent = ({ to, icon, title, category, }: HomeSubMenuItem) => (
    <Link to={to}>
        <div className="relative bg-white text-gray-700 rounded-t-xl rounded-b shadow-default overflow-hidden">
            <div
                className={`absolute bottom-0 h-0.75 w-full rounded-r-xl bg-${getStageCategoryColor(category)}`}
            />
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