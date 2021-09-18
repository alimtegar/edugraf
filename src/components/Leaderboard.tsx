import { useState, useEffect, } from 'react';
import axios from 'axios';
import numeral from 'numeral';

// Components
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
import IconButton from './IconButton';
import Photo from './Photo';
import TopLeaderboardItem from './TopLeaderboardItem';
import Medal from './Medal';

// Types
import User from '../types/User';

const Leaderboard = () => {
    // States
    const [leaderboard, setLeaderboard] = useState<User[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/leaderboard`)
            .then((res) => setLeaderboard(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="attempted-stage flex flex-col flex-grow">
            <Navbar title="Peringkat" />
            <main className="w-full pt-17 pb-29">
                <section className="flex flex-row justify-center items-center mb-8">
                    {[2, 1, 3].map((i) =>
                        (leaderboard && leaderboard[i - 1]) ? (
                            <TopLeaderboardItem {...leaderboard[i - 1]} position={i} key={leaderboard[i - 1].id} />
                        ) : null
                    )}
                </section>
                <section className="grid gap-2 w-full px-8">
                    {leaderboard ? leaderboard.map(({ name, photo, xp, }, i) => (
                        <IconButton
                            title={name}
                            description={numeral(xp).format('0,0') + ' XP'}
                            icon={(<Photo photo={photo} size={12} shadow="none" />)}
                            subIcon={(<Medal position={i + 1} />)}
                            key={name}
                        />
                    )) : null}
                </section>
            </main>
            <BottomNavbar />
        </div>
    );
};

export default Leaderboard;