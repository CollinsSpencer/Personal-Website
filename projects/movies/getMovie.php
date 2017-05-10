<?php
require_once 'db.php';

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$query="SELECT movieId,title,notes,rating,priority,watched FROM movie";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);


echo $jsondata_res = json_encode($result->fetch_all(MYSQLI_ASSOC));

?>
