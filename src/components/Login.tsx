import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import ButtonLoading from './ButtonLoading';

// Types
type LoginForm = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
};

const Login = () => {
    // States
    const initForm: LoginForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

        axios.post(`${process.env.REACT_APP_API_URL}/Login`, form)
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
            <Navbar />
            <header className="text-center bg-blue-200 text-blue-900 pt-17 px-16 pb-16 rounded-b-3xl shadow">
                <h1 className="text-lg font-bold leading-snug mb-2">
                    Masuk
                </h1>
                <p className="text-sm font-semibold">Masuk dan lanjutkan proses belajar anda dengan Sibisa.</p>
            </header>
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
                            required
                            value={form.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-4">
                        {isLoading ? (
                            <ButtonLoading />
                        ) : (
                            <Button w="full" h={12} shadow="default">
                                Masuk
                            </Button>
                        )}
                    </div>
                    <div className="text-gray-700 text-sm text-center">
                        Belum punya akun? <Link to="/register" className="text-pink-500 font-bold">Daftar</Link>
                    </div>
                </form>
            </section>
        </div>
    )
};

export default Login;