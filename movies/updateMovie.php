<?php 
require_once 'db.php';
if(isset($_GET['movieID'])){
$watched = $_GET['watched'];
$movieID = $_GET['movieID'];
$query="UPDATE movies SET watched='$watched' where movies.id='$movieID'";
$data_reslt = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$data_reslt = $mysqli->affected_rows;
 
$jsondata_res = json_encode($data_reslt);
}
?>