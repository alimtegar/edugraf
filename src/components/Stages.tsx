import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import StagesChart from './StagesChart';
import StagesItem from './StagesItem';

// Utils
import { translateStageCategory } from '../Utils';

// Types
import Stage from '../types/Stage';
import StageCategory from '../types/StageCategory';

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
            .then((res) => {
                setStages(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [category, history])

    return (
        <div className="flex-grow text-gray-700 overflow-y-scroll">
            <div>
                <Navbar
                    title={`Tes ${translateStageCategory(category as StageCategory)}`}
                    leftButton={{
                        icon: (<FaChevronLeft size="1rem" />),
                        onClick: () => history.replace('/'),
                    }}
                />
                <section className="pt-21 px-8 md:mx-auto md:w-1/2">
                    <StagesChart />
                </section>
            </div>
            <div className="md:mx-auto md:w-1/2">
                <section className="w-full p-8">
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