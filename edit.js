const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = [];
let currentPath = [];
let canvas;
let width, height;
let outputWidth, outputHeight;

function preload() {
  img = loadImage('Images/default_bg.jpg');
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  const maxWidth = Math.min(width, height);
  outputWidth = maxWidth * 0.6;
  outputHeight = maxWidth * 0.6;
  canvas = createCanvas(outputWidth, outputHeight);
  canvas.addClass('Canvas');
  canvas.position(222, -22)


  input = createFileInput(handleFile);
  input.addClass('input');
  angleMode(DEGREES);

}

let eraseEnable = false;
let input;
let select_img;
var degree, xpt, ypt, i = 0;

function handleFile(file) {
  translate(0, 0); // the must be added because when we insert 
  rotate(0);  // into canvas first we should make it normal
  // even we make it normal after we should make i=0;
  i = 0;
  if (file.type === 'image') {
    select_img = createImg(file.data, '');
    select_img.hide();
  } else {
    select_img = null;
  }
}

function saveImage() {
  saveCanvas(canvas, 'Edited_image', 'png');
}
function Remove() {
  clear();
}

let value;

function addFilter() {
  var x = document.getElementById("filters");
  var i = x.selectedIndex;
  value = x.options[i].value;
}



function RotateCanvas() {
  i++;
}

function draw() {
  noFill();
  if (select_img) {
    degree = [0, 90, 180, 360];
    xpt = [0, outputWidth, outputWidth, 0];
    ypt = [0, 0, outputHeight, outputHeight];
    i = i % 4;
    translate(xpt[i], ypt[i]);
    rotate(degree[i])
    canvas.style("background-color", "rgb(70, 68, 68)");
    image(img, 0, 0, outputWidth, outputHeight);
    // above added image is for transparent images because
    // present image is copied, rotated and pasted again
    // which reshapes image in canvas.
    image(select_img, 0, 0, outputWidth, outputHeight);
  }
  switch (value) {
    case '0': break;
    case '1': filter(DILATE); break;
    case '2': filter(ERODE); break;
    case '3': filter(POSTERIZE, 4); break;
    case '4': filter(POSTERIZE, 2); break;
    case '5': filter(BLUR, 3); break;
    case '6': filter(BLUR, 12); break;
    case '7': filter(OPAQUE); break;

  }
  if (mouseIsPressed === true) {
    const point = {
      x: mouseX,
      y: mouseY,
      color: colorInput.value,
      weight: weight.value
    };
    currentPath.push(point);
  }

  paths.forEach(path => {
    beginShape();
    path.forEach(point => {
      stroke(point.color);
      strokeWeight(point.weight);
      vertex(point.x, point.y);
    });
    endShape();
  });
}

function mousePressed() {
  currentPath = [];
  paths.push(currentPath);
}

clear.addEventListener('click', () => {
  paths.splice(0);
  background(255);
});