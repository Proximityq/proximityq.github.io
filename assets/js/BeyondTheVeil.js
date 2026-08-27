/*
 * Title: Beyond The Veil
 * Author: Katie Schantz
 * Date:  April 19, 2026
 * Description: You are hunting deer in a forest or are you?
 * Instructions: Move mouse to aim crosshair, click to shoot.
 */

/* CRIT FEEDBACK
add ramping difficulty - "runway" (make only one deer spawn then after 4 seconds more deer spawn), maybe make UI bigger or not make everything happen so low on the screen, make menu flashing no so frequent, add an ending - the deer start shooting you or after so much time you die (somehow sticking with the theme of player never gets to 'win' technically), make deer dissapear slower, add morphing animation when deer turns into soldier
 */

let sceneNum = 0; // scene to start on

// Game Variables
let score = 0;
let mistakes = 0;
const MAX_MISTAKES = 3;
let gameStartTime;

// Assets
let targets = [];
let spawnRate = 60; 
let flashRed = 0;

// Buttons
let startButton, endButton, menuButton;

// Sound & Images
let imgDeer, imgForest, imgCorpse, imgMenu, imgEnd, imgSoldier, imgDeath;
let warAmbience, forestAmbience, shotNoise;

function preload() {
  imgMenu = loadImage('assets/menu_background.gif');
  imgDeer = loadImage('assets/deer.gif');
  imgCorpse = loadImage('assets/deer_corpse.png');
  imgSoldier = loadImage('assets/soldier.gif');
  imgForest = loadImage('assets/forest.gif');
  imgDeath = loadImage('assets/deer_corpse.png');
  imgEnd = loadImage('assets/gameover_background.png');
  
  warAmbience = loadSound('assets/war_ambience.mp3');
  forestAmbience = loadSound('assets/forest_ambience.mp3');
  shotNoise = loadSound('assets/shot.mp3');
}

// --- Setup & Draw ---

function setup() {
  let canvas = createCanvas(960, 720);
  canvas.parent('canvas-container');
  
  cursor();
  
  // Set initial volumes
  forestAmbience.setVolume(0.1);
  warAmbience.setVolume(0.1);
  shotNoise.setVolume(0.1);
  
  imageMode(CENTER);
  
  // Buttons
  startButton = createButton('PLAY');
  startButton.parent('canvas-container');
  startButton.position(width/2, height/2 + 100);
  startButton.size(200, 75);
  startButton.style("font-size", "30px");
  startButton.mousePressed(changeSceneGame);

  endButton = createButton('END');
  endButton.parent('canvas-container');
  endButton.position(width/2 + 465, height/2 - 195);
  endButton.size(100, 50);
  endButton.style("font-size", "18px");
  endButton.mousePressed(changeSceneEnd);

  menuButton = createButton('MENU');
  menuButton.parent('canvas-container');
  menuButton.position(width/2 + 465, height/2 - 250);
  menuButton.size(100, 50);
  menuButton.style("font-size", "18px");
  menuButton.mousePressed(changeSceneMenu);
}

function draw() {
   switch (sceneNum) {
      case 0: menuScene(); break; 
      case 1: gameScene(); break; 
      case 2: gameOverScene(); break;
   }
}

// --- Scene Logic ---

function changeSceneGame() {
  resetGame(); 
  sceneNum = 1; 
  
  // Start Game Music
  warAmbience.stop();
  forestAmbience.loop(); 
}

function changeSceneEnd() { 
  sceneNum = 2; 
  cursor();
  
  // Start End Music
  forestAmbience.stop();
  warAmbience.loop();
}

function changeSceneMenu(){
  resetGame(); 
  sceneNum = 0;
  startButton.show();
  cursor();
  
  // Stop Music
  forestAmbience.stop();
  warAmbience.stop();
}

// --- Screens & UI ---

function menuScene() {
  menuButton.hide();
  endButton.hide();
  
  background(20);
  image(imgMenu, width/2, height/2);
  
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0, 0, 0, 150);
  rect(width/2 - 285, height/2 - 95, 550, 80);
  fill(255);
  textSize(50);
  text("BEYOND THE VEIL", width/2, height/2 - 50);
}

function gameScene() { 
  noCursor();
  
  endButton.show();
  menuButton.show();
  startButton.hide();
  
  image(imgForest, width/2, height/2);

  for (let i = targets.length - 1; i >= 0; i--) {
    targets[i].update();
    targets[i].display();
    if (targets[i].isExpired) targets.splice(i, 1);
  }

  if (frameCount % spawnRate === 0) {
    trySpawnTarget();
  }

  drawUI();
  drawCrosshair();
  handleFlash();
}

function gameOverScene() {
  endButton.hide();
  image(imgEnd, width/2, height/2);
  
  if (frameCount % 10 < 5) {
    background(40, 35, 30, 50);
  } else {
    background(15, 25, 15, 50);
  }
  for (let i = 0; i < 400; i++) {
    stroke(255, random(30));
    point(random(width), random(height));
  }
  
  noStroke();
  fill(0, 0, 0, 150);
  rect(width/2 - 275, height/2 - 300, 550, 125);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(30);
  text("There were no deer in these woods", width/2, 100);
  fill(255, 0, 0);
  text(`Confirmed Casualties: ${score/10}`, width/2, 140);
}

function resetGame() {
  score = 0;
  mistakes = 0;
  targets = [];
  gameStartTime = millis();
}

// --- Input Handling ---

function mousePressed() {
  // Enables Audio on user interaction
  userStartAudio();

  // Handle Shooting
  if (sceneNum === 1) {
    for (let i = targets.length - 1; i >= 0; i--) {
      if (targets[i].isClicked(mouseX, mouseY)) {
        shotNoise.play(); // Shot sound plays once per click
        
        score += 10; // Add to score
        
        if (targets[i].type === 'human') {
          mistakes++;
          flashRed = 255;
          
          if (mistakes >= MAX_MISTAKES && sceneNum !==2) {
            setTimeout(changeSceneEnd, 500);
          }
        }
        
        targets[i].isDead = true; 
        let currentTarget = targets[i];
        setTimeout(() => {
          let index = targets.indexOf(currentTarget);
          if (index > -1) targets.splice(index, 1);
        }, 1000); 
        break; 
      }
    }
  }
}

// --- Helper Functions ---

function drawUI() {
  fill(255);
  noStroke();
  textSize(16);
  textAlign(LEFT);
  text(`Targets Eliminated: ${score/10}`, 25, 40);
  text(`Sanity:`, 25, 65);
  for(let i = 0; i < MAX_MISTAKES; i++) {
    fill(i < mistakes ? color(255, 0, 0) : color(0, 255, 0));
    rect(80 + (i * 22), 58, 12, 12);
  }
}

function drawCrosshair() {
  push();
  
  // Create a jitter effect when mistakes are made
  // The more mistakes the larger the jitter
  let jitterX = mistakes > 0 ? random(-mistakes * 2, mistakes * 2) : 0;
  let jitterY = mistakes > 0 ? random(-mistakes * 2, mistakes * 2) : 0;
  
  translate(mouseX + jitterX, mouseY + jitterY);
  
  // Flicker the color as mistakes increase
  let flicker = mistakes > 1 ? random(150, 255) : 255;
  stroke(flicker, 0, 0, 200);
  strokeWeight(3);
  noFill();
  
  // Draw the crosshair
  ellipse(0, 0, 25, 25);
  line(-20, 0, 20, 0);
  line(0, -20, 0, 20);
  
  pop();
}

// --- Classes & Helpers ---

class Target {
  constructor(xPos) {
    this.x = xPos;
    this.y = 620;
    this.type = 'deer';
    this.spawnTime = millis();
    this.duration = 2000; // Entity duration
    this.morphTime = 800; // Time it takes to morph
    this.isExpired = false;
    this.isDead = false;
    this.hasMorphed = false;
    this.mirror = random() > 0.5 ? -1 : 1;

    // The chance for morphing deer spawns
    this.canMorph = random() < 0.3; 
  }
  
  update() {
    if (this.isDead) return;
    
    let elapsed = millis() - this.spawnTime;

    // If deer can morph check if its morphing time
    if (this.canMorph && !this.hasMorphed) {
      if (elapsed > this.morphTime) {
        this.type = 'human';
        this.hasMorphed = true;
      }
    }

    if (elapsed > this.duration) this.isExpired = true;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    scale(this.mirror, 1); // randomize which way target is facing
    
    if (this.isDead) {
      image(imgCorpse, 0, 0+25, imgCorpse.width * 2, imgCorpse.height * 2); 
    } else if (this.type === 'deer') {
      image(imgDeer, 0, 0-35, imgDeer.width * 2, imgDeer.height * 2);
    } else {
      image(imgSoldier, 0, 0-60, imgSoldier.width * 2, imgSoldier.height * 2);
    }
    pop();
  }
  
  isClicked(mx, my) {
  
  if (this.isDead) return false;

    let w, h, offsetY;

    if (this.type === 'deer') {
      w = imgDeer.width * 2;
      h = imgDeer.height * 2;
      offsetY = -35;
    } else {
      w = imgSoldier.width * 2;
      h = imgSoldier.height * 2;
      offsetY = -60;
    }

    let left = this.x - w / 2;
    let right = this.x + w / 2;
    let top = (this.y + offsetY) - h / 2;
    let bottom = (this.y + offsetY) + h / 2;

    return (mx > left && mx < right && my > top && my < bottom);
  }
}

function trySpawnTarget() {
  let attempts = 0;
  let minDistance = 150; 
  let foundSpot = false;
  let candidateX;

  while (!foundSpot && attempts < 20) {
    candidateX = random(90, 890);
    foundSpot = true;
    for (let t of targets) {
      if (abs(t.x - candidateX) < minDistance) {
        foundSpot = false;
        break;
      }
    }
    attempts++;
  }

  if (foundSpot) {
    // create new target without needing to calculate elapsed time
    targets.push(new Target(candidateX));
  }
}

function handleFlash() {
  if (flashRed > 0) {
    fill(255, 0, 0, flashRed);
    rect(0, 0, width, height);
    flashRed -= 10;
  }
}