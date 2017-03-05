<?php
require_once 'db.php';
if(isset($_GET['title']) && strlen($_GET['title'])>0){
	$title = $_GET['title'];
	if(isset($_GET['notes'])){
		$notes = $_GET['notes'];
		if($notes=="undefined"){
			$notes="";
		}
	} else {
		$notes = "";
	}
	$rating = "NULL";
	if(isset($_GET['priority'])){
		$priority = $_GET['priority'];
		if($priority==0){
			$priority = 2;
		}
	} else {
		$priority = "3";
	}
	$watched = "0";

	$query="INSERT INTO movie(id,title,notes,rating,priority,watched)  VALUES (NULL, '$title', '$notes', NULL, '$priority', '$watched')";//(NULL, $title, $notes, $rating, $priority, $watched)";
	$data_reslt = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$data_reslt = $mysqli->affected_rows;

	echo $jsondata_res = json_encode($data_reslt);
}
?>