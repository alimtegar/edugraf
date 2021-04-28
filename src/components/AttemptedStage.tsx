import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import Rate from 'rc-rate';

// Components
import Navbar from './Navbar';
import Button from './Button';
import Stepper from './Stepper';
// import CharacterFrame from './CharacterFrame';

// Types
import { default as AttemptedStateState } from '../types/AttemptedStage';
import CharacterFrame from './CharacterFrame';

type MatchParams = {
    id?: string | undefined;
}

const AttemptedStage = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { id } } = match;

    // States
    const [attemptedStage, setAttemptedStage] = useState<AttemptedStateState>();

    // Function
    const getTitle = (score: number) => {
        if (score >= 100) {
            return 'Hebat';
        } else if (score >= 80) {
            return 'Keren';
        } else if (score >= 60) {
            return 'Lumayan';
        } else if (score >= 40) {
            return 'Pelan-Pelan Saja';
        } else {
            return 'Jangan Menyerah';
        }
    };

    const getDescription = (score: number) => {
        if (score >= 100) {
            return 'Hebat sekali, pertahankan nilainya ya.';
        } else if (score >= 80) {
            return 'Wow keren, sedikit pasti dapat nilai sempurna.';
        } else if (score >= 60) {
            return 'Lumayan bagus, tetapi bisa ditingkatkan lagi.';
        } else if (score >= 40) {
            return 'Pelan-pelan saja, nanti pasti juga akan bisa.';
        } else {
            return 'Jangan menyerah ya, yuk coba sekali lagi!';
        }
    };

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
        <div className="attempted-stage flex flex-col flex-grow">
            <Navbar />
            <main className="flex flex-grow flex-col justify-between pt-15">
                <Stepper active={1} count={1} />

                <section className="flex flex-col justify-center items-center text-white text-center pt-10 px-16 pb-11">
                    <div className="-my-2 pl-2 mb-4">
                        <Rate
                            value={attemptedStage ? attemptedStage.score / attemptedStage.question_count * 0.5 : 0}
                            allowHalf
                            style={{
                                fontSize: '2rem',
                            }}
                        />
                    </div>
                    <h1 className="text-6xl font-extrabold mb-4">
                        {attemptedStage ? attemptedStage.score : 0}
                    </h1>
                    <h2 className="text-lg font-extrabold leading-snug mb-2">{attemptedStage && getTitle(attemptedStage.score)}</h2>
                    <p className="text-sm font-semibold">{attemptedStage && getDescription(attemptedStage.score)}</p>
                </section>
                <section className="flex justify-center items-center flex-wrap px-8 md:mx-auto md:w-1/3">
                    {attemptedStage?.attempted_questions.map((attemptedQuestion, i) => (
                        <div className="relative m-1" key={attemptedQuestion.id}>
                            <div className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-${attemptedQuestion.is_correct ? 'blue-500' : 'red-500'} w-3 h-3 rounded-full shadow-default`} />
                            <CharacterFrame
                                size={11}
                                textSize="xl"
                                rounded="lg"
                                {...attemptedStage.stage.category === 'on-paper' ? {
                                    aspect: false,
                                    p: 4
                                } : {
                                    aspect: 1,
                                    p: 0,
                                }}
                            >
                                {attemptedQuestion.question.question}
                            </CharacterFrame>
                        </div>
                    ))}
                </section>
                <section className="px-4 mt-auto mb-4 md:mx-auto md:w-1/3">
                    <Link to={`/stages/category/${attemptedStage?.stage.category}`} replace>
                        <Button>
                            Daftar Stage
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AttemptedStage;