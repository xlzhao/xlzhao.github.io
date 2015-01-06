/**
 * 帧管理类
 */

(function ($, win) {
    var exports = win;

    var Frame = function (name, time, animation, describe) {
        // 实现(name, time, describe)的构造函数重载
        if(typeof animation === 'string') {
            describe = animation;
            animation = null;
        }

        this.name = name || '';
        this.time = time || 0;
        this.animation = animation;
        this.describe = describe || '';
        this.interval = null;
    };

    Frame.prototype = {
        constructor: Frame,
        animate: function () {
            if(typeof this.animation === 'function') 
                this.interval = this.animation.call(this, arguments);
        },
        stop: function () {
            if(this.interval) {
                win.clearInterval(this.interval);
                this.inteval = null;
            }
        }
    };

    var FrameFlow = function (step) {
        this.timer = null;
        // 步进值，单位秒
        this.step = step || 0.25;
        this.time = 0;
        // 未执行的帧
        this.frames = [];
        // 已经开始执行的帧（无法知道有没有结束）
        this.framesHasBegun = [];
    };

    FrameFlow.prototype = {
        constructor: FrameFlow,
        add: function (frame) {
            frame.flow = this;
            this.frames.push(frame);
            return this;
        },
        remove: function (frame) {
            var num, 
                i = 0,
                len = this.frames.length;

            if(typeof frame === 'number') {
                num = frame;
            } else if(typeof frame === 'string') {
                if((num=parseInt(frame)) === NaN) return false;
            } else if(frame instanceof Frame){
                for(; i < len; i += 1) {
                    if(this.frames[i] === frame) {
                        num = i;
                    }
                }
            } else {
                return false;
            }

            if(num !== undefined) return this.frames.splice(num, 1);
            return false;
        },
        doAction: function () {
            var i = 0;
            var frame;
            for(i in this.frames) {
                if(this.time >= this.frames[i].time) {
                    frame = this.remove(i);
                    if(frame !== false) {
                        this.framesHasBegun.push(frame);
                        frame[0].animate();
                    }
                }
            }
        },
        start: function () {
            var self = this;
            if(self.timer !== null) {
                console.log('已经在启动了');
                return;
            }
            self.timer = win.setInterval(function() {
                self.time += self.step;
                console.log('当前执行到: ' + self.time + ' 秒');
                self.doAction();
            }, self.step*1000);
        },
        stop: function () {
            var i = 0, len = this.framesHasBegun.length;
            for(; i <= len; i += 1) {
                this.framesHasBegun[i].stop();
            }
            win.clearInterval(this.timer);
            this.timer = null;
        }
    };

    exports.Frame = Frame;
    exports.FrameFlow = FrameFlow;

} (jQuery, window));