var snake = new Snake();

//蛇头 蛇尾
snake.head = null;
snake.tail = null;

// 定时器
snake.time = null;


// 食物产生的锁
snake.flag = true;

var _DIRECTION = {
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: +1
    },
    RIGHT: {
        x: +1,
        y: 0
    },
    LEFT: {
        x: -1,
        y: 0
    }
}

// 蛇的默认方向
snake.direction = _DIRECTION.RIGHT;

// 蛇的初始化
snake.init = function (ground) {
    var snakeHead = SquareFactory.create('SnakeHead', 4, 1, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 3, 1, 'deeppink');
    var snakeBody2 = SquareFactory.create('SnakeBody', 2, 1, 'deeppink');
    this.head = snakeHead;

    snakeHead.next = snakeBody1;
    snakeBody1.next = snakeBody2;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;
    snakeBody1.last = snakeHead;
    snakeHead.last = null;
    this.tail = snakeBody2;


    // 在dom中添加蛇
    ground.remove(4, 1);
    ground.remove(3, 1);
    ground.remove(2, 1);
    FOODLIST.splice(3, 0);
    FOODLIST.splice(2, 0);
    FOODLIST.splice(1, 0);
    ground.add(snakeHead);
    ground.add(snakeBody1);
    ground.add(snakeBody2);

}
// 生成食物
snake.food = function (ground) {
    var len = FOODLIST.length;
    var index = parseInt(Math.random() * len);
    x = FOODLIST[index][0];
    y = FOODLIST[index][1];
    var food = SquareFactory.create('Food', x, y, 'yellow');
    ground.remove(x, y);
    ground.add(food);

}
// 蛇移动
snake.move = function (ground) {

    // console.log(this.head.y + this.direction.y, this.head.x + this.direction.x);
    var square = ground.contentList[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(square.touch())
    if (typeof square.touch == 'function') {
        this.strateies[square.touch()].call(this, ground)
    }
}

// 每个方块对应的一个touch方法 对应的一个策略
snake.strateies = {
    MOVE: function (ground) {
        if (snake.flag) {
            snake.food(ground);
            snake.flag = false;
        }
        var fromEat = false;
        
        var newBody = SquareFactory.create('SnakeBody', this.head.x, this.head.y, 'deeppink');
        FOODLIST.splice(this.head.x - 1 + this.head.y - 1, 0);
        newBody.next = this.head.next;
        newBody.last = null;
        newBody.next.last = newBody;
        ground.remove(this.head.x, this.head.y);
        ground.add(newBody);


        var newHead = SquareFactory.create('SnakeHead', this.head.x + this.direction.x, this.head.y + this.direction.y, 'deeppink');
        FOODLIST.splice(this.head.x + this.direction.x - 1 + this.head.y + this.direction.y - 1, 0);
        newHead.next = newBody;
        newHead.last = null;
        ground.remove(this.head.x, this.head.y);
        ground.add(newHead);
        this.head = newHead;

        if (!fromEat) {
            var newFloor = SquareFactory.create('Floor', this.tail.x, this.tail.y, 'orange');
            var arr = [this.tail.x, this.tail.y];
            FOODLIST.splice(this.head.x + this.direction.x - 1 + this.head.y + this.direction.y - 1, 0, this.tail.x, this.tail.y);

            ground.remove(this.tail.x, this.tail.y)
            ground.add(newFloor);
            this.tail = this.tail.last;
        }

    },
    DIE: function () {
        clearInterval(snake.time);
        alert('game over')
    },
    EAT: function () {
        snake.flag = true;
        var fromEat = true;
        var newBody = SquareFactory.create('SnakeBody', this.head.x, this.head.y, 'deeppink');
        FOODLIST.splice(this.head.x - 1 + this.head.y - 1, 0);

        newBody.next = this.head.next;
        newBody.last = null;
        newBody.next.last = newBody;
        ground.remove(this.head.x, this.head.y);
        ground.add(newBody);


        var newHead = SquareFactory.create('SnakeHead', this.head.x + this.direction.x, this.head.y + this.direction.y, 'deeppink');
        FOODLIST.splice(this.head.x + this.direction.x - 1 + this.head.y + this.direction.y - 1, 0);

        newHead.next = newBody;
        newHead.last = null;
        ground.remove(this.head.x, this.head.y);
        ground.add(newHead);
        this.head = newHead;

        if (!fromEat) {
            var newFloor = SquareFactory.create('Floor', this.tail.x, this.tail.y, 'orange');
            ground.remove(this.tail.x, this.tail.y)
            var arr = [this.tail.x, this.tail.y];
            FOODLIST.splice(this.head.x + this.direction.x - 1 + this.head.y + this.direction.y - 1, 0, this.tail.x, this.tail.y);
            ground.add(newFloor);
            this.tail = this.tail.last;
        }

    }
}