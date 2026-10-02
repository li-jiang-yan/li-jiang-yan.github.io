class ModelChart {
    constructor(canvasId, selectElementId) {
        this.chart = new Chart(
            document.getElementById(canvasId),
            {
                plugins: [
                    ChartDataLabels
                ],
                data: {
                    labels: ['LR', 'RF-1F', 'RF-MF', 'SVM', 'ANN-1F', 'ANN-MF']
                },
                options: {
                    plugins: {
                        datalabels: {
                            display: true,
                        }
                    }
                }
            }
        );

        this.selectElement = document.getElementById(selectElementId);
        this.update(this.selectElement.value);
        this.selectElement.addEventListener('change', (event) => this.update(event.target.value));
    }

    getDatasetForMetric(metric) {
        switch (metric) {
            case 'Accuracy':
                return [{
                    type: 'bar',
                    label: 'Model accuracy',
                    data: [0.799, 0.799, 0.819, 0.799, 0.799, 0.816],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }];
            case 'Precision':
                return [{
                    type: 'bar',
                    label: 'Model precision (non-defaulters)',
                    data: [0.838, 0.838, 0.840, 0.838, 0.838, 0.852],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }, {
                    type: 'bar',
                    label: 'Model precision (defaulters)',
                    data: [0.559, 0.559, 0.657, 0.559, 0.559, 0.614],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }];
            case 'Recall':
                return [{
                    type: 'bar',
                    label: 'Model recall (non-defaulters)',
                    data: [0.921, 0.921, 0.949, 0.921, 0.921, 0.926],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }, {
                    type: 'bar',
                    label: 'Model recall (defaulters)',
                    data: [0.362, 0.360, 0.350, 0.362, 0.360, 0.422],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }];
            case 'F1-score':
                return [{
                    type: 'bar',
                    label: 'Model F1-score (non-defaulters)',
                    data: [0.878, 0.878, 0.891, 0.878, 0.878, 0.888],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }, {
                    type: 'bar',
                    label: 'Model F1-score (defaulters)',
                    data: [0.440, 0.438, 0.457, 0.440, 0.438, 0.500],
                    borderWidth: 1,
                    datalabels: {
                        align: 'start',
                        anchor: 'end'
                    },
                }];
        }
    }

    update(metric) {
        this.chart.data.datasets = this.getDatasetForMetric(metric);
        this.chart.update();
    }
}

class IllustrationChart {
    constructor(canvasId, inputId) {
        this.chart = new Chart(
            document.getElementById(canvasId),
            {
                data: {
                    labels: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
                    datasets: [
                        {
                            type: 'line',
                            label: 'logit model (probability of default)',
                            data: [0.277227392352753, 0.378794178425403, 0.4922300355453, 0.606471620721898, 0.710145717019842, 0.79570751697554, 0.860957569406605, 0.9077823572569, 0.939938211500555, 0.961358754471022, 0.975340261913506],
                        }, {
                            type: 'bar',
                            label: '% of defaulters',
                            data: [178 / 979, 246 / 1512, 617 / 3952, 3 / 6, 524 / 954, 48 / 71, 9 / 16, 2 / 4, 1 / 1, 4 / 4, 0 / 1],
                            borderWidth: 1,
                            borderColor: '#FF6384',
                            backgroundColor: '#FFB1C1',
                        }, {
                            type: 'bar',
                            label: '% of non-defaulters',
                            data: [801 / 979, 1266 / 1512, 3335 / 3952, 3 / 6, 430 / 954, 23 / 71, 7 / 16, 2 / 4, 0 / 1, 0 / 4, 1 / 1],
                            borderWidth: 1,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                        },
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                text: 'Repayment status 2 months ago',
                                display: true,
                            },
                            stacked: true
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            ticks: {
                                callback: (value, index, ticks) => `${value * 100}%`,
                            }
                        }
                    },
                    plugins: {
                        annotation: {
                            annotations: {
                                linearSV: {
                                    type: 'line',
                                    mode: 'vertical',
                                    xMin: 2.5,
                                    xMax: 2.5,
                                    label: {
                                        content: 'svm hyperplane',
                                        display: true,
                                        position: 'end',
                                    }
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    let label = [`${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}%`];
                                    if (context.dataset.type === 'line') {
                                        label.push(`svm prediction: ${(context.parsed.x < 2.5) ? 'non-defaulter' : 'defaulter'}`);
                                    }
                                    return label;
                                },
                            }
                        }
                    }
                }
            }
        );

        this.inputElement = document.getElementById(inputId);
        this.updateActiveElements(this.inputElement.value);
        this.inputElement.addEventListener('input', (event) => this.updateActiveElements(event.target.value));
    }

    updateActiveElements(x) {
        const index = this.chart.data.labels.indexOf(Number(x));
        const activeElements = this.chart.data.datasets.map((_, datasetIndex) => ({ datasetIndex: datasetIndex, index: index }))
        this.chart.setActiveElements(activeElements);
        this.chart.tooltip.setActiveElements(activeElements);
        this.chart.update();
    }
}

new ModelChart(
    'credit-card-default-classification_various-metrics',
    'credit-card-default-classification_various-select'
);
new IllustrationChart(
    'credit-card-default-classification_various-models',
    'credit-card-default-classification_various-status'
);
