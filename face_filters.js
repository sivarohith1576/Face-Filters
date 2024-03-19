let outputWidth;
let outputHeight;

let faceTracker; // Face Tracking
let videoInput;

let imgSpidermanMask; 
let ironman, capitanMask;
let imgDogEarRight, imgDogEarLeft, imgDogNose; // Dog Face Filter
let rabbitLeftEar, rabbitRightEar, rabbitNose;
let catLeftEar, catRightEar, catNose;
let devil_left_horn, devil_right_horn; // devil filter
let sunglass1, sunglass2, sunglass3; // sunglass filter
let mustache;
let women_hair1;
let beard_img;
let hat_img1, hat_img2, crown_img1, crown_img2;
let emoji1, emoji2, emoji3, emoji4, emoji5;

var balloon1, balloon2, balloon3, balloon4, balloon5;
let decoration1, decoration2, decoration3, birthday_hat;

let thugLifeSpects, thuglifename, thuglifechain, cigarette, swag_spects;

let selected = -1; // Default no filter
let button;


let recording = false;
let recorder;
let chunks = [];

let bg1, bg2, bg3, frames;

// taken from pr.js docs
var x, y;
const fr = 30;

function record() {
  chunks.length = 0;
  let stream = document.querySelector('canvas').captureStream(fr);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
}

function exportVideo(e) {
  var blob = new Blob(chunks, { 'type': 'video/webm' });
  // Download the video 
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'newVid.webm';
  a.click();
  window.URL.revokeObjectURL(url);
  chunks.length = 0;
}

/*
* **p5.js** library automatically executes the `preload()` function. Basically, it is used to load external files. In our case, we'll use it to load the images for our filters and assign them to separate variables for later use.
*/
function preload() {
  ironman = loadImage('Images/ironman.png')
  capitanMask = loadImage('Images/capitan_america.png')
  imgSpidermanMask = loadImage("Images/spider_man.png");

  rabbitLeftEar = loadImage("Images/rabbit_left_ear.png");
  rabbitRightEar = loadImage("Images/rabbit_right_ear.png");
  rabbitNose = loadImage("Images/rabbit_nose.png");
  
  imgDogEarRight = loadImage("Images/dog_right_ear.png");
  imgDogEarLeft = loadImage("Images/dog_left_ear.png");
  imgDogNose = loadImage("Images/dog_nose.png");

  catLeftEar = loadImage("Images/cat_left_ear.png");
  catRightEar = loadImage("Images/cat_right_ear.png");
  catNose = loadImage("Images/cat_nose.png");

  
  devil_left_horn = loadImage('Images/devil_left_horn.png');
  devil_right_horn = loadImage('Images/devil_right_horn.png');

  sunglass1 = loadImage('Images/sunglass_1.png');
  sunglass2 = loadImage('Images/sunglass_2.png');
  sunglass3 = loadImage('Images/sunglass_3.png');

  hat_img1 = loadImage('Images/hat1.png');
  hat_img2 = loadImage('Images/hat2.png');

  
  balloon1 = loadImage('Images/balloon1.png');
  balloon2 = loadImage('Images/balloon2.png');
  balloon3 = loadImage('Images/balloon3.png');
  balloon4 = loadImage('Images/balloon4.png');
  balloon5 = loadImage('Images/balloon5.png');

  decoration1 = loadImage('Images/wishes.png');
  decoration2 = loadImage('Images/noise.png');
  swag_spects = loadImage('Images/swag_spects.png');
  birthday_hat = loadImage('Images/birthday_hat.png')
  crown_img1 = loadImage('Images/crown.png');
  crown_img2 = loadImage('Images/crown2.png');

  thugLifeSpects = loadImage('Images/thuglife.png');
  thuglifename = loadImage('Images/thuglifename.png');
  thuglifechain = loadImage('Images/thuglifechain.png');
  cigarette = loadImage('Images/thuglifecigarette.png');

  emoji1 = loadImage('Images/emoji1.png');
  emoji2 = loadImage('Images/emoji2.png');
  emoji3 = loadImage('Images/emoji3.png');
  emoji4 = loadImage('Images/emoji4.png');
  emoji5 = loadImage('Images/emoji5.png');

  bg1 = loadImage('Images/bg1.png');
  bg2 = loadImage('Images/frame1.png');
  bg3 = loadImage('Images/frame2.png');
  frames = 0;
}

/** 
 ** In p5.js, `setup()` function is executed at the beginning of our program, but after the `preload()` function.**
*/

function setup() {
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1.0);
  outputWidth = maxWidth * 0.9;
  outputHeight = maxWidth * 0.6;
  canvas = createCanvas(outputWidth, outputHeight);
  background(255);
  frameRate(fr);
  record();
  x = width / 2;
  y = height;

  videoInput = createCapture(VIDEO);
  videoInput.size(outputWidth, outputHeight);
  videoInput.hide();
  button = createButton('Take Photo');
  btn2 = createButton('Video record')
  btn2.mousePressed(videoRecord);
  button.mousePressed(takesnap); 
  btn2.addClass("button1")
  button.addClass("button1")
  button.style("margin-left", "30%")
  button.style("margin-top", "-3%")
  btn2.style("margin-left", "55%")
  btn2.style("margin-top", "-5%")

  // tracker
  faceTracker = new clm.tracker();
  faceTracker.init();
  faceTracker.start(videoInput.elt);

  colorMode(HSB);

}

function selectFrame() {
  frames = (frames + 1) % 4;
}


function takesnap() {
  saveCanvas(canvas, 'myCanvas', 'png');
}

let value;
function applyFilter(id) {
  var x = document.getElementById(id);
  var i = x.selectedIndex;
  value = x.options[i].value;
}

/*
 * In p5.js, draw() function is executed after setup(). This function runs inside a loop until the program is stopped.
*/


function draw() {
  img = image(videoInput, 0, 0, outputWidth, outputHeight);
  if (frames == 1) {
    image(bg1, 0, 0, outputWidth, outputHeight);
  }
  else if (frames == 2) {
    image(bg2, 0, 0, outputWidth, outputHeight);
  }
  else if (frames == 3) {
    image(bg3, 0, 0, outputWidth, outputHeight);
  }
  switch (value) {
    case '0': break;
    case '1': drawSpidermanMask(); break;
    case '2': IronMan(); break;
    case '3': CapitanAmericaMask(); break;
    case '4': break;
    case '5': drawDogFace(); break;
    case '6': drawCatFace(); break;
    case '7': drawRabbitFace(); break;
    case '8': break;
    case '9': sunGlass(sunglass1); break;
    case '10': sunGlass(sunglass2); break;
    case '11': sunGlass(sunglass3); break;
    case '12': break;
    case '13': Hat(hat_img1); break;
    case '14': break;
    case '15': Crown(crown_img1); break;
    case '16': break;
    case '17': funemoji2(); drawfunemoji3(); drawfunemoji1(); break;
    case '18': Party(); sunGlass(swag_spects); break;
    case '19': ThugLife(); sunGlass(thugLifeSpects); break;
    case '20': break;
    case '21': devilHorns(); break;
    case '22': break;
    case '23': FacialLandmarks(); break;
    case '24': Magician_hat(); break;
    case '25': PrinceCrown(); break;
    case '26': break;
    case '27': FaceEmoji(emoji4); break;
    case '28': FaceEmoji(emoji5); break;
  }
}

function FaceEmoji(img) {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1;
    const wy = Math.abs((positions[62][1] - positions[33][1])) * 4;
    translate(-wx * 0.45, -wy * 0.65);
    image(img, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function PrinceCrown() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.2;
    const wy = Math.abs((positions[62][1] - positions[33][1])) * 2.38;
    translate(-wx / 2, -wy * 2.125);
    image(crown_img2, positions[62][0], positions[62][1], wx, wy);

    pop();
  }
}

function Magician_hat() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.25;
    const wy = Math.abs((positions[62][1] - positions[33][1])) * 3.75;
    translate(-wx * 0.5, -wy * 1.75);
    image(hat_img2, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function IronMan() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]);
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.4;
    translate(-wx / 2, -wy * 0.6);
    image(ironman, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function FacialLandmarks() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    for (let i = 0; i < positions.length; i++) {
      fill(map(i, 0, positions.length, 0, 360), 50, 100);
      ellipse(positions[i][0], positions[i][1], 4, 4);
    }
  }
}

function Beard() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[1][0] - positions[13][0]);
    const wy = Math.abs(min(positions[1][1], positions[13][1]) - positions[7][1]);
    translate(-wx / 2, -wy / 4);
    image(beard_img, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function CapitanAmericaMask() {
  let positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.3;
    const wy = Math.abs(positions[62][1] - positions[33][1]) * 3.5;
    translate(-wx / 2, -wy * 0.95)
    image(capitanMask, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function drawfunemoji1() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 3.5; 
    const wy = Math.abs((positions[62][1] - positions[33][1])) * 4.0;
    translate(-wx / 2, -wy * 1.3);
    image(emoji3, positions[62][0], positions[62][1], wx, wy); 
    pop();
  }
}

function funemoji2() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[44][0] - positions[50][0]) * 3.8;
    const wy = Math.abs((positions[62][1] - positions[47][1])) * 5.6; 
    translate(-wx / 2, -wy * 0.25);
    image(emoji2, positions[62][0], positions[62][1], wx, wy);

    pop();
  }
}

function drawfunemoji3() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[35][0] - positions[39][0]) * 4.1;
    const wy = Math.abs((positions[62][1] - positions[41][1])) * 5.7; 
    translate(-wx / 2, -wy * 0.5);
    image(emoji1, positions[62][0], positions[62][1], wx, wy); 
    pop();
  }
}

function ThugLife() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[1][0] - positions[13][0]);
    image(cigarette, positions[62][0], positions[62][1] + 30);
    translate(-wx / 2, +wx / 3);
    image(thuglifechain, positions[62][0], positions[62][1], wx, wx / 1.5);
    translate(-wx, 0);
    image(thuglifename, positions[62][0], positions[62][1]);
    pop();
  }
}

function Hair(img) {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.7;
    const wy = Math.abs(positions[33][1] - positions[62][1]) * 4.5;
    translate(-wx * 0.5, -wy * 0.9)
    image(img, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function Party() {
  const positions = faceTracker.getCurrentPosition();
  push();
  image(balloon3, 0, 0, 250, 250);
  image(decoration1, outputWidth * 0.30, 0, outputWidth * 0.50, 100);
  if (positions !== false) {
    image(decoration2, positions[62][0], positions[62][1] + 20);
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.1; 
    const wy = Math.abs(positions[62][1], positions[33][1]) * 0.6; 
    translate(-wx / 2, -wy * (1.6));
    image(birthday_hat, positions[62][0], positions[62][1], wx, wy);
  }
  pop();
}

function Hat(img) {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 1.6;
    const wy = Math.abs(positions[62][1] - positions[33][1]) * 2.3;
    translate(-wx / 2, -wy * 2.2);
    image(img, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function Crown(img) {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    let wx = Math.abs(positions[0][0] - positions[14][0]) * 1.3;
    let wy = Math.abs(positions[62][1] - positions[33][1]) * 2.0;
    translate(-wx / 2 - 5, -wy * 2.2);
    image(img, positions[62][0], positions[62][1], wx, wy);
    pop();
  }
}

function drawSpidermanMask() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2;
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; 
    translate(-wx / 2, -wy / 2);
    image(imgSpidermanMask, positions[62][0], positions[62][1], wx, wy); 
    pop();
  }
}

function Mustache() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[44][0] - positions[50][0]) * 2;
    const wy = Math.abs(positions[62][1] - positions[37][1]) * 2;
    translate(0, 0);
    translate(-wx / 2, +wy / 2);
    image(mustache, positions[62][0], positions[62][1], wx, wy); 
    pop();
  }
}

function sunGlass(img) {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    push();
    const wx = Math.abs(positions[0][0] - positions[14][0]) * 0.9; 
    const wy = Math.abs(positions[62][1] - positions[33][1]) * 0.9;
    translate(-(1 * wx) / 2, -wy - 12);
    image(img, positions[62][0], positions[62][1], wx, wy); 
    pop();
  }
}

function drawDogFace() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    if (positions.length >= 20) {
      push();
      translate(-100, -150); 
      image(imgDogEarRight, positions[20][0], positions[20][1]);
      pop();
    }

    if (positions.length >= 16) {
      push();
      translate(-20, -150); 
      image(imgDogEarLeft, positions[16][0], positions[16][1]);
      pop();
    }

    if (positions.length >= 62) {
      push();
      translate(-57, -20);
      image(imgDogNose, positions[62][0], positions[62][1]);
      pop();
    }
  }
}

function drawRabbitFace() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    if (positions.length >= 20) {
      push();
      translate(-100, -170);
      image(rabbitLeftEar, positions[20][0], positions[20][1]);
      pop();
    }

    if (positions.length >= 16) {
      push();
      translate(-20, -170);
      image(rabbitRightEar, positions[16][0], positions[16][1]);
      pop();
    }

    if (positions.length >= 62) {
      push();
      const wx = Math.abs(positions[35][0] - positions[39][0]) * 2;
      const wy = Math.abs(positions[62][1] - positions[41][1]) * 2;
      translate(-57, 0); 
      image(rabbitNose, positions[62][0], positions[62][1], wx, wy);
      pop();
    }
  }
}

function drawCatFace() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    if (positions.length >= 20) {
      push();
      translate(-70, -150);
      image(catLeftEar, positions[20][0], positions[20][1]);
      pop();
    }

    if (positions.length >= 16) {
      push();
      translate(-20, -150); 
      image(catRightEar, positions[16][0], positions[16][1]);
      pop();
    }

    if (positions.length >= 62) {
      push();
      const wx = Math.abs(positions[44][0] - positions[50][0]) * 2;
      const wy = Math.abs(positions[62][1] - positions[41][1]) * 2;
      translate(-67, -20);
      image(catNose, positions[62][0], positions[62][1], wx, wy);
      pop();
    }
  }
}

function devilHorns() {
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false) {
    if (positions.length >= 20) {
      push();
      translate(-100, -150); 
      image(devil_left_horn, positions[20][0], positions[20][1]);
      pop();
    }

    if (positions.length >= 16) {
      push();
      translate(-20, -150);
      image(devil_right_horn, positions[16][0], positions[16][1]);
      pop();
    }
  }
}

function windowResized() {
  const maxWidth = Math.min(wi6ndowWidth, windowHeight);
  pixelDensity(1);
  outputWidth = maxWidth;
  outputHeight = maxWidth * 0.75;
  resizeCanvas(outputWidth, outputHeight);
}

function videoRecord() {
  recording = !recording
  // if recording now true, start recording 
  if (recording) {
    recorder.start();
  }
  // if we are recording, stop recording 
  if (!recording) {
    recorder.stop();
  }
}