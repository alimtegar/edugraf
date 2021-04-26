import Logo from './Logo';
import BarLoader from 'react-spinners/BarLoader';


const Loading = () => (
    <main className="flex justify-center items-center flex-grow text-white">
        <div className="flex flex-col justify-center items-center">
            <div className="mb-2">
                <Logo h={8} />
            </div>
            <BarLoader color="#ffffff" height={3} />
        </div>
    </main>
);

export default Loading;