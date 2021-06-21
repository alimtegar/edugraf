import { FaLaugh, } from 'react-icons/fa';

// Types
type Props = {
    photo?: string,
    size: number,
};

const Photo = ({ photo, size }: Props) => (
    <div className={`flex justify-center items-center bg-white text-gray-700 w-${size} h-${size} border-3 border-gray-700 rounded-full overflow-hidden focus:outline-none`}>
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