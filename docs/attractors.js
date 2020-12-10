function Attractor(x, y, charge) {
    this.pos = createVector(x, y);
    this.mass = 1;
    this.charge = charge;
    if (attractorTypeSelector == 1) {
        this.color = createVector(0, 255, 0);
    }
    else if (attractorTypeSelector == -1) {
        this.color = createVector(255, 0, 0);
    }

    this.show = function () {
        stroke(0, 0, 0);
        strokeWeight(11);
        point(this.pos.x, this.pos.y);
        stroke(this.color.x, this.color.y, this.color.z);
        strokeWeight(10);
        point(this.pos.x, this.pos.y);
    }
}