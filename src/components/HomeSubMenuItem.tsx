import { FaChevronRight } from 'react-icons/fa';

// Types
import { default as Props } from '../types/HomeSubMenuItem';


const HomeSubMenuItemComponent = ({ title, description, icon }: Props) => {
    return (
        <div className="group flex flex-col rounded-lg shadow-default overflow-hidden">
            <div className="flex justify-between items-center bg-blue-200 py-6 px-6">
                <h2 className="text-lg font-bold">{title}</h2>
                {icon}
            </div>
            {/* <div className="flex justify-between items-center bg-white text-gray-500 text-sm font-semibold px-6 py-3">
                {description} <FaChevronRight size="0.66rem" />
            </div> */}
        </div>
    );
}

export default HomeSubMenuItemComponent;