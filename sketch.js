//Create variables here

var foodS,foodStock,dog,happydog,database;

function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png")
  dog2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database ();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock)

  dog = createSprite(250,250,30,30)
  dog.addImage(dog1);
  dog.scale=0.3;
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dog2)
  }


  drawSprites();
  //add styles here
  fill("black")
  text("Food Remaining : "+foodS,150,150 )
  //console.log(foodStock)

  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
     Food:x
  })

}