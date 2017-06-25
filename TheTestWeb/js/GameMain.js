
//Game对象,直接用于管理整个游戏
function Game(canvasid) {
    var gameobj = this;

    this.canvasid = canvasid;
    this.Start = function () {
        this._Init();
        this.Init();
        this._Main();
    }

    this._Main = function () {
        setInterval(function () {
            gameobj._RunLoop();
        }, 1);
    }

    this._Init = function () {
        this._gFps = 1000;//fps 用于记录当前fps
        this._gThen = Date.now();
        this._chageRate = 1;
        this.canvas = document.getElementById(this.canvasid);
        this.width = parseInt($(this.canvas).width());
        this.height = parseInt($(this.canvas).height());
        this.ui = new YGameUI(this.canvas);
        this.nowPage = null;
    }

    this.Init = function () { }

    this.ChangePage = function (gamepage) {
        //先删除旧的页面
        if (this.nowPage != null) {
            delete this.nowPage;
        }
        this.nowPage = gamepage;
    }

    this._RunLoop = function () {
        var now = Date.now();
        var delta = now - this._gThen;
        this._gFps = 1000 / delta;
        while (this._gFps > 120) {
            now = Date.now();
            delta = now - this._gThen;
            this._gFps = 1000 / delta;
        }
        this._chageRate = delta / 1000;//经过的时间，用于标准化速度
        this._gThen = now;

        this.ui.clearRect(0, 0, this.width, this.height); //刷图

        if (this.nowPage != null) {
            this.nowPage.Loop(this._chageRate);
        }

        this.ui.fillText(this._gFps + "fps", this.width - 30, 10, this.height);//fps
    }
}

//一个页面，同一时间只能有一个页面
function YGamePage() {
    this.Loop = function () {
        alert("No Loop");
        return;
    }

    return this;
}

function YGameUI(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.save(); //在这里开始绘制坦克
    this.context.beginPath();
    //this.context.lineWidth = 5;
    //this.context.stroke();
    //this.context.restore();

    this.clearRect = function (x, y, w, h) {
        this.context.clearRect(x, y, w, h); //刷图
    }

    this.fillText = function (test, x, y, h) {
        this.context.fillText(test, x, y, h); 
    }



    return this;
}