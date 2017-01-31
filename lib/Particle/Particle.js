module.exports = exports = (function (options) {
	return class Particle {
		constructor (maxX, maxY) {
			this.maxX = maxX;
			this.maxY = maxY;
			
			this.reset();
		}

		// reset position to somewhere on the canvas and random size and speed
		reset () {
			this.x = Math.random() * this.maxX;
			this.y = Math.random() * this.maxY;
			this.size = Math.random() * (options.size.max - options.size.min) + options.size.min;

			this.speed = {
				x: options.speed * (Math.random() - .5),
				y: options.speed * (Math.random() - .5)
			}
		}

		// draw the particle
		draw (ctx) {
			this.x += this.speed.x;
			this.y += this.speed.y;

			// if particle outside of the canvas
			if (this.x < 0 || this.y < 0 || this.x > this.maxX || this.y > this.maxY) {
				this.reset();
			}

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
			ctx.fillStyle = options.color;
			ctx.fill();
			ctx.closePath();
		}
	}
});