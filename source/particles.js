function Particle(x, y, position1, position2, charge) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.sub(position2, position1); //Generates velocity based on where the mouse is dragged
    this.acc = createVector();
    this.mass = 9.10938215e-31;
    this.charge = -charge;
    this.prev = createVector(x, y);
    const E = 8897000000;
    const B = 1;
    this.color = createVector(random(255), random(255), random(255));

    //Updates velocity and acceleration
    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        if (particles.length >= 1) {
            velocityDisplay.value = "Velocity of Placed Particle: " + Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)).toFixed(2) + "m/s";
        }
    }

    //Draws the most current form of the particles, as a line
    this.show = function () {
        stroke(0, 0, 0);
        // stroke(this.color.x, this.color.y, this.color.z, 100);
        strokeWeight(5);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
        stroke(255, 0, 0, 200);
        // stroke(this.color.x, this.color.y, this.color.z, 100);
        strokeWeight(4);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
        // let fixedVel = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)).toFixed(2);
        // text("Velocity: " + fixedVel + " m/s", 10, 30);
        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

    //Determines the force vector applied between the charged particle and the attractor
    this.attractorAttracted = function (target) {
        let dir = p5.Vector.sub(target.pos, this.pos);  //determines the distance between the attractor and the particle
        let distance = dir.mag();    //Finds the distance of the particle from the attractor
        // dirSq = constrain(dirSq, 50, 5000); //Ensures the distance doesn't generate weird effects
        distance = constrain(distance, 15, 100000);
        electricForce = E * target.charge * this.charge / (distance * distance);    //The algorithm for determining electric force
        acceleration = electricForce / this.mass;   //Determines acceleration from force
        dir.setMag(acceleration);   //assigns the acceleration to the force vector
        this.acc.add(dir); //assigns the acceleration to the acceleration of the particle
    }

    //Determines the force vector applied between the charged particle and the attractor
    this.particleAttracted = function (target) {
        let dir = p5.Vector.sub(target.pos, this.pos);  //determines the distance between the attractor and the particle
        let distance = dir.mag();    //Finds the distance of the particle from the attractor
        // dirSq = constrain(dirSq, 50, 5000); //Ensures the distance doesn't generate weird effects
        distance = constrain(distance, 15, 100000);
        electricForce = E * -target.charge * this.charge / (distance * distance);    //The algorithm for determining electric force
        acceleration = electricForce / this.mass;   //Determines acceleration from force
        dir.setMag(acceleration);   //assigns the acceleration to the force vector
        this.acc.add(dir); //assigns the acceleration to the acceleration of the particle
    }

    // this.magAttraction = function () {
    //     const B = 1;
    //     // console.log(this.pos.x, this.pos.y)

    //     let distanceFromCenter = p5.Vector.sub(this.pos, this.centerOfRotation);
    //     console.log(distanceFromCenter);
    //     let centripetalForceX = this.mass * this.vel.x * this.vel.x / distanceFromCenter.x;
    //     let centripetalForceY = this.mass * this.vel.y * this.vel.y / distanceFromCenter.y;

    //     let centripetalForce = createVector(centripetalForceX, centripetalForceY);

    //     let centripetalacceleration = centripetalForce.mag();
    //     centripetalacceleration = centripetalacceleration / this.mass;
    //     // console.log(centripetalacceleration);
    //     this.vel.add(centripetalacceleration);
    // }
}