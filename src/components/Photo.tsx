import { FaLaugh, } from 'react-icons/fa';

// Types
type Props = {
    photo?: string,
    size: number,
};

const Photo = ({ photo, size }: Props) => (
    <div className={`flex justify-center items-center bg-gray-200 text-gray-400 w-${size} h-${size} border-3 border-white rounded-full shadow-default overflow-hidden focus:outline-none`}>
        {photo ? (
            <img
                src={photo}
                alt="Foto Profil"
                className="object-cover w-full h-full"
            />
        ) : (
            <FaLaugh size="2rem" />
        )}
    </div>
);

export default Photo;