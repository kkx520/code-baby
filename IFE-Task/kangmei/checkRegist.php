<?php
	require "connect.php";
	$name   = $_POST['name'];
	$result = $mysqli->query("select * from wzp_person where name= '$name' ");
	$row    = $result->fetch_array();
	if(!empty($row)){
		echo 1;
	}
	else {
		echo 0;
	}
?>