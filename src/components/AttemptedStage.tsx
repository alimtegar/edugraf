import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import Rate from 'rc-rate';
import { FaChevronLeft, } from 'react-icons/fa';
import { toast, } from 'react-toastify';

// Components
import Navbar from './Navbar';
import Button from './Button';
import Stepper from './Stepper';
// import CharacterFrame from './CharacterFrame';

// Types
import { default as AttemptedStateState } from '../types/AttemptedStage';
import CharacterFrame from './CharacterFrame';
import classNames from 'classnames';

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
            return 'Hebat!';
        } else if (score >= 80) {
            return 'Keren!';
        } else if (score >= 60) {
            return 'Cukup Bagus!';
        } else if (score >= 40) {
            return 'Pelan-Pelan Saja';
        } else {
            return 'Jangan Menyerah';
        }
    };

    const getDescription = (score: number) => {
        if (score >= 100) {
            return 'Hebat sekali, pertahankan untuk nilainya ya.';
        } else if (score >= 80) {
            return 'Wow keren, sedikit lagi pasti dapat nilai sempurna.';
        } else if (score >= 60) {
            return 'Nilaimu sudah cukup bagus tetapi bisa kamu tingkatkan lagi!';
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
            <Navbar title="Hasil Tes" />
            <main className="flex flex-grow flex-col justify-between pt-15">
                <section className="flex flex-col justify-center items-center text-gray-700 text-center pt-10 px-16 pb-10">
                    {/* Star Rating */}
                    <div className="mb-4">
                        <Rate
                            value={attemptedStage ? attemptedStage.score / 10 * 0.5 : 0}
                            allowHalf
                            style={{
                                fontSize: '2.5rem',
                            }}
                        />
                    </div>

                    {/* Score */}
                    <div className="relative">
                        <h1 className="text-6xl font-extrabold mb-4">
                            {attemptedStage ? attemptedStage.score : 0}
                        </h1>
                        {attemptedStage ? (
                            <div className="absolute top-0 -right-2 transform translate-x-full bg-gradient-to-tl from-blue-500 to-blue-400 text-white text-sm font-extrabold px-4 py-2 rounded-t-xl rounded-br-xl">
                                <div style={{ transform: 'translateY(1px)', }}>
                                    +{attemptedStage.score}XP
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <h2 className="text-lg font-extrabold leading-none mb-2">{attemptedStage && getTitle(attemptedStage.score)}</h2>
                    <p className="text-sm text-gray-600 font-semibold">{attemptedStage && getDescription(attemptedStage.score)}</p>
                </section>
                <section className="flex justify-center items-center flex-wrap px-16 md:mx-auto md:w-1/3">
                    <p className="text-sm text-gray-600 font-semibold mb-4">Jawaban kamu:</p>
                    <div className="grid grid-cols-5 gap-2 w-full">
                        {attemptedStage?.attempted_questions.map((attemptedQuestion, i) => (
                            <div className={classNames('inline-flex justify-center items-center text-xl font-extrabold aspect-1 rounded-lg', {
                                [`bg-green-500 bg-opacity-10 text-green-500`]: attemptedQuestion.is_correct,
                                [`bg-red-400 bg-opacity-10 text-red-400`]: !attemptedQuestion.is_correct,
                            })}>
                                {attemptedQuestion.question.question}
                            </div>
                            // <div className="relative m-1" key={attemptedQuestion.id}>
                            //     <div className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 ${attemptedQuestion.is_correct ? 'bg-blue-500' : 'bg-red-500'} w-3 h-3 rounded-full shadow-default`} />
                            //     <CharacterFrame
                            //         size={11}
                            //         textSize="xl"
                            //         rounded="lg"
                            //         {...attemptedStage.stage.category === 'on-paper' ? {
                            //             aspect: false,
                            //             p: 4
                            //         } : {
                            //             aspect: 1,
                            //             p: 0,
                            //         }}
                            //     >
                            //         {attemptedQuestion.question.question}
                            //     </CharacterFrame>
                            // </div>
                        ))}
                    </div>
                </section>
                <section className="grid grid-cols-1 gap-2 px-4 mt-auto mb-4 md:mx-auto md:w-1/3">
                    <Link to={`/stages/category/${attemptedStage?.stage.category}`} replace>
                        <Button shadow="default">
                            Coba Lagi
                        </Button>
                    </Link>
                    <Link to={`/stages/category/${attemptedStage?.stage.category}`} replace>
                        <Button bgColor="white" textColor="blue-500" shadow="default">
                            Daftar Stage
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AttemptedStage;