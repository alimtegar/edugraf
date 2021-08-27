import classNames from 'classnames';
import { ReactComponent as Medal } from '../assets/images/medal.svg';

// Types
import Achievement from '../types/Achievement';

type Props = {
    is_locked: boolean,
}

const AchievementsItem = ({ title, is_locked }: Achievement & Props) => (
    <div
        className={classNames('relative text-center w-full px-4 py-6 rounded-lg shadow-default overflow-hidden', {
            [`bg-gradient-to-tl from-blue-500 to-blue-400 text-white`]: !is_locked,
            [`bg-white text-gray-400`]: is_locked,
        })}
    >
        <Medal
            className={classNames('inline-flex mb-2', {
                [`text-white`]: !is_locked,
                [`text-gray-300`]: is_locked,
            })}
            style={{
                height: '3.33rem',
            }}
        />
        <h2 className="text-sm font-bold leading-none">
            {title}
        </h2>
        <div className="absolute -right-8 -bottom-4 bg-white bg-opacity-20 w-24 h-24 rounded-full" />
    </div>
);

export default AchievementsItem;