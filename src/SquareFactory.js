

// 工厂模式 生产不同种类的对象 以实现统一的管理（添加一个 或者删除）


var SquareFactory = function (){
}

// 工厂制造一个对象的入口
SquareFactory.create = function (type,x,y,color){
   
   if (typeof SquareFactory[type] !== "function") {
       throw "Error";
   }

   var result = SquareFactory[type](x, y,color);
   return result;
}

// 工厂产出的对象初始化
SquareFactory.init = function (square,strategy){
     square.viewContent.style.position = 'absolute';
     square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
     square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
     square.viewContent.style.width = square.width + 'px';
     square.viewContent.style.height = square.height + 'px';
     square.viewContent.style.backgroundColor = square.color;
     square.touch = function (){
         return strategy;
     }
}



// 生产floor
SquareFactory.Floor = function(x,y,color){
    var floor  = new Floor(x,y,SQUAREWIDTH,color,document.createElement('div'));
    this.init(floor, TOUCHENUM.MOVE);
    return floor;
}

//生产 墙
SquareFactory.Wall = function(x,y,color){
  
    var wall = new Wall(x,y,SQUAREWIDTH,color,document.createElement('div'));
    this.init(wall, TOUCHENUM.DIE);
    return wall;
}

// 生产食物
SquareFactory.Food  = function(x,y,color){
     var food = new Wall(x, y, SQUAREWIDTH, color, document.createElement('div'));
     this.init(food, TOUCHENUM.EAT);
     return food;
}

// 生产蛇头
SquareFactory.SnakeHead = function(x,y,color){
     var snakeHead = new SnakeHead(x, y, SQUAREWIDTH, color, document.createElement('div'));
     this.init(snakeHead);
     snakeHead.upDate(x,y)
     return snakeHead;
}

// 生产 蛇身
SquareFactory.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, SQUAREWIDTH, color, document.createElement('div'));
    this.init(snakeBody, TOUCHENUM.DIE);
    return snakeBody;
}
