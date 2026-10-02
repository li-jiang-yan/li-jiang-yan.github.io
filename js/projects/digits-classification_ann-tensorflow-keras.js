new Chart(document.getElementById('digits-classification_ann-tensorflow-keras-graph'), {
  type: 'scatter',
  data: {
    datasets: [{
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
    }]
  },
  options: {
    scales: {
      x: {
        title: {
          text: 'Learning rate',
          display: true,
        }
      }
    }
  }
});

class DrawingCanvas {
  constructor(canvasId, buttonId, tableId, resultId, modelJson) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.button = document.getElementById(buttonId);
    this.tbody = document.getElementById(tableId).tBodies[0];
    this.result = document.getElementById(resultId);
    this.modelJson = modelJson;

    this.reset();

    // Define lineWidth based on canvas width and height
    // such that ratio is that lineWidth = 1 for 8x8 image
    this.lineWidth = Math.sqrt((this.canvas.width * this.canvas.height) / 64);

    // Initialize state variables
    // isDrawing: state variable to check whether canvas is being drawn or not
    // x: x-coordinate of mouse w.r.t. canvas, only matters when isDrawing = true
    // y: y-coordinate of mouse w.r.t. canvas, only matters when isDrawing = true
    this.isDrawing = false;
    this.x = 0;
    this.y = 0;

    // Add event listeners
    this.addEventListeners();
  }

  reset() {
    // Make drawing area black like dataset
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Empty probability table
    this.tbody.replaceChildren();
    for (let i = 0; i < 10; i++) {
      let row = this.tbody.insertRow();
      let cell = row.insertCell();
      cell.textContent = i;
    }

    // Empty result
    this.result.innerText = '';
  }

  drawLine(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.strokeStyle = 'white';
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = 'round';
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.context.closePath();
  }

  async stopDrawing() {
    if (this.isDrawing) {
      // Create a 8x8 mini-canvas and context for the mini-canvas
      const miniCanvas = document.createElement('canvas');
      miniCanvas.width = 8;
      miniCanvas.height = 8;

      const miniContext = miniCanvas.getContext('2d', { willReadFrequently: true });

      // Copy this.canvas into the mini-canvas
      miniContext.imageSmoothingEnabled = true;
      miniContext.drawImage(this.canvas, 0, 0, miniCanvas.width, miniCanvas.height);

      // Turn mini-canvas image to BW with only 1 dimension (0-16) for each pixel like dataset
      // with the Array.prototype.reduce() method
      const imageData = miniContext.getImageData(0, 0, miniCanvas.width, miniCanvas.height);
      const data = imageData.data;
      const callbackFn = (accumulator, _, currentIndex, array) => {
        if (currentIndex % 4 === 0) {
          const pixelVal = (array[currentIndex] + array[currentIndex + 1] + array[currentIndex + 2]) / 3 * 16 / 255;
          accumulator.push(pixelVal);
        }
        return accumulator;
      };
      const initialValue = [];
      const input = data.reduce(callbackFn, initialValue);

      // Perform model prediction
      const model = await tf.loadLayersModel(this.modelJson);
      const tensors = tf.tensor2d([input], [1, 64]);
      const output = model.predict(tensors);
      const probabilities = await output.data();

      // Populate table and result
      this.tbody.replaceChildren();
      probabilities.forEach((probability, index) => {
        let row = this.tbody.insertRow();
        let cell = row.insertCell();
        cell.innerText = index;
        cell = row.insertCell();
        cell.innerText = probability.toFixed(3);
      });

      // Insert result
      this.result.innerText = probabilities.indexOf(Math.max(...probabilities));
    }

    this.isDrawing = false;
  }

  addEventListeners() {
    this.canvas.addEventListener('pointerdown', (event) => {
      this.isDrawing = true;

      // Get initial coordinates relative to canvas
      this.x = event.offsetX;
      this.y = event.offsetY;
    });

    this.canvas.addEventListener('pointermove', (event) => {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, event.offsetX, event.offsetY);

        // Update starting point for next segment
        this.x = event.offsetX;
        this.y = event.offsetY;
      }
    });

    this.canvas.addEventListener('pointerup', () => this.stopDrawing());

    // Stop drawing if the mouse leaves the canvas area while pressed
    this.canvas.addEventListener('pointerout', () => this.stopDrawing());

    this.button.addEventListener('click', () => {
      this.reset();
    });
  }
}

new DrawingCanvas(
  'digits-classification_ann-tensorflow-keras-canvas',
  'digits-classification_ann-tensorflow-keras-button',
  'digits-classification_ann-tensorflow-keras-table',
  'digits-classification_ann-tensorflow-keras-prediction',
  'assets/projects/digits-classification_ann-tensorflow-keras/model.json'
);
