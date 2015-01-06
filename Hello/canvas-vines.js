/** 
 * canvas 藤蔓
 * 原理：由某一点开始，开始画b-spline曲线，画完1条后分叉成2条（模拟生长增殖的效果），同时让新生成的
 * 曲线连接上原曲线（模拟连续生长的效果）。为了让藤蔓按照指定的路径/范围生长，在生长的过程中
 * 需要不停的将远离路径/范围的曲线去除（这个过程会在画之前进行，如果离的过远，就删除它，不画它）
 * @param context canvas 2D上下文对象
 * @param lattice 指定的路径/范围
 * @param x 初始生长点的横坐标
 * @param y 初始生长点的纵坐标
 * @param interations setInterval的执行次数，动画运行的时间=interations/60（60是当前动画设定的fps）
 * @param sort 若未true，则每次修剪离生长路径最远的藤蔓；若未false，则每次的修剪是随机的。这个参数只有prune为true时才会使用。
 * @param prune 是否对藤蔓进行修剪
 */
(function($, win) {
	var exports = win;
	function drawVineWithLattice(context, lattice, x, y, interations, sort, prune) {
		// 设置线的宽度和颜色
		context.lineWidth = 0.5;
		context.strokeStyle = 'rgba(255,255,255,90)';

		// 默认的生长点，这是一个b-spline的四个坐标点
		var branches = new Array();
		branches.push({
			points:new Array({x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}), 
			angle:0,
			distanceToLattice:1000
		});
		
		// 时间进度，从0开始
		var t = 0;
		
		// 制作动画效果
		// 把画一条线段的过程分成n(n=1/deltaT, deltaT是t的增量，在这里是0.1)个步骤
		// 然后一个步骤一个步骤的走，看上去就是动画了
		var interval = win.setInterval(function() {
			// 在每个生长点上进行绘制
			for (var i in branches) {
				
				// 画一个 spline (曲线的一种，形态由四个点控制)
				var ax = (-branches[i].points[0].x + 3*branches[i].points[1].x - 3*branches[i].points[2].x + branches[i].points[3].x) / 6;
				var ay = (-branches[i].points[0].y + 3*branches[i].points[1].y - 3*branches[i].points[2].y + branches[i].points[3].y) / 6;
				var bx = (branches[i].points[0].x - 2*branches[i].points[1].x + branches[i].points[2].x) / 2;
				var by = (branches[i].points[0].y - 2*branches[i].points[1].y + branches[i].points[2].y) / 2;
				var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
				var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
				var dx = (branches[i].points[0].x + 4*branches[i].points[1].x + branches[i].points[2].x) / 6;
				var dy = (branches[i].points[0].y + 4*branches[i].points[1].y + branches[i].points[2].y) / 6;
				context.beginPath();
				context.moveTo(
					ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx, 
					ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
				);
				context.lineTo(
					ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx, 
					ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
				);
				context.stroke();
				context.closePath();			
			}
			
			// 增加时间进度
			t += 0.1;
			
			// 当时时间进度不小于1，则停止
			if (t >= 1) {		
				
				// 一条曲线画完了，再画一条新的曲线连接上它继续画
				// 新的曲线的四个点中有三个和原来的曲线重合，以达到连续的效果，
				// 另外一个点以及线段角度，和原来不同，以此来实现一种藤蔓生长的感觉
				var new_branches = new Array();
				
				// 对每一个完成的曲线都进行画新曲线的操作
				for (var j in branches) {
					
					// 把原来的条曲线换成两条，达到生长变多的效果（1变2，2变4，以此类推）
					for (var k = 0; k < 2; k++) {
						
						// 根据前一条线的角度，计算出新线段的角度
						var angle = branches[j].angle - (Math.random() * 180 - 90);					
						
						// 找出线段生长点和生长路径之间的最近距离
						var distanceToLattice = 100000;
						for (var l in lattice) {
							var result = distancePointToLine(branches[j].points[3], lattice[l]);
							if (result < distanceToLattice) distanceToLattice = result;
						}
						
						// 随机生成线段的长度
						var length = Math.random() * 15 + 4;
						
						// 计算最后一个点的坐标
						var x2 = branches[j].points[3].x + Math.sin(Math.PI * angle / 180) * length;
						var y2 = branches[j].points[3].y - Math.cos(Math.PI * angle / 180) * length;
						
						// 将新的线段放入线段集合中
						new_branches.push({
							points:new Array(
								branches[j].points[1],
								branches[j].points[2],
								branches[j].points[3],
								{x:x2, y:y2}
							),
							angle:angle,
							distanceToLattice:distanceToLattice
						});
					}
				}
				
				// 根据线段到生长路径的距离，按从远到近进行排序
				new_branches.sort(function(a, b) {
					return a.distanceToLattice - b.distanceToLattice;
				});

				// 如果超过10条生长线段，则去掉离生长路径最远的生长线段
				if (prune) {
					if (sort) {
						while (new_branches.length > 10) new_branches.pop();
					}
					// 如果未设定按排序去除，则进行随机去除
					else {
						while (new_branches.length > 10) {
							new_branches.splice(Math.floor(Math.random() * new_branches.length), 1);
						}	
					}
				}
				
				// 用新生成的生长线段集合替换旧的
				// 再次进行循环绘画
				branches = new_branches;
				
				// 重置时间进度
				t = 0;
			}
			
			// 可用循环次数（由参数获取）递减
			// 当减至0时，则停止动画
			interations--;
			if (interations < 0) clearInterval(interval);
				
		}, 16.67);
		
		// 返回时间器ID
		return interval;
	}


	// 获取点到线段的距离
	// 算法参考自网上
	function distancePointToLine(point, line) {
		
		var L = Math.sqrt(Math.pow(line[1].x - line[0].x, 2) + Math.pow(line[1].y - line[0].y, 2));
		
		var r = ((point.x - line[0].x) * (line[1].x - line[0].x) + (point.y - line[0].y) * (line[1].y - line[0].y)) / Math.pow(L, 2);

		var s = ((line[0].y - point.y) * (line[1].x - line[0].x) - (line[0].x - point.x) * (line[1].y - line[0].y)) / Math.pow(L, 2);
			
		if (r >= 0 && r <= 1) {
			return Math.abs(s) * L;
		} else {
			return Math.min(
				Math.sqrt(Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)),
				Math.sqrt(Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2))
			);
		}
	}

	exports.drawVine = drawVineWithLattice;

} (jQuery, window));