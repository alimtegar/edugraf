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
type ChangePasswordForm = {
    email: string,
    current_password: string,
    new_password: string,
    new_password_confirmation: string,
};

const ChangePassword = ({ history }: RouteComponentProps) => {
    // Contexts
    const authContext = useAuthContext();
    const sidebarContext = useSidebarContext();

    // States
    const initForm: ChangePasswordForm = {
        email: '',
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
                    Ubah Kata Sandi
                </h1>
                <p className="text-sm font-semibold">Ubah kata sandi untuk memperbarui keamanan akun Sibisa Anda.</p>
            </header>
            <section className="text-gray-900 px-4">
                <form
                    className="flex flex-col bg-white -mt-8 p-6 rounded-lg shadow-md"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input id="email" name="email" autoComplete="username" readOnly value={form.email} className="hidden" />
                    <div className="mt-2 mb-3">
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
                    </div>
                    <div className="mt-2 mb-3">
                        <Input
                            label="Kata Sandi Baru"
                            type="password"
                            id="new_password"
                            name="new_password"
                            autoComplete="new-password"
                            required
                            value={form.current_password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mt-2 mb-3">
                        <Input
                            label="Konfirmasi Kata Sandi Baru"
                            type="password"
                            id="new_password_confirmation"
                            name="new_password_confirmation"
                            autoComplete="new-password"
                            required
                            value={form.current_password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button>
                            Ubah
                        </Button>
                    )}
                </form>
            </section>
        </div>
    )
};

export default ChangePassword;