<!DOCTYPE html>
<html>

<head>
	<meta charset='UTF-8'>
	<title>file reception</title>
</head>

<body>
	<?php    

	$imageData = $_POST['image'];
    $filename = 'example.png';
    $fp = fopen($filename, 'w');
    fwrite($fp,base64_decode($imageData));
    fclose($fp);

    ?>
</body>

</html>