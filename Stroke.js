function Point(x, y){
	this.x = x;
	this.y = y;
}

function Stroke(){
	this.p_list = [];
	this.weight = 3;
	this.red = 0;
	this.green = 0;
	this.blue = 0;
}

Stroke.prototype.draw = function(){
	stroke(this.red, this.green, this.blue);
	strokeWeight(this.weight);

	switch( mode ){
		case 0:
			for( var j = 0 ; j < iteration ; j ++ ){
				push();
				translate(width/2, height/2);
				rotate(radians(j*360/iteration));

				var bound = new Line(width/2, height/2, width/2 * (1+sqrt(2)*cos(radians(j*360/iteration + 180/iteration))), height/2 * (1+sqrt(2)*sin(radians(j*360/iteration + 180/iteration))) );
				for( var i = 0 ; i < this.p_list.length ; i ++ ){
					push();
					var p = this.p_list[i];
					translate(-width/2, -height/2);
					point(p.x, p.y);
					var sym_p = bound.linearSymmetryPointFrom(p.x, p.y);
					point(sym_p.x, sym_p.y);
					pop();
				}
				pop();
			}
			break;
		case 1:
			for( var j = 0 ; j < iteration ; j ++ ){
				push();
				translate(width/2, height/2);
				rotate(radians(j*360/iteration));
				for( var i = 0 ; i < this.p_list.length ; i ++ ){
					var p = this.p_list[i];
					point(p.x - width/2, p.y - height/2);
				}
				pop();
			}
			break;
	}
}