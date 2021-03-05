import { FaChevronRight } from 'react-icons/fa';

// Types 
import { default as Props } from '../types/CharacterMenuItem';

const CharacterMenuItem = ({ title, description, icon }: Props) => (
    <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-grow flex-col justify-center items-center aspect-1">
            {icon}
            <h2 className="text-blue-900 font-bold mt-3">{title}</h2>
        </div>
        <div className="flex justify-between items-center bg-blue-50 text-blue-900 text-sm font-bold px-6 py-3">
            {description} <FaChevronRight size="0.66rem" />
        </div>
    </div>
);

export default CharacterMenuItem;