// Types
import Stage from '../types/Stage';

const StagesComponent = ({stage, questions}: Stage) => (
    <div className="flex items-center bg-white text-blue-900 p-4 rounded-lg shadow">
        <div className="flex justify-center items-center bg-pink-500 text-white text-xl font-extrabold w-11 h-11 mr-4 rounded-lg shadow-md">
            {stage}
        </div>
        <div className="mr-auto">
            <h3 className="text-md font-bold leading-snug">
                Stage {stage}
            </h3>
            <span className="text-sm font-semibold">{questions[0].question} - {questions[questions.length - 1].question}</span>
        </div>
        {/* <Rate value={Math.ceil(Math.random() * 5)} /> */}
    </div>
);

export default StagesComponent;