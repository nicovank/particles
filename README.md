# Particles

This lightweight library will allow you to make a very basic moving particule system.

For a more advanced system, I recommend [particles.js](https://github.com/VincentGarreau/particles.js/).

## Demo

You can find a live demo [here on CodePen](http://codepen.io/nicovank/full/WRdmVw/).

## Installation

[Download the compressed version](https://raw.githubusercontent.com/nicovank/particles/master/dist/particles.js) of Particles.
Then, add it to your page like so:

```xml
<!-- Create a canvas on which the particules will be drawn -->
<canvas id="particles"></canvas>

<!-- Import the script. (use your installation path) -->
<script src="particles.js"></script>
```

You can then start an instance of Particles like so:

```js
const particles = new Particles(document.getElementById("particles"), options);
```

## Options

Here are the default options. You can override any of them by passing an option object when creating a Particles instance.

```js
{
    size: { // size of the particles
        min: 0,
        max: 2
    },
    density: 1000,  // density of particles on the canvas
    speed: 3, // speed of the particules
    fps: 60, // number of times per second the canvas is refreshed
    color: "#FFFFFF" // color of the particles
}
```