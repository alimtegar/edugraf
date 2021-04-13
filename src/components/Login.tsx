import { useState, } from 'react';
import axios from 'axios';
import { toast, } from 'react-toastify';
import { RouteComponentProps, Link, } from 'react-router-dom';
import { FaBars, } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';
import { useSidebarContext } from '../contexts/SidebarContext';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';

// Types
type LoginForm = {
    email: string,
    password: string,
};

const Login = ({ history }: RouteComponentProps) => {
    // Context
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

    // States
    const initForm: LoginForm = {
        email: '',
        password: '',
    };
    const [form, setForm] = useState<LoginForm>(initForm);
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

        axios.post(`${process.env.REACT_APP_API_URL}/login`, form)
            .then((res) => {
                authContext.setAuth(res.data);

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
            <Navbar leftButton={{
                icon: (<FaBars size="0.83rem" />),
                onClick: sidebarContext.toggleSidebar,
            }} />
            <header className="text-center text-white pt-19 px-16 pb-10 rounded-b-3xl">
                <h1 className="text-lg font-extrabold leading-snug mb-2">
                    Masuk Pengguna
                </h1>
                <p className="text-sm font-semibold">Masuk dan lanjutkan proses belajar anda dengan berbagai fitur Sibisa.</p>
            </header>

            <main className="flex-grow">
                <section className="text-gray-900 px-4">
                    <form
                        className="flex flex-col bg-white x-mt-8 p-6 rounded-xl shadow-default"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="mt-2 mb-3">
                            <Input
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="e.g. example@mail.com"
                                autoComplete="username"
                                required
                                value={form.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mt-2 mb-4">
                            <Input
                                label="Kata Sandi"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                required
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button type="submit">
                                Masuk
                            </Button>
                        )}
                        <p className="text-gray-500 text-sm font-semibold text-center my-4">
                            Belum punya akun?
                        </p>
                        <Link to="/register">
                            <Button bgColor="red-500" bgColorOn="red-600" type="button">
                                Daftar
                        </Button>
                        </Link>
                    </form>
                </section>
            </main>
        </>
    );
};

export default Login;