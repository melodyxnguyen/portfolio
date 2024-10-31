<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email_address'];
    $message = $_POST['message'];

    $to = "melody.nguyen@pace.edu";
    $subject = "New Contact Form Submission";
    $headers = "From: " . $email;

    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send the message.";
    }
}
?>
