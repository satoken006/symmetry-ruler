var previewApplet = function(p){

	p.setup = function(){
		p.createCanvas(200, 75);
		p.fill(0);
		p.textSize(16);
	}

	p.draw = function(){
		var preview_w = $('#weight').slider('value');
		var preview_c = color($('#red').slider('value'), $('#green').slider('value'), $('#blue').slider('value'));
		var preview_back_c = color($('#back_red').slider('value'), $('#back_green').slider('value'), $('#back_blue').slider('value'));

		p.background(preview_back_c);
		p.noStroke();
		p.text("プレビュー", 25, 25);
		p.stroke(preview_c);
		p.strokeWeight(preview_w);
		p.line(50, 50, 150, 50);
	}
}

var subApplet = new p5(previewApplet, "linePreview");