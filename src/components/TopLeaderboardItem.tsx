import numeral from "numeral";

// Components
import Photo from './Photo';
import Medal from './Medal';

// Types
import User from '../types/User';

type Props = User & {
    position: number,
};

const TopLeaderboardItem = ({ name, photo, xp, position }: Props) => {
    const formatName = (name: string) => {
        const nameArr = name.split(' ');

        return nameArr.length > 1
            ? nameArr[0] + ' ' + nameArr[1][0] + '.'
            : nameArr[0];
    };

    return (
        <span className="text-center mx-2">
            <div className="inline-flex relative mb-3">
                <Photo photo={photo} size={26 - (position * 2)} />
                <span className="absolute right-0 bottom-0 transform translate-x-1/6 translate-y-1/6">
                    <Medal position={position} />
                </span>
            </div>
            <h2 className="font-bold text-lg leading-none">{formatName(name)}</h2>
            <span className="text-sm font-bold text-gray-600">{numeral(xp).format('0,0')} XP</span>
        </span>
    );
};

export default TopLeaderboardItem;