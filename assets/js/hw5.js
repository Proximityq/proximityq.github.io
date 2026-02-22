/*
* Title: Homework 5
* Author: Katie Schantz
* Date: Feb 15, 2026
* Simple Description: Dots Dots Dots!
* Instructions: Click the mouse to randomly generate a lot of dots at different colors and sizes.
*/

function setup() {
  createCanvas(600, 600);
  noLoop();
  
}

function draw() {
  mouseClicked(); // draw random circles on canvas when mouse clicked

}

function mouseClicked(){
  background(255);
  
  let d = (10,100); // circle diameter
  let x = (600,600); // circle x pos
  let y = (600,600); // circle y pos
  
  for (let i = 0; i < 150; i++) {
    fill((random(0,255)),(random(0,255))); // random b&w gradient and alpha
    stroke(0); // black outline
    strokeWeight(2);
    circle(random(x), random(y), random(d));
    
  }
}