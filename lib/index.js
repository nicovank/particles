window.Particles = (function main () {
	let Particle = require("./Particle/Particle.js");

	// Copies keys from the source to the destination, overriding the destination keys
	function deepExtend (destination, source) {
		for (const key in source) {
			if (typeof destination[key] === "object" && typeof source[key] === "object") {
				destination[key] = deepExtend(destination[key], source[key]);
			} else {
				destination[key] = source[key];
			}
		}
		return destination;
	}

	// Default options
	const defaultOptions = {
		size: {
			min: 0,
			max: 2
		},
		density: 1000,
		speed: 3,
		fps: 60,
		color: "#FFFFFF"
	};

	return class Particles {
		constructor (target, options) {
			// check if the target is a canvas
			if (!target || target.tagName.toLowerCase() !== "canvas") {
				throw new Error("Particles: The provided target is invalid.");
			} else {
				// set up the canvas
				this.target = target;
				this.target.width = this.target.offsetWidth;
				this.target.height = this.target.offsetHeight;

				// merge default options and those passed as parameters
				this.options = deepExtend(defaultOptions, options);
				Particle = Particle(this.options);

				this.initialize();
			}
		}

		// starts drawing
		start () {
			console.log("ok");
			this.interval = setInterval(() => this.draw(this.particles), 1000 / this.options.fps);
		}

		// pauses / stops the drawing
		stop () {
			clearInterval(this.interval);
		}

		// starts the particle system
		initialize () {
			this.ctx = this.target.getContext("2d");
			const area = this.target.offsetWidth * this.target.offsetHeight;
			const nbParticles = Math.floor(area / ((1 / this.options.density) * 100000) / 50);

			// create new particles and store them
			this.particles = new Array();
			for (let i = 0; i < nbParticles; i++) {
				this.particles.push(new Particle(this.target.offsetWidth, this.target.offsetHeight));
			}

			// set refresh interval
			this.start();
		}

		// called to clear and redraw the canvas
		draw (particles) {
			this.ctx.clearRect(0, 0, this.target.width, this.target.height);

			for (let i = 0; i < particles.length; i++) {
				// draw the particle
				particles[i].draw(this.ctx);
			}
		}
	}
})();