import { useState, useEffect, } from 'react';
import axios from 'axios';
import 'chartjs-plugin-datalabels';

// Types
import AttemptedStage from '../types/AttemptedStage';

// Components
import StagesChartBar from './StagesChartBar';

const StagesChart = () => {
    const [attemptedStages, setAttemptedStages] = useState<AttemptedStage[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages?limit=10&order_by=asc`)
            .then((res) => {
                setAttemptedStages(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section>
            <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                <div className="flex">
                    <div className="bg-gradient-to-tl from-red-500 to-red-400 w-3 h-3 rounded-full mr-2" />
                    Simbol
                </div>
                <div className="flex">
                    <div className="bg-gradient-to-tl from-yellow-500 to-yellow-400 w-3 h-3 rounded-full mr-2" />
                    Huruf
                </div>
                <div className="flex">
                    <div className="bg-gradient-to-tl from-green-500 to-green-400 w-3 h-3 rounded-full mr-2" />
                    Angka
                </div>
                <div className="flex">
                    <div className="bg-gradient-to-tl from-blue-500 to-blue-400 w-3 h-3 rounded-full mr-2" />
                    Alat Tulis
                </div>
            </div>
            <div className="flex -mx-1">
                {attemptedStages ? attemptedStages.map(({ id, score, stage }) => {
                    let bgColor = '';

                    switch (stage.category) {
                        case 'symbols': bgColor = 'gradient-to-tl from-red-500 to-red-400'; break;
                        case 'letters': bgColor = 'gradient-to-tl from-yellow-500 to-yellow-400'; break;
                        case 'numbers': bgColor = 'gradient-to-tl from-green-500 to-green-400'; break;
                        case 'on-paper': bgColor = 'gradient-to-tl from-blue-500 to-blue-400'; break;
                    }

                    return (
                        <StagesChartBar
                            bgColor={bgColor}
                            title={'Stg. ' + stage.stage}
                            value={score}
                            key={id}
                        />
                    );
                }) : null}
                {attemptedStages ? Array.from(Array(8 - attemptedStages.length).keys()).map((i) => (
                    <StagesChartBar key={i} />
                )) : null}
            </div>
        </section>
    );
};

export default StagesChart;