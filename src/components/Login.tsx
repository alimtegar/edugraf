import { useState, useEffect, } from 'react';
import axios from 'axios';
import { toast, } from 'react-toastify';

// Contexts
import { useAuthContext, } from '../contexts/AuthContext';

// Components
import Logo from './Logo';
import Input from './Input';
import Button from './Button';
import LoadingButton from './LoadingButton';
import GoogleLoginButton from './GoogleLoginButton';
import AuthNavbar from './AuthNavbar';

// Types
type LoginForm = {
    email: string,
    password: string,
};

const Login = () => {
    // Context
    const authContext = useAuthContext();

    // States
    const initForm: LoginForm = {
        email: '',
        password: '',
    };
    const [form, setForm] = useState<LoginForm>(initForm);
    const [isLoading, setIsLoading] = useState(false);

    // Effects
    useEffect(() => {
        // componentWillUnmount
        return () => {
            // Clean up
            setIsLoading(false);
        }
    }, [])

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({
        ...form,
        [e.target.name]: e.target.value,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`${process.env.REACT_APP_API_URL}/login`, form)
            .then((res) => {
                authContext.setAuth({
                    ...res.data,
                    loginWith: 'email',
                });

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
    };

    return (
        <div className="flex flex-col flex-grow bg-gradient-to-tl from-blue-500 to-blue-400 text-white">
            <header className="pt-20 px-16 pb-20 md:pt-25">
                <Logo />
            </header>

            <main className="flex-grow bg-white text-gray-700 p-8 rounded-t-3xl shadow-default">
                <section>
                    <AuthNavbar />
                    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
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

                        <span className="text-gray-500 text-sm font-semibold text-center my-4">
                            Atau masuk dengan
                        </span>

                        <GoogleLoginButton />



                        {/* <p className="text-gray-500 text-sm font-semibold text-center mt-4">
                            Belum punya akun? <Link to={`/register`}><a className="text-secondary font-extrabold">Daftar</a></Link>
                        </p> */}
                        {/* 
                        <Link to={`/register`}>
                            <Button bgColor="red-500" bgColorOn="red-600" type="button">
                                Daftar
                        </Button>
                        </Link> */}
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;