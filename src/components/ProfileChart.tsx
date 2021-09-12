import { useState, useEffect, } from 'react';
import axios from 'axios';

// Utils
import { getStageCategoryColor, translateStageCategory, } from '../Utils';

// Components
import ProfileChartBar from './ProfileChartBar';

// Types
import StageCategory from '../types/StageCategory';

type AttemptedSrageProgress = {
    progress: number,
    category: StageCategory,
}

const ProfileChart = () => {
    // const attemptedStages: AttemptedStage[] = [
    //     {
    //         stage_id: 1,
    //         id: 1,
    //         stage: {
    //             stage: '1',
    //             category: 'letters',
    //             id: 1,
    //             question_count: 5,
    //             questions: [],
    //             is_locked: false,
    //         },
    //         score: 80,
    //         question_count: 5,
    //         attempted_questions: []
    //     },
    //     {
    //         stage_id: 1,
    //         id: 1,
    //         stage: {
    //             stage: '1',
    //             category: 'numbers',
    //             id: 1,
    //             question_count: 5,
    //             questions: [],
    //             is_locked: false,
    //         },
    //         score: 50,
    //         question_count: 5,
    //         attempted_questions: []
    //     },
    //     {
    //         stage_id: 1,
    //         id: 1,
    //         stage: {
    //             stage: '1',
    //             category: 'symbols',
    //             id: 1,
    //             question_count: 5,
    //             questions: [],
    //             is_locked: false,
    //         },
    //         score: 60,
    //         question_count: 5,
    //         attempted_questions: []
    //     },
    // ];


    // States
    const [attemptedStageProgress, setAttemptedStageProgress] = useState<AttemptedSrageProgress[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages/progress`)
            .then((res) => setAttemptedStageProgress(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="bg-white p-6 shadow-default rounded-xl">
            <h2 className="text-sm font-bold mb-6">Progres Tes Menulis</h2>
            <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                {['symbols', 'letters', 'numbers', 'on-paper',].map((stageCategory) => (
                    <div className="flex" key={stageCategory}>
                        <div className={`bg-${getStageCategoryColor(stageCategory as StageCategory)} w-3 h-3 rounded-full mr-2`} />
                        {translateStageCategory(stageCategory as StageCategory)}
                    </div>
                ))}
            </div>
            <div className="grid gap-2">
                {attemptedStageProgress ? attemptedStageProgress.map(({ progress, category }) => (
                    <ProfileChartBar
                        bgColor={getStageCategoryColor(category as StageCategory)}
                        value={progress}
                    />
                )) : Array.from(Array(4).keys()).map((i) => (
                    <ProfileChartBar key={i} />
                ))}
            </div>
        </div>
    );
};

export default ProfileChart;