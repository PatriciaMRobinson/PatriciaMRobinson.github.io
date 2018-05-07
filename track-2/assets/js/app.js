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
                  xv:Math.random()*10,
                  yv:Math.random(),
                  hue:Math.random()*360,
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
     if (particle.y > canvas.height) particle.y = 0;
     particles[i] = particle;
  }
}
// console.log(particles);

function draw() {
  stepParticles();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    context.beginPath();
    let x = particle.x;
    let y = particle.y;
    
    context.ellipse(particle.x, particle.y, particle.xRadius, particle.yRadius, particle.rotation, 0, 2 * Math.PI);

    // let gradient = context.createRadialGradient(x, y, 0, x+xRadius, y+yRadius, xRadius);
    // gradient.addColorStop(0, 'hsl('+(Math.random()*360)+',100%,50%)');
    // gradient.addColorStop(1, 'hsl('+(Math.random()*360)+',100%,50%)');
    // context.fillStyle = gradient;
    context.fillStyle = 'hsl('+particle.hue+',100%,50%)';
    context.fill();
  }
  
  context.font = '48px Kumar One Outline';
  
  for (let i = 1; i < 6; i++) {
    let distance = Math.abs(50*i - mouseY);
    distance = Math.max(0, distance);
    distance = Math.min(1000, distance);
    
    let hue        = i/6 * 360/2 + 180;
    let saturation = 100-distance;
    context.fillStyle = 'hsl('+hue+','+saturation+'%,50%)';
    context.fillText("Machines and Proteins", 10, 50*i);
  }
  
  requestAnimationFrame(draw);
}

draw();