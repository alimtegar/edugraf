import { useState, } from 'react';
import axios from 'axios';
import { RouteComponentProps, } from 'react-router-dom';
import { toast, } from 'react-toastify';
import { FaChevronLeft, } from 'react-icons/fa';

// Contexts
import { useAuthContext, } from '../contexts/AuthContext';

// Components
import Navbar from './Navbar';
import ProfileHeader from './ProfileHeader';
import UpdateUserNavbar from './UpdateUserNavbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';
import PhotoDropzone from './PhotoDropzone';


const EditProfile = ({ history }: RouteComponentProps) => {
    // Contexts
    const authContext = useAuthContext();

    // States
    const [name, setName] = useState(authContext.user.name);
    const [photoFile, setPhotoFile] = useState<File>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        let data = new FormData();

        if (photoFile) {
            data.append('photo', photoFile);
        }

        data.append('name', name);

        axios.put(`${process.env.REACT_APP_API_URL}/profile`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                authContext.setAuthUser(res.data);
                toast.success('Profil akun Sibisa berhasil disunting.', {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data.detail, {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setIsLoading(false);
            });
    };

    return (
        <>
            <Navbar
                leftButton={{
                    icon: (<FaChevronLeft size="1rem" />),
                    onClick: () => history.replace('/profile'),
                }}
            />

            <ProfileHeader editProfileButton={false} />

            <main className="flex-grow bg-white text-gray-700 p-8 rounded-t-3xl shadow-default">
                <section>
                    <UpdateUserNavbar />
                    <form
                        className="flex flex-col"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <PhotoDropzone
                            {...authContext.user.photo && { initPhoto: authContext.user.photo, }}
                            setPhotoFile={setPhotoFile}
                        />
                        <div className="mt-2 mb-3">
                            <Input
                                label="Nama Lengkap"
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-2 mb-6">
                            <Input
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                disabled
                                value={authContext.user.email}
                            />
                        </div>
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">
                                Simpan
                            </Button>
                        )}
                    </form>
                </section>
            </main>
        </>
    )
};

export default EditProfile;