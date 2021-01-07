//Create variables here
var dogSad,
  dogImg1,
 
  foodCount = 20;
var addMilkButton, feedDogButton;
var lastFed=0
function preload() {
  dogSad = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/milk.png");
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(700, 350);
  dog.addImage(dogSad);
  milk = createSprite(620, 370);
  milk.addImage(milkImage);
  food1 = new Food();
  milk.scale = 0.08;

  dog.scale = 0.15;
  database = firebase.database();
  foodref = database.ref("food");
  foodref.on("value", readStock);

  
 
  addMilkButton = createButton("Add Milk");
  feedDogButton = createButton("Feed dog");
  addMilkButton.position(260, 60);
  feedDogButton.position(470, 60);

  addMilkButton.mousePressed(addMilk);
  feedDogButton.mousePressed(feedMilk);
}

function draw() {
  background("purple");

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);
 
  stroke("Red");
  text("Food remaining : " + foodCount, 170, 200);
  textSize(23);
  text("Note: Press Space Key To Feed Drago Milk!", 200, 600);
 food1.display()

 timeref = database.ref("time");
  timeref.on("value", readTime);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,60);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,60);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,60);
   }
}
function addMilk(){
dog.addImage(dogHappy)
  foodCount++
database.ref('/').update({
  food:foodCount
})
}


function feedMilk(){


  foodCount--
  if(foodCount<0){
    foodCount=0
  }
  food1.updateFood(foodCount);
database.ref('/').update({
  food:foodCount,
  time:hour()
})
}
function readTime(data){
  lastFed=data.val();


}


function readStock(data){
foodCount=data.val();
food1.updateFood(foodCount)

}