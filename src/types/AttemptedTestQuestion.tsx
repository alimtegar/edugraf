import TestQuestion from './TestQuestion';

type AttemptedTestQuestion = {
    id: number
    answer: string,
    test_question_id: number,
    test_question: TestQuestion,
};

export default AttemptedTestQuestion;