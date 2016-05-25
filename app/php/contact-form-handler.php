<?php
//Check to see if session already started
if(!isset($_SESSION)) session_start();
//Check to see if POST is set
if(!$_POST) {
    http_response_code(400);
    exit;
}
//Check to see if End of Line characters defined
if(!defined( "PHP_EOL" )) define("PHP_EOL", "\n");

$to = "craigmatthew412@gmail.com";
$subject = "CraigMcMurray.co Website Contact Form";

foreach($_POST as $key => $value) {
    if(ini_get('magic_quotes_gpc'))
        $_POST[$key] = stripslashes($_POST[$key]);
    $_POST[$key] = htmlspecialchars(strip_tags($_POST[$key]));
}

//Assign the input values to variables for easy reference
$name      = @$_POST["name"];
$email     = @$_POST["email"];
$phone     = @$_POST["phone"];
$message   = @$_POST["comment"];
$verify    = @$_POST["verify"];

//Test input values for errors
$errors = array();

//php verify name
if(isset($_POST["name"])) {
    if(!$name) {
        $errors[] = "You must enter a name.";
    }
    elseif(strlen($name) < 3)  {
        $errors[] = "Your name must be at least 3 characters.";
    }
}
//php verify email
if(isset($_POST["email"])){
    if(!$email) {
        $errors[] = "You must enter an email address.";
    }
    else if(!validEmail($email)) {
        $errors[] = "You must enter a valid email address.";
    }
}
//php verify phone
if(isset($_POST["phone"]) && strlen($_POST["phone"]) > 0){
    if(!is_numeric($phone)) {
        $errors[]= 'Your phone number can only contain digits.';
    }
}
//php verify comment
if(isset($_POST["comment"])){
    if(strlen($message) < 25) {
        if(!$message) {
            $errors[] = "You must enter a message.";
        }
        else {
            $errors[] = "Message must be at least 25 characters.";
        }
    }
}
//php verify captcha
if(isset($_POST["verify"])){
    if(!$verify) {
        $errors[] = "You must enter the security code";
    } else if(md5($verify) != $_SESSION['nekoCheck']['verify']) {
        $errors[] = "The security code you entered is incorrect ";
    }
}

if($errors) {
    $errorText = "";
    //Iterate over each error
    foreach($errors as $error) {
        $errorText .= '<li>'. $error . "</li>";
    }
    //Set the response code to failure
    http_response_code(400);
    //Die and return errors
    die('<div id="php-error"><i class="fa fa-warning"></i>&nbsp;Oops, please correct the following errors:<br><ul>'. $errorText .'</ul></div>');
    //echo '<div class="alert alert-error">The following errors occured:<br><ul>'. $errorText .'</ul></div>';

}
else {
    //Send the email
    $headers  = "From: " . $name . " <" . $email . ">" . PHP_EOL;
    $headers .= "Reply-To: <" . $email . ">" . PHP_EOL;
    $headers .= "Return-Path: <" . $email . ">" . PHP_EOL;
    $headers .= "Envelope-from: <" . $email . ">" . PHP_EOL;
    $headers .= "MIME-Version: 1.0" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    $mailBody  = "You have been contacted by $name via the CraigMcMurray.co contact form" . PHP_EOL . PHP_EOL;
    $mailBody .= (!empty($company))?'Company: '. PHP_EOL.$company. PHP_EOL . PHP_EOL:'';
    $mailBody .= (!empty($quoteType))?'project Type: '. PHP_EOL.$quoteType. PHP_EOL . PHP_EOL:'';
    $mailBody .= "$name's message: ";
    $mailBody .= $message . PHP_EOL . PHP_EOL;
    $mailBody .= "You can contact $name via email at $email.";
    $mailBody .= (isset($phone) && !empty($phone))?" Or via phone at $phone." . PHP_EOL . PHP_EOL:'';
    //$mailBody .= "-------------------------------------------------------------------------------------------" . PHP_EOL;

    if(!is_null($name) && !is_null($email) && !is_null($message)) {
        if(mail($to, $subject, $mailBody, $headers)) {
            echo "<i class='fa fa-check'></i>&nbsp;Thank you, $name, for reaching out to me!  I love hearing from people on the Internets.";
        }
        else {
            //Set the response code to failure
            http_response_code(400);

            //Die and return errors
            die('<div id="php-error"><i class="fa fa-warning"></i>&nbsp;Oops, there was a problem sending your message. Please try again later!</div>');
        }
    }
}

//FUNCTIONS
function validEmail($email) {
    $isValid = true;
    $atIndex = strrpos($email, "@");

    if(is_bool($atIndex) && !$atIndex) {
        $isValid = false;
    }
    else {
        $domain = substr($email, $atIndex + 1);
        $domainLen = strlen($domain);
        $local = substr($email, 0, $atIndex);
        $localLen = strlen($local);

        if($localLen < 1 || $localLen > 64) {
            //local part length exceeded
            $isValid = false;
        }
        else if($domainLen < 1 || $domainLen > 255) {
            //domain part length exceeded
            $isValid = false;
        }
        else if($local[0] == '.' || $local[$localLen - 1] == '.') {
            //local part starts or ends with '.'
            $isValid = false;
        }
        else if(preg_match('/\\.\\./', $local)) {
            //local part has two consecutive dots
            $isValid = false;
        }
        else if(!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain)) {
            //character not valid in domain part
            $isValid = false;
        }
        else if(preg_match('/\\.\\./', $domain)) {
            //domain part has two consecutive dots
            $isValid = false;
        }
        else if(!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/', str_replace("\\\\", "", $local))) {
            //character not valid in local part unless local part is quoted
            if(!preg_match('/^"(\\\\"|[^"])+"$/', str_replace("\\\\", "", $local))) {
                $isValid = false;
            }
        }

        if($isValid && !(checkdnsrr($domain, "MX") || checkdnsrr($domain, "A"))) {
            //domain not found in DNS
            $isValid = false;
        }
    }
    return $isValid;
}

?>