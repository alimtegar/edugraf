import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';

// Components
import Navbar from './Navbar';
import AchievementsItem from './AchievementsItem';

// Types
import Achievement from '../types/Achievement';
import AcquiredAchievement from '../types/AcquiredAchievement';

const Achievements = ({ history }: RouteComponentProps) => {
    // States
    const [achievements, setAchievements] = useState<Achievement[]>();
    const [acquiredAchievements, setAcquiredAchievements] = useState<AcquiredAchievement[]>();

    // Effects
    useEffect(() => {
        Promise.all([
            axios.get(`${process.env.REACT_APP_API_URL}/achievements`),
            axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements`)
        ])
            .then(([res1, res2]) => {
                console.log(res1, res2);
                setAchievements(res1.data);
                setAcquiredAchievements(res2.data);
            })
            .catch((err) => console.error(err));
    }, [history])

    return (
        <div className="flex flex-col flex-grow">
            <Navbar title="Penhargaan" leftButton={{
                onClick: () => history.replace('/'),
                icon: <FaChevronLeft size="1rem" />
            }} />
            <main className="w-full pt-21 pb-8">
                <section className="grid grid-cols-3 gap-2 px-8">
                    {achievements ? achievements.map((achievement) => (
                        <AchievementsItem
                            {...achievement}
                            is_locked={acquiredAchievements ? acquiredAchievements.some(
                                (acquiredAchievement) =>
                                    acquiredAchievement.achievement_id === achievement.id &&
                                    acquiredAchievement.progress >= 100
                            ) : true}
                            key={achievement.id}
                        />
                    )) : null}
                </section>
            </main>
        </div>
    );
};

export default Achievements;