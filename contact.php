<?php

require 'PHPMailerAutoload.php';

$firstName = $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$email = $_REQUEST['email'];
$subject = $_REQUEST['subject'];
$message = $_REQUEST['message'];

$emailSubject = "Contact Spencer Collins: $subject";

$emailMessage = "Hello $firstName $lastName,<br><br>";
$emailMessage .= "Thank you for contacting me! I have received your message and will get back to you shortly.<br><br>";
$emailMessage .= "I have included a copy of your message for your records.<br><br>";
$emailMessage .= "Yours,<br>Spencer Collins<br>SpencerCollins.net<br><br><br>";
$emailMessage .= "From: $firstName $lastName &lt;$email&gt;<br>";
$emailMessage .= "Subject: $subject<br><br>";
$emailMessage .= "$message";


$mail = new PHPMailer;

$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'CollinsSpencer97@gmail.com';
$mail->Password = 'sdlymvacmwsligpo';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('CollinsSpencer97@gmail.com');
$mail->FromName = "SpencerCollins.net";
$mail->addAddress("CollinsSpencer97@gmail.com", "Spencer Collins");
$mail->addAddress("$email", "$firstName $lastName");
$mail->addReplyTo("$email", "$firstName $lastName");

$mail->isHTML(true);
$mail->Subject = $emailSubject;
$mail->Body    = "$emailMessage";
$mail->AltBody = $emailMessage;

if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'Message has been sent';
}

?>