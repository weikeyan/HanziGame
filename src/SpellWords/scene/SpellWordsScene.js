var SpellWordsLayer = cc.Layer.extend({

    _listView:null,
    _labelArray:null,
    _lastLabel:null,
    _lastCount:-1,

    _node1Text:null,
    _node2Text:null,
    _node3Text:null,


    ctor:function() {
        this._super();

        this._labelArray = [];

        var layer = new cc.LayerColor(cc.color(123,204,204,255));
        layer.x = 0;
        layer.y = 0;
        layer.setAnchorPoint(0,0);
        this.addChild(layer);

        var size = cc.winSize;

        var list = ['做','哟','人','朱','前','后','做','哟','人','朱','诸'];

        // var list = ["1","2","3","4","5","6","7","8","9","10"];
        list.reverse();
        var definition = {
            size:cc.size(60,125),
            items:list,
            backGround: res.back
        };
        var node = new ScrollSelector(definition);
        var self = this;
         node._didSelectTextBlk(function(value){
            self._node1Text = value;
            self.didSelectCompleted();
         })
        node.x =100;
        node.y =100 ;
        this.addChild(node,10);

        var list1 = ['做','哟','人','朱','前','后','做','哟','人','朱','葛'];

        // var list = ["1","2","3","4","5","6","7","8","9","10"];
        list1.reverse();
        var definition = {
            size:cc.size(60,125),
            items:list1,
            backGround: res.back
        };
        var node1 = new ScrollSelector(definition);
        node1._didSelectTextBlk(function(value){
            self._node2Text = value;
            self.didSelectCompleted();

        })
        node1.x =160;
        node1.y =100 ;
        this.addChild(node1,10);

        var list2 = ['做','哟','人','朱','前','后','做','哟','人','朱','亮'];

        // var list = ["1","2","3","4","5","6","7","8","9","10"];
        list2.reverse();
        var definition = {
            size:cc.size(60,125),
            items:list2,
            backGround: res.back
        };
        var node2 = new ScrollSelector(definition);
        node2._didSelectTextBlk(function(value){
            self._node3Text = value;
            self.didSelectCompleted();

        })
        node2.x =220;
        node2.y =100 ;
        this.addChild(node2,10);

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setTitleFontSize(20);
        button.setPressedActionEnabled(true);
        button.setTitleText("Back");
        button.x = 50;
        button.y = GC.h-20;
        var self = this;
        button.addTouchEventListener(function(){
            cc.director.runScene(new cc.TransitionFade(0.3, new MainMenuScene()));


        },this);
        this.addChild(button,10);

        return;

        var nodes = [];
        for(var i=1; i<=3; i++){
            // var sprite = new cc.Sprite(res.HelloWorld_png);
            // nodes.push(sprite);

            var label = new cc.LabelTTF(items[i],'Arial', 30);
            label.setAnchorPoint(0.5,0.5);
            label.setContentSize(100,35);
            // label.x = 50;
            // label.y =(10+(35+10)*items.length)-(10+(35+10)*i)-17.5;
            // // label.y =(10+(35+10)*i)+17.5;
            //
            // // (10+(40+10)*items.length)-
            label.color = cc.color.BLACK;
            nodes.push(label);

            // listView.addChild(label,2);
            // this._labelArray.push(label);
        }

        var cycleScroll = new CycleScroll(cc.size(100,150), nodes, nodes[0].getContentSize().height+20);
        cycleScroll.x = 100;
        cycleScroll.y = 100;
        this.addChild(cycleScroll);

        return;
        var listView = new PickerView();
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setBounceEnabled(true);
        listView.setTouchEnabled(true);
        listView.setClippingEnabled(false);
        // listView.setInertiaScrollEnabled(false);
        // listView
        // listView.setSize(cc.size(512, 200));
        // listView.setContentSize(100,(35+10)*3-10);
        listView.setContentSize(100,45);

        listView.x = GC.w_2;
        listView.y = GC.h_2;
        // listView.
        listView.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(listView);
        // listView.setInnerContainerSize(cc.size(100, 10+(40+10)*items.length));
        listView.setInnerContainerSize(cc.size(100, 10+(35+10)*items.length));

        this._listView = listView;
        var self = this;

        var topLayer = new cc.LayerColor(cc.color.GRAY);
        topLayer.x = listView.getPosition().x-50;
        topLayer.y = listView.getPosition().y+25+(35+10)*1-12;
        topLayer.setAnchorPoint(0.5,0);
        topLayer.setContentSize(100,100);
        // this.addChild(topLayer,2);

        var downLayer = new cc.LayerColor(cc.color.BLACK);
        downLayer.x = listView.getPosition().x-50;
        downLayer.y = listView.getPosition().y-100-26-(35+10)*1-2;
        downLayer.setAnchorPoint(0.5,1);
        downLayer.setContentSize(100,100);

        // this.addChild(downLayer,2);

        listView.addEventListener(function(sender,type){
            switch (type){
                case ccui.ScrollView.EVENT_SCROLLING:
                {

                }

                    break;

                case ccui.ScrollView.EVENT_CONTAINER_MOVED:
                {
                    var scrollView = sender;
                    var offset = scrollView.getInnerContainerPosition();
                    // (10+(40+10)*items.length)-(10+(40+10)*i)

                    var offset_y = scrollView.getInnerContainerSize().height-scrollView.getContentSize().height + offset.y;

                    console.log('offset_y>>>>>',offset_y);

                    if (offset_y<0){
                    }else {

                    }

                    // return;

                    var count = Math.floor(offset_y /(35+10));

                    var maxWidth = 40;
                    var minWidth = 30;
                    var countOffset = offset_y-count*(35+10);

                        var offsetRait = 1;
                        if (countOffset != 0){
                            offsetRait = 1- countOffset/(35+10);
                        }

                        var showingLab = null;
                        if (count >= 0 && count < self._labelArray.length-1){
                            showingLab = self._labelArray[count];
                        }

                        if (showingLab){

                            // showingLab.setPosition(cc.p((maxWidth-minWidth)*(1-offsetRait)+20,showingLab.getPosition().y));
                            showingLab.setContentSize(minWidth+
                                (maxWidth-minWidth)*offsetRait,showingLab.height);
                            showingLab.setFontSize(minWidth+
                                (maxWidth-minWidth)*offsetRait);

                        }

                        if (count < items.length-1){
                            var nextLab = self._labelArray[count+1];
                            if (nextLab){

                                // nextLab.setPosition(cc.p((maxWidth-minWidth)*offsetRait+20,nextLab.getPosition().y));
                                // nextLab.setContentSize(minWidth+
                                //     (maxWidth-minWidth)*(1-offsetRait),nextLab.height);
                                nextLab.setFontSize(minWidth+
                                    (maxWidth-minWidth)*(1-offsetRait));

                            }
                        }
                        if (count > 0){

                            var lastLab = self._labelArray[count - 1];

                            // lastLab.x = (maxWidth-minWidth)*(1-offsetRait);
                            // lastLab.setPosition(cc.p((maxWidth-minWidth)+20,lastLab.getPosition().y));
                            lastLab.setContentSize(minWidth,lastLab.height);
                            // lastLab.setFontSize(lastLab.width);

                            lastLab.setFontSize(minWidth);

                        }

                        if (count<self._labelArray.length-2){
                            // var next2Lab = self._labelArray[count + 2];
                            // // next2Lab.x = (maxWidth-minWidth)*(1-offsetRait);
                            // next2Lab.setPosition(cc.p((maxWidth-minWidth),lastLab.getPosition().y));
                            // next2Lab.setContentSize(minWidth,next2Lab.height);
                            // // next2Lab.setFontSize(next2Lab.width);
                            //
                            // next2Lab.setFontSize(minWidth);

                        }

                        for (var i = 0;i<self._labelArray.length;i++) {
                            if (i!=count && i!=count+1&& i!=count-1 &&i!=count+2) {
                                var lab = self._labelArray[i];
                                // lab.setRect()
                                //lab.setPosition(cc.p((maxHeight-minHeight),lab.y));
                                //lab.setContentSize(minHeight,lab.height);

                            }
                        }

                }

                    break;
                default:
                    break;
            }

        });


        for(var i =0; i < items.length; i++){

            var label = new cc.LabelTTF(items[i],'Arial', 30);
            label.setAnchorPoint(0.5,0.5);
            label.setContentSize(100,35);
            label.x = 50;
            label.y =(10+(35+10)*items.length)-(10+(35+10)*i)-17.5;
            // label.y =(10+(35+10)*i)+17.5;

            // (10+(40+10)*items.length)-

            label.color = cc.color.BLACK;
            listView.addChild(label,2);
            this._labelArray.push(label);
            // cc.log('11111',label.getContentSize().width,label.getContentSize().height);
        }

        // cc.log('scrollview>>>>',listView._contentOffset.x);
        // this.scheduleUpdate();


        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setTitleFontSize(20);
        button.setPressedActionEnabled(true);
        button.setTitleText("up");
        button.x = 50;
        button.y = GC.h-20;
        var self = this;

        var _count = 3;
        // self._listView.scrollToPercentVertical(100,0,false);

        button.addTouchEventListener(function(sender,type){
            // self._listView.scrollTo(cc.p(0, 0), 1, true);
            if (ccui.Widget.TOUCH_ENDED==type){
                _count++;
                if (_count>=items.length){
                    _count = 0;
                    self._listView.scrollToPercentVertical(0,0.0,true);

                }else {
                    self._listView.scrollToPercentVertical((Math.ceil(100/items.length))*_count,1,true);

                }
            }
            },this);
        this.addChild(button,10);

        var button1 = new ccui.Button();
        button1.setTouchEnabled(true);
        button1.setTitleFontSize(20);
        button1.setPressedActionEnabled(true);
        button1.setTitleText("down");
        button1.x = 100;
        button1.y = GC.h-20;
        button1.addTouchEventListener(function(sender,type){
            if (ccui.Widget.TOUCH_ENDED==type){
                _count--;
                if (_count<=0){
                    _count = items.length;
                    self._listView.scrollToPercentVertical(0,0.0,false);

                }else {
                    self._listView.scrollToPercentVertical(Math.ceil(100/items.length)*_count,1,true);

                }
            }

        },this);
        this.addChild(button1,10);

    },

    didSelectCompleted:function(){
        var text1 = this._node1Text;
        var text2 = this._node2Text;
        var text3 = this._node3Text;

        if (text1 == '诸'&&text2 == '葛'&&text3 == '亮'){
            var alert =  new HitMouseAlert();
            alert.createSuccessAlert();
            alert.attr({
                x: (GC.w-200)/2,
                y: (GC.h-100)/2,
            });
            alert.setContentSize(200,100);

            this.addChild(alert,13);
            setTimeout(function(){
                alert.removeFromParent();
            }, 1000);
        }

    },

    update:function(dt){
        // cc.log(this._listView._contentOffset.y);
    },


});

var SpellWordsScene = cc.Scene.extend({

    onEnter:function () {

        this._super();
        var layer = new SpellWordsLayer();
        this.addChild(layer);
    }
});