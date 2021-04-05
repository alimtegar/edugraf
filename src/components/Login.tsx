import { useState, } from 'react';
import axios from 'axios';
import { toast, } from 'react-toastify';
import { RouteComponentProps, Link, } from 'react-router-dom';
import { FaUserPlus, } from 'react-icons/fa';

// Contexts
import {useAuthContext} from '../contexts/AuthContext';

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
            <Navbar
                leftButton={{
                    icon: (<FaUserPlus size="1.16rem" />),
                    onClick: () => history.push('/register'),
                }}
            />
            <header className="text-center bg-blue-200 text-blue-900 pt-17 px-16 pb-16 rounded-b-3xl shadow">
                <h1 className="text-lg font-bold leading-snug mb-2">
                    Masuk
                </h1>
                <p className="text-sm font-semibold">Masuk dan lanjutkan proses belajar anda dengan Sibisa.</p>
            </header>
            <main>
                <section className="text-gray-900 px-4">
                    <form
                        className="flex flex-col bg-white -mt-8 p-6 rounded-lg shadow-md"
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
                        <div className="mt-2 mb-6">
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
                        <div className="mb-4">
                            {isLoading ? (
                                <LoadingButton />
                            ) : (
                                <Button>
                                    Masuk
                                </Button>
                            )}
                        </div>
                        <div className="text-gray-700 text-sm text-center">
                            Belum punya akun? <Link to="/register" className="text-pink-500 font-bold">Daftar</Link>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;