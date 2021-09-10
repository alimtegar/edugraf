import classNames from 'classnames';
import { FaLaugh, } from 'react-icons/fa';

// Types
type Props = {
    photo?: string,
    size: number,
    borderW?: number,
    borderColor?: string,
    shadow?: string,
};

const Photo = ({ photo, size, borderW = 3, borderColor = 'white', shadow = 'default', }: Props) => (
    <div className={classNames('flex justify-center items-center bg-gray-100 text-gray-400 rounded-full overflow-hidden focus:outline-none', {
        [`w-${size}`]: size,
        [`h-${size}`]: size,
        [`border-${borderW}`]: borderW,
        [`border-${borderColor}`]: borderColor,
        [`shadow-${shadow}`]: shadow,
    })}>
        {/* {photo ? ( */}
            <img src={photo ? photo : require(`../assets/images/default-photo.jpeg`).default} alt="Foto Profil" className="object-cover w-full h-full" />
        {/* // ) : (
        //     <FaLaugh size={`${size / 10}rem`} />
        // )} */}
    </div>
);

export default Photo;