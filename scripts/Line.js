function Line( x1, y1, x2, y2 ){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.sign = 0;
}

Line.prototype.getSlope = function(){
	return atan2( this.y2-this.y1, this.x2-this.x1 );
}

Line.prototype.distFrom = function( px, py ){
	var ab = createVector(this.x2-this.x1, this.y2-this.y1);
	var ap = createVector(px-this.x1, py-this.y1);
	var L = ab.mag();
	var cross = ab.cross(ap);
	this.sign = (cross.z >= 0) ? -1 : 1;
	var D = cross.mag();
	var H = D / L;
	return H;
}

Line.prototype.draw = function(){
	stroke(0);
	line(this.x1, this.y1, this.x2, this.y2);
}

Line.prototype.linearSymmetryPointFrom = function( px, py ){
	var twiceL = this.distFrom(px, py) * 2;
	var vert = this.getSlope() + Math.PI/2 * this.sign;
	return createVector( px + twiceL * cos(vert), py + twiceL * sin(vert) );
}