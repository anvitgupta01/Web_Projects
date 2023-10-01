const music = new Audio('music.mp3');
const gameover = new Audio('gameover.mp3');
const ting = new Audio('ting.mp3');

music.loop = true;

document.addEventListener('click',()=>{
    music.play();
})

var turn = "X";
var isgameover = false;

const changeTurn = ()=>{
    if(turn === "X"){
        turn = "0";
    }
    else{
        turn = "X";
    }
}

const checkWin = ()=>{
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let boxtext = document.getElementsByClassName('box-child');
    wins.forEach((e)=>{
        if(boxtext[e[0]].innerHTML === boxtext[e[1]].innerHTML && boxtext[e[1]].innerHTML === boxtext[e[2]].innerHTML && boxtext[e[0]].innerHTML !== ""){
            let info = document.getElementsByClassName('turn')[0];
            info.innerHTML = boxtext[e[0]].innerHTML +" Won";
            isgameover = true;
            gameover.play();
            let img = document.getElementsByClassName('img-sec')[0];
            img.style.width = "15vw";
        }
    })
}

let boxe = document.getElementsByClassName('box');
Array.from(boxe).forEach((element)=>{
    element.addEventListener('click',()=>{
        let boxtext = element.getElementsByClassName('box-child')[0];
        boxtext.innerHTML = turn;
        ting.play();
        changeTurn();
        checkWin();
        if(!isgameover){
            let info = document.getElementsByClassName('turn')[0];
            info.innerHTML = `Turn for ${turn}`;
        }
    })
})

let reset = document.getElementById('Reset');
reset.addEventListener('click',()=>{
    let boxtext = document.getElementsByClassName('box-child');
    Array.from(boxtext).forEach((element)=>{
        element.innerHTML = "";
        turn = "X";
        let info = document.getElementsByClassName('turn')[0];
        info.innerHTML = `Turn for ${turn}`;

        let img = document.querySelector('.img-sec');
        img.style.visibility = "hidden";
        img.style.width = '0px';
        setTimeout(()=>{
            img.style.visibility = "visible";
        },2000);
    })
})