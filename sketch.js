var database ,dog
var position
var feed,add
var foodobject
var Feedtime, Lastfeed
var dogimg1, dogimg2
var foodS
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
  
feed = createButton("FEED DRAGO")
feed.position(500,15)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

} 
function FeedDog(){
  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  database.ref("/").update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour()
  })
}

function AddFood(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function draw(){
  background(46,139,87);
 foodobject.display()
 
 fedtime= database.ref('FeedTime');
 fedtime.on("value", function(data){
   Lastfeed=data.val();
 });

 drawSprites();
  
  fill(255,255,254);
 textSize(15);
if (Lastfeed >= 12) {
    text("Last Fed : " + (Lastfeed % 12) + "PM", 350, 30);
  } else if (Lastfeed === 0) {
    text("Last Fed : " + (Lastfeed % 12) + "PM", 350, 30);
  } else {
    text("Last Fed : " + (Lastfeed % 12) + " AM", 350, 30);
  }

}

function readStock(data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS)
}
