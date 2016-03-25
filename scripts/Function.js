$(document).ready( function(){

	// ****************** スライダーの設置 ******************

	createJQSlider( '#weight', 20, 0.5, 4, 0.1, function(){} );
	createJQSlider( '#red', 255, 0, 0, 1, function(){} );
	createJQSlider( '#green', 255, 0, 0, 1, function(){} );
	createJQSlider( '#blue', 255, 0, 0, 1, function(){} );
	createJQSlider( '#back_red', 255, 0, 255, 1, updateBackground );
	createJQSlider( '#back_green', 255, 0, 255, 1, updateBackground );
	createJQSlider( '#back_blue', 255, 0, 255, 1, updateBackground );

	function createJQSlider( element, _max, _min, _value, _step, slideAction ){
		$( element ).slider({
			max: _max,
			min: _min,
			value: _value,
			step: _step,
			slide: slideAction
		});
	}

	function updateBackground(){
		var r = $('#back_red').slider('value');
		var g = $('#back_green').slider('value');
		var b = $('#back_blue').slider('value');
		back_c = color(r, g, b);
	}

	// ****************** チェックボックスのリスナー ******************

	$('.ruledLines').on('click', function(){
		isShowingRuledLines = $(this).is(':checked');
	} );

	// ****************** ラジオボタンのリスナー ******************

	$('.symmetry').change(function(){
		mode = int($('input[name=s]:checked').val());
	});

	// ****************** テキストボックスのリスナー ******************

	$('.iteration').each(function(){
		$(this).on({
			'keyup': updateIteration(this), 
			'mouseup': updateIteration(this)
		});
	});

	function updateIteration(elm){
		var v, old = elm.value;
		return function(){
			if(old != (v=elm.value)){
				old = v;
				iteration = int($(this).val());
			}
		}
	}

	// ****************** ボタンのリスナー ****************** 

	$('#undoButton').on( 'click', function(){
		s_list.pop();
		new_stroke.p_list.length = 0;
	} );

	$('#clearButton').on( 'click', function(){
		s_list.length = 0;
		new_stroke.p_list.length = 0;
	} );

	$('#saveButton').on( 'click', function(){
		isShowingRuledLines = false;
		draw();
		var canvas = document.getElementsByTagName('canvas')[1];
		var base64 = canvas.toDataURL();
		var blob = Base64toBlob(base64);
		saveBlob(blob, getFileNameFromDate());

		// **************************************************
		// **************************************************

	    // body部パラメーター
	    var d = {};
	    // Canvasのデータをbase64でエンコードした文字列を取得
	    var canvasData = canvas.toDataURL();
	    //alert(canvasData);

	    // 不要な情報を取り除く
	    canvasData = canvasData.replace(/^data:image\/png;base64,/, '');

	    d.image = canvasData;

	    $.ajax({
	        url: 'http://satoken.nkmr.io/2015/SymmetryRuler/receive_file.php',
	        type: 'POST',
	        success: function() {
	            // 成功時の処理
	            //alert("success");
	        },
	        error(jqXHR, textStatus, errorThrown) {
	            // 失敗時の処理
	            //alert("failed");
	        },
	        data: d,
	        dataType: 'json'
	    });
	    
		// **************************************************
		// **************************************************

		isShowingRuledLines = true;
	} );

	function getFileNameFromDate(){
		var now = new Date();
		var y = now.getFullYear();
		var M = addZero(now.getMonth()+1);
		var d = addZero(now.getDate());
		var h = addZero(now.getHours());
		var m = addZero(now.getMinutes());
		var s = addZero(now.getSeconds());
		return "sym_ruler_"+y+M+d+h+m+s+".png";
	}

	function addZero( num ){
		return ('0' + num).slice(-2);
	}

	function Base64toBlob( _base64 ){
	    var tmp = _base64.split(',');
	    var data = atob(tmp[1]);
		var mime = tmp[0].split(':')[1].split(';')[0];

		var arr = new Uint8Array(data.length);
		for (var i = 0; i < data.length; i++) {
			arr[i] = data.charCodeAt(i);
		}
		var blob = new Blob([arr], { type: mime });
	    return blob;
	}

	function saveBlob( _blob, _file ){
		if( /*@cc_on ! @*/ false ){
	        window.navigator.msSaveBlob(_blob, _file);
	    }else {
	        var url = (window.URL || window.webkitURL);
	        var data = url.createObjectURL(_blob);
	        var e = document.createEvent("MouseEvents");
	        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
	        a.href = data;
	        a.download = _file;   
	        a.dispatchEvent(e);
	    }
	}

} );