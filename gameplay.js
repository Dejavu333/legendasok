//setup----
    const canvas = document.querySelector('canvas');
    const cx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let ticker; ticker=1;    //ticker mechanism by boty
    setInterval(() => {
        if (ticker==1) {ticker=2;}
        else if (ticker==2) {ticker=3;}
        else if (ticker==3) {ticker=1;}
    }, 2000);

            var kalmanSounds = [];
            for (let index = 1; index <= 12; index++) {
                kalmanSounds.push(new Audio("./kalmanhangok/kalmanhang"+[index]+".mp3"));                  
            }
            var shootSounds = [];
            for (let index = 1; index <= 2; index++) {
                shootSounds.push(new Audio("shot"+[index]+".mp3"));                  
            }
            shootSounds[1].volume=0.5;
            shootSounds[0].volume=0.5;

     var img3 = new Image();
     img3.src = "kalmanTile3.png"; 

     var img2 = new Image();
     img2.src = "kalmanTile2.png";

     var img1 = new Image();
     img1.src = "kalmanTile1.png";
     img1.onload =
 function() {
      
//player class----
    class Player {
        constructor(x,y,radius,color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }

        draw() {
         /* cx.beginPath();
            cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false); //startangle, endangle, counterclockwise?
            cx.fillStyle = this.color;
            cx.fill(); */
            cx.save();
            cx.translate(canvas.width/2, canvas.height/2);
            cx.rotate(Math.atan2(mousePosY - canvas.height/2,  mousePosX - canvas.width/2));
        if(ticker==1) {
            cx.drawImage(img1, 0-this.radius/2, 0-this.radius/2, this.radius, this.radius); }
        else if(ticker==2) {
            cx.drawImage(img2, 0-this.radius/2, 0-this.radius/2, this.radius, this.radius); }
        else if(ticker==3) {
            cx.drawImage(img3, 0-this.radius/2, 0-this.radius/2, this.radius, this.radius); }    
            cx.restore();
        }
    }

//projectile class----
    class Projectile {                              //will listen to a click event
        constructor(x,y,radius,color,velocity) {    //velocity will be an object with x and y keys
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            cx.beginPath();
            cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            cx.fillStyle = this.color;
            cx.fill();
        }

        update() {                             
            this.x = this.x + this.velocity.x;      //going to be equal to its current position plus its y velocity
            this.y = this.y + this.velocity.y;      //our update function needs to be called inside of our animateloop because for each frame we are looping through we're going to be adding on our velocity
        }
    }

//enemy class----
    class Enemy {
        constructor(x,y,radius,color,velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
        }

        draw() {
            cx.beginPath();
            cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            cx.fillStyle = this.color;
            cx.fill();
        }

        update() {                             
            this.x = this.x + this.velocity.x;   
            this.y = this.y + this.velocity.y;   
        }
    }    

//particle class----
    class Particle {
        constructor(x,y,radius,color,velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 1;
        }

        draw() {
            cx.save();
            cx.globalAlpha = 1;
            cx.beginPath();
            cx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            cx.fillStyle = this.color;
            cx.fill();
            cx.restore();
        }

        update() {         
            this.draw();                    
            this.x = this.x + this.velocity.x;   
            this.y = this.y + this.velocity.y;
            this.alpha = this.alpha - 0.01;
        }
    }    
    
//variables----
    var pposX; pposX = canvas.width/2;
    var pposY; pposY = canvas.height/2;

    const player = new Player(pposX,pposY,100,'blue');
       
    var projectiles;                            //projectiles array is just a way for to create multiple particles on the screen and have them all move independently
    projectiles = [];
    var enemies;
    enemies = [];
    var particles;
    particles = [];

    let mousePosY;
    let mousePosX;

//interactivity----
    window.addEventListener('touchstart', function(event) {
    
        const angle = Math.atan2(event.clientY - canvas.height/2,  event.clientX - canvas.width/2);        //for phone
        const velocity = {x: Math.cos(angle)*5, y: Math.sin(angle)*5};                                     

        var bumbum;
        bumbum = new Projectile(pposX, pposY, 5, 'brown', velocity);    
        projectiles.push(bumbum);
    });


    window.addEventListener('click', function(event) {
    
        const angle = Math.atan2(event.clientY - canvas.height/2,  event.clientX - canvas.width/2);        //we need the distance between our mouse and the center of our screen
        const velocity = {x: Math.cos(angle)*5, y: Math.sin(angle)*5};                                     //atan(y,x)=angle  velocities: sin(angle) cos(angle)

        var bumbum;
        bumbum = new Projectile(pposX, pposY, 5, 'brown', velocity);    
        projectiles.push(bumbum);
    });
    
    function spawnEnemy() {
        setInterval(createEnemy, 1000);
        function createEnemy() {
            const radius = Math.random() * (30 - 4) + 4;    //any value from 4 to 30

            let x; let y;

            if(Math.random() < 0.5) { 
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
                y = Math.random() * canvas.height; 
            }
            else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
            }         
            const color = `hsl(${Math.random()*360}, 50%, 50%)`;
            const angle = Math.atan2(canvas.height/2 - y,  canvas.width/2 - x);     //always have to subtrack from destenation
            const velocity = {x: Math.cos(angle), y: Math.sin(angle)};

            enemies.push(new Enemy(x,y,radius,color,velocity));
        }
    }

    window.addEventListener('mousemove', function(event) {                          //gives the mouse position then we store them globally, eventually we use them in the draw() method
        mousePosY = event.clientY;
        mousePosX = event.clientX;
    });

    function playRandomAudio() {
        setInterval(function() {    
            kalmanSounds[Math.floor(Math.random()*(12-1+1))].play();
        }, 20000);
    }

    function endGame() {
        cancelAnimationFrame(animationID);
        var gameOver = document.querySelector('.endgame');
        gameOver.style.display = 'flex';
    }

    let score; score = 0;
    var scoreBoard = document.querySelector('.scoreboard');
    function incrementScore() {
        score = score + 1;
        scoreBoard.innerText=String(score);
    }

//animation loop----
    let animationID;

    function animate() {
        animationID = requestAnimationFrame(animate);                  //when we call animate it will loop over and over again
        cx.fillStyle = 'white'
        cx.fillRect(0,0,canvas.width,canvas.height);
        player.draw();

        particles.forEach(function(par, index) {
            par.update();
            if (par.alpha<=0){
                particles.splice(index,1);
            }
        });

        projectiles.forEach(function(element, index) { 
            element.draw();
            element.update();                                          //for each projectile within this array we want to call that projectile's update function
            
            if (element.x + element.radius < 0 || element.x - element.radius > canvas.width ||
                element.y + element.radius < 0 || element.y - element.radius > canvas.height) {    //remove projectiles if outside of screen
                setTimeout(function() {
                    projectiles.splice(index,1);
                },0)
            }
        });
        
        enemies.forEach(function(enem, enemIndex) {
            enem.draw();
            enem.update();
            const distance = Math.hypot(player.x-enem.x, player.y-enem.y);        //distance between two points, enemy and player
                    if (distance - enem.radius - player.radius < -80) {           //END GAME when collision
                        endGame();
                    }
                projectiles.forEach(function (proj, projIndex) {                  
                    const distance = Math.hypot(proj.x-enem.x, proj.y-enem.y);    //distance between two points, enemy and projectile
         
                    if (distance - enem.radius - proj.radius < 1) {               //when particle hits the enemy
                        for (let index = 0; index < 8; index++) {                 //create particles on hit
                            particles.push(new Particle(proj.x, proj.y, Math.random()*2, enem.color, {x:(Math.random())-0.5 * Math.random()*8, y:(Math.random()-0.5 )* Math.random()*8}));
                        
                        }

                        if(enem.radius -10 > 10) {                                //shrink enemy on hit
                            enem.radius=enem.radius-10;             
                            setTimeout(function() {
                                shootSounds[0].pause();shootSounds[0].currentTime=0;shootSounds[0].play();
                                projectiles.splice(projIndex,1);
                                incrementScore();
                            },0);
                        }
                        else {                           
                            setTimeout(function() {
                                shootSounds[1].pause();shootSounds[1].currentTime=0;shootSounds[1].play();
                                enemies.splice(enemIndex,1);
                                projectiles.splice(projIndex,1);
                                incrementScore();
                            },0);
                        
                        }    
                    }
                });
        }); 
    }

//invoking----
    animate();
    spawnEnemy();
    playRandomAudio();

}//end of img.onload block