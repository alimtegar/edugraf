import StageCategory from './StageCategory';
import Question from './Question';


type Stage = {
    stage: string,
    category: StageCategory,
    question_count: number,
    id: number,
    questions: Question[],    
    is_locked: boolean,
};

export default Stage;