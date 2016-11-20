/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var game_1 = __webpack_require__(1);
	function between(x, y) {
	    return Math.floor(Math.random() * y) + x;
	}
	var Loader = (function () {
	    function Loader() {
	        this.linkDistance = 150;
	        this.opacity = .4;
	        this.points = [];
	    }
	    Loader.prototype.init = function (gc) {
	        this.gc = gc;
	        var width = gc.width, height = gc.height, ctx = gc.ctx;
	        this.numPoints = Math.floor(width / 10) + Math.floor(height / 5);
	        this.grad = ctx.createLinearGradient(0, 0, width, height);
	        this.grad.addColorStop(.0, '#010C50');
	        this.grad.addColorStop(.3, '#000732');
	        this.grad.addColorStop(1, '#000000');
	        this.fontSize = width * (80 / 1920);
	        for (var i = 0; i < this.numPoints; i++) {
	            this.createPoint();
	        }
	    };
	    Loader.prototype.createPoint = function () {
	        var p = {
	            x: Math.random() * this.gc.width,
	            y: Math.random() * this.gc.height,
	            vx: Math.random() * 5 - 2,
	            vy: Math.random() * 5 - 2,
	            color: {
	                r: between(1, 150),
	                g: between(1, 80),
	                b: between(200, 255)
	            },
	            lineWidth: between(1, 10)
	        };
	        this.points.push(p);
	    };
	    Loader.prototype.move = function (p) {
	        var _a = this.gc, width = _a.width, height = _a.height;
	        p.x += p.vx;
	        p.y += p.vy;
	        if (p.x > width) {
	            p.x = 0;
	        }
	        else if (p.x < 0) {
	            p.x = width;
	        }
	        if (p.y > height) {
	            p.y = 0;
	        }
	        else if (p.y < 0) {
	            p.y = height;
	        }
	    };
	    Loader.prototype.link = function (p1, p2) {
	        var dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy), alpha;
	        if (dist <= this.linkDistance) {
	            alpha = this.opacity - (dist / (1 / this.opacity)) / this.linkDistance;
	            if (alpha > 0) {
	                this.drawLine(p1, p2, 'rgba(' + p1.color.r + ',' + p1.color.g + ',' + p1.color.b + ',' + alpha + ')', p1.lineWidth);
	            }
	        }
	    };
	    Loader.prototype.drawLine = function (p1, p2, strokeStyle, width) {
	        var ctx = this.gc.ctx;
	        ctx.beginPath();
	        ctx.strokeStyle = strokeStyle;
	        ctx.lineWidth = width;
	        ctx.moveTo(p1.x, p1.y);
	        ctx.lineTo(p2.x, p2.y);
	        ctx.stroke();
	        ctx.closePath();
	    };
	    Loader.prototype.drawRect = function (p1, p2, fillStyle) {
	        var ctx = this.gc.ctx;
	        ctx.beginPath();
	        ctx.fillStyle = fillStyle;
	        ctx.fillRect(p1.x, p1.y, p2.x, p2.y);
	        ctx.stroke();
	        ctx.closePath();
	    };
	    Loader.prototype.drawPoint = function (p) {
	        var fillStyle = "rgba('" + p.color.r + "', '" + p.color.g + "', '', '" + p.color.b + "', '" + (p.color.a || 1) + "')";
	        this.drawRect(p, { x: 2, y: 2 }, fillStyle);
	    };
	    Loader.prototype.drawTitle = function (text, font) {
	        var _a = this.gc, ctx = _a.ctx, centerX = _a.centerX, centerY = _a.centerY;
	        ctx.font = this.fontSize + 'pt ' + font;
	        ctx.textAlign = 'center';
	        ctx.textBaseline = 'middle';
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + .6 + ')';
	        ctx.strokeText(text, centerX, centerY - 50);
	    };
	    Loader.prototype.drawBackground = function () {
	        var _a = this.gc, width = _a.width, height = _a.height;
	        this.drawRect({ x: 0, y: 0 }, { x: width, y: height }, this.grad);
	    };
	    Loader.prototype.drawPoints = function () {
	        var _this = this;
	        this.points.forEach(function (p1, i) {
	            _this.move(p1);
	            _this.drawPoint(p1);
	            for (var j = i + 1; j < _this.numPoints; j++) {
	                var p2 = _this.points[j];
	                _this.link(p1, p2);
	            }
	        });
	    };
	    Loader.prototype.render = function () {
	        this.drawBackground();
	        this.drawPoints();
	        this.drawTitle('loader', 'Roboto');
	    };
	    return Loader;
	}());
	var loader = new Loader();
	game_1.game(loader);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.game = function (game) {
	    var gc;
	    var canvas = document.getElementById('canvas');
	    var ctx = canvas.getContext('2d');
	    window.addEventListener('resize', function () {
	        init();
	    });
	    var init = function () {
	        canvas.width = document.body.clientWidth;
	        canvas.height = document.body.clientHeight;
	        gc = {
	            canvas: canvas,
	            ctx: ctx,
	            width: canvas.width,
	            height: canvas.height,
	            centerX: canvas.width / 2,
	            centerY: canvas.height / 2,
	            lastTime: new Date().getTime(),
	            currentTime: 0,
	            delta: 0,
	            fps: 60,
	            interval: 1000 / 60
	        };
	        game.init(gc);
	    };
	    var loop = function () {
	        setTimeout(function () {
	            requestAnimationFrame(loop);
	            gc.currentTime = new Date().getTime();
	            gc.delta = gc.currentTime - gc.lastTime;
	            if (gc.delta > gc.interval) {
	                gc.ctx.clearRect(0, 0, gc.width, gc.height);
	                game.render();
	                gc.lastTime = gc.currentTime;
	            }
	        }, gc.interval);
	    };
	    init();
	    loop();
	};


/***/ }
/******/ ]);