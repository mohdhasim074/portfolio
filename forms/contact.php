<?php
$receiving_email_address = 'mohdhasim0074@gmail.com';

// Check if the PHP Email Form library is available
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include ($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;

// Validate and sanitize user inputs
$contact->from_name = htmlspecialchars($_POST['name']);
$contact->from_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$contact->subject = htmlspecialchars($_POST['subject']);

if (!$contact->from_email) {
  die('Invalid email format');
}

// Uncomment and configure below code if you want to use SMTP to send emails
/*
$contact->smtp = array(
  'host' => 'smtp.example.com',
  'username' => 'example@example.com',
  'password' => 'yourpassword',
  'port' => '587'
);
*/

$contact->add_message(htmlspecialchars($_POST['name']), 'From');
$contact->add_message($contact->from_email, 'Email');
$contact->add_message(htmlspecialchars($_POST['message']), 'Message', 10);

echo $contact->send();
?>