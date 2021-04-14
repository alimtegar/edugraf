import Stage from './Stage';
import AttemptedQuestion from './AttemptedQuestion';

type AttemptedStage = {
    id: number,
    stage_id: number,
    stage: Stage,
    attempted_questions: AttemptedQuestion[],
    score: number,
    question_count: number,
};

export default AttemptedStage;