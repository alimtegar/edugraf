import { ReactComponent as Medal } from '../assets/images/medal.svg';
import { RouteComponentProps, } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import classNames from 'classnames';

// Components
import Navbar from './Navbar';

const Achievements = ({ history }: RouteComponentProps) => {
    const achievements = [
        {
            title: (<>Huruf<br/>Pertama</>),
            is_locked: false,
        },
        {
            title: (<>Angka<br/>Pertama</>),
            is_locked: false,
        },
        {
            title: (<>Simbol<br/>Pertama</>),
            is_locked: false,
        },
        {
            title: 'Tes Huruf Pertama',
            is_locked: false,
        },
        {
            title: 'Tes Angka Pertama',
            is_locked: false,
        },
        {
            title: 'Tes Simbol Pertama',
            is_locked: false,
        },
        {
            title: 'Tes Alat Tulis Pertama',
            is_locked: false,
        },
        {
            title: (<>Medali<br/>Pandai</>),
            is_locked: true,
        },
        {
            title: (<>Medali<br/>Tekun</>),
            is_locked: true,
        },
        {
            title: (<>Medali<br/>Cepat</>),
            is_locked: true,
        },
        {
            title: (<>Medali<br/>Perunggu</>),
            is_locked: true,
        },
        {
            title: (<>Medali<br/>Perak</>),
            is_locked: true,
        },
        {
            title: (<>Medali<br/>Emas</>),
            is_locked: true,
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
                    {achievements.map(({ title, is_locked }, i) => (
                        <div
                            className={classNames('relative text-center w-full py-6 rounded-lg shadow-default overflow-hidden', {
                                [`bg-gradient-to-tl from-blue-500 to-blue-400 text-white`]: !is_locked,
                                [`bg-white text-gray-400`]: is_locked,
                            })}
                            key={i}
                        >
                            <Medal className={classNames('inline-flex mb-2', {
                                [`text-white`]: !is_locked,
                                [`text-gray-300`]: is_locked,
                            })} />
                            <h2 className="text-sm font-bold leading-none">
                                {title}
                            </h2>
                            <div className="absolute -right-8 -bottom-4 bg-white bg-opacity-20 w-24 h-24 rounded-full" />
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Achievements;