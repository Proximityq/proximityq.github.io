/*
* Title: Project 2
* Author: Katie Schantz
* Date: March 5, 2026
* Simple Description: Experimental Clock
* Instructions: Click mouse to rotate the hourglass and reset it and press any key to break it.
*/

let duration = 60 * 1000; // 60000 milliseconds = 1 minute
let startTime;

// hourglass rotation angles
let currentAngle = 0; 
let targetAngle = 0;  

// falling sand particles
let grains = []; 

// color swap
let topColor;
let bottomColor;

let isBroken = false; // new state

let sandFillHeight = 300; // starts at the bottom

function setup() {
  createCanvas(600, 600);
  startTime = millis(); // time starts at 60000 millis

  topColor = color(255, 0, 0);   // initial red
  bottomColor = color(0, 0, 255); // initial blue
}

function draw() {
  background(255,255,0);
  currentAngle = lerp(currentAngle, targetAngle, 0.1);

  let timeElapsed = millis() - startTime; // subtract elapsed millis from start time (60000 millis)
  let sandRatio = min(timeElapsed / duration, 1);

  translate(width / 2, height / 2);
  rotate(currentAngle);
  
  // only drop sand if rotation is close to being done
  if (abs(currentAngle - targetAngle) < 0.1 && sandRatio < 1) {
    grains.push({ x: random(-2, 2), y: 0, speed: random(2, 5) });
  }

  // SAND & GRAIN LOGIC
  if (!isBroken) {
    
   // hourglass background
   fill(255);
   noStroke();
   triangle(-100, -100, 100, -100, 0, 0); 
   triangle(-100, 100, 100, 100, 0, 0);
    
    sand(sandRatio); // load sand
    
    fill(bottomColor);
    noStroke();
    
    // grain falling logic
    let bottomLevelY = lerp(100, 0, sandRatio);
    for (let i = grains.length - 1; i >= 0; i--) {
      let g = grains[i];
      ellipse(g.x, g.y, 3, 3);
      g.y += g.speed;
      if (g.y > bottomLevelY) {
        grains.splice(i, 1);
      }
    }
    
    hourglass(); // load hourglass
    
  } else {
    
    // draw the rising sand
    fill(bottomColor);
    noStroke();
    quad(-300, 300, 300, 300, 300, sandFillHeight, -300, sandFillHeight);

    // slowly raise the sand level until it hits the top
    if (sandFillHeight > -300) {
      sandFillHeight -= 0.01; // fill speed
    }

    // spawn falling grains
    if (frameCount % 2 == 0) { 
      grains.push({ 
        x: random(-80, 80), 
        y: -300,             
        speed: random(4, 7)
      });
    }

    // update grains
    for (let i = grains.length - 1; i >= 0; i--) {
      let g = grains[i];
      fill(bottomColor);
      ellipse(g.x, g.y, 4, 4);

      // grain funnel effect
      if (g.y < 0) {
        g.x = lerp(g.x, 0, 0.05); 
      }
      
      g.y += g.speed; 
      
      // if grains hit the rising sand level remove them
      if (g.y > sandFillHeight) { 
        grains.splice(i, 1);
      }
    }
  
  drawX(); // load X
    
  }
}

function drawX() {
  
  // broken hourglass
  stroke(0);
  strokeWeight(5);
  line(-100, -100, 100, 100);
  line(100, -100, -100, 100);
}

function hourglass() {
  
  // hourglass
  noFill();
  stroke(0);
  strokeWeight(5);
  strokeJoin(ROUND); 
  triangle(-100, -100, 100, -100, 0, 0); 
  triangle(-100, 100, 100, 100, 0, 0);   
}

function sand(sandRatio) {
  noStroke();
  
  // top sand 
  fill(topColor);
  let topLevelY = lerp(-100, 0, sandRatio); 
  let leftX = lerp(-100, 0, sandRatio);
  let rightX = lerp(100, 0, sandRatio);
  // dissapearing pile of sand
  quad(leftX, topLevelY, rightX, topLevelY, 0, 0, 0, 0);
  
  // bottom sand 
  fill(bottomColor);
  let botLevelY = lerp(100, 0, sandRatio);
  let bLeftX = lerp(-100, 0, sandRatio);
  let bRightX = lerp(100, 0, sandRatio);
  // growing pile of sand
  quad(-100, 100, 100, 100, bRightX, botLevelY, bLeftX, botLevelY);
}

function mouseClicked() { // on click rotate hourglass
  if (!isBroken) { // dont allow users to click the screen when hourglass is broken
    startTime = millis(); // reset timer when clicked
    grains = []; // clear existing grains

    // flip 360 degrees
    targetAngle += PI*2;

    // swap colors 
     let tempColor = topColor;
     topColor = bottomColor;
     bottomColor = tempColor;
  }
}

function keyPressed() { // on any key press break hourglass
  if (!isBroken) { // dont allow users to press keys when hourglass is broken
    isBroken = true; // change to broken state
    grains = []; // clear existing grains

  }
}
