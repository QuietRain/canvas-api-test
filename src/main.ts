window.onload = () => {

    var c = document.getElementById("Mycanvas") as HTMLCanvasElement
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
    bitmap.Img.src = "1.jpg"
    bitmap.x = 100;
    bitmap.y = 100;
    stage.addChild(textF);
    stage.addChild(bitmap);
    stage.draw(cxt);

    setInterval(() => {
        textF.x += 10;
        bitmap.x += 10;
        cxt.clearRect(0, 0, 800, 800);
        stage.draw(cxt);
    }, 500)


};

interface Drawable {
    draw(context: CanvasRenderingContext2D);
}


class DisplayObjectContainer implements Drawable {

    x: number = 0;
    y: number = 0;

    CanvasArray: DisplayObjectContainer[] = [];

    addChild(newContext: DisplayObjectContainer) {
        this.CanvasArray.push(newContext);
    }

    draw(context: CanvasRenderingContext2D) {

        for (let c of this.CanvasArray) {
            c.draw(context);
        }
    }
}

class Bitmap extends DisplayObjectContainer {
    Img = new Image();
    draw(context: CanvasRenderingContext2D) {
        if (!this.Img.onload) {
            this.Img.onload = () => {
                context.drawImage(this.Img, this.x, this.y);
                console.log("a")
            }
        }
        context.drawImage(this.Img, this.x, this.y);
        console.log("b")
    }
}

class TextField extends DisplayObjectContainer {
    text: string = "space";

    draw(context: CanvasRenderingContext2D) {
        var textField = new TextField();

        context.fillText(this.text, this.x, this.y);
        // this.text.
    }
}
