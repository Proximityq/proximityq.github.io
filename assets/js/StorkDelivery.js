/*
 * Title: Project 4
 * Author: Katie Schantz
 * Date:  April 18, 2026
 * Description: You are a stork who is tasked in collecting cloud children 
 * and air dropping them onto houses.
 * Instructions: Move mouse to control Stork movement, press 'space bar' to drop babies.
 *
 */

let sceneNum = 0; // scene to start on

// buttons
let startButton;
let menuButton;
let playAgainButton;

let stork1;
let houses = []; // houses array
let fallingBabies = []; // baby array
let clouds = []; // cloud array
let portal;      

let babyInventory = 0;
let collectionTimer = 5; // 5 seconds
let startTime;


let score = 0; // score starts at 0
let lives = 3; // lives start at 3

// images
let storkImg;
let cloudImg;
let babyImg;
let house1Img;
let titleBackground;
let collectionBackground;
let deliveryBackground;

function preload() { // load images
  storkImg = loadImage('assets/stork.gif');
  cloudImg = loadImage('assets/cloud.gif');
  babyImg = loadImage('assets/baby.gif');
  house1Img = loadImage('assets/house1.gif');
  titleBackground = loadImage('assets/title_background.gif');
  collectionBackground = loadImage('assets/collection_background.gif');
  deliveryBackground = loadImage('assets/delivery_background.gif');
}

function setup() {
  createCanvas(800, 800);
  
  // start button
  startButton = createButton('Start Game');
  startButton.position(275, 650);
  startButton.size(250, 100);
  startButton.style("font-size", "30px");
  startButton.mousePressed(startCollectionPhase); // start game with collection phase
  // menu button
  menuButton = createButton('Menu');
  menuButton.position(720, 20);
  menuButton.mousePressed(changeSceneMenu);
  // play again button
  playAgainButton = createButton('Play Again');
  playAgainButton.position(325, 500);
  playAgainButton.size(150, 50);
  playAgainButton.mousePressed(startCollectionPhase);
  
  rectMode(CENTER);
  imageMode(CENTER);
  resetGame();
  
  // stork
  stork1 = new Stork(650,150);
}

function draw() { // scene handling
  switch (sceneNum) {
    case 0: menuScene(); break; // menu
    case 1: gameScene(); break; // delivery phase
    case 2: gameOverScene(); break; // game over
    case 3: collectScene(); break; // collection phase
  }
}


function hideAllButtons() { // hide all buttons
  startButton.hide();
  menuButton.hide();
  playAgainButton.hide();
}

function changeSceneGame() {
  resetGame(); // reset scores and obj pos
  sceneNum = 1; // change scene to game on button press
  startButton.hide(); // hide start button when in game
}

function changeSceneMenu() {
  sceneNum = 0; // change scene to menu scene button press
}

function startCollectionPhase() {
  sceneNum = 3;
  startTime = millis(); // record start time
  babyInventory = 0;
  clouds = [];
  portal = null;
}

function menuScene() { // menu scene
  resetGame();
  background(220);
  image(titleBackground,400,400);
  textAlign(CENTER);
  textSize(72);
  textStyle(BOLD);
  fill(0);
  text('Stork Delivery', width/2, 150);
  startButton.show();
  playAgainButton.hide();  
}

function collectScene() { // collection phase
  background(100, 180, 255);
  image(collectionBackground, 400, 400);
  hideAllButtons();
  menuButton.show();
  
  // timer
  let elapsed = (millis() - startTime) / 1000;
  let remaining = max(0, ceil(collectionTimer - elapsed));

  // spawn clouds randomly
  if (remaining > 0 && frameCount % 50 === 0) {
    clouds.push(new Cloud());
  }

  // clouds
  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].display();
    if (stork1.checkCollision(clouds[i])) {
      babyInventory++;
      clouds.splice(i, 1);
    }
  }

  // when time runs out portal spawns
  if (remaining <= 0) {
    if (!portal) portal = new Portal(width/2, height/2);
    portal.display();
    if (stork1.checkCollision(portal)) {
      sceneNum = 1; // change to deliver scene
    }
    fill(0);
    text("ENTER THE PORTAL!", width/2, height/2 - 60);
  }
  
  // text
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text("Collect Babies From Clouds!", width/2, 40);
  fill(255,0,0);
  text("Time: " + remaining, width/2, 70);
  fill(0);
  text("Babies Collected: " + babyInventory, width/2, 100);
  
  stork1.show();
  stork1.move();
}

function gameScene() {
  hideAllButtons();
  menuButton.show();
  background(153, 230, 255);
  image(deliveryBackground, 400, 400);

  textAlign(LEFT);
  textSize(20);
  fill(0);
  text("Score: " + score, 20, 40);
  text("Lives: " + lives, 20, 70);
  fill(200, 0, 0);
  text("Babies Left: " + babyInventory, 20, 100);
  
  // houses and stork
  for (let h of houses) { h.move(); h.show(); }
  stork1.show();
  stork1.move();
  
  // if user out of babies, spawn return portal
  if (babyInventory <= 0 && fallingBabies.length === 0) {
    if (!portal) portal = new Portal(width - 100, 150);
    portal.display();
    textAlign(CENTER);
    text("OUT OF BABIES! RETURN TO PORTAL", width/2, 250);
    if (stork1.checkCollision(portal)) {
      startCollectionPhase();
    }
  } else {
    portal = null; // no portal if stork has babies
  }

  // falling babies logic
  for (let i = fallingBabies.length - 1; i >= 0; i--) {
    let baby = fallingBabies[i];
    baby.update();
    baby.display();

    for (let h of houses) {
      if (h.checkCollision(baby)) {
        score++;
        fallingBabies.splice(i, 1);
        return; 
      }
    }
    if (baby.y > height) {
      lives--;
      fallingBabies.splice(i, 1);
      if (lives <= 0) sceneNum = 2;
    }
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  fallingBabies = [];
  babyInventory = 0;
  houses = [
    new House(random(50,100), 715),
    new House(random(250,300), 715),
    new House(random(450,500), 715),
    new House(random(650,700), 715)
  ];
  stork1 = new Stork(width/2, 150);
}

function gameOverScene() { // scene to show when you run out of lives
  resetGame();
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(50);
  text("You've been fired!", width / 2, height / 2);
  fill(255);
  textSize(25);
  text("Final Score: " + score, width / 2, height / 2 + 50);
  menuButton.show();
  playAgainButton.show();  
}

function keyPressed() { // when spacebar pressed make baby fall 
  if (key === ' ' && sceneNum === 1 && babyInventory > 0) { 
    fallingBabies.push(new Baby(stork1.storkX - 80, stork1.storkY));
    babyInventory--; // subtract from baby pool once button pressed
  }
}

class Cloud {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(100, height - 200);
    this.w = 80;
    this.h = 50;
  }
  display() {
    image(cloudImg, this.x + 10, this.y,);
  }
}

class Portal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.angle = 0;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noFill();
    strokeWeight(8);
    stroke(150, 0, 255);
    ellipse(0, 0, this.size, this.size / 2);
    this.angle += 0.1;
    pop();
  }
}

class House {
  constructor(x, y, c) {
    this.houseX = x;
    this.houseY = y;
    this.houseC = c;
    this.w = 100;
    this.h = 100;
  }
  move() {
    this.houseX += 1;
    if (this.houseX > width + 50) this.houseX = -50;
  }
  show() {
    image(house1Img, this.houseX, this.houseY, this.w, this.h);
  }
  checkCollision(baby) {
    return (baby.x > this.houseX - this.w/2 && 
            baby.x < this.houseX + this.w/2 && 
            baby.y > this.houseY - this.h/2 && 
            baby.y < this.houseY + this.h/2);
  }
}

class Stork {
  constructor(x, y) {
    this.storkX = x;
    this.storkY = y;
  }
  move() { 
    this.storkX = lerp(this.storkX, mouseX, 0.1); // x movement based on mouse x pos
    this.storkY = lerp(this.storkY, mouseY, 0.1); //y movement based on mouse y pos
  }
  show() {
    image(storkImg, this.storkX, this.storkY);
  }
  // collision check for clouds and portals
  checkCollision(obj) {
    let d = dist(this.storkX, this.storkY, obj.x, obj.y);
    return d < 60; 
  }
}

class Baby {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 6;
  }
  update() { this.y += this.speed; }
  display() {
    image(babyImg, this.x, this.y);
  }
}