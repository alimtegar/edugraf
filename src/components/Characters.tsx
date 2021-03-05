import { Link } from 'react-router-dom';

const Characters = () => {
    const letters: string = "abcdefghijklmnopqrstuvwxyz";

    return (
        <div className="flex-grow bg-blue-200 text-blue-900">
            <div className="text-center py-4 px-6 pb-6">
                <p className="text-sm font-semibold">Pilih salah satu alfabet untuk mulai mempelajarinya.</p>
            </div>
            <div className="grid grid-cols-4 gap-2 p-4">
                {letters.split('').map((letter, i) => (
                    <Link to={`/chars/letters/${letter}`} key={i}>
                        <div className="flex justify-center items-center bg-white text-4xl font-extrabold w-full h-full rounded-lg shadow-sm" style={{ aspectRatio: "1/1" }}>
                            {letter.toUpperCase()}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Characters;