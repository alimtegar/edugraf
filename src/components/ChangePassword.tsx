import { useState, } from 'react';
import axios from 'axios';
import { RouteComponentProps, } from 'react-router-dom';
import { toast, } from 'react-toastify';
import { FaChevronLeft, } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import Navbar from './Navbar';
import ProfileHeader from './ProfileHeader';
import UpdateUserNavbar from './UpdateUserNavbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';

// Types
type ChangePasswordForm = {
    current_password: string,
    new_password: string,
    new_password_confirmation: string,
};

const ChangePassword = ({ history }: RouteComponentProps) => {
    // Contexts
    const authContext = useAuthContext();

    // States
    const initForm: ChangePasswordForm = {
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    };
    const [form, setForm] = useState<ChangePasswordForm>(initForm);
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

        axios.put(`${process.env.REACT_APP_API_URL}/profile/password`, form)
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
                        <input id="email" name="email" autoComplete="username" readOnly value={authContext.user.email} className="hidden" />
                        {/* <div className="mt-2 mb-3">
                        <Input
                            label="Kata Sandi Sekarang"
                            type="password"
                            id="current_password"
                            name="current_password"
                            autoComplete="current-password"
                            required
                            value={form.current_password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div> */}
                        <div className="mt-2 mb-3">
                            <Input
                                label="Kata Sandi Baru"
                                type="password"
                                id="new_password"
                                name="new_password"
                                autoComplete="new-password"
                                required
                                value={form.new_password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-6">
                            <Input
                                label="Konfirmasi Kata Sandi Baru"
                                type="password"
                                id="new_password_confirmation"
                                name="new_password_confirmation"
                                autoComplete="new-password"
                                required
                                value={form.new_password_confirmation}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">
                                Ubah
                            </Button>
                        )}
                    </form>
                </section>
            </main>
        </>
    )
};

export default ChangePassword;