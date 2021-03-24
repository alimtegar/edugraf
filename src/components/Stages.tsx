import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import Button from './Button';
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
        axios.get('http://localhost:8000/stages/category/' + category)
            .then((res) => setStages(res.data))
            .catch((err) => console.log(err));
    }, [category])

    return (
        <div className="flex-grow bg-blue-200 text-blue-900">
            <Navbar leftButton={(
                <Button
                    bgColor="transparent"
                    bgColorOn="blue-300"
                    textColor="blue-900"
                    textColorOn="blue-900"
                    w={11}
                    h={11}
                    center
                    onClick={history.goBack}
                >
                    <FaChevronLeft size="0.83rem" />
                </Button>)}
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