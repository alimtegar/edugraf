import { useState, useEffect, } from 'react';
import axios from 'axios';
import { Bar, } from '@reactchartjs/react-chart.js';
import 'chartjs-plugin-datalabels';

// Types
import AttemptedStage from '../types/AttemptedStage';

const StagesChart = () => {
    // States
    const [labels, setLabels] = useState<string[]>([])
    const [backgroundColor, setBackgroundColor] = useState<string[]>([])
    const [data, setData] = useState<number[]>([])

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages?limit=10`)
            .then((res) => {
                const attemptedStages: AttemptedStage[] = res.data;
                const backgroundColors = {
                    'on-paper': '#FC9F60',
                    symbols: 'rgb(239, 68, 68)',
                    letters: 'rgb(59, 130, 246)',
                    numbers: 'rgb(139, 92, 246)',
                };

                let _labels: string[] = [];
                let _backgroundColor: string[] = [];
                let _data: number[] = [];

                attemptedStages.map((attemptedStage) => {
                    _labels.unshift(`Stage ${attemptedStage.stage.stage}`);
                    _backgroundColor.unshift(backgroundColors[attemptedStage.stage.category]);
                    _data.unshift(attemptedStage.score);

                    return false;
                });

                setLabels(_labels);
                setBackgroundColor(_backgroundColor);
                setData(_data);

            })
            .catch((err) => console.error(err));
    }, []);

    return data.length ? (
        <div className="-mx-1.5">
            <div className="flex justify-between text-white text-xs font-bold mb-6">
                <div className="flex">
                    <div className="bg-secondary w-3 h-3 rounded-full mr-2" />
                    Di kertas
                </div>
                <div className="flex">
                    <div className="bg-red-500 w-3 h-3 rounded-full mr-2" />
                    Simbol
                </div>
                <div className="flex">
                    <div className="bg-blue-500 w-3 h-3 rounded-full mr-2" />
                    Huruf
                </div>
                <div className="flex">
                    <div className="bg-purple-500 w-3 h-3 rounded-full mr-2" />
                    Angka
                </div>
            </div>

            <Bar
                type="bar"
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Dataset 1',
                            backgroundColor: backgroundColor,
                            data: data,
                        },
                    ],
                }}
                options={{
                    layout: {
                        padding: {
                            top: 8,
                        }
                    },
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
                                fontColor: 'white',
                                // fontSize: '0.875rem',
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
                            color: 'white',
                            font: {
                                weight: 500,
                                // size: '0.875rem',
                            }
                        },
                    },
                }}
            />
        </div>
    ) : <div />;
};

export default StagesChart;