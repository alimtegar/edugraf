// Types 
import { default as Props } from '../types/CharacterMenuItem';

const CharacterMenuItem = ({ title, icon }: Props) => (
    <div className="flex items-center bg-white text-blue-900 text-sm font-bold p-1 rounded-full shadow-default">
        <span className="flex justify-center items-center bg-pink-500 text-white w-10.5 h-10.5 font-extrabold text-xl mr-4 rounded-full shadow-md">
            {icon}
        </span>
        {title}
    </div>
);

export default CharacterMenuItem;