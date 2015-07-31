
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
    var factor = 7000;
    var particles = [ ];
    var maxParticles = (area / factor);
    var diameterFactor = 2;
    
    function getDistance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
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
            var maxVelocity = Math.sqrt(2);
            this.x += this.vx;
            this.y += this.vy;
            // lower velocity
            if (getDistance(0, 0, this.vx, this.vy) > maxVelocity) {
                this.vx *= 0.95;
                this.vy *= 0.95;
            }
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
    
    $(window).click(function(event) {
        var x = event.pageX;
        var y = event.pageY;
        
        function nearClick(particle) {
            var maxDistance = 200;
            var distance = getDistance(particle.x, particle.y, x, y);
            return distance < maxDistance;
        }
        
        function moveParticle(particle) {
            var factor = 10;
            var vectorFactor = getDistance(particle.x, particle.y, x, y) / factor;
            particle.vx = (particle.x - x) / vectorFactor;
            particle.vy = (particle.y - y) / vectorFactor;
        }
        
        // move particles near click
        particles.forEach(function(particle) {
            if (nearClick(particle)) {
                moveParticle(particle);
            } 
        });
    });
    
    run();
    
}

main();
