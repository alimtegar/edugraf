// Types
import AttemptedStage from '../types/AttemptedStage';

// Components
import BottomNavbar from './BottomNavbar';
import StagesChartBar from './StagesChartBar';

type ProfileChartBarProps = {
    bgColor?: string,
    title?: string,
    value?: number,
    width?: string,
};

const ProfileChartBar = ({ bgColor, title, value, width = `${1 / 8 * 100}%`, }: ProfileChartBarProps) => (
    <div className="w-full h-9 relative flex justify-start items-center bg-gray-500 bg-opacity-10 rounded-lg overflow-hidden">
        {bgColor && value && (
            <>
                <div
                    className={`bg-${bgColor} text-white h-full rounded-lg`}
                    style={{
                        width: `${value}%`,
                    }}
                >
                </div>
                {/* <span className={`absolute top-0 font-semibold text-xs text-${value > 90 ? 'white' : 'gray-500'} w-full text-center p-2`}>
                        {value}
                    </span> */}
            </>
        )}
    </div>
);

const Profile = () => {
    const attemptedStages: AttemptedStage[] = [
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'letters',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 80,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'numbers',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 50,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'symbols',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 60,
            question_count: 5,
            attempted_questions: []
        },
    ];

    return (
        <div className="flex flex-col flex-grow">
            <header className="text-gray-700 text-center p-8 md:pt-21 md:pb-12">
                <div className="mb-3">
                    <div className="w-24 h-24 inline-flex justify-center items-end bg-gray-100 text-gray-400 border-3 border-white rounded-full shadow-default overflow-hidden focus:outline-none">
                        <img alt="Foto Profil" style={{ height: '80%', }} src="https://image.flaticon.com/icons/png/512/2945/2945467.png" />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-xl font-extrabold leading-none active:underline hover:underline mb-4">
                        Bayu Catur
                    </h1>
                    <div className="relative">
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-900 bg-opacity-10">
                            <div style={{ width: `${4269 / 5125 * 100}%`, }} className="flex bg-gradient-to-tl from-blue-500 to-blue-400 rounded-full" />
                        </div>
                        <div className="mt-2 flex items-center justify-between font-bold text-sm leading-none">
                            <span>Level 8</span>
                            <span className="text-yellow-600">4269/5125 XP</span>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Chart */}
                <section className="px-8">                    
                    <div className="bg-white p-6 shadow-default rounded-xl">
                        <h2 className="text-sm font-bold mb-6">Rata-Rata Tes Menulis</h2>
                        <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                            <div className="flex">
                                <div className="bg-red-500 w-3 h-3 rounded-full mr-2" />
                                Alat Tulis
                            </div>
                            <div className="flex">
                                <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
                                Simbol
                            </div>
                            <div className="flex">
                                <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
                                Huruf
                            </div>
                            <div className="flex">
                                <div className="bg-blue-500 w-3 h-3 rounded-full mr-2" />
                                Angka
                            </div>
                        </div>
                        <div className="grid gap-2">
                            {attemptedStages.map(({ id, score, stage }) => {
                                let bgColor = '';

                                switch (stage.category) {
                                    case 'symbols': bgColor = 'gradient-to-tl from-red-500 to-red-400'; break;
                                    case 'letters': bgColor = 'gradient-to-tl from-yellow-500 to-yellow-400'; break;
                                    case 'numbers': bgColor = 'gradient-to-tl from-green-500 to-green-400'; break;
                                    case 'on-paper': bgColor = 'gradient-to-tl from-blue-500 to-blue-400'; break;
                                }

                                return (
                                    <ProfileChartBar
                                        bgColor={bgColor}
                                        value={score}
                                    />
                                );
                            })}
                            {Array.from(Array(4 - attemptedStages.length).keys()).map(() => (
                                <ProfileChartBar />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section>

                </section>
            </main>

            <BottomNavbar />
        </div>
    );
};

export default Profile;