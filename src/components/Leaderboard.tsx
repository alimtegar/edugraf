import { useState, useEffect, } from 'react';
import axios from 'axios';
import classNames from 'classnames';

// Components
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
import IconButton from './IconButton';
import Photo from './Photo';

// Types
import User from '../types/User';

type MdealProps = {
    position: number,
};

const Medal = ({ position }: MdealProps) => {
    let addClassNames = 'bg-gray-100 text-gray-500';

    switch (position) {
        case 1: addClassNames = 'bg-gradient-to-tl from-yellow-300 to-yellow-200 text-yellow-700'; break;
        case 2: addClassNames = 'bg-gradient-to-tl from-gray-300 to-gray-200 text-gray-700'; break;
        case 3: addClassNames = 'bg-gradient-to-tl from-yellow-600 to-yellow-500 text-white'; break;
    }

    return (
        <span className={classNames('flex justify-center items-center text-sm font-bold w-8 h-8 rounded-full', addClassNames)}>
            {position}
        </span>
    );
};

type TopLeaderProps = User & {
    position: number,
};

const TopLeader = ({ name, photo, xp, position }: TopLeaderProps) => {
    const formatName = (name: string) => {
        const nameArr = name.split(' ');

        return nameArr.length > 1
            ? nameArr[0] + ' ' + nameArr[1][0] + '.'
            : nameArr[0];
    };

    return (
        <span className="text-center mx-2">
            <div className="relative mb-3">
                <Photo photo={photo} size={26 - (position * 2)} />
                <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                    <Medal position={position} />
                </span>
            </div>
            <h2 className="font-bold text-lg leading-none">{formatName(name)}</h2>
            <span className="text-sm font-bold text-gray-500">{xp} XP</span>
        </span>
    );
};

const Leaderboard = () => {
    // States
    const [leaderboard, setLeaderboard] = useState<User[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/leaderboard`)
            .then((res) => {
                setLeaderboard(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="attempted-stage flex flex-col flex-grow">
            <Navbar title="Peringkat" />
            <main className="w-full pt-17 pb-29">
                <section className="flex flex-row justify-center items-center mb-8">
                    {[2, 1, 3].map((i) =>
                        (leaderboard && leaderboard[i - 1]) ? (
                            <TopLeader {...leaderboard[i - 1]} position={i} key={leaderboard[i - 1].id} />
                        ) : null
                    )}
                </section>
                <section className="grid gap-2 w-full px-8">
                    {leaderboard ? leaderboard.map(({ name, photo, xp, }, i) => (
                        <IconButton
                            title={name}
                            description={xp.toString() + ' XP'}
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