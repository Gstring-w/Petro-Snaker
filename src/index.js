snake.init(ground);
snake.move(ground);

function start() {
    snake.time = setInterval(function () {
        snake.move(ground)
    }, INTERVAL)
}

function bindEvent(){
    
    // 控制蛇的移动
    document.onkeydown = function (e) {
        console.log(e.which)
        if (e.which == 40 && snake.direction != _DIRECTION.DOWN) {
            snake.direction = _DIRECTION.DOWN;
        } else if (e.which == 37 && snake.direction != _DIRECTION.LEFT) {
            snake.direction = _DIRECTION.LEFT;
        } else if (e.which == 38 && snake.direction != _DIRECTION.UP) {
            snake.direction = _DIRECTION.UP;
        } else if (e.which == 39 && snake.direction != _DIRECTION.RIGHT) {
            snake.direction = _DIRECTION.RIGHT;
            console.log(11)
        }
    }


    //开始的按键
    var btn = document.getElementsByClassName('start')[0];
    btn.onclick = function (){
        console.log(11)
        start();
    }
}

function init(){
    bindEvent()
}
init()