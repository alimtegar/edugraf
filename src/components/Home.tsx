const Home = () => {
    return (
        <div className="bg-green-500 min-h-screen">
            <header className="flex flex-col justify-center items-center bg-green-400 pt-3 pb-9 rounded-b-3xl">
                {/* Profile Photo */}
                <div className="bg-gray-300 w-24 h-24 mb-3 border-3 border-white rounded-full">

                </div>

                {/* Profile Name */}
                <h1 className="text-white text-lg font-extrabold">
                    Guest
                </h1>
            </header>

            <section className="p-3">
                <h2 className="mb-3">
                    Materi Belajar
                </h2>
                <div className="flex flex-col rounded-lg shadow overflow-hidden">
                    <div className="bg-green-400 py-6 px-6">
                        <h2 className="text-white text-lg font-extrabold">Tabel Alfabet</h2>
                    </div>
                    <div className="bg-white text-gray-700 text-sm px-6 py-3">
                        Belajar menulis abjad
                    </div>
                </div>
                <div className="flex flex-col mb-3 rounded-lg shadow overflow-hidden">
                    <div className="bg-green-400 py-6 px-6">
                        <h2 className="text-white text-lg font-extrabold">Menulis</h2>
                    </div>
                    <div className="bg-white text-gray-700 text-sm px-6 py-3">
                        Belajar menulis abjad
                    </div>
                </div>
                
                
            </section>
        </div>
    );
};

export default Home;