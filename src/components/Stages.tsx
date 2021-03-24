import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

// Styles
import 'rc-rate/assets/index.css';

// Components
import Navbar from './Navbar';
import StagesComponent from './Stage';

// Types
import Stage from '../types/Stage';

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
        <div className="flex-grow bg-blue-200 text-blue-900">
            <Navbar
                leftButton={{
                    onClick: history.goBack,
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />

            <section className="grid gap-2 p-4">
                {stages !== undefined ? stages.map((stage) => (
                    <StagesComponent {...stage} key={stage.id} />
                )) : null}
            </section>
        </div>
    );
};

export default Stages;