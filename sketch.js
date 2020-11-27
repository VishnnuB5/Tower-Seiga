// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;
var score=0;

let dotImg;
let boxImg;
let bkgImg;
var backgroundfinal;

function preload() {
  dotImg = loadImage('images/dot.png');
  boxImg = loadImage('images/equals.png');
  getbkgImg();
}

function setup() {
  const canvas = createCanvas(711, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 75, 84, 100);
  }
  bird = new Bird(150, 300, 25);

  slingshot = new SlingShot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

function draw() {
  if(backgroundfinal){
    background(backgroundfinal);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();

  if(bird.isTouching(boxes)){
score+1;
Text("SCORE: "+score,750,40);
  }
}
}

function keyPressed(){
  if(keyCode===32){
    slingshot.attach(bird.body);
  }
}

async function getbackgroundImg(){
  var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

  var responseJSON= await response.json();
  var datetime=responseJSON.datetime;
  var hour=datetime.slice(11,13)
  console.log(hour);

  if(hour>=06&hour<=19){
      bkgImg="skyBackground.png";
  }
  else{
      bkgImg="nightbkgImg.jpg";
  }
  backgroundfinal=loadImage(bkgImg);
}
