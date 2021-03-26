import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import Rate from 'rc-rate';

// Components
import Navbar from './Navbar';
import Button from './Button';
import Frame from './Frame';

// Types
import AttemptedStage from '../types/AttemptedStage';
import AttemptedQuestion from '../types/AttemptedQuestion';

type MatchParams = {
    id?: string | undefined;
}

const AttemptedStageComponent = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { id } } = match;

    // States
    const [attemptedStage, setAttemptedStage] = useState<AttemptedStage>();

    // Functions
    const getScore = () => {
        const initScore = attemptedStage?.attempted_questions.reduce((
            a: AttemptedQuestion | number | undefined,
            b: AttemptedQuestion | number | undefined
        ) => (typeof a == 'number' && typeof b == 'object') ? a + +b.is_correct : 0, 0);

        return initScore ? initScore * 10 : 0;
    }

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages/${id}`)
            .then((res) => setAttemptedStage(res.data))
            .catch((err) => {
                console.error(err);
                history.push('/404');
            });
    }, [history, id]);

    return (
        <div className="attempted-stage flex flex-col flex-grow bg-blue-200 w-screen">
            <Navbar />
            <section className="flex flex-col justify-center items-center text-blue-900 text-center pt-8 px-12 pb-12">
                <div className="-my-2 pl-2 mb-4">
                    <Rate
                        value={attemptedStage ? getScore() / attemptedStage?.attempted_questions.length / 2 : 0}
                        allowHalf
                        style={{
                            fontSize: '2rem',
                        }}
                    />
                </div>
                <h1 className="text-6xl font-extrabold mb-4">
                    {getScore()}
                </h1>
                <h2 className="text-lg font-bold leading-snug mb-1">Selamat!</h2>
                <p className="text-sm font-semibold">Curabitur eu ligula sit amet elit.</p>
            </section>
            <section className="grid grid-cols-5 gap-2 px-12">
                {attemptedStage?.attempted_questions.map((attemptedQuestion, i) => (
                    // <Frame size="full" textSize="lg" rounded="lg">
                    <div className={`relative flex justify-center items-center bg-white text-body text-lg font-extrabold p-2 rounded-lg shadow`} key={attemptedQuestion.id}>

                        {/* <div className="flex justify-center items-center bg-pink-500 text-white h-full aspect-1 mr-2 rounded-lg shadow-md">
                            {i + 1}
                        </div> */}

                        <div className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-${attemptedQuestion.is_correct ? 'green-500' : 'red-500'} w-3 h-3 rounded-full shadow-md`} />
                        <span>
                            <sup>
                                {attemptedQuestion.question.question}
                            </sup>
                            /
                            <sub>
                                {attemptedQuestion.answer}
                            </sub>
                        </span>
                    </div>
                    // </Frame>
                ))}
            </section>
            <section className="px-4 mt-auto mb-4">
                <Link to={`/stages/category/${attemptedStage?.stage.category}`} replace>
                    <Button
                        w="full"
                        h={12}
                        borderR="lg"
                        shadow="default"
                    >
                        Kembali ke Menu
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default AttemptedStageComponent;