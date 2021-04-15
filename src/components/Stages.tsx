import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import StagesItem from './StagesItem';

// Types
import Stage from '../types/Stage';
import StagesChart from './StagesChart';

type MatchParams = {
    category?: string | undefined;
};

const Stages = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;

    // States
    const [stages, setStages] = useState<Stage[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/stages/category/${category}`)
            .then((res) => setStages(res.data))
            .catch((err) => console.error(err));
    }, [category])

    return (
        <div className="flex-grow text-gray-700 overflow-y-scroll">
            <div className="sticky top-0 h-auto">
                <Navbar
                    leftButton={{
                        icon: (<FaChevronLeft size="0.83rem" />),
                        onClick: () => history.replace('/'),
                    }}
                />
                <section className="pt-17 px-8">
                    <StagesChart />
                </section>
            </div>
            <div className="sticky top-15 h-auto">
                <section className="absolute w-full h-screen flex-grow bg-white bg-opacity-95 h-full pt-6 pb-4 px-4 rounded-t-2xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold leading-none">
                            Daftar Stage
                        </h2>
                        <span className="text-sm font-semibold leading-none"><strong className="font-bold">{stages ? stages.length : 0}</strong> Item</span>
                    </div>
                    <div className="grid gap-2">
                        {stages ? stages.map((stage) => (
                            <StagesItem {...stage} key={stage.id} />
                        )) : null}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Stages;