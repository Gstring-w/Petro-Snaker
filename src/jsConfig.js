// 数据的初始化




// 横向系数 纵向系数
var XLEN = 30; 
var YLEN = 30;

// 格子宽度
var SQUAREWIDTH = 20;

// 游戏场景 广场 坐标
var BASE_X_POINT = 100;
var BASE_Y_POINT = 20;

// 设置游戏难度
// 蛇的移动速度
var INTERVAL = 300;


// 可生成食物的坐标（剔除蛇 墙 障碍物 防止随着蛇变长遍历更加困难）
var FOODLIST;


// 定义 基类
function Square(x, y, width,color,dom) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = width || 20;
    this.color = color || '#0ff'; 
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.touch = function (){
    // console.log('touch');
}



// 广场
var Ground = jsUti.simple(Square);

// 障碍物
var Stone = jsUti.simple(Square);

var Snake = jsUti.simple(Square);
// 蛇头
var SnakeHead = jsUti.simple(Square);
// 因为蛇是一个单例需要更改它的属性
SnakeHead.prototype.upDate = function (x, y) {
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top =y * SQUAREWIDTH + 'px';
    this.x = x;
    this.y = y; 
}

// 蛇身
var SnakeBody = jsUti.extend(Square);


var Floor = jsUti.extend(Square);
var Wall = jsUti.extend(Square);
var Food = jsUti.simple(Square);


// 策略模式定义的对象
 var TOUCHENUM= {
     MOVE : 'MOVE',
     EAT : 'EAT',
     DIE : 'DIE' 
 }