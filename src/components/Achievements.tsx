import { RouteComponentProps, } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import AchievementsItem from './AchievementsItem';

// Types
import Achievement from '../types/Achievement';

const Achievements = ({ history }: RouteComponentProps) => {
    const achievements: Achievement[] = [
        {
            id: 1,
            title: 'Huruf Pertama',
            progress: 100,
        },
        {
            id: 2,
            title: 'Angka Pertama',
            progress: 100,
        },
        {
            id: 3,
            title: 'Simbol Pertama',
            progress: 100,
        },
        {
            id: 4,
            title: 'Tes Huruf Pertama',
            progress: 100,
        },
        {
            id: 5,
            title: 'Tes Angka Pertama',
            progress: 100,
        },
        {
            id: 6,
            title: 'Tes Simbol Pertama',
            progress: 100,
        },
        {
            id: 7,
            title: 'Tes Alat Tulis Pertama',
            progress: 100,
        },
        {
            id: 8,
            title: 'Medali Pandai',
            progress: 0,
        },
        {
            id: 9,
            title: 'Medali Tekun',
            progress: 0,
        },
        {
            id: 10,
            title: 'Medali Cepat',
            progress: 0,
        },
        {
            id: 11,
            title: 'Medali Perunggu',
            progress: 0,
        },
        {
            id: 12,
            title: 'Medali Perak',
            progress: 0,
        },
        {
            id: 13,
            title: 'Medali Emas',
            progress: 0,
        },
    ];

    return (
        <div className="flex flex-col flex-grow">
            <Navbar title="Penhargaan" leftButton={{
                onClick: () => history.replace('/'),
                icon: <FaChevronLeft size="1rem" />
            }} />
            <main className="w-full pt-21 pb-8">
                <section className="grid grid-cols-3 gap-2 px-8">
                    {achievements.map((achievement) => (
                        <AchievementsItem {...achievement} key={achievement.id} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Achievements;