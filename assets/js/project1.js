/*
* Title: Project 1
* Author: Katie Schantz
* Date: Feb 6, 2026
* Simple Description: Interactive Kirby
* Instructions: Move mouse up and down to change sky, move mouse left and right to change kirby,
* click mouse to change background objects.
*/

function setup() {
  createCanvas(600, 600);
  //backgroundRand = bgList[0];
  currentScene = int(random(0, 3)); // picks a random starting scene
  
}

function draw() {
  background(255); // white
  
  landscape(); // draw landscape and moving sun
  
  // randomize background objects when mouse clicked
  if (currentScene === 0) {
    clouds();
  } else if (currentScene === 1) {
    mountains();
  } else if (currentScene === 2) {
    tree();
  }
  grass(); // draw grass
  // draws kirby or kirby rock when mouse moves
  if (mouseX < 300) {
    kirbyRock();// draw kirbyRock when mouse on left side of screen
  } else {
    kirby(); // draw kirby when mouse on right side of screen
  }
  
}

function mousePressed(){
  
  currentScene = int(random(0, 3)); // randomize background objects when mouse clicked
}

function landscape(){
  colorMode(HSL);
  noStroke();
  let skyY = map(mouseY, 0, 600, 50, 10, true);
  fill(200, 100, skyY); // sky color
  rect(0,0, 600, 600); // sky
  
  colorMode(RGB);
  // sun
  fill(255, 238, 0);
  let sunY = map(mouseY, 0, 600, 300, 600, true);
  circle(300, mouseY, 500);
  
  
  
}

function clouds(){
 
  // clouds
  colorMode(RGB);
  fill(255);
  ellipse(100, 60, 150, 100)
  circle(90, 100, 100)
  circle(150, 60, 100)
  ellipse(400, 150, 150, 100)
  circle(420, 100, 100)
  ellipse(200, 260, 150, 100)
  circle(190, 200, 100)
  circle(250, 260, 100)
  
}

function tree(){
  
  // stars
  colorMode(RGB);
  fill(97, 74, 44);
  rect(0,0, 150, 600);
  fill(23, 77, 24);
  ellipse(200,0,250, 200);
  ellipse(50,0,200, 300);
  ellipse(150,0,200, 300);
  
}

function mountains(){
  
  // mountains
  colorMode(RGB);
  fill(141, 92, 153);
  rect(0,0,100,600);
  rect(250,0,100,600);
  rect(500,0,100,600);
  fill(86, 44, 97);
  rect(0,0,100,100)
  rect(0,250,100,100)
  rect(250,150,100,100)
  rect(500,0,100,100)
  rect(500,250,100,100)
  
}

function grass(){
  // grass
  fill(23, 163, 37); // green
  ellipse(300, 500, 800, 300);
  let shadowA = map(mouseY,0, 600, 255, 0, true); // when sun goes down make shadow less visable
  fill(15, 115, 25, shadowA);
  ellipse(300, 460, 400, 150); // shadow
}

function kirby(){
  colorMode(RGB);
  // Feet
  noStroke();
  fill(204, 45, 70);
  let feetR = map(mouseX, 300, 600, 300, 400, true);
  let feetL = map(mouseX, 300, 600, 300, 200, true);
  let feetW = map(mouseX, 300, 600, 100, 175, true);
  let feetY= map(mouseX, 300, 600, 375, 430, true);
  ellipse(feetL, feetY, feetW, 100); // left foot
  ellipse(feetR, feetY, feetW, 100); // right foot
  
  
  // Body
  noStroke();
  fill(255, 158, 173); // pink fill
  let bodyW = map(mouseX, 300, 600, 100, 300, true);
  circle(300, 300, bodyW);
  
  
  // Eyes
  // Eyeball
  //stroke(0);
  //strokeWeight(3);
  fill(41, 45, 158) // blue
  let eyeballR = map(mouseX, 300, 600, 300, 350, true);
  let eyeballL = map(mouseX, 300, 600, 300, 250, true);
  ellipse(eyeballL,240,50,90); // left eye
  ellipse(eyeballR,240,50,90); // right eye
  // Pupil
  noStroke();
  fill(0, 0 , 0) // black
  let pupilR = map(mouseX, 300, 600, 300, 350, true);
  let pupilL = map(mouseX, 300, 600, 300, 250, true);
  ellipse(pupilL,225,40,60);
  ellipse(pupilR,225,40,60);
  // Highlight
  //noStroke();
  fill(255, 255, 255) // white
  let highlightR = map(mouseX, 300, 600, 300, 350, true);
  let highlightL = map(mouseX, 300, 600, 300, 250, true);
  ellipse(highlightL,215,20,30);
  ellipse(highlightR,215,20,30);
  
  
  // Arms
  noStroke();
  fill(255, 158, 173); // pink fill
  let leftArmX = map(mouseX,300, 600,300,150,true);
  let rightArmX = map(mouseX, 300, 600, 300, 450, true);
  let kirbyArmsW = map(mouseX, 300, 600, 0, 150, true);
  circle(leftArmX, 350, kirbyArmsW); // left arm
  circle(rightArmX, 350, kirbyArmsW);// right arm

  
  // Blush
  //noStroke();
  fill(237, 121, 139);
  let blushR = map(mouseX, 300, 600, 300, 200, true);
  let blushL = map(mouseX, 300, 600, 300, 400, true);
  ellipse(blushR,310,60, 40); // right
  ellipse(blushL,310,60, 40); // left
  
  
  // Mouth
  //stroke(3);
  noStroke();
  fill(237, 121, 139);
  let mouthW = map(mouseX, 300, 600, 0, 70, true);
  circle(300, 300, mouthW);

}

function kirbyRock(){
  colorMode(RGB);
  // feet
  noStroke();
  fill(204, 45, 70); // red pink
  let rockleftfootX = map(mouseX, 0, 300, 170, 300, true);
  let rockleftfootW = map(mouseX, 0, 300, 220, 50, true);
  let rockrightfootX = map(mouseX, 0, 300, 420, 300, true);
  let rockrightfootW = map(mouseX, 0, 300, 220, 50, true);
  ellipse(rockleftfootX, 450, rockleftfootW, 120)
  ellipse(rockrightfootX, 450, rockrightfootW, 120)
  
  // body
  noStroke();
  fill(255, 158, 173); // pink
  let rockbodyW = map(mouseX, 0, 600, 300, 50, true);
  ellipse(300, 300, rockbodyW, 350)
  
  // arms
  noStroke();
  fill(255, 158, 173); // pink
  let rockleftArmX = map(mouseX,0,300,100,150,true);
  let rockrightArmX = map(mouseX, 0, 300, 100, 150, true);
  let rockleftArmW = map(mouseX, 0, 300, 150, 300, true);
  let rockrightArmW = map(mouseX, 0, 300, 450, 300, true);
  ellipse(rockleftArmW, 300, rockleftArmX, 150); // left 
  ellipse(rockrightArmW, 300, rockrightArmX, 150); // right 
  
  // eyes
  fill(0); // black
  let rockleftEyeX = map(mouseX,0,300,250,300,true);
  let rockrightEyeX = map(mouseX,0,300,350,300,true);
  ellipse(rockleftEyeX, 250, 50, 80); // left
  ellipse(rockrightEyeX, 250, 50, 80); // right
  
  // nose
  fill(212, 112, 127); // dark pink
  let rocknoseRectW = map(mouseX, 0, 300, 50, 0);
  let rocknoseRectX = map(mouseX, 0, 300, 275, 300);
  let rocknoseEllipseW = map(mouseX, 0, 300, 90, 0);
  rect(rocknoseRectX, 230, rocknoseRectW, 110) // nose bridge
  ellipse(300, 340, rocknoseEllipseW, 40) // nostrils
  
  // lips
  fill(212, 112, 127); // dark pink
  let rocklipsW = map(mouseX, 0, 300, 100, 10, true);
  ellipse(300, 400, rocklipsW, 40)
  // lips line
  stroke(0); // black
  strokeWeight(2);
  let rocklipline1X = map(mouseX, 0, 300, 250, 300, true);
  let rocklipline2X = map(mouseX, 0, 300, 350, 300, true);
  line(rocklipline1X, 400, rocklipline2X, 400);
  
  
  // eyebrows
  stroke(212, 112, 127); // dark pink
  strokeWeight(30);
  let rocklipsP1X = map(mouseX, 0, 300, 230, 300, true);
  let rocklipsP2X = map(mouseX, 0, 300, 280, 300, true);
  let rocklipsP3X = map(mouseX, 0, 300, 380, 300, true);
  let rocklipsP4X = map(mouseX, 0, 300, 330, 300, true);
  line(rocklipsP1X, 200, rocklipsP2X, 230)
  line(rocklipsP3X, 200, rocklipsP4X, 230)
  
  
  
}