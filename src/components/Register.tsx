import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

// Contexts
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Logo from './Logo';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';
import AuthNavbar from './AuthNavbar';

// Types
type RegisterForm = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
};

const Register = ({ history }: RouteComponentProps) => {
    // States
    const initForm: RegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    const [form, setForm] = useState<RegisterForm>(initForm);
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
        <div className="flex flex-col flex-grow bg-gradient-to-tl from-blue-500 to-blue-400 text-white">
            <header className="pt-20 px-16 pb-20 md:pt-25">
                <Logo />
            </header>

            <main className="flex-grow bg-white text-gray-700 p-8 rounded-t-3xl shadow-default">
                <AuthNavbar />
                <section>
                    <form
                        className="flex flex-col"
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
                                placeholder="contoh@email.com"
                                autoComplete="username"
                                required
                                value={form.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-3">
                            <Input
                                label="Kata Sandi"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-6">
                            <Input
                                label="Konfirmasi Kata Sandi"
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                required
                                value={form.password_confirmation}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">
                                {/* <FaUserPlus className="inline-flex mr-2 mb-1" /> */}
                                Daftar
                            </Button>
                        )}
                        {/* <p className="text-gray-600 text-sm text-center font-semibold my-4">
                            Sudah punya akun?
                        </p>
                        <Link to={`/login`}>
                            <Button bgColor="red-500" bgColorOn="red-600" type="button">
                                Masuk
                            </Button>
                        </Link> */}
                    </form>
                </section>
            </main>
        </div>
    )
};

export default Register;