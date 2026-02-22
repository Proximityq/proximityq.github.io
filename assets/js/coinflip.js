/*
* Title: Homework 3
* Author: Katie Schantz
* Date: Jan 26, 2026
* Simple Description: User flips a coin with left mouse click and code tells user if they got heads or tails. Allows you to see previous results.
* Instructions: Left click the mouse to flip a coin
*/

function setup() {
  createCanvas(windowWidth, 100);

  noLoop();
  
}

function draw() {
  background(220);
  
  // Text
  textSize(20);
  textAlign(CENTER);
  text('Click for coinflip', windowWidth/2, 50);
  
  
  mouseClicked(); // call mouseClicked function
  
}

function mouseClicked() { // When mouse clicked get random number between 1 and 2
  let coin = random(1,3);
  print(coin);
    
  if (coin > 2) { // if number > 1 then heads
          heads();
      }
        else { // if number < 1 then tails
          tails();
        }
    }    


function heads(){ // play animation for heads
  let video = createVideo('Heads.mp4');
  video.size(400, 400);
  video.autoplay();
}

function tails(){ // play animation for tails
  let video = createVideo('Tails.mp4');
  video.size(400, 400);
  video.autoplay();
  
}