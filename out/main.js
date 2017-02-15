var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var c = document.getElementById("Mycanvas");
    var cxt = c.getContext("2d");
    cxt.fillStyle = "#FF0000";
    cxt.font = "20px Arial";
    // cxt.fillRect(0, 0, 150, 75);
    var stage = new DisplayObjectContainer();
    var textF = new TextField();
    textF.text = "Hello World";
    textF.x = 150;
    textF.y = 50;
    // var img = new Image();
    var bitmap = new Bitmap();
    bitmap.Img.src = "1.jpg";
    bitmap.x = 100;
    bitmap.y = 100;
    stage.addChild(textF);
    stage.addChild(bitmap);
    stage.draw(cxt);
    setInterval(function () {
        textF.x += 10;
        bitmap.x += 10;
        cxt.clearRect(0, 0, 800, 800);
        stage.draw(cxt);
    }, 500);
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.x = 0;
        this.y = 0;
        this.CanvasArray = [];
    }
    DisplayObjectContainer.prototype.addChild = function (newContext) {
        this.CanvasArray.push(newContext);
    };
    DisplayObjectContainer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.CanvasArray; _i < _a.length; _i++) {
            var c = _a[_i];
            c.draw(context);
        }
    };
    return DisplayObjectContainer;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.Img = new Image();
    }
    Bitmap.prototype.draw = function (context) {
        var _this = this;
        if (!this.Img.onload) {
            this.Img.onload = function () {
                context.drawImage(_this.Img, _this.x, _this.y);
                console.log("a");
            };
        }
        context.drawImage(this.Img, this.x, this.y);
        console.log("b");
    };
    return Bitmap;
}(DisplayObjectContainer));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "space";
    }
    TextField.prototype.draw = function (context) {
        var textField = new TextField();
        context.fillText(this.text, this.x, this.y);
        // this.text.
    };
    return TextField;
}(DisplayObjectContainer));
//# sourceMappingURL=main.js.map