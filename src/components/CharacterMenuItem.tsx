// Types 
import CharacterMenuItem from '../types/CharacterMenuItem';

const CharacterMenuItemComponent = ({ title, icon }: CharacterMenuItem) => (
    <div className="flex items-center bg-white text-blue-900 text-sm font-bold p-2 rounded-lg shadow-default">
        <span className="flex justify-center items-center bg-pink-500 text-white w-10.5 h-10.5 font-extrabold text-xl mr-4 rounded-lg shadow-md">
            {icon}
        </span>
        {title}
    </div>
);

export default CharacterMenuItemComponent;