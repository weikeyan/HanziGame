
var outlineDictionary = [];

var DrawLayer = cc.Layer.extend({
    bgSprite:null,
    hanziSprite:null,

    ctor:function(){
        this._super();

        var size = cc.winSize;
        this.bgColor = cc.color.WHITE;



        var drawNode =new cc.DrawNode();

        this.drawNode = drawNode;
        // this.addChild(drawNode,10);

        // this.addTouchEventListener();

        // var label = new cc.LabelTTF("飞", "STKaiti", 350);
        // label.x = 400;
        // label.y = 400;
        // // label.setString("aaaaa");
        // label.enableStroke(cc.color.RED,1);
        // label.outlineWidth = 1;
        // label.color = cc.color.WHITE;
        // label.outlineColor = cc.color.WHITE;
        // this.addChild(label,0);



        // add bg
        this.bgSprite = new cc.Sprite(res.Drw_png,cc.rect(0,0,size.width,size.height));
        this.bgSprite.attr({
            x : size.width / 2,
            y: size.height / 2,

        });
        this.bgSprite.setTextureRect(cc.rect(0,0,size.width,size.height));
        this.addChild(this.bgSprite, 0);

        cc.log("winSize>>>>>bgSpriteSize>>>>>>",size,this.bgSprite.getBoundingBox());

        // auto sprite_pai_back = Sprite::create("lianhuan_button_sure.png");
        // sprite_pai_back->setPosition(size.width/2,size.height/2);
        // sprite_pai_back->setAnchorPoint(Point(0.5,0.5));
        // //根据缩放设置实际大小
        // Size size_pai = sprite_pai_back->getContentSize();
        // //根据实际宽度和总宽度，计算期望缩放比率
        // float scaleX_pai = (float)size.width*0.1f / (float)size_pai.width;
        // float scaleY_pai = (float)size.height*0.1f / (float)size_pai.height;


        this.hanziSprite = new wordSprite(res.Font_png);
        cc.log("size>>>>",size);
        this.hanziSprite.attr({
            x :0,
            y: 0,
            // x:(size.width-320)/2,
            // y:(size.height-320)/2,
            anchorX:0,
            anchorY:0,
        });


        // this.hanziSprite.setContentSize(400,400);
         var  size_hanzi = this.hanziSprite.getContentSize();
         let  scaleX = 320/size_hanzi.height;
         let  scaleY = 320/size_hanzi.height;

        this.hanziSprite.setScale(scaleX,scaleY);

        this.hanziSprite.setColor(cc.color.WHITE);
        this.bgSprite.addChild(this.hanziSprite, 10);

        cc.log("hanziSize>>>>>>",this.hanziSprite.getBoundingBox(),this.hanziSprite.getPosition());

        //文字

        // cc.loader.loadTxt("res.Font_png",function(err,data){
        //     if(err){
        //         return console.log("load failed");
        //     }
        //     else {
        //         cc.log("load success");
        //
        //     }
        // });
        // jsb.fileUtils.fullPathFromRelativeFile(res.Res_Trace);

        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function(){
                console.log("menu is clicked");

             // this.hanziSprite.removeFromParent();

                // cc.director.replaceScene( cc.TransitionPageTurn(1, new PlayScene(), false) );
this.hanziSprite.reset();

                // var transition=new cc.TransitionPageTurn(1,(new PlayScene()),true);
                // cc.director.pushScene(new cc.TransitionPageTurn(2,(new DrawScene()),false));

            },this);

        startItem.attr({
            x:size.width/2+100,
            y:size.height/2,
            scale:0.2,
            anchorX:0.5,
            anchorY:0.5
        });

        var  menu = new cc.Menu(startItem);
        // menu.setContentSize(100,100);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);
        // var button = new ccui.Button(res.Start_N_png);
        // button.setTouchEnabled(true);
        // button.setTitleText("button text");
        // // button.loadTextures();
        // button.x = 400;
        // button.y = 200;
        // // button.addTouchEventListener(this.touchEvent, this);
        // this.addChild(button);
        //

        return true;
    },

    rect:function(){
        // this._super();

    },

    getDots:function(){
        var dotArray = [];
        // var pathArray = ["M 494 476 Q 542 485 795 501 Q 817 502 822 512 Q 826 525 808 540 Q 750 580 707 569 Q 631 550 500 522 L 436 509 Q 331 490 213 469 Q 189 465 208 447 Q 241 420 294 432 Q 357 453 431 465 L 494 476 Z","M 487 437 Q 491 456 494 476 L 500 522 Q 510 711 528 763 Q 534 776 523 786 Q 501 805 459 822 Q 434 832 414 825 Q 390 816 410 796 Q 444 762 444 726 Q 445 602 436 509 L 431 465 Q 398 275 310 179 Q 303 173 297 166 Q 251 118 148 55 Q 133 48 130 43 Q 124 36 144 34 Q 195 34 300 104 Q 385 173 414 218 Q 444 266 480 396 L 487 437 Z","M 480 396 Q 501 357 575 245 Q 657 124 718 56 Q 746 22 774 22 Q 856 28 928 32 Q 959 33 959 41 Q 960 50 927 66 Q 753 144 719 174 Q 614 267 500 419 Q 493 429 487 437 L 480 396 Z"];
        var pathArray = ["M 494 476 Q 542 485 795 501 Q 817 502 822 512 Q 826 525 808 540 Q 750 580 707 569 Q 631 550 500 522 L 436 509 Q 331 490 213 469 Q 189 465 208 447 Q 241 420 294 432 Q 357 453 431 465 L 494 476 Z"];
        var pathContent = pathArray[0];
        var finalPathArray = pathContent.split(" ");

        var ratio = this.getStrokeRatio();

        var  counter = 0;
        var offset = cc.winSize.height+480*ratio;
        cc.log("offset",offset);
        var lastPos = cc.p;

        let lineWidth = 2;
        cc.log(finalPathArray.length);
        while (counter < finalPathArray.length){
            var token = finalPathArray[counter];
            if (token == "M"){
                var x = finalPathArray[counter+1]*ratio;
                var y = cc.winSize.height-finalPathArray[counter+2]*ratio;

                cc.log("y>>>>>>",x,y,finalPathArray[counter+2]*ratio);
                // this.drawNode.drawDot(cc.p(x,offset -y),lineWidth,cc.color.BLUE);
                // lastPos = cc.p(x,offset-y);
                counter += 3;
                dotArray.push([x,offset-y]);
            }
            if (token == "Q"){
                var x1 = finalPathArray[counter+1]*ratio;
                var y1 = cc.winSize.height- finalPathArray[counter+2]*ratio;
                var x2 = finalPathArray[counter+3]*ratio;
                var y2 = cc.winSize.height - finalPathArray[counter+4]*ratio;

                // this.drawNode.drawQuadBezier(lastPos, cc.p(x1,offset-y1), cc.p(x2,offset-y2), 50, lineWidth, cc.color.RED);
                // lastPos = cc.p(x2,offset-y2);
                // this.shape
                counter += 5;
                dotArray.push([x2,offset-y2]);

            }
            if (token == "L"){
                var x = finalPathArray[counter+1]*ratio;
                var y =cc.winSize.height- finalPathArray[counter+2]*ratio;

                // this.drawNode.drawSegment(lastPos,cc.p(x,offset-y),lineWidth,cc.color.RED);
                counter += 3;
                dotArray.push([x,offset-y]);

            }
            if (token == "Z"){
                break;
            }

        }
        return dotArray;
    },

    makeMedian:function(index){
        let lineWidth = 2;

        var medians = [[[210,458],[268,453],[514,503],[719,534],[770,529],[810,517]],[[416,810],[444,799],[482,759],[469,518],[448,394],[426,320],[386,231],[361,196],[307,140],[202,67],[138,41]],[[486,430],[500,393],[576,284],[660,182],[722,118],[774,77],[953,42]]];

        var pathArray = medians;

        var finalPathArray = pathArray[index];

        var ratio = this.getStrokeRatio();

        var offset = cc.winSize.height+480*ratio;

        var lastPos = cc.p;
        for (var i = 0;i<finalPathArray.length;i++){
            var token = finalPathArray[i];
            var x = token[0]*ratio;
            var y =cc.winSize.height - token[1]*ratio;

            if (i == 0){
                this.drawNode.drawDot(cc.p(x,offset -y),lineWidth,cc.color.BLUE);
                lastPos = cc.p(x,offset -y);

            } else {

                this.drawNode.drawSegment(lastPos,cc.p(x,offset-y),lineWidth,cc.color.WHITE);
                lastPos = cc.p(x,offset -y);
            }
            // cc.PathConstraintData()

              // new cc.Sprite();
        }
    },

    makePath:function(index){
        // var pathArray = outlineDictionary["strokes"];
        var medians = [[[210,458],[268,453],[514,503],[719,534],[770,529],[810,517]],[[416,810],[444,799],[482,759],[469,518],[448,394],[426,320],[386,231],[361,196],[307,140],[202,67],[138,41]],[[486,430],[500,393],[576,284],[660,182],[722,118],[774,77],[953,42]]];
        // var pathArray = ["M 494 476 Q 542 485 795 501 Q 817 502 822 512 Q 826 525 808 540 Q 750 580 707 569 Q 631 550 500 522 L 436 509 Q 331 490 213 469 Q 189 465 208 447 Q 241 420 294 432 Q 357 453 431 465 L 494 476 Z","M 487 437 Q 491 456 494 476 L 500 522 Q 510 711 528 763 Q 534 776 523 786 Q 501 805 459 822 Q 434 832 414 825 Q 390 816 410 796 Q 444 762 444 726 Q 445 602 436 509 L 431 465 Q 398 275 310 179 Q 303 173 297 166 Q 251 118 148 55 Q 133 48 130 43 Q 124 36 144 34 Q 195 34 300 104 Q 385 173 414 218 Q 444 266 480 396 L 487 437 Z","M 480 396 Q 501 357 575 245 Q 657 124 718 56 Q 746 22 774 22 Q 856 28 928 32 Q 959 33 959 41 Q 960 50 927 66 Q 753 144 719 174 Q 614 267 500 419 Q 493 429 487 437 L 480 396 Z"];
        var pathArray = ["M 494 476 Q 542 485 795 501 Q 817 502 822 512 Q 826 525 808 540 Q 750 580 707 569 Q 631 550 500 522 L 436 509 Q 331 490 213 469 Q 189 465 208 447 Q 241 420 294 432 Q 357 453 431 465 L 494 476 Z"];
        var pathContent = pathArray[index];
        var finalPathArray = pathContent.split(" ");

        var ratio = this.getStrokeRatio();

        var  counter = 0;
        var offset = cc.winSize.height+480*ratio;
        cc.log("offset",offset);
        var lastPos = cc.p;

        let lineWidth = 2;
        cc.log(finalPathArray.length);
        while (counter < finalPathArray.length){
            var token = finalPathArray[counter];
            if (token == "M"){
                var x = finalPathArray[counter+1]*ratio;
                var y = cc.winSize.height-finalPathArray[counter+2]*ratio;

                //cc.log("y>>>>>>",x,y,finalPathArray[counter+2]*ratio);
                this.drawNode.drawDot(cc.p(x,offset -y),lineWidth,cc.color.BLUE);
                lastPos = cc.p(x,offset-y);
                counter += 3;

            }
            if (token == "Q"){
                var x1 = finalPathArray[counter+1]*ratio;
                var y1 = cc.winSize.height- finalPathArray[counter+2]*ratio;
                var x2 = finalPathArray[counter+3]*ratio;
                var y2 = cc.winSize.height - finalPathArray[counter+4]*ratio;

                this.drawNode.drawQuadBezier(lastPos, cc.p(x1,offset-y1), cc.p(x2,offset-y2), 50, lineWidth, cc.color.RED);
                lastPos = cc.p(x2,offset-y2);
                counter += 5;
            }
            if (token == "L"){
                var x = finalPathArray[counter+1]*ratio;
                var y =cc.winSize.height- finalPathArray[counter+2]*ratio;

                this.drawNode.drawSegment(lastPos,cc.p(x,offset-y),lineWidth,cc.color.RED);
                counter += 3;
            }
            if (token == "Z"){
                break;
            }
        }

    },

    getStrokeRatio:function(){
        var size = cc.visibleRect;
        var max_size = Math.min(size.width,size.height);
        return max_size/1024;
    },

    // addTouchEventListener:function(){
    //     var  that = this;
    //     var lastPoint = null;
    //     cc.log(this);
    //     var lineWidth = 1;
    //
    //     this.touchListener = cc.EventListener.create({
    //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //         swallowTouches: true,
    //
    //         onTouchBegan: function (touch, event) {
    //             var pos = touch.getLocation();
    //             var target = event.getCurrentTarget();
    //             console.log("bg touch>>>>>>>",pos);
    //             // pos.y+=300;
    //             //that.drawNode.drawDot(cc.p(pos.x,pos.y),lineWidth,cc.color.RED);
    //             lastPoint = pos;
    //             // console.log("touch+++++++",that.pointsInPolygon(that.getDots(),[pos.x,pos.y]));
    //
    //             return true;
    //         },
    //
    //         onTouchMoved: function (touch,event) {
    //
    //
    //             var pos = touch.getLocation();
    //             // pos.y+=300;
    //
    //             console.log("move>>>>>>>",pos);
    //
    //             var lastPos = touch.getPreviousLocation();
    //
    //             // console.log(this.drawNode.getPreviousLocation());
    //             //that.drawNode.drawSegment(cc.p(lastPos.x,lastPos.y),cc.p(pos.x,pos.y),lineWidth,cc.color.RED);
    //
    //             // that.drawNode.contains
    //             // cc.log(pos);
    //
    //             console.log("bg move+++++++",that.pointsInPolygon(that.getDots(),[pos.x,pos.y]));
    //
    //
    //             return true;
    //
    //         },
    //
    //     });
    //     cc.eventManager.addListener(this.touchListener,this);
    //
    // },



})

var DrawScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new DrawLayer();
        this.addChild(layer);

    }
});