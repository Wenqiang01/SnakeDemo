var isAlive = true;
var snakes = [];
var egg = null;
var isFirst = true;
var panel = document.getElementById('container');
var scoreBoard = document.getElementById('score');
var score = 1;
var timer = 0;

var DIR = {
    L: 1,
    R: 2,
    U: 3,
    D: 4
}

function snake(top, left, dir) {
    this.top = top;
    this.left = left;
    this.dir = dir;
}

function newEgg(top, left) {
    this.top = top;
    this.left = left;
}

function gameRun() {
    if (isFirst) {
        snakes.push(new snake(40, 40, DIR.D));
        createEgg();
        isFirst = false;
    }

    sankeRun();

    display();
}

function createEgg() {
    egg = new newEgg(
        Math.floor(Math.random() * 25) * 20,
        Math.floor(Math.random() * 15) * 20
    )
}

document.onkeydown = function (e) {
    var header = snakes[snakes.length - 1];

    switch (e.keyCode) {
        case 37:
            //left 
            if (header.dir != DIR.R) {
                header.dir = DIR.L
            }
            break;
        case 38:
            //up 
            if (header.dir != DIR.D) {
                header.dir = DIR.U
            }
            break;
        case 39:
            //Right
            if (header.dir != DIR.L) {
                header.dir = DIR.R
            }
            break;
        case 40:
            //Down 
            if (header.dir != DIR.U) {
                header.dir = DIR.D
            }
            break;
    }

}.bind(panel)

function sankeRun() {
    var header = snakes[snakes.length - 1];
    var newHeader = null;

    switch (header.dir) {
        case DIR.L:
            newHeader = new snake(header.top, header.left - 20, header.dir);
            break;
        case DIR.R:
            newHeader = new snake(header.top, header.left + 20, header.dir);
            break;
        case DIR.U:
            newHeader = new snake(header.top - 20, header.left, header.dir);
            break;
        case DIR.D:
            newHeader = new snake(header.top + 20, header.left, header.dir);
            break;
    }
    deathCheck(newHeader);
    if (isAlive) {
        snakes.push(newHeader);
        if (newHeader.top == egg.top && newHeader.left == egg.left) {
            createEgg();
        } else {
            snakes.shift();
        }
    }else{
        clearInterval(timer);
    }

}

function deathCheck(header) {
    //var header = snakes[snakes.length - 1];
    if (header.top < 0 || header.top > 480 || header.left < 0 || header.left > 280) {
        isAlive = false;
        return;
    }

    for (var i = 0; i < snakes.length; i++) {
        if (header.top == snakes[i].top && header.left == snakes[i].left) {
            isAlive = false;
            return;
        }
    }
}


function display() {
    if (isAlive) {
        if (score != snakes.length) {
            score = snakes.length;
            scoreBoard.innerHTML = 'Score:' + score;
        }
    }else{
        scoreBoard.innerHTML = 'Game Over, Final Score:' + score;
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < snakes.length; i++) {
        var div = document.createElement('div');
        div.className = 'snake';
        div.style.top = snakes[i].top + 'px';
        div.style.left = snakes[i].left + 'px';
        fragment.appendChild(div);
    }
    //console.log(egg);
    var ediv = document.createElement('div');
    ediv.className = 'egg';
    ediv.style.top = egg.top + 'px';
    ediv.style.left = egg.left + 'px';
    fragment.appendChild(ediv);
    panel.innerHTML = '';
    panel.appendChild(fragment);
}

//gameRun();
timer = setInterval(gameRun, 100);








