import { Link } from 'react-router-dom';

// Components
import Button from './Button';


const NotFound = () => (
    <div className="flex flex-col flex-grow bg-gradient-to-tl from-blue-500 to-blue-400 text-white">
        <section className="flex flex-col flex-grow justify-center items-center px-16">
            <div className="text-center ">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <h2 className="text-lg font-extrabold leading-snug mb-2">
                    Tidak Ditemukan
                </h2>
                <p className="text font-semibold mb-6">Data yang anda cari tidak ditemukan di dalam <span className="italic">database</span>.</p>
                <Link to={`/`}>
                    <Button
                        bgColor="white"
                        bgColorOn="gray-50"
                        textColor="gray-700"
                        textColorOn="gray-700"
                        w={32}
                        shadow="default"
                    >
                        Beranda
                    </Button>
                </Link>
            </div>
        </section>
    </div>
)

export default NotFound;