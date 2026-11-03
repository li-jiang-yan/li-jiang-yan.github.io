import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Scatter } from 'react-chartjs-2';
import CollapseCarousel from './CollapseCarousel';

const modelUrl = `${import.meta.env.BASE_URL}assets/projects/digits-classification_ann-tensorflow-keras/model.json`;
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let modelPromise;

const loadModel = async () => {
  if (!modelPromise) {
    modelPromise = import('@tensorflow/tfjs').then((tf) =>
      tf.loadLayersModel(modelUrl),
    );
  }

  return modelPromise;
};

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    x: {
      title: {
        text: 'Learning rate',
        display: true,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: 'Model accuracy after 30 training epochs',
      data: [
        { x: 0.00000001, y: 0.106288258208125 },
        { x: 0.00143001, y: 0.997217584863662 },
        { x: 0.00286001, y: 0.999443516972732 },
        { x: 0.00429001, y: 0.999443516972732 },
        { x: 0.00572001, y: 0.998330550918197 },
        { x: 0.00715001, y: 0.986087924318308 },
        { x: 0.00858001, y: 0.983861992209238 },
        { x: 0.01001001, y: 0.975514746800223 },
        { x: 0.01144001, y: 0.965498052309405 },
        { x: 0.01287001, y: 0.953811908736784 },
        { x: 0.01430001, y: 0.963828603227602 },
        { x: 0.01573001, y: 0.956037840845854 },
        { x: 0.01716001, y: 0.939343350027824 },
        { x: 0.01859001, y: 0.939899833055092 },
        { x: 0.02002001, y: 0.94045631608236 },
        { x: 0.02145001, y: 0.926544240400668 },
        { x: 0.02288001, y: 0.896494156928214 },
        { x: 0.02431001, y: 0.915971062882582 },
        { x: 0.02574001, y: 0.868113522537563 },
        { x: 0.02717001, y: 0.873121869782972 },
        { x: 0.02860001, y: 0.895937673900946 },
        { x: 0.03003001, y: 0.809682804674457 },
        { x: 0.03146001, y: 0.89983305509182 },
        { x: 0.03289001, y: 0.708959376739009 },
        { x: 0.03432001, y: 0.787423483583751 },
        { x: 0.03575001, y: 0.525876460767947 },
        { x: 0.03718001, y: 0.796327212020033 },
        { x: 0.03861001, y: 0.585976627712855 },
        { x: 0.04004001, y: 0.39621591541458 },
        { x: 0.04147001, y: 0.645520311630495 },
        { x: 0.04290001, y: 0.287701725097385 },
        { x: 0.04433001, y: 0.547579298831386 },
        { x: 0.04576001, y: 0.410127991096272 },
        { x: 0.04719001, y: 0.293266555370061 },
        { x: 0.04862001, y: 0.230383973288815 },
        { x: 0.05005001, y: 0.380634390651085 },
        { x: 0.05148001, y: 0.196994991652755 },
        { x: 0.05291001, y: 0.170283806343907 },
        { x: 0.05434001, y: 0.287145242070117 },
        { x: 0.05577001, y: 0.100723427935448 },
        { x: 0.05720001, y: 0.256538675570395 },
        { x: 0.05863001, y: 0.18864774624374 },
        { x: 0.06006001, y: 0.191430161380078 },
        { x: 0.06149001, y: 0.189760712298275 },
        { x: 0.06292001, y: 0.275459098497496 },
        { x: 0.06435001, y: 0.279910962715637 },
        { x: 0.06578001, y: 0.194769059543684 },
        { x: 0.06721001, y: 0.193099610461881 },
        { x: 0.06864001, y: 0.250973845297718 },
        { x: 0.07007001, y: 0.381190873678353 },
      ],
      showLine: true,
      backgroundColor: '#9BD0F5',
      borderColor: '#36A2EB',
    },
  ],
};

function HandwrittenDigitsClassifier() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const modelRef = useRef(null);
  const [probabilities, setProbabilities] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState('Loading model…');

  useEffect(() => {
    let active = true;
    loadModel()
      .then((model) => {
        modelRef.current = model;
        if (active) setStatus('Draw a digit to get a prediction.');
      })
      .catch(() => {
        if (active) setStatus('The classifier model could not be loaded.');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const resetDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setProbabilities(null);
    setPrediction(null);
    setStatus(
      modelRef.current ? 'Draw a digit to get a prediction.' : 'Loading model…',
    );
  };

  const getPoint = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x:
        (event.clientX - bounds.left) *
        (event.currentTarget.width / bounds.width),
      y:
        (event.clientY - bounds.top) *
        (event.currentTarget.height / bounds.height),
    };
  };

  const startDrawing = (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const canvas = event.currentTarget;
    const point = getPoint(event);
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    canvas.dataset.lastX = point.x;
    canvas.dataset.lastY = point.y;
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    const canvas = event.currentTarget;
    const context = canvas.getContext('2d');
    const point = getPoint(event);
    const scale = canvas.width / 8;
    context.beginPath();
    context.strokeStyle = 'white';
    context.lineWidth = scale;
    context.lineCap = 'round';
    context.moveTo(Number(canvas.dataset.lastX), Number(canvas.dataset.lastY));
    context.lineTo(point.x, point.y);
    context.stroke();
    canvas.dataset.lastX = point.x;
    canvas.dataset.lastY = point.y;
  };

  const classify = async () => {
    drawingRef.current = false;
    const canvas = canvasRef.current;
    const model = modelRef.current;
    if (!canvas || !model) {
      setStatus('The classifier model is still loading.');
      return;
    }

    setStatus('Classifying…');
    const miniCanvas = document.createElement('canvas');
    miniCanvas.width = 8;
    miniCanvas.height = 8;
    const miniContext = miniCanvas.getContext('2d', {
      willReadFrequently: true,
    });
    miniContext.imageSmoothingEnabled = true;
    miniContext.drawImage(canvas, 0, 0, 8, 8);
    const pixels = miniContext.getImageData(0, 0, 8, 8).data;
    const input = [];
    for (let i = 0; i < pixels.length; i += 4) {
      input.push(
        ((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3) * (16 / 255),
      );
    }

    const tf = await import('@tensorflow/tfjs');
    const inputTensor = tf.tensor2d([input], [1, 64]);
    const outputTensor = model.predict(inputTensor);
    try {
      const values = Array.from(await outputTensor.data());
      const bestDigit = values.indexOf(Math.max(...values));
      setProbabilities(values);
      setPrediction(bestDigit);
      setStatus('');
    } catch {
      setStatus('Classification failed. Please try drawing again.');
    } finally {
      inputTensor.dispose();
      outputTensor.dispose();
    }
  };

  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Model</h5>
        <p>
          Training data source:{' '}
          <a href='https://archive.ics.uci.edu/dataset/80/optical+recognition+of+handwritten+digits'>
            Optical Recognition of Handwritten Digits
          </a>
        </p>
        <Row>
          <Col md={6} lg={6}>
            <h6>Drawing Board</h6>
            <p>Draw in the black box (yes, really!)</p>
            <canvas
              ref={canvasRef}
              aria-label='Drawing canvas for handwritten digit classification'
              width={280}
              height={280}
              style={{
                width: '100%',
                maxWidth: 280,
                height: 'auto',
                background: 'black',
                touchAction: 'none',
                border: '1px solid currentColor',
                borderRadius: 4,
              }}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={classify}
              onPointerCancel={classify}
            />
            <Button
              className='mt-2'
              type='button'
              variant='secondary'
              onClick={resetDrawing}
            >
              Clear
            </Button>
          </Col>
          <Col md={6} lg={6}>
            <h6>Prediction</h6>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Digit</th>
                  <th style={{ width: '50%' }}>Probability</th>
                </tr>
              </thead>
              <tbody>
                {digits.map((digit) => (
                  <tr key={digit}>
                    <td>{digit}</td>
                    <td>
                      {probabilities ? probabilities[digit].toFixed(3) : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row className='justify-content-center'>
              <Col xs='auto'>Prediction:</Col>
              <Col xs='auto'>{prediction ?? ''}</Col>
            </Row>
            <p
              className='small text-center mb-0'
              role='status'
              aria-live='polite'
            >
              {status}
            </p>
            <p className='small text-center mb-0'>
              The model may make mistakes.
            </p>
          </Col>
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <h5>Determining a suitable learning rate</h5>
        <Scatter options={options} data={data} className='p-3 bg-white' />
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default HandwrittenDigitsClassifier;
