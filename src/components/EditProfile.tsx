import { useState, } from 'react';
import axios from 'axios';
import { toast, } from 'react-toastify';
import { FaBars, } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';
import PhotoDropzone from './PhotoDropzone';


const EditProfile = () => {
    // Contexts
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

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
            <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggleSidebar,
            }} />
            <header className="text-center text-white pt-19 px-16 pb-10 rounded-b-3xl shadow">
                <h1 className="text-lg font-extrabold leading-snug mb-2">
                    Sunting Profil
                </h1>
                <p className="text-sm font-semibold">Sunting nama lengkap dan foto profil akun Sibisa anda.</p>
            </header>
            <section className="text-gray-700 px-4">
                <form
                    className="flex flex-col bg-white p-6 rounded-xl shadow-default"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <PhotoDropzone
                        {...authContext.user.photo && { initPhoto: `${process.env.REACT_APP_API_URL}/${authContext.user.photo}` }}
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
                            Sunting
                        </Button>
                    )}
                </form>
            </section>
        </>
    )
};

export default EditProfile;