import { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

// Components
import Loading from './Loading';
import Navbar from './Navbar';
import Stepper from './Stepper';
import AttemptedQuestionOnPaper from './AttemptedQuestionOnPaper';
import AttemptedQuestionOnCanvas from './AttemptedQuestionOnCanvas';

// Types
import { default as AttemptedQuestionState } from '../types/AttemptedQuestion';

type MatchParams = {
    attemptedStageId?: string | undefined;
    n?: string | undefined;
}

const AttemptedQuestion = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { attemptedStageId, n: initN } } = match;
    const n: number = initN ? parseInt(initN) : 1;

    // States
    const [attemptedQuestion, setAttemptedQuestion] = useState<AttemptedQuestionState | null>(null);

    const navigate = useCallback((condition: boolean, n: number) => {
        const nextPath = condition
            ? `/attempted-stages/${attemptedStageId}/attempted-questions/n/${n}`
            : `/attempted-stages/${attemptedStageId}`;

        history.push(nextPath);
    }, [history, attemptedStageId]);

    // Effect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages/${attemptedStageId}/attempted-questions/n/${n}`)
            .then((res) => {
                const initAttemptedQuestion: AttemptedQuestionState = res.data;

                // If attempted question is answered
                if (initAttemptedQuestion.answer) {
                    // Get number from other unanswered attempted questions
                    const unansweredOtherN = initAttemptedQuestion.attempted_stage.attempted_questions.findIndex((other) => !other.answer) + 1;

                    navigate(!!(unansweredOtherN), unansweredOtherN);
                } else {
                    setAttemptedQuestion(initAttemptedQuestion);
                }
            })
            .catch((err) => {
                console.error(err);
                history.push('/404');
            });
    }, [history, navigate, attemptedStageId, n]);
    // 
    
    const next = () => navigate(!!(attemptedQuestion && n + 1 <= attemptedQuestion?.attempted_stage.question_count), n + 1)

    return !attemptedQuestion ? (<Loading />) : (
        <>
            <Navbar />

            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={n} count={attemptedQuestion?.attempted_stage.question_count} />

                {(attemptedQuestion?.attempted_stage.stage.category === 'on-paper') ? (
                    <AttemptedQuestionOnPaper attemptedQuestion={attemptedQuestion} next={next} 
                    />
                ) : (
                    <AttemptedQuestionOnCanvas attemptedQuestion={attemptedQuestion} next={next} />
                )}
            </main>
        </>
    );
};



export default withRouter(AttemptedQuestion);