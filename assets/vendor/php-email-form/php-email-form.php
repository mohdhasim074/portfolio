<?php
// Replace these values with your email settings
$recipient_email = "mohdhasim0074@example.com";
$recipient_name = "Mohammad Hasim";
$subject_prefix = "[Contact Form] ";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Validate form fields
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $subject = strip_tags(trim($_POST["subject"]));
  $message = trim($_POST["message"]);

  if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please complete the form and try again.";
    exit;
  }

  // Set email subject and body
  $subject = $subject_prefix . $subject;
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n\n";
  $email_content .= "Message:\n$message\n";

  // Set email headers
  $email_headers = "From: $name <$email>";

  // Send the email
  if (mail($recipient_email, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Thank you! Your message has been sent.";
  } else {
    http_response_code(500);
    echo "Oops! Something went wrong, and we couldn't send your message.";
  }
} else {
  http_response_code(403);
  echo "There was a problem with your submission, please try again.";
}
?>