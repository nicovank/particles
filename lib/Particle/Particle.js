module.exports = exports = (function (options) {
	return class Particle {
		constructor (maxX, maxY) {
			this.x = Math.random() * maxX;
			this.y = Math.random() * maxY;
			this.size = Math.random() * (options.size.max - options.size.min) + options.size.min;

			this.speed = {
				x: options.speed * (Math.random() - .5),
				y: options.speed * (Math.random() - .5)
			}
		}

		draw (ctx) {
			this.x += this.speed.x;
			this.y += this.speed.y;

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
			ctx.fillStyle = options.color;
			ctx.fill();
			ctx.closePath();
		}
	}
});