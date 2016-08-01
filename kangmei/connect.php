<?php
	/*header('Content-Type:text/html;charset=utf-8');
	$mysqli = new mysqli('localhsot','root','','wzp_kangmei');
	$mysqli->query("set names utf8");
	if($mysqli->connect_error){
		die($mysqli->connect_errno);*/

	header('Content-Type:text/html; charset=utf-8');
	$mysqli = new mysqli('localhost', 'root', '', 'wzp_kangmei');
	mysqli_query($mysqli, "set names utf8");
	if ($mysqli->connect_error) {
    		die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
	}
?>