const fireColorsPalette = [{ r: 7, g: 7, b: 7 }, { r: 31, g: 7, b: 7 }, { r: 47, g: 15, b: 7 }, { r: 71, g: 15, b: 7 }, { r: 87, g: 23, b: 7 }, { r: 103, g: 31, b: 7 }, { r: 119, g: 31, b: 7 }, { r: 143, g: 39, b: 7 }, { r: 159, g: 47, b: 7 }, { r: 175, g: 63, b: 7 }, { r: 191, g: 71, b: 7 }, { r: 199, g: 71, b: 7 }, { r: 223, g: 79, b: 7 }, { r: 223, g: 87, b: 7 }, { r: 223, g: 87, b: 7 }, { r: 215, g: 95, b: 7 }, { r: 215, g: 95, b: 7 }, { r: 215, g: 103, b: 15 }, { r: 207, g: 111, b: 15 }, { r: 207, g: 119, b: 15 }, { r: 207, g: 127, b: 15 }, { r: 207, g: 135, b: 23 }, { r: 199, g: 135, b: 23 }, { r: 199, g: 143, b: 23 }, { r: 199, g: 151, b: 31 }, { r: 191, g: 159, b: 31 }, { r: 191, g: 159, b: 31 }, { r: 191, g: 167, b: 39 }, { r: 191, g: 167, b: 39 }, { r: 191, g: 175, b: 47 }, { r: 183, g: 175, b: 47 }, { r: 183, g: 183, b: 47 }, { r: 183, g: 183, b: 55 }, { r: 207, g: 207, b: 111 }, { r: 223, g: 223, b: 159 }, { r: 239, g: 239, b: 199 }, { r: 255, g: 255, b: 255 }];
const firePixelArray = [];
const viewWidth = Math.round(document.documentElement.clientWidth / 4);
const fireWidth = viewWidth > 130 ? 130 : viewWidth;
const fireHeight = 40;
const debug = false;
const decayMultiplier = 4;
const windDirection = -1; // -1 = left
const windStrengh = 3; // < 3


function start() {
  createFireDataSructure();
  createFireSource();
  calculateFirePropagation();


  renderFire();

  setInterval(calculateFirePropagation, 10);
}

function createFireDataSructure() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelArray[i] = 0;
  }
}

function updateFireIntensityPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  if (belowPixelIndex >= fireHeight * fireWidth) {
    return null;
  }

  const fireDecay = Math.floor(Math.random() * decayMultiplier);
  const currentWindStrengh = Math.floor(Math.random() * windStrengh);
  const belowPixelFireIntensity = firePixelArray[belowPixelIndex];

  if (belowPixelFireIntensity - fireDecay < 0) firePixelArray[currentPixelIndex] = 0;
  else firePixelArray[currentPixelIndex + (currentWindStrengh * windDirection)] = belowPixelFireIntensity - fireDecay;
}

function renderFire() {
  let html = '';
  html += '<table cellpadding=0 cellspacing=0>';

  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>';

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + (fireWidth * row);
      const fireIntensity = firePixelArray[pixelIndex];

      if (debug === true) {
        html += '<td>';
        html += `<div class="pixel-index">${pixelIndex}</div>`;
        html += fireIntensity;
        html += '</td>';
      } else {
        const color = fireColorsPalette[fireIntensity];
        const colorString = `${color.r},${color.g},${color.b}`;
        html += `<td class="pixel" style="background-color:rgb(${colorString})">`;
        html += '</td>';
      }
    }

    html += '</tr>';
  }

  html += '</table>';
  document.querySelector('#fireCanvas').innerHTML = html;
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;

      updateFireIntensityPixel(pixelIndex);
    }
  }

  renderFire();
}

function createFireSource() {
  for (let column = 0; column < fireWidth; column++) {
    const overflowPixelIndex = fireHeight * fireWidth;
    const pixelIndex = (overflowPixelIndex - fireWidth) + column;

    firePixelArray[pixelIndex] = 36;
  }
}

start();
