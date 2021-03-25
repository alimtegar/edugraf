import Stage from './Stage';
import AttemptedQuestion from './AttemptedQuestion';

type AttemptedStage = {
    score: number,
    stage_id: number,
    id: number,
    stage: Stage,
    attempted_questions: AttemptedQuestion[],
};

export default AttemptedStage;