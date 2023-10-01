score = 0;
cross = true;

var audio1 = document.createElement('audio');
audio1.setAttribute('src','music.mp3');
audio1.loop = true;

var audioGameOver = document.createElement('audio');
audioGameOver.setAttribute('src','gameover.mp3');

document.addEventListener('keydown',()=>{
    audio1.play();
})

document.onkeydown = (e) => {
    if (e.key == "ArrowUp") {
        let dino = document.querySelector('.dino');
        dino.classList.add('dinoJump');
        setTimeout(() => {
            dino.classList.remove('dinoJump')
        }, 700)
    }
    else if (e.key == "ArrowRight") {
        let dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 100 + "px";
    }
    else if (e.key == "ArrowLeft") {
        let dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 100) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    dragon = document.querySelector('.dragon');
    gameover = document.querySelector('.gameover');
    scoreCount = document.querySelector('.scoreCount');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    let ox = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 150 && offsetY < 50) {
        gameover.style.visibility = "visible";
        dragon.classList.remove('dragonMove')
        audioGameOver.play(); 
        audio1.pause();
        setTimeout(()=>{
            audioGameOver.pause();
        },1000)
    }
    else if (offsetX < 120 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true
        }, 1000)

        // Now increasing the speed of the dragon every time the score increases :
        // Putting in the setTimeout so that the speed will not increase as soon as the dino crosses the dragon
        // setTimeout(() => {
        //     dragon = document.querySelector('.dragonMove');
        //     let anidr = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
        //     newdr = (anidr - 0.1)+ 's';
        //     dragon.style.animationDuration = newdr;
        // },100)
    }
}, 100)

const updateScore = (score) => {
    scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerHTML = "Your score : " + score;
}

