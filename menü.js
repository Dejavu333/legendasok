//bridge
var pics;
pics = document.querySelectorAll('.heroPix');
var pataiak;
pataiak = document.getElementById('pataiHősök');
var kalmanbacsi;
kalmanbacsi = document.getElementById('kalmanbacsi');
var pepsibela;
pepsibela = document.getElementById('pepsibela');


//set audio
    var pataiHang;
    pataiHang = new Audio('hősválasztás/szociális.mp3');



//pataiak
let cool=true;   //cd mechanism by boty
    pataiak.addEventListener('mouseenter', playHeroSound);
    function playHeroSound() { 
        if(cool==true) {   
            pataiHang.play();
            startCoolDown();
        }
    }
    function startCoolDown() {
        cool=false;
        setTimeout(callback,8000);
            function callback() {
               cool=true; 
            }
    }

    pataiak.addEventListener('mouseover', function(event) {
     
        let ele =  document.createElement('H1');
        document.body.appendChild(ele);
        let hősnév = document.createTextNode('Pataiak');
        ele.appendChild(hősnév);
        ele.setAttribute('id', 'idPataiak');
        ele.classList.add('nammo');
    });

    pataiak.addEventListener('mouseleave', function() {
        let ele = document.getElementById('idPataiak');
        ele.remove();     
    });

//kalmanbacsi
    kalmanbacsi.addEventListener('mouseenter', playHeroSound);
    function playHeroSound() { 
        if(cool==true) {   
            pataiHang.play();
            startCoolDown();
        }
    }
    function startCoolDown() {
        cool=false;
        setTimeout(callback,8000);
            function callback() {
               cool=true; 
            }
    }

    kalmanbacsi.addEventListener('mouseover', function(event) {
     
        let ele =  document.createElement('H1');
        document.body.appendChild(ele);
        let hősnév = document.createTextNode('Kálmán bácsi');
        ele.appendChild(hősnév);
        ele.setAttribute('id', 'idKalman');
        ele.classList.add('nammo');
    });

    kalmanbacsi.addEventListener('mouseleave', function() {
        let ele = document.getElementById('idKalman');
        ele.remove();     
    });

//pepsibela
    pepsibela.addEventListener('mouseenter', playHeroSound);
    function playHeroSound() { 
        if(cool==true) {   
           pataiHang.play();
            startCoolDown();
        }
    }
    function startCoolDown() {
        cool=false;
        setTimeout(callback,8000);
            function callback() {
               cool=true; 
            }
    }

    pepsibela.addEventListener('mouseover', function(event) {
     
        let ele =  document.createElement('H1');
        document.body.appendChild(ele);
        let hősnév = document.createTextNode('Pepsi Béla');
        ele.appendChild(hősnév);
        ele.setAttribute('id', 'idPepsi');
        ele.classList.add('nammo');
    });

    pepsibela.addEventListener('mouseleave', function() {
        let ele = document.getElementById('idPepsi');
        ele.remove();     
    });
