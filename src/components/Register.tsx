import { useState } from 'react';
import { FaBars, FaSignInAlt } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import Input from './Input';
import Button from './Button';

const Register = () => {
    // States
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="flex-grow bg-blue-50">
            <Navbar
                leftButton={{
                    icon: <FaSignInAlt size="0.83rem" />,
                    onClick: () => { }
                }}
            />
            <header className="text-center bg-blue-200 text-blue-900 pt-17 px-16 pb-16 rounded-b-3xl shadow">
                <h1 className="text-lg font-bold leading-snug mb-2">
                    Daftar Sekarang!
                </h1>
                <p className="text-sm font-semibold">Daftar sekarang dan mulai belajar dengan Sibisa.</p>
            </header>
            <section className="text-gray-900 px-4">
                <form className="flex flex-col bg-white -mt-8 p-6 rounded-lg shadow-md">
                    <div className="mt-2 mb-3">
                        <Input
                            label="Nama Lengkap"
                            type="text"
                            id="full_name"
                            name="full_name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mt-2 mb-3">
                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            placeholder="e.g. example@mail.com"
                        />
                    </div>
                    <div className="mt-2 mb-3">
                        <Input
                            label="Kata Sandi"
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mt-2 mb-6">
                        <Input
                            label="Konfirmasi Kata Sandi"
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-4">
                        <Button w="full" h={12} shadow="default">
                            Daftar
                        </Button>
                    </div>
                    <div className="text-gray-700 text-sm text-center">Sudah punya akun? <a href="" className="text-pink-500 font-bold">Masuk</a> </div>
                </form>
            </section>
        </div>
    )
};

export default Register;