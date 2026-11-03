import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Chart } from 'react-chartjs-2';
import CollapseCarousel from './CollapseCarousel';

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
);

const chartData = {
  labels: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
  datasets: [
    {
      type: 'line',
      label: 'Logistic regression (probability of default)',
      data: [
        0.2772, 0.3788, 0.4922, 0.6065, 0.7101, 0.7957, 0.861, 0.9078, 0.9399,
        0.9614, 0.9753,
      ],
      tension: 0.2,
    },
    {
      type: 'bar',
      label: '% of defaulters',
      data: [
        178 / 979,
        246 / 1512,
        617 / 3952,
        3 / 6,
        524 / 954,
        48 / 71,
        9 / 16,
        2 / 4,
        1,
        1,
        0,
      ],
      backgroundColor: '#FFB1C1',
      borderColor: '#FF6384',
      borderWidth: 1,
    },
    {
      type: 'bar',
      label: '% of non-defaulters',
      data: [
        801 / 979,
        1266 / 1512,
        3335 / 3952,
        3 / 6,
        430 / 954,
        23 / 71,
        7 / 16,
        2 / 4,
        0,
        0,
        1,
      ],
      backgroundColor: '#9BD0F5',
      borderColor: '#36A2EB',
      borderWidth: 1,
    },
  ],
};

const getMetricDataset = (metric) => {
  switch (metric) {
    case 'Accuracy':
      return [
        {
          type: 'bar',
          label: 'Model accuracy',
          data: [0.799, 0.799, 0.819, 0.799, 0.799, 0.816],
          backgroundColor: '#9BD0F5',
          borderColor: '#36A2EB',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
      ];
    case 'Precision':
      return [
        {
          type: 'bar',
          label: 'Model precision (non-defaulters)',
          data: [0.838, 0.838, 0.84, 0.838, 0.838, 0.852],
          backgroundColor: '#9BD0F5',
          borderColor: '#36A2EB',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
        {
          type: 'bar',
          label: 'Model precision (defaulters)',
          data: [0.559, 0.559, 0.657, 0.559, 0.559, 0.614],
          backgroundColor: '#FFB1C1',
          borderColor: '#FF6384',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
      ];
    case 'Recall':
      return [
        {
          type: 'bar',
          label: 'Model recall (non-defaulters)',
          data: [0.921, 0.921, 0.949, 0.921, 0.921, 0.926],
          backgroundColor: '#9BD0F5',
          borderColor: '#36A2EB',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
        {
          type: 'bar',
          label: 'Model recall (defaulters)',
          data: [0.362, 0.36, 0.35, 0.362, 0.36, 0.422],
          backgroundColor: '#FFB1C1',
          borderColor: '#FF6384',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
      ];
    case 'F1-score':
      return [
        {
          type: 'bar',
          label: 'Model F1-score (non-defaulters)',
          data: [0.878, 0.878, 0.891, 0.878, 0.878, 0.888],
          backgroundColor: '#9BD0F5',
          borderColor: '#36A2EB',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
        {
          type: 'bar',
          label: 'Model F1-score (defaulters)',
          data: [0.44, 0.438, 0.457, 0.44, 0.438, 0.5],
          backgroundColor: '#FFB1C1',
          borderColor: '#FF6384',
          borderWidth: 1,
          datalabels: {
            align: 'start',
            anchor: 'end',
          },
        },
      ];
  }

  return null;
};

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: { text: 'Repayment status 2 months ago', display: true },
      stacked: true,
    },
    y: {
      beginAtZero: true,
      stacked: true,
      ticks: { callback: (value) => `${value * 100}%` },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}%`,
      },
    },
  },
};

const metricsChartOptions = {
  responsive: true,
  scales: {
    x: {
      title: { text: 'Repayment status 2 months ago', display: true },
      stacked: false,
    },
    y: {
      beginAtZero: true,
      stacked: false,
      ticks: { callback: (value) => `${value * 100}%` },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(1)}%`,
      },
    },
  },
};

const svmLinePlugin = {
  id: 'svmLine',
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;

    const x = scales.x.getPixelForValue(2.5);

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.lineWidth = 2;
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.restore();

    // Label
    ctx.setLineDash([]);
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Support vector machine hyperplane', x + 6, chartArea.top + 6);
  },
};

const metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score'];

function CreditCardDefaultClassifier() {
  const [status, setStatus] = useState(-2);
  const [metric, setMetric] = useState(metrics[0]);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const index = chart.data.labels.indexOf(status);
    const activeElements = chart.data.datasets.map((_, datasetIndex) => ({
      datasetIndex,
      index,
    }));
    chart.setActiveElements(activeElements);
    chart.tooltip.setActiveElements(activeElements, { x: 0, y: 0 });
    chart.update();
  }, [status]);

  const handleStatusChange = (event) => {
    setStatus(Number(event.target.value));
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Visualizable Models</h5>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column xs='auto'>
            Repayment status 2 months ago:
          </Form.Label>
          <Col xs='auto'>
            <Form.Control
              type='number'
              min={-2}
              max={8}
              value={status}
              onChange={handleStatusChange}
            />
          </Col>
        </Form.Group>
        <Chart
          ref={chartRef}
          type='bar'
          data={chartData}
          options={chartOptions}
          plugins={[svmLinePlugin]}
          className='p-3 bg-white'
        />
      </Carousel.Item>
      <Carousel.Item>
        <h5>Model Metrics</h5>
        <p>
          Training data source:{' '}
          <a href='https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients'>
            Default of Credit Card Clients
          </a>
        </p>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column xs='auto'>
            Metric:
          </Form.Label>
          <Col xs='auto'>
            <Form.Select value={metric} onChange={handleMetricChange}>
              {metrics.map((metric) => (
                <option key={metric}>{metric}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Chart
          type='bar'
          data={{
            labels: ['LR', 'RF-1F', 'RF-MF', 'SVM', 'ANN-1F', 'ANN-MF'],
            datasets: getMetricDataset(metric),
          }}
          options={metricsChartOptions}
          className='p-3 bg-white mb-3'
        />
        <p className='small mb-0'>Notes</p>
        <ul className='small mb-0'>
          <li>LR: logistic regression</li>
          <li>RF-1F: random forest (1 variable)</li>
          <li>RF-MF: random forest (multiple variables)</li>
          <li>ANN-1F: artificial neural network (1 variable)</li>
          <li>ANN-MF: artificial neural network (multiple variables)</li>
        </ul>
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default CreditCardDefaultClassifier;
