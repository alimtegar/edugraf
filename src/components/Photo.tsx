import classNames from 'classnames';
import { FaLaugh, } from 'react-icons/fa';

// Types
type Props = {
    photo?: string,
    size: number,
    borderSize?: number,
    borderColor?: string,
    shadow?: string,
};

const Photo = ({ photo, size, borderSize = 3, borderColor = 'white', shadow = 'default', }: Props) => (
    <div className={classNames('flex justify-center items-center bg-gray-100 text-gray-400 rounded-full overflow-hidden focus:outline-none', {
        [`w-${size}`]: !!size,
        [`h-${size}`]: !!size,
        [`border-${borderSize}`]: !!borderSize,
        [`border-${borderColor}`]: !!borderColor,
        [`shadow-${shadow}`]: !!shadow,
    })}>
        {photo ? (
            <img src={photo} alt="Foto Profil" className="object-cover w-full h-full" />
        ) : (
            <FaLaugh size="2rem" />
        )}
    </div>
);

export default Photo;