window.Particles = (function main() {
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
		speed: 10,
		fps: 30,
		color: "#FFFFFF"
	}

	return class Particles {
		constructor (target, options) {
			// Check if the target is a canvas
			if (!target || target.tagName.toLowerCase() !== "canvas") {
				throw new Error("Particles: The provided target is invalid.");
			} else {
				this.target = target;
				this.target.width = this.target.offsetWidth;
				this.target.height = this.target.offsetHeight;
				this.options = deepExtend(defaultOptions, options);
				Particle = Particle(this.options);

				this.initialize();
			}
		}

		initialize () {
			this.ctx = this.target.getContext("2d");
			const area = this.target.offsetWidth * this.target.offsetHeight;
			const nbParticles = Math.floor(area / ((1 / this.options.density) * 100000) / 50);

			// create new particles and store them
			const particles = new Array();
			for (let i = 0; i < nbParticles; i++) {
				particles.push(new Particle(this.target.offsetWidth, this.target.offsetHeight));
			}

			setInterval(() => this.draw(particles), 1000 / this.options.fps);
		}

		draw (particles) {
			this.ctx.clearRect(0, 0, this.target.width, this.target.height);

			for (let i = 0; i < particles.length; i++) {
				particles[i].draw(this.ctx);
			}
		}
	}
})();