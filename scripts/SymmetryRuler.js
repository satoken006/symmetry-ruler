var s_list;
var new_stroke;
var spline;
var g_fThresholdToRemove = 1;

var mode;
var iteration;
var back_c;

var isShowingRuledLines = true;
var weight;
var isDrawable = false;

function setup(){
	s_list = [];
	spline = new Spline();
	new_stroke = new Stroke();

	createCanvas(700, 700);
	mode = int($('input[name="s"]:checked').val());
	iteration = int($('.iteration').val());
	back_c = color(255, 255, 255);
}

function draw(){
	background(back_c);

	//text(isDrawable, 100, 100);
	//text(s_list.length, 100, 120);
	
	stroke(153);
	strokeWeight(1);
	if( isShowingRuledLines ){
		switch( mode ){
			case 0:
				for( var j = 0 ; j < iteration ; j ++ ){
					line(width/2, height/2, width/2 * (1+sqrt(2)*cos(radians(j*360/iteration))), height/2 * (1+sqrt(2)*sin(radians(j*360/iteration))) );
					line(width/2, height/2, width/2 * (1+sqrt(2)*cos(radians(j*360/iteration + 180/iteration))), height/2 * (1+sqrt(2)*sin(radians(j*360/iteration + 180/iteration))) );
				}
				break;
			case 1:
				for( var j = 0 ; j < iteration ; j ++ ){
					line(width/2, height/2, width/2 * (1+sqrt(2)*cos(radians(j*360/iteration))), height/2 * (1+sqrt(2)*sin(radians(j*360/iteration))) );
				}
				break;
		}
	}
	
	stroke(0);
	for( var j = 0 ; j < s_list.length ; j ++ ){
		s_list[j].draw();
	}
	new_stroke.draw();
}

function mousePressed(){
	isDrawable = isFocusedOnCanvas();
	if( isDrawable ){
		new_stroke = new Stroke();
		new_stroke.weight = $('#weight').slider('value');
		new_stroke.red = $('#red').slider('value');
		new_stroke.green = $('#green').slider('value');
		new_stroke.blue = $('#blue').slider('value');
	}
}

function mouseDragged(){
	if( isDrawable ){
		if( dist( mouseX, mouseY, pmouseX, pmouseY ) >= 1 ){
			new_stroke.p_list.push(new Point(mouseX, mouseY));
		}
	}
}

function mouseReleased(){
	if( isDrawable ){
		var new_p_list = new_stroke.p_list;
		new_stroke.p_list = spline.getSpline(new_p_list, 50);
		s_list.push(new_stroke);
	}
}

function isFocusedOnCanvas(){
	return (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height);
}