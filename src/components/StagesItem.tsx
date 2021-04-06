import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
// import Rate from 'rc-rate';

// Components
import Alert from './Alert';

// Types
import Stage from '../types/Stage';


type AttemptedStage = {
    id: number,
    score: number,
    stage_id: number,
};


const StagesItem = ({ id, stage, questions, history }: Stage & RouteComponentProps) => {
    const handleClick = () => {
        Alert.fire({
            title: (<span className="text-lg text-gray-900 font-bold leading-snug">Apakah Anda yakin?</span>),
            html: (<p className="text-sm text-gray-600 font-semibold">Curabitur eu ligula sit amet elit.</p>),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                axios.post(`${process.env.REACT_APP_API_URL}/attempted-stages`, {
                    stage_id: id,
                })
                    .then((res) => {
                        const attemptedStage: AttemptedStage = res.data;

                        if (attemptedStage.id) {
                            history.push(`/attempted-stages/${attemptedStage.id}/attempted-questions/n/1`);
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
    };

    return (
        <div className="flex items-center bg-white text-blue-900 p-2 rounded-lg shadow" onClick={handleClick}>
            <div className="flex justify-center items-center bg-pink-500 text-white text-xl font-extrabold w-11 h-11 mr-4 rounded-lg shadow-md">
                {stage}
            </div>
            <div className="flex flex-col mr-auto">
                <h3 className="text-sm font-bold leading-none">
                    Stage {stage}
                </h3>
                <span className="text-xs font-semibold">{questions[0].question} - {questions[questions.length - 1].question}</span>
            </div>
            {/* <Rate value={Math.ceil(Math.random() * 5)} /> */}
        </div>
    );
};

export default withRouter(StagesItem);