import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';

// Types
type EditProfileForm = {
    name: string,
};

const EditProfile = ({ history }: RouteComponentProps) => {
    // Contexts
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

    // States
    const initForm: EditProfileForm = {
        name: authContext.user.name,
    };
    const [form, setForm] = useState<EditProfileForm>(initForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`${process.env.REACT_APP_API_URL}/register`, form)
            .then((res) => {
                toast.success(res.data.detail, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setIsLoading(false);
                setForm(initForm);
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
    }

    return (
        <div className="flex-grow bg-blue-50">
            <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggle,
            }} />
            <header className="text-center bg-blue-200 text-blue-900 pt-17 px-16 pb-16 rounded-b-3xl shadow">
                <h1 className="text-lg font-bold leading-snug mb-2">
                    Sunting Profil
                </h1>
                <p className="text-sm font-semibold">Sunting nama lengkap dan foto profil akun Sibisa Anda.</p>
            </header>
            <section className="text-gray-900 px-4">
                <form
                    className="flex flex-col bg-white -mt-8 p-6 rounded-lg shadow-md"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="mt-2 mb-3">
                        <Input
                            label="Nama Lengkap"
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={form.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mt-2 mb-3">
                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            disabled
                            value={authContext.user.email}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button>
                            Sunting
                        </Button>
                    )}
                </form>
            </section>
        </div>
    )
};

export default EditProfile;