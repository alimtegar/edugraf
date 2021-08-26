import classNames from 'classnames';

type Props = {
    position: number,
};

const Medal = ({ position }: Props) => {
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

export default Medal;