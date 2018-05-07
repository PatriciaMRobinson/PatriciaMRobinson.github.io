let canvas = document.getElementById("paper");
let context = canvas.getContext("2d");

let walks = [];

canvas.addEventListener('mousedown', function(e) {
  var rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;
  
  var walk = {
    walkVX: 0,
    walkVY: 0,
    walkX: mouseX,
    walkY: mouseY,
    walkHue: Math.random()*360,
    letters:[]
  };
  walks.push(walk);
});

let letters = ["A", "C", "T", "G"];


function clamp(x, low, high) {
  return Math.max(low, Math.min(high, x)); 
}

function choose(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function step() {
  
  for (let w = 0; w < walks.length; w++) {
    let walk = walks[w];
    if (walk.letters.length > 50) continue;
    
    let letter = choose(letters);
  
    walk.walkVX += (Math.random()-0.5) * 4;
    walk.walkVY += (Math.random()-0.5) * 4;

    walk.walkX += walk.walkVX;
    walk.walkY += walk.walkVY;
    walk.walkHue += 1;
    walk.letters.push({
      x:walk.walkX,
      y:walk.walkY,
      letter:letter,
      hue:walk.walkHue,
      font:Math.abs(walk.walkVX)*10 + 'px Questrial',
    });
  }
}

function draw() {
  step();
  
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let w = 0; w < walks.length; w++) {
    let letters = walks[w].letters;
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      context.font = letter.font;
      context.fillStyle = 'hsl('+letter.hue+','+100+'%,50%)';
      context.fillText(letter.letter, letter.x, letter.y);
      
    }
  }

  requestAnimationFrame(draw);
}

draw();