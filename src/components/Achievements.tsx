import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import AchievementsItem from './AchievementsItem';

// Types
import AcquiredAchievement from '../types/AcquiredAchievement';

const Achievements = ({ history }: RouteComponentProps) => {
    // States
    const [acquiredAchievements, setAcquiredAchievements] = useState<AcquiredAchievement[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements`)
            .then((res: AxiosResponse<AcquiredAchievement[]>) => setAcquiredAchievements([
                ...(acquiredAchievements || []),
                ...res.data,
            ]))
            .catch((err) => console.error(err));
    }, [history])

    return (
        <div className="flex flex-col flex-grow">
            <Navbar title="Penhargaan" leftButton={{
                onClick: () => history.replace('/profile'),
                icon: <FaChevronLeft size="1rem" />
            }} />
            <main className="w-full pt-21 pb-8">
                <section className="grid grid-cols-3 gap-2 px-8">
                    {acquiredAchievements ? acquiredAchievements.map((acquiredAchievement) => (
                        <AchievementsItem
                            {...acquiredAchievement.achievement}
                            is_locked={acquiredAchievement.progress < 100}
                            key={acquiredAchievement.achievement.id}
                        />
                    )) : null}
                </section>
            </main>
        </div>
    );
};

export default Achievements;