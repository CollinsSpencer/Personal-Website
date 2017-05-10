<?php 
require_once 'db.php';
if(isset($_GET['movieID'])){
$watched = $_GET['watched'];
$movieID = $_GET['movieID'];
if(isset($_GET['title'])){
	$title = $_GET['title'];
	$notes = $_GET['notes'];
	$rating = $_GET['rating'];
	$priority = $_GET['priority'];
	$query="UPDATE movie SET title='$title', notes='$notes', rating='$rating', priority='$priority', watched='$watched' where movie.id='$movieID'";
} else {
	$query="UPDATE movie SET watched='$watched' where movie.id='$movieID'";
}
$data_reslt = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$data_reslt = $mysqli->affected_rows;
 
$jsondata_res = json_encode($data_reslt);
}
?>