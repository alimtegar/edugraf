import { useEffect, } from 'react';
import axios from 'axios';
import 'chartjs-plugin-datalabels';

// Types
import AttemptedStage from '../types/AttemptedStage';

// Components
import StagesChartBar from './StagesChartBar';

const StagesChart = () => {
    const attemptedStages: AttemptedStage[] = [
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'letters',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 70,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'numbers',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 50,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'symbols',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 60,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'on-paper',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 30,
            question_count: 5,
            attempted_questions: []
        },
    ];

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages?limit=10`)
            .then((res) => {
                console.log(JSON.stringify(res.data));
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
                {attemptedStages.map(({ id, score, stage }) => {
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
                            title="Stg. 1"
                            value={score}
                        />
                    );
                })}
                {Array.from(Array(8 - attemptedStages.length).keys()).map(() => (
                    <StagesChartBar />
                ))}
            </div>
        </section>
    );
};

export default StagesChart;