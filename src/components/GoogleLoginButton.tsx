import { useState, useEffect, } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, } from 'react-google-login';
import { ReactComponent as GoogleLogo, } from '../assets/images/google-logo.svg';
import Button from './Button';
import { toast, } from 'react-toastify';

// Contexts
import { useAuthContext, } from '../contexts/AuthContext';


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

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
            render={(renderProps) => (
                // Change appearance when loading
                <Button
                    type="button"
                    {...isLoading
                        ? { bgColor: 'gray-200', bgColorOn: 'gray-200', disabled: true, }
                        : { bgColor: 'blue-500', bgColorOn: 'blue-600', }
                    }
                    onClick={() => {
                        setIsLoading(true);
                        renderProps.onClick();
                    }}
                >
                    <div className="flex justify-between items-center w-full p-1">
                        <div className="flex justify-center items-center bg-white h-10 w-10 rounded-full">
                            <GoogleLogo className="h-5" />
                        </div>
                        <div>
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Google'}
                        </div>
                        <div className="w-10 h-10"></div>
                    </div>
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