
/**
 * background.js
 * 
 * @author: Rohan Jadvani
 */

function main() {

    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var area = canvas.width * canvas.height;
    var factor = 6000;
    var particles = [ ];
    var maxParticles = (area / factor);
    var diameterFactor = 2;
    
    function Particle() {
        this.visible = true;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        this.vx = (Math.random() * 2) - 1;
        this.vy = (Math.random() * 2) - 1;
        this.diameter = Math.random() * diameterFactor;
        this.color = '#777';
    }
    
    Particle.prototype = {
        
        update : function() {
            var pad = 0;
            this.x += this.vx;
            this.y += this.vy;
            // out of screen
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
        // replace particles to maintain max number
        for (i = particles.length; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function validate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // render each particle
        particles.forEach(function(particle) {
            particle.draw();
        });
    }
    
    function updateParticles() {
        createParticles();
        // move particles and draw
        particles.forEach(function(particle) {
            particle.update();
        });
        particles = particles.filter(function(particle) {
            return particle.visible; 
        });
        validate();
        requestAnimationFrame(updateParticles);
    }
    
    function run() {
        createParticles();
        updateParticles();
    }
    
    $(window).resize(function () {
        // maintain same position and size
        particles.forEach(function(particle) {
            particle.x *= (window.innerWidth / canvas.width);
            particle.y *= (window.innerHeight / canvas.height);
        });
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        area = canvas.width * canvas.height;
        maxParticles = (area / factor);
    });
    
    run();
    
}

main();
