var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400, 400, 100, 100);




// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 100);
// c.lineTo(300, 600);
// c.strokeStyle = "yellow";
// c.stroke();

// Arc / Circle


// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = getRandomColor();
//   c.stroke();
// }

  // c.beginPath();
  // c.arc(200, 200, 30, 0, Math.PI * 2, false);
  // c.strokeStyle = getRandomColor();
  // c.stroke();
var mouse = {
  x: undefined,
  y: undefined,
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
  '#364751',
  '#738D9C',
  '#F4EEE2',
  '#354751',
  '#F56E6B',
]

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.colour = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = getRandomColor();

    c.fillStyle = this.colour;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if(this.radius < maxRadius)
      this.radius += 1;
    }

    else if (this.radius > this.minRadius){
      this.radius -= 1;

    }

    this.draw();
  }
}


var circleArray = [];


function init() {
  circleArray = []
  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;

    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;
    // var colour = getRandomColor();
    // var colour = colorArray[Math.floor(Math.random() * colorArray.length)];
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();

animate();
