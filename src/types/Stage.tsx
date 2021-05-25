import Question from './Question';

type Stage = {
    stage: string,
    category: 'symbols' | 'letters' | 'numbers' | 'on-paper',
    question_count: number,
    id: number,
    questions: Question[],    
};

export default Stage;