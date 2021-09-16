import { useState, useEffect, } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, } from 'react-google-login';
import { ReactComponent as GoogleLogo, } from '../assets/images/google-logo.svg';
import Button from './Button';
import { toast, } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';

// Contexts
import { useAuthContext, } from '../contexts/AuthContext';

// Components
import LoadingButton from './LoadingButton';

const GoogleLoginButton = () => {
    // Contexts
    const authContext = useAuthContext();

    // States
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
    const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        setIsLoading(true);

        console.log(res);

        if ('tokenId' in res) {
            axios.get(`${process.env.REACT_APP_API_URL}/login/google/${res.tokenId}`)
                .then((res) => {
                    authContext.setAuth({
                        ...res.data,
                        loginWith: 'google',
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error(err.response.data.detail, {
                        position: 'top-center',
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setIsLoading(false);
                });
        }

        setIsLoading(false);
    };

    return isLoading ? (
        <LoadingButton />
    ) : (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
            render={(renderProps) => (
                // Change appearance when loading
                <Button
                    type="button"
                    bgColor="gradient-to-tl from-white to-white"
                    bgColorOn="gradient-to-tl from-blue-500 to-blue-400"
                    textColor="blue-500"
                    textColorOn="white"
                    borderW={2}
                    onClick={() => {
                        setIsLoading(true);
                        renderProps.onClick();
                    }}
                >
                    <FaGoogle className="inline-flex mr-2 mb-1" />
                    Google
                </Button>
            )}
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;