/**
 * 获取指定字母、数字在画板中的路径
 */

(function($, win) {
	var exports = win;
	
	var getLetterPath = function(letter, x, y, width, height) {
		var path, i=0, len;
		if((letter>='A' && letter<='Z') || (letter>='a' && letter<='z' ||
			(letter >= '0' && letter <= '9'))){
			if(typeof letters[letter] === 'function') {
				path = letters[letter](width, height);
				// 对path中的所有点做(x,y)的平移
				len = path.length;
				for(; i < len; i += 1) {
					path[i][0].x += x;
					path[i][0].y += y;
					path[i][1].x += x;
					path[i][1].y += y;
				}
			}
		}
		return path;
	};

	var letters = {};

	letters['H'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:0, y:height}],
			[{x:0, y:height/2}, {x:width, y:height/2}],
			[{x:width, y:0}, {x:width, y:height}]
		];
		return path;
	};

	letters['E'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:width, y:0}],
			[{x:0, y:0}, {x:0, y:height}],
			[{x:0, y:height/2}, {x:width, y:height/2}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	letters['L'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:0, y:height}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	letters['O'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:0, y:height}],
			[{x:0, y:0}, {x:width, y:0}],
			[{x:width, y:0}, {x:width, y:height}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	letters['2'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:width, y:0}],
			[{x:width, y:0}, {x:width, y:height/2}],
			[{x:0, y:height/2}, {x:width, y:height/2}],
			[{x:0, y:height/2}, {x:0, y:height}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	letters['0'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:0, y:height}],
			[{x:0, y:0}, {x:width, y:0}],
			[{x:width, y:0}, {x:width, y:height}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	letters['1'] = function(width, height) {
		var path = [
			[{x:width/2, y:0}, {x:width/2, y:height}]
		];
		return path;
	};

	letters['5'] = function(width, height) {
		var path = [
			[{x:0, y:0}, {x:width, y:0}],
			[{x:0, y:0}, {x:0, y:height/2}],
			[{x:0, y:height/2}, {x:width, y:height/2}],
			[{x:width, y:height/2}, {x:width, y:height}],
			[{x:0, y:height}, {x:width, y:height}]
		];
		return path;
	};

	exports.getLetterPath = getLetterPath;

} (jQuery, window));