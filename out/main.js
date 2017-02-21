var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var c = document.getElementById("Mycanvas");
    var context = c.getContext("2d");
    context.fillStyle = "#FF0000";
    context.font = "20px Arial";
    ///////////底层容器
    var stage = new DisplayObjectContainer();
    stage.alpha = 0.5;
    ///////文字
    var textF = new TextField();
    textF.text = "Hello World";
    textF.x = 150;
    textF.y = 50;
    //////////图片
    var bitmap1 = new Bitmap();
    bitmap1.setSrc("1.jpg");
    bitmap1.x = 100;
    bitmap1.y = 100;
    bitmap1.alpha = 0.5;
    bitmap1.rotation = 30;
    stage.addChild(bitmap1);
    stage.addChild(textF);
    bitmap1.scaleX = 0.5;
    setInterval(function () {
        textF.y += 10;
        bitmap1.x += 10;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, 800, 800);
        stage.draw(context);
    }, 500);
};
var DisplayObject = (function () {
    function DisplayObject() {
        //坐标
        this.x = 0;
        this.y = 0;
        //透明度
        this.alpha = 1;
        this.globalAlpha = 1;
        //scale
        this.scaleX = 1;
        this.scaleY = 1;
        //旋转(度数 0~360)
        this.rotation = 0;
        /////////////////矩阵
        this.matrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        //父容器
        this.parent = null;
    }
    DisplayObject.prototype.draw = function (context) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        //alpha变化
        if (this.parent) {
            //alpha变化
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            //矩阵变化
            this.globalMatrix = math.matrixAppendMatrix(this.parent.globalMatrix, this.matrix); //this.parent.globalMatrix * this.matrix;
        }
        else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;
        }
        context.globalAlpha = this.globalAlpha;
        var gMatrix = this.globalMatrix;
        context.setTransform(gMatrix.a, gMatrix.b, gMatrix.c, gMatrix.d, gMatrix.tx, gMatrix.ty);
        this.render(context);
    };
    DisplayObject.prototype.render = function (context) { };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.CanvasArray = [];
    }
    DisplayObjectContainer.prototype.addChild = function (newObject) {
        this.CanvasArray.push(newObject);
        newObject.parent = this;
    };
    DisplayObjectContainer.prototype.removeChild = function (displayObject) {
        var copyArray = this.CanvasArray;
        for (var _i = 0, _a = this.CanvasArray; _i < _a.length; _i++) {
            var arrayobject = _a[_i];
            if (arrayobject == displayObject) {
                var objectIndex = this.CanvasArray.indexOf(arrayobject);
                copyArray.splice(objectIndex, 1);
                break;
            }
        }
        this.CanvasArray = copyArray;
    };
    DisplayObjectContainer.prototype.render = function (context) {
        for (var _i = 0, _a = this.CanvasArray; _i < _a.length; _i++) {
            var c = _a[_i];
            c.draw(context);
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
/*
      位图
*/
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        // src = "";
        this.Img = new Image();
        this.isLoaded = false;
    }
    Bitmap.prototype.setSrc = function (src) {
        var _this = this;
        this.Img.src = src;
        this.Img.onload = function () {
            console.log("加载");
            _this.isLoaded = true;
        };
        // this.isLoaded = true;
    };
    Bitmap.prototype.render = function (context) {
        var _this = this;
        if (this.isLoaded) {
            console.log("不需要加载");
            context.drawImage(this.Img, 0, 0);
        }
        else {
            this.Img.onload = function () {
                console.log("需要加载");
                context.drawImage(_this.Img, 0, 0);
            };
            this.isLoaded = true;
        }
    };
    return Bitmap;
}(DisplayObject));
/*
      文本框
 */
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "space";
    }
    TextField.prototype.render = function (context) {
        // var textField = new TextField();
        context.fillText(this.text, 0, 0);
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=main.js.map