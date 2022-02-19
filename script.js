let field = document.querySelector(".play_window");
let player = document.querySelector(".left_player");
let bot = document.querySelector(".right_player");
let ball = document.querySelector(".ball");
let c1 = document.querySelector(".count_left_player");
let c2 = document.querySelector(".count_right_player");


field.onpointermove = function (event) {
    let newPosition = event.clientY - field.offsetTop - player.offsetHeight / 2;
    player.style.top = Math.min(Math.max(0, newPosition), field.offsetHeight - player.offsetHeight) + "px";
}
let dir = ["left", "bottom"]
let angle = 30;
let step = [3, Math.tan(angle * Math.PI / 180) * 3]

function swapDir() {
    if (ball.offsetTop === 0) {
        dir[1] = "bottom";
        moveBot(0, "bottom")
    } else if (ball.offsetTop + ball.offsetHeight === field.offsetHeight) {
        dir[1] = "top";
        moveBot(field.offsetHeight, "top");
    }
}
function startPosition() {
    ball.style.left = "70%";
    ball.style.top = "50%";
    clearInterval(play)
    play = setInterval(() => move(player.offsetWidth, field.offsetWidth - ball.offsetWidth - player.offsetWidth), 7)
}
function checkShootInPlayer() {
    let fff = parseInt(bot.style.transform.slice(11));
    if (ball.offsetLeft === player.offsetWidth && player.offsetTop <= ball.offsetTop + ball.offsetHeight
        && player.offsetTop + player.offsetHeight >= ball.offsetTop) {
        dir[0] = "right";
    } else if (ball.offsetLeft + ball.offsetWidth === field.offsetWidth - player.offsetWidth && fff <= ball.offsetTop + ball.offsetHeight
        && fff + bot.offsetHeight >= ball.offsetTop) {
        dir[0] = "left";
    }
    else if (ball.offsetLeft === player.offsetWidth || ball.offsetLeft + ball.offsetWidth === field.offsetWidth - player.offsetWidth) {
        clearInterval(play)
        play = setInterval(() => move(0, field.offsetWidth), 10)
    }
    else if (ball.offsetLeft === 0) {
        dir[0] = "right";
        c2.textContent = (parseInt(c2.textContent) + 1).toString();
        startPosition()
        moveBot(ball.offsetTop + ball.offsetHeight, dir[1])
    }
    else if (ball.offsetLeft + ball.offsetWidth >= field.offsetWidth) {
        dir[0] = "left";
        c1.textContent = (parseInt(c1.textContent) + 1).toString();
        startPosition()
        moveBot(ball.offsetTop + ball.offsetHeight, dir[1])
    }
}

function moveBot(currentBallY, dir) {
    let y;
    if (dir === "top")
        y = currentBallY - Math.tan(angle * Math.PI / 180) * (field.offsetWidth - (ball.offsetLeft + ball.offsetWidth)) - 2 * ball.offsetHeight - bot.offsetHeight / 2;
    else
        y = currentBallY + Math.tan(angle * Math.PI / 180) * (field.offsetWidth - (ball.offsetLeft + ball.offsetWidth)) + ball.offsetHeight - bot.offsetHeight / 2;
    bot.style.transform = `translateY(${Math.min(Math.max(y, 0), field.offsetHeight - bot.offsetHeight)}px)`
}
function move(leftBorder, rightBorder) {
    let currentStepHorizontal = dir[0] === "right" ? step[0] : -step[0];
    let currentStepVertical = dir[1] === "top" ? -step[1] : step[1];
    ball.style.left =
        Math.max(Math.min(ball.offsetLeft + currentStepHorizontal, rightBorder), leftBorder) + "px";
    ball.style.top =
        Math.max(Math.min(ball.offsetTop + currentStepVertical, field.offsetHeight - ball.offsetHeight), 0) + "px";
    swapDir()
    checkShootInPlayer()
}
let play = setInterval(() => move(player.offsetWidth, field.offsetWidth - ball.offsetWidth - player.offsetWidth), 7)