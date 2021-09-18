import { useState, useEffect, } from 'react';
import axios from 'axios';
import 'chartjs-plugin-datalabels';

// Components
import StagesChartBar from './StagesChartBar';

// Utils
import { getStageCategoryColor, translateStageCategory, } from '../Utils';

// Types
import AttemptedStage from '../types/AttemptedStage';
import StageCategory from '../types/StageCategory';

const StagesChart = () => {
    // States
    const [attemptedStages, setAttemptedStages] = useState<AttemptedStage[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages?limit=8&order_by=desc`)
            .then((res) => setAttemptedStages(res.data.reverse()))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section>
            <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                {['symbols', 'letters', 'numbers', 'on-paper',].map((stageCategory) => (
                    <div className="flex" key={stageCategory}>
                        <div className={`bg-${getStageCategoryColor(stageCategory as StageCategory)} w-3 h-3 rounded-full mr-2`} />
                        {translateStageCategory(stageCategory as StageCategory)}
                    </div>
                ))}
            </div>
            <div className="flex -mx-1">
                {attemptedStages ? attemptedStages.map(({ id, score, stage }) => (
                    <StagesChartBar
                        bgColor={getStageCategoryColor(stage.category)}
                        title={'Stg. ' + stage.stage}
                        value={score}
                        key={id}
                    />
                )) : Array.from(Array(8).keys()).map((i) => (
                    <StagesChartBar key={i} />
                ))}
                {attemptedStages ? Array.from(Array(8 - attemptedStages.length).keys()).map((i) => (
                    <StagesChartBar key={i} />
                )) : null}
            </div>
        </section>
    );
};

export default StagesChart;