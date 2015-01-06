/**
 * 页面逻辑
 */

(function ($, win) {

    $(function () {
        var canvas = $('#mainCanvas')[0];
        var context = canvas.getContext("2d");

        var flow = new FrameFlow();
        var frameH1 = new Frame('字母H动画1', 1, '画左边的竖线');
        var frameH2 = new Frame('字母H动画2', 2, '画右边的竖线');
        var frameH3 = new Frame('字母H动画3', 3, '画中间的横线');
        var frameE1 = new Frame('字母E动画1', 8, '画左边的竖线');
        var frameE2 = new Frame('字母E动画2', 8.3, '画上边的横线');
        var frameE3 = new Frame('字母E动画3', 8.6, '画中间的竖线');
        var frameE4 = new Frame('字母E动画4', 8.8, '画下边的竖线');
        var frameL1 = new Frame('字母L动画1', 11.5, '画竖线');
        var frameL2 = new Frame('字母L动画2', 11.5, '画横线');
        var frameL3 = new Frame('字母L动画3', 12, '画竖线');
        var frameL4 = new Frame('字母L动画4', 12, '画横线');
        var frameO1 = new Frame('字母O动画1', 13, '画左边竖线');
        var frameO2 = new Frame('字母O动画2', 13, '画上边横线');
        var frameO3 = new Frame('字母O动画3', 13, '画右边竖线');
        var frameO4 = new Frame('字母O动画4', 13, '画下边横线');
        var frame21 = new Frame('数字2动画1', 22, '画上边横线');
        var frame22 = new Frame('数字2动画2', 22, '画右上边竖线');
        var frame23 = new Frame('数字2动画3', 22, '画中间横线');
        var frame24 = new Frame('数字2动画4', 22, '画左下边竖线');
        var frame25 = new Frame('数字2动画5', 22, '画下边横线');
        var frame01 = new Frame('数字0动画1', 23, '画左边竖线');
        var frame02 = new Frame('数字0动画2', 23, '画上边横线');
        var frame03 = new Frame('数字0动画3', 23, '画右边竖线');
        var frame04 = new Frame('数字0动画4', 23, '画下边横线');
        var frame11 = new Frame('数字1动画1', 25, '画竖线');
        var frame51 = new Frame('数字5动画1', 25.5, '画上边横线');
        var frame52 = new Frame('数字5动画2', 26, '画左上边竖线');
        var frame53 = new Frame('数字5动画3', 26.5, '画中间横线');
        var frame54 = new Frame('数字5动画4', 27, '画右下边竖线');
        var frame55 = new Frame('数字5动画5', 27, '画下边横线');

        var pathH = getLetterPath('H',50,50,100,200);
        var pathE = getLetterPath('E',200,50,100,200);
        var pathL = getLetterPath('L',350,50,100,200);
        var pathL2 = getLetterPath('L',500,50,100,200);
        var pathO = getLetterPath('O', 650,50,100,200);
        var path2 = getLetterPath('2',120,350,100,200);
        var path0 = getLetterPath('0',270,350,100,200);
        var path1 = getLetterPath('1',420,350,100,200);
        var path5 = getLetterPath('5',570,350,100,200);

        // 字母H动画帧
        frameH1.animation = animation(context, [pathH[0]], 50, 50, 1000);
        frameH2.animation = animation(context, [pathH[2]], 150, 250, 1000);
        frameH3.animation = animation(context, [pathH[1]], 50, 150, 500);
        // 字母E动画帧
        frameE1.animation = animation(context, [pathE[1]], 300, 50, 1000);
        frameE2.animation = animation(context, [pathE[0]], 300, 50, 500);
        frameE3.animation = animation(context, [pathE[2]], 300, 182, 500);
        frameE4.animation = animation(context, [pathE[3]], 300, 250, 500);
        // 字母L动画帧
        frameL1.animation = animation(context, [pathL[0]], 350, 250, 1000);
        frameL2.animation = animation(context, [pathL[1]], 350, 250, 1000);
        frameL3.animation = animation(context, [pathL2[0]], 500, 250, 1000);
        frameL4.animation = animation(context, [pathL2[1]], 500, 250, 1000);
        // 字母O动画帧
        frameO1.animation = animation(context, [pathO[0]], 650, 250, 1000);
        frameO2.animation = animation(context, [pathO[1]], 650, 50, 600);
        frameO3.animation = animation(context, [pathO[2]], 750, 50, 1000);
        frameO4.animation = animation(context, [pathO[3]], 750, 250, 600);
        // 数字2动画帧
        frame21.animation = animation(context, [path2[0]], 220, 350, 600);
        frame22.animation = animation(context, [path2[1]], 220, 350, 600);
        frame23.animation = animation(context, [path2[2]], 120, 450, 600);
        frame24.animation = animation(context, [path2[3]], 120, 450, 600);
        frame25.animation = animation(context, [path2[4]], 120, 550, 600);
        // 数字0动画帧
        frame01.animation = animation(context, [path0[0]], 270, 550, 1000);
        frame02.animation = animation(context, [path0[1]], 270, 350, 600);
        frame03.animation = animation(context, [path0[2]], 370, 350, 1000);
        frame04.animation = animation(context, [path0[3]], 370, 550, 600);
        // 数字1动画帧
        frame11.animation = animation(context, [path1[0]], 470, 350, 1000);
        // 数字5动画帧
        frame51.animation = animation(context, [path5[0]], 570, 350, 600);
        frame52.animation = animation(context, [path5[1]], 570, 350, 600);
        frame53.animation = animation(context, [path5[2]], 670, 450, 600);
        frame54.animation = animation(context, [path5[3]], 670, 550, 600);
        frame55.animation = animation(context, [path5[4]], 670, 550, 600);

        // 添加字母H的动画
        flow.add(frameH1);
        flow.add(frameH2);
        flow.add(frameH3);
        // 添加字母E的动画
        flow.add(frameE1);
        flow.add(frameE2);
        flow.add(frameE3);
        flow.add(frameE4);
        // 添加字母L的动画
        flow.add(frameL1);
        flow.add(frameL2);
        flow.add(frameL3);
        flow.add(frameL4);
        // 添加字母O的动画
        flow.add(frameO1);
        flow.add(frameO2);
        flow.add(frameO3);
        flow.add(frameO4);
        // 添加数字2的动画
        flow.add(frame21);
        flow.add(frame22);
        flow.add(frame23);
        flow.add(frame24);
        flow.add(frame25);
        // 添加数字0的动画
        flow.add(frame01);
        flow.add(frame02);
        flow.add(frame03);
        flow.add(frame04);
        // 添加数字1的动画
        flow.add(frame11);
        // 添加数字5的动画
        flow.add(frame51);
        flow.add(frame52);
        flow.add(frame53);
        flow.add(frame54);
        flow.add(frame55);

        flow.start();
    });
    
    function animation (context, path, startX, startY, duration) {
        return function () {
            drawVine(context, path, startX, startY, duration, true, true);
        }
    }

} (jQuery, window));