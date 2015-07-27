<?php
header('Last-Modified: '.date(DATE_RFC822));
header('Pragma: no-cache');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: '. date(DATE_RFC822, time() - 3600));

$contactName = (isset($_POST['name']) ? $_POST['name'] : null);
$contactEmail = (isset($_POST['email']) ? $_POST['email'] : null);
$contactMessage = (isset($_POST['message']) ? $_POST['message'] : null);

$to = "craigmatthew412@gmail.com";

$subject = "CraigMcMurray.co Contact Form";

$message = "Name:  $contactName \nE-mail:  $contactEmail \nMessage:  $contactMessage";

$name = "$contactName";

$from = "$contactEmail";

$headers  = "From: " . $name . " <" . $from . ">" . PHP_EOL;
$headers .= "Reply-To: <" . $from . ">" . PHP_EOL;
$headers .= "Return-Path: <" . $from . ">" . PHP_EOL;
$headers .= "Envelope-from: <" . $from . ">" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

$message = str_replace("\n.", "\n..", $message);

if(!is_null($contactName) && !is_null($contactEmail) && !is_null($contactMessage)) {
    mail($to, $subject, $message, $headers);
}
//echo    "<p>Thank you, $contactName, for your comments.  I greatly appreciate your message!</p>";
?>

