let canvas = document.getElementById("paper");
let context = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

let particles = [];
for (let i = 0; i < 1000; i++) {
  particles.push({x:Math.random()*canvas.width,
                  y:Math.random()*canvas.width,
                  xv:Math.random()*-1,
                  yv:Math.random()*1,
                  hue:Math.random()*180+200,
                  xRadius:Math.random()*5,
                  yRadius:Math.random()*5,
                  rotation:Math.random()*2*Math.PI,
                 });
}

function stepParticles() {
   for (let i = 0; i < particles.length; i++) {
     let particle = particles[i];
     particle.x += particle.xv;
     particle.y += particle.yv;
     if (particle.x > canvas.width)  particle.x = 0;
     if (particle.y > canvas.height)  particle.y = 0;
     if (particle.x < 0) particle.x = canvas.width;
     if (particle.y < 0) particle.y = canvas.height;
     particles[i] = particle;
  }
}

function clamp(x, low, high) {
  return Math.max(low, Math.min(high, x)); 
}

function draw() {
  stepParticles();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    context.beginPath();
    let x = particle.x;
    let y = particle.y;
    
    let distance = Math.hypot(mouseX-x, mouseY-y);
    distance = clamp(distance, 0, 300);
    distance = 300-distance;
    let distance01 = distance/300;
    
    let radiusMult = distance01 * 20 + 1;
    
    context.ellipse(particle.x, particle.y, particle.xRadius*radiusMult, particle.yRadius*radiusMult, particle.rotation, 0, 2 * Math.PI);
  
    let saturation = distance01 * 100;
    context.fillStyle = 'hsl('+particle.hue+','+saturation+'%,50%)';
    context.strokeStyle = context.fillStyle;
    // context.fill();
    context.stroke();
  }

  requestAnimationFrame(draw);
}

draw();