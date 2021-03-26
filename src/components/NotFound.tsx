import { Link } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Button from './Button';


const NotFound = () => (
    <div className="flex flex-col flex-grow bg-blue-200 text-blue-900">
        <Navbar />
        <section className="flex flex-col flex-grow justify-center items-center">
            <div className="text-center ">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <h2 className="text-lg font-bold leading-snug mb-1">
                    Tidak Ditemukan
                </h2>
                <p className="text-sm font-semibold mb-8">Data yang anda cari tidak ditemukan.</p>
                <Link to="/">
                    <Button
                        w="32"
                        h="12"
                        shadow="default"
                    >
                        Menu Utama
                    </Button>
                </Link>
            </div>
        </section>
        {/* Navbar Space */}
        <div className="h-15"></div> 
    </div>
)

export default NotFound;