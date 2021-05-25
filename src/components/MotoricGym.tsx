const LoadingMotoricGym = () => (
    <div className="flex justify-center items-center w-full h-full text-gray-400">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const MotoricGym = () => {
    const videoSrc = 'https://www.youtube.com/embed/22cvGBs-xpg';

    return (
        <div className="relative">
            <div className="relative flex-grow bg-gray-200 rounded-lg overflow-hidden" style={{
                aspectRatio: '4/3',
                minHeight: 231,
            }}>
                <iframe
                    className="absolute z-10 w-full h-full"
                    src={`${videoSrc}?rel=0&disable_polymer=1&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                <LoadingMotoricGym />
            </div>
        </div>
    );
};

export default MotoricGym;