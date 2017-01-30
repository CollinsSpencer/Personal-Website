<?php
require_once 'db.php';
if(isset($_GET['movieID'])){
	$movieID = $_GET['movieID'];
	$query="delete from movies where id='$movieID'";
	$data_reslt = $mysqli->query($query) or die($mysqli->error.__LINE__); //error display
	$data_reslt = $mysqli->affected_rows;
	echo $jsondata_res = json_encode($data_reslt);
}
?>