import { Link } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Button from './Button';


const NotFound = () => (
    <div className="flex flex-col flex-grow text-white">
        <Navbar />
        <section className="flex flex-col flex-grow justify-center items-center px-16">
            <div className="text-center ">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <h2 className="text-lg font-extrabold leading-snug mb-2">
                    Tidak Ditemukan
                </h2>
                <p className="text-sm font-semibold mb-6">Data yang anda cari tidak ditemukan.</p>
                <Link to="/">
                    <Button w={32}>
                        Dasbor
                    </Button>
                </Link>
            </div>
        </section>
    </div>
)

export default NotFound;