import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { Bar } from '@reactchartjs/react-chart.js';
import 'chartjs-plugin-datalabels';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import Navbar from './Navbar';
import StagesItem from './StagesItem';

// Types
import Stage from '../types/Stage';

type MatchParams = {
    category?: string | undefined;
};

const Stages = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;

    // Contexts
    const authContext = useAuthContext();

    // States
    const [stages, setStages] = useState<Stage[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/stages/category/${category}`, {
            headers: {
                'Authorization': `${authContext.token.type} ${authContext.token.token}`,
            }
        })
            .then((res) => setStages(res.data))
            .catch((err) => console.error(err));
    }, [category])

    return (
        <div className="flex-grow bg-blue-200 text-blue-900 overflow-y-scroll">
            <div className="sticky top-0 h-auto">
                <Navbar
                    leftButton={{
                        icon: (<FaChevronLeft size="0.83rem" />),
                        onClick: () => history.replace('/'),
                    }}
                />
                <section className="pt-17 px-8">
                    <div className="-mx-1.5">
                        <Bar
                            type="bar"
                            data={{
                                labels: [
                                    'Stage 1',
                                    'Stage 2',
                                    'Stage 5',
                                    'Stage 3',
                                    'Stage 1',
                                    'Stage 4',
                                ],
                                datasets: [{
                                    label: 'Skor',
                                    backgroundColor: 'rgb(236, 72, 153)',
                                    data: [10, 20, 70, 60, 80, 50, ],
                                }]
                            }}
                            options={{
                                scales: {
                                    xAxes: [{
                                        display: true,
                                        gridLines: {
                                            display: false,
                                        },
                                        scaleLabel: {
                                            display: true,
                                        },
                                        ticks: {
                                            fontColor: 'rgb(30, 58, 138)',
                                        },
                                    }],
                                    yAxes: [{
                                        display: false,
                                        gridLines: {
                                            display: false,
                                        },
                                        scaleLabel: {
                                            display: false,
                                        },
                                        ticks: {
                                            min: 0,
                                            max: 120,
                                            stepSize: 20,
                                        },
                                    }]
                                },
                                tooltip: {
                                    enabled: false,
                                },
                                legend: {
                                    display: false,
                                },
                                plugins: {
                                    datalabels: {
                                        anchor: 'end',
                                        align: 'top',
                                        color: 'rgb(30, 58, 138)',
                                        font: {
                                            weight: 500
                                        }
                                    },
                                },
                            }}
                        />
                    </div>
                </section>
            </div>
            <div className="sticky top-15 h-auto">
                <section className="absolute w-full h-screen flex-grow bg-white h-full py-8 px-4 rounded-t-3xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold leading-none">
                            Daftar Stage
                        </h2>
                        <span className="text-sm font-semibold leading-none"><strong className="font-bold">5</strong> Item</span>
                    </div>
                    <div className="grid gap-2">
                        {stages !== undefined ? stages.map((stage) => (
                            <StagesItem {...stage} key={stage.id} />
                        )) : null}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Stages;