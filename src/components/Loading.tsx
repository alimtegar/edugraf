import Logo from './Logo';
// import BarLoader from 'react-spinners/BarLoader';


const Loading = () => (
    <main className="flex justify-center items-center flex-grow bg-gradient-to-tl from-blue-500 to-blue-400 text-white">
        <div className="flex flex-col justify-center items-center">
            <div className="mb-8">
                <Logo h={8} />
            </div>
            {/* <BarLoader color="#ffffff" height={3} /> */}
        </div>
    </main>
);

export default Loading;