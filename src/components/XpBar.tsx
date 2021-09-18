import classNames from 'classnames';
import numeral from 'numeral';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Utils
import { getLevel, getXpPct, getXpLimit } from '../Utils';

type Props = {
    bgColor?: string,
}

const XpBar = ({ bgColor = 'gray-100' }: Props) => {
    // Contexts
    const { user: { xp } } = useAuthContext();

    return (
        <div className="relative">
            <div className={classNames('overflow-hidden h-2 text-xs flex rounded-full', {
                [`bg-${bgColor}`]: bgColor,
            })}>
                <div style={{ width: getXpPct(xp) ? `${getXpPct(xp)}%` : 3, }} className="flex bg-gradient-to-tl from-blue-500 to-blue-400 rounded-full" />
            </div>
            <div className="mt-2 flex items-center justify-between font-bold text-sm leading-none">
                <span>Level {getLevel(xp)}</span>
                <span className="text-yellow-600">{numeral(xp).format('0,0')}/{numeral(getXpLimit(getLevel(xp))).format('0,0')} XP</span>
            </div>
        </div>
    );
};

export default XpBar;