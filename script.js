function Particle(pos) {
	this.pos = pos || createVector(random(width), random(height));
	this.xV = random(-6, 6);
	this.yV = random(-6, 6);
	this.r = 5;

	this.offCanvas = false;

	this.update = function () {
		if (
			this.pos.x > width ||
			this.pos.x < 0 ||
			this.pos.y > height ||
			this.pos.y < 0
		) {
			this.offCanvas = true;
		}
		this.pos.x += this.xV;
		this.pos.y += this.yV;
	};
}

var particles = [];
var shade, flag;

function setup() {
	createCanvas(windowWidth, windowHeight);

	shade = Math.floor(random(0, 255));

	for (i = 0; i < 50; i++) {
		var angle = Math.random() * 360;
		flag = 0;
		var newVec = createVector(
			windowWidth * 0.5 + (cos(angle) * windowWidth) / 8,
			windowHeight * 0.5 - (sin(angle) * windowWidth) / 8
		);
		particles.push(new Particle(newVec));
	}

	setTimeout(function () {
		for (i = 0; i < 100; i++) {
			var angle = Math.random() * 360;
			flag = 0;
			var newVec = createVector(
				windowWidth * 0.5 + (cos(angle) * windowWidth) / 4,
				windowHeight * 0.5 - (sin(angle) * windowWidth) / 4
			);
			particles.push(new Particle(newVec));
		}
	}, 2000);
}

function touchMoved(event) {
	event.preventDefault();
	if (!flag) {
		background(255);
		flag = 1;
	}
	for (var i in touches) {
		particles.push(new Particle(createVector(touches[i].x, touches[i].y)));
	}
}

function mouseDragged(event) {
	event.preventDefault();
	if (!flag) {
		background(255);
		flag = 1;
	}
	particles.push(new Particle(createVector(mouseX, mouseY)));
}

function draw() {
	var R = Math.floor(random(0, 255));
	var G = Math.floor(random(0, 255));
	var B = Math.floor(random(0, 255));

	shade = (shade + 1) % 256;

	for (var i = particles.length - 1; i >= 0; i--) {
		if (!particles[i].offCanvas) {
			for (var j = particles.length - 1; j >= 0; j--) {
				if (particles[i] !== particles[j]) {
					var d = dist(
						particles[i].pos.x,
						particles[i].pos.y,
						particles[j].pos.x,
						particles[j].pos.y
					);
					if (d < 100) {
						if (flag) stroke(color(R, G, B, d / 2));
						else stroke(color(shade, d / 2));
						line(
							particles[i].pos.x,
							particles[i].pos.y,
							particles[j].pos.x,
							particles[j].pos.y
						);
					}
				}
			}

			particles[i].update();
		} else {
			particles.splice(i, 1);
		}
	}
}