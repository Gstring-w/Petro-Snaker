
// 公共方法的提取


var jsUti = {
    // 继承（并且可以继承父类属性）
    extend:function (origin){                             
        
        var result = function (){
            origin.apply(this,arguments)
        }
        this.inherit(result,origin)
        return result;
    },


    // 继承（不可访问父类的属性，只可以访问父类原型上的属性和方法）
    inherit: function(target,origin){
        var temp = function (){}
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },


    // 返回一个构造函数 如果传入一个对象 则会继承这个对象
    simple: function (origin){
        var res = null;
        var result = function(){
            if(res !== null){
                return res;
            }
            origin && origin.apply(this,arguments);
            res = this
        }
        origin && this.inherit(result,origin);
        return result
    }
}

