import AttemptedTestQuestion from './AttemptedTestQuestion';

type Test = {
    id: number
    score: number,
    question_count: number,
    attempted_test_questions: AttemptedTestQuestion[],
};

export default Test;