import AttemptedStage from './AttemptedStage';
import Question from './Question';

type AttemptedQuestion = {
    id: number,
    attempted_stage_id: number,
    question_id: number,
    answer: string,
    is_correct: boolean,
    attempted_stage: AttemptedStage,
    question: Question,
};

export default AttemptedQuestion;