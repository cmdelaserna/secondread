// Generative Gestaltung, ISBN: 978-3-87439-759-9
// // First Edition, Hermann Schmidt, Mainz, 2009
// // Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// // Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// //http://www.generative-gestaltung.de

int NORTH = 0;
int NORTHEAST = 1; 
int EAST = 2;
int SOUTHEAST = 3;
int SOUTH = 4;
int SOUTHWEST = 5;
int WEST = 6;
int NORTHWEST= 7;

float stepSize;
float diameter = 2;

int direction;
float posX, posY;


void setup() {
  size(screen.width, screen.height);
  background(255);
  smooth();
  noStroke();
  posX = width/2;
  posY = height/2;
}


void draw() {
  stepSize = random(1, 10);
  for (int i=0; i<=mouseX; i++) {
    direction = (int) random(0, 8);

    if (direction == NORTH) {  
      posY -= stepSize;  
    } 
    else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } 
    else if (direction == EAST) {
      posX += stepSize;
    } 
    else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    }
    else if (direction == SOUTH) {
      posY += stepSize;
    }
    else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    }
    else if (direction == WEST) {
      posX -= stepSize;
    }
    else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    fill(0, 40);
    ellipse(posX+stepSize/2, posY+stepSize/2, diameter, diameter);
  }
}
