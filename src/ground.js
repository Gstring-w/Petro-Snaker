var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, "#0ff", document.createElement('div'));

// 广场区域
Ground.prototype.show = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = this.color;
    document.body.appendChild(this.viewContent);




    var newSquare;

    // 添加一个地图属性 的数组
    this.contentList = new Array(XLEN);

    // 包含可以是食物的x y 坐标的数组
    FOODLIST = new Array();

    // 生成墙和地板
    for (var i = 0; i < XLEN; i++) {
        this.contentList[i] = new Array(YLEN);

        for (var j = 0; j < YLEN; j++) {
            if (i == 0 || j == 0 || i == XLEN - 1 || j == YLEN - 1) {
                newSquare = SquareFactory.create('Wall', j, i, 'black');
            } else {
                newSquare = SquareFactory.create('Floor', j, i, 'orange')
                var arr = [j, i]
                FOODLIST.push(arr)
            }
            this.contentList[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent)
        }
    }
}

//拆地板
Ground.prototype.remove = function (x, y) {

    this.viewContent.removeChild(this.contentList[y][x].viewContent);
    this.contentList[y][x] = null;
}
//换地板
Ground.prototype.add = function (option) {
    if (!this.contentList[option.y][option.x]) {
        this.contentList[option.y][option.x] = option;
        this.viewContent.appendChild(this.contentList[option.y][option.x].viewContent);
    }
}
Ground.prototype.init = function () {
    this.show();
    console.log(FOODLIST)
}
ground.init();