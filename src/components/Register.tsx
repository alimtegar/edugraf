import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FaUserLock } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';

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
        <div className="flex-grow bg-blue-50">
            <Navbar 
                leftButton={{
                    icon: (<FaUserLock size="1.16rem" />),
                    onClick: () => history.push('/login'),
                }}
            />
            <header className="text-center bg-blue-200 text-blue-900 pt-17 px-16 pb-16 rounded-b-3xl shadow">
                <h1 className="text-lg font-bold leading-snug mb-2">
                    Daftar
                </h1>
                <p className="text-sm font-semibold">Daftar sekarang dan mulai belajar dengan berbagai fitur Sibisa.</p>
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
                            placeholder="e.g. example@mail.com"
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
                            required
                            value={form.password_confirmation}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-4">
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <Button w="full" h={12} shadow="default">
                                Daftar
                            </Button>
                        )}
                    </div>
                    <div className="text-gray-700 text-sm text-center">
                        Sudah punya akun? <Link to="/login" className="text-pink-500 font-bold">Masuk</Link>
                    </div>
                </form>
            </section>
        </div>
    )
};

export default Register;