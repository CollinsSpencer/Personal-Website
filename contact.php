<?php

$firstName = $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$email = $_REQUEST['email'];
$subject = $_REQUEST['subject'];
$message = $_REQUEST['message'];

$emailSubject = "Message from $firstName $lastName: $subject";
$emailMessage = "From: $firstName $lastName <$email>\n";
$emailMessage .= "Subject: $subject\n";
$emailMessage .= "$message";
$headers = "From: $firstName $lastName<$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Return-path: $email\r\n";
$headers .= "X-Mailer: PHP/".phpversion()."\r\n";

mail("CollinsSpencer97@gmail.com", $emailSubject, $emailMessage, $headers);

?>