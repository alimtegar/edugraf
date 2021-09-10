import classNames from 'classnames';
import { ReactComponent as Medal } from '../assets/images/medal.svg';

// Types
import Achievement from '../types/Achievement';

const AchievementsItem = ({ title, progress }: Achievement) => (
    <div
        className={classNames('relative text-center w-full px-4 py-6 rounded-lg shadow-default overflow-hidden', {
            [`bg-gradient-to-tl from-blue-500 to-blue-400 text-white`]: progress >= 100,
            [`bg-white text-gray-400`]: progress < 100,
        })}
    >
        <Medal className={classNames('inline-flex mb-2', {
            [`text-white`]: progress >= 100,
            [`text-gray-300`]: progress < 100,
        })} />
        <h2 className="text-sm font-bold leading-none">
            {title}
        </h2>
        <div className="absolute -right-8 -bottom-4 bg-white bg-opacity-20 w-24 h-24 rounded-full" />
    </div>
);

export default AchievementsItem;