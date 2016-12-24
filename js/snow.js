/**
 * @file snow.js
 * @brief Snow animation for the background of the website.
 *
 * @author Rohan Jadvani
 *
 * @bug No known bugs.
 */

window.onload = function() {
  const canvas = $("canvas")[0];
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const area = canvas.width * canvas.height;
  const factor = 6000;
  const maxParticles = (area / factor);
  const diameterFactor = 3;
  let particles = [ ];

  function Particle() {
      this.visible = true;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.vx = Math.random() - 0.5;
      this.vy = (Math.random() * 0.7) + 0.1;
      this.diameter = Math.random() * diameterFactor;
      this.color = "rgba(255, 255, 255, 0.8)";
  }

  Particle.prototype = {

    update : function() {
      var pad = 0;
      this.x += this.vx;
      this.y += this.vy;
      /* Check if the particle is out of the screen. */
      if (!((pad <= this.x && this.x < canvas.width - pad) &&
            (pad <= this.y && this.y < canvas.height - pad))) {
        this.visible = false;
      }
    },

    draw : function() {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI, false);
      context.fill();
    }
  };

  function createParticles() {
    for (i = particles.length; i < maxParticles; i++) {
      particles.push(new Particle());
    }
  }

  function validate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    /* Render each particle. */
    particles.forEach(function(particle) {
      particle.draw();
    });
  }

  function updateParticles() {
    createParticles();
    particles.forEach(particle => particle.update());

    particles.forEach(function(particle) {
      particle.update();
    });

    particles = particles.filter(function(particle) {
      return particle.visible;
    });

    validate();
    requestAnimationFrame(updateParticles);
  }

  createParticles();
  updateParticles();
}

