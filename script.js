function initialize(level) {
    console.log(level) ;
    document.getElementById("row1").style.display="none";
    document.getElementById("row2").style.display="none";
    document.getElementById("startPlaying").style.display="none";
    document.getElementById("levelHeading").style.display="flex" ;
    document.getElementById("level").innerHTML=" "+level ;

    document.getElementById("gambling-board").style.display="block";
    let grid = document.getElementById("grid") ;
    while(grid.firstChild) {
        grid.removeChild(grid.lastChild) ; // faster to search for first child an dremove last child
    }
    images = ["mango.jpeg", "kiwi.jpeg", "tomato.jpeg ", "sweet-lime.jpeg", "uncommon-green.jpg","green-fruit.jpg"];
    imgObjects = [];
    faceUp = [false, false, false, false, false, false, false, false, false, false];
    time = 0;
    score = 0;
    playing = false ;
}

function startGame(level) {
    if(level==0) {
        level = Math.ceil(Math.random()*4);
    }
    initialize(level) ;

    createCards();

    arrangeBoard();
    if(level == 1) time = 90;
    else if(level==2) time = 60 ;
    else if(level==3) time = 30 ;
    else time = 15 ; 
    document.getElementById('timer').style.display="flex" ;
    setInterval(countDown, 1000);
}

function flipCard(id) {

    let img = document.getElementById(id);

    filepath =
        faceUp[id] == true ? "resources/smiley.png" : "resources/" + img.alt;
        
    img.src = filepath;
    faceUp[id] = !faceUp[id];

    let res = faceUp
                .map((element, index) => element?index:-1)
                .filter((element)=> element!=-1 )

    if(res.length == 2 && playing) {
        const ele1 = document.getElementById(res[0]) ;
        const ele2 = document.getElementById(res[1]) ;
        if(ele1.alt == ele2.alt) {
            
            score+=500 ;
            ele1.src="resources/black.jpg" ;
            ele1.alt="black";
            ele2.src="resources/black.jpg" ;
            ele2.alt="black" ;
            ele2.style.border="0px black" ;
            ele1.style.border="0px black" ;
            ele1.onclick={} ;
            ele2.onclick={} ;
            faceUp[res[0]] = false ;
            faceUp[res[1]] = false ;
        } else {
            score-=100;
        }
    }

}

function createCards() {
    for (let im = 0; im < images.length; im++) {
        // HOW TO KEEP TRACK OF ORIGINAL IMAGE
        var newImg1 = document.createElement("img");
        newImg1.src = "resources/smiley.png";
        newImg1.alt = images[im];

        var newImg2 = document.createElement("img");
        newImg2.src = "resources/smiley.png";
        newImg2.alt = images[im];

        imgObjects.push(newImg1);
        imgObjects.push(newImg2);
    }
}

function arrangeBoard() {
    // SHUFFLE CARDS
    for (let im = 0; im < imgObjects.length; im++) {
        var num1 = Math.floor(Math.random() * imgObjects.length);
        var num2 = Math.floor(Math.random() * imgObjects.length);
        
        var old = imgObjects[num1];
        imgObjects[num1] = imgObjects[num2];
        imgObjects[num2] = old;
    }

    // Add images to grid
    var grid = document.getElementById("grid");

    for (let i = 0; i < imgObjects.length; i++) {
        faceUp[i] = false;
        imgObjects[i].id = i;
        grid.appendChild(imgObjects[i]);
        let img = document.getElementById(i);
        img.onclick = function () {
            gameControls(img.id);
        };
    }

    // SHOW IMAGES FOR 2 SECS
    for (let im = 0; im < imgObjects.length; im++) {
        flipCard(im);
    }

    setTimeout(function () {
        for (let im = 0; im < imgObjects.length; im++) {
            flipCard(im);
        }
        playing = true ;
    }, 2000);

}

function gameControls(id) {

    let count = faceUp.filter(value => value === true).length ;

    if(count>=2){        
        faceUp.map((element, index) => {
            if(element) flipCard(index) ;
        });
        flipCard(id) ;
    }
    else {
        flipCard(id) ;   
    }
    
    let finished = imgObjects.filter((element)=>element.alt==="black").length ;
    if(finished==imgObjects.length) {
        alert('YOU WON WITH A SCORE OF '+score+' !!') ;
        document. location. reload() ;
    }
}

function countDown() {
  time--;
  document.getElementById('minutes').innerHTML = paddedVal(Math.floor(time/60)) ; // find lowest val account rest difference with seconds
  document.getElementById('seconds').innerHTML = paddedVal(time%60) ;
  // change timer display
  if (time == 0) {
    alert("BETTER LUCK NEXT TIME -> YOUR SCORE IS "+score+" !");
    document. location. reload() ;
  }
}

function paddedVal(val) {
    if(val < 10) {
        return '0' + val ;
    } else {
        return val ;
    }
}
