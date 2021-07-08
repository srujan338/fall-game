var leftWall,rightWall,topWall;
var leftWallGroup,rightWallGroup;
var ball,ballImage;
var invisibleLeftEdge , invisibleRightEdge;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var wallSpeed = -4;

var score = 0;

function preload(){
    ballImage = loadImage('redBall.png');
}

function setup(){
    createCanvas(400,600);

    ball = createSprite(200,100,10,10);
    ball.addImage(ballImage);
    ball.scale = 0.14;

    leftWallGroup = new Group();
    rightWallGroup = new Group();

    topWall = createSprite(200,0,450,5);
    topWall.visible = false;

    invisibleLeftEdge =createSprite(0,300,5,800);
    invisibleLeftEdge.visible = false;

    invisibleRightEdge = createSprite(390,300,5,800);
    invisibleRightEdge.visible = false;

    ball.setCollider('circle',0,0,75);
    ball.debug = false;
}

function draw(){
    background(255);
    ball.collide(invisibleLeftEdge);
    ball.collide(invisibleRightEdge);

    if(gameState === PLAY){
        ball.velocityY = 4;

        if(keyDown(LEFT_ARROW)){
            ball.x -= 8;
        }
        if(keyDown(RIGHT_ARROW)){
            ball.x += 8;
        }
        spawnWalls();

        if(leftWallGroup.isTouching(ball)){
            ball.collide(leftWallGroup);
            ball.setVelocity(0,0);
        }

        if(rightWallGroup.isTouching(ball)){
            ball.collide(rightWallGroup);
            ball.setVelocity(0,0);
        }
        if(ball.isTouching(topWall)){
            gameState = END;
        }
    }

    else if(gameState === END){
        score = leftWallGroup.length-8;
        alert('Score: '+score);
        leftWallGroup.destroyEach();
        rightWallGroup.destroyEach();
        ball.destroy();
        topWall.destroy();
        invisibleLeftEdge.destroy();
        invisibleRightEdge.destroy();
    }
    drawSprites();
}


function spawnWalls(){
    if(frameCount % 20 === 0){
        var randomWidth = random(50,300);

        leftWall = createSprite(randomWidth/2,600,randomWidth,20);
        leftWall.shapeColor = 'black';
        leftWall.velocityY = wallSpeed;

        rightWall = createSprite(randomWidth+40+(400-40-randomWidth)/2,leftWall.y,400-40-randomWidth,20);
        rightWall.shapeColor = 'black';
        rightWall.velocityY = leftWall.velocityY;

        leftWall.lifetime = 350;
        rightWall.lifetime = 350;

        leftWall.depth = rightWall.depth;
        ball.depth = rightWall.depth;

        leftWallGroup.add(leftWall);
        rightWallGroup.add(rightWall);
    }
}
