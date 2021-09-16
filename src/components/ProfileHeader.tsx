import { FaPen, } from 'react-icons/fa';
import { Link, } from 'react-router-dom';

// Componentns
import Photo from './Photo';
import XpBar from './XpBar';
import Button from './Button';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Types
type Props = {
    editProfileButton?: boolean,
}

const ProfileHeader = ({ editProfileButton = true }: Props) => {
    // Contexts
    const { user: { name, photo, } } = useAuthContext();

    return (
        <header className="text-gray-700 text-center p-8 md:pt-21 md:pb-12">
            <div className="inline-flex relative mb-3">
                <Photo photo={photo} size={24} />
                {editProfileButton ? (
                    <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                        <Link to="/edit-profile">
                            <Button
                                w={11}
                                h={11}
                                shadow="default"
                                center
                                onClick={() => { }}
                            >
                                <FaPen />
                            </Button>
                        </Link>
                    </span>
                ) : null}
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-extrabold leading-none active:underline hover:underline mb-4">
                    {name}
                </h1>
                <XpBar bgColor="gray-500 bg-opacity-10" />
            </div>
        </header>
    );
};

export default ProfileHeader;