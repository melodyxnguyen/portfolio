<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email_address']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email address
    $to = "melody.nguyen@pace.edu";

    // Email subject and headers
    $subject = "New Contact Form Submission from $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to a thank-you page or display a success message
        echo "Thank you! Your message has been sent.";
    } else {
        // Display an error message if email sending fails
        echo "Oops! Something went wrong, and we couldn’t send your message.";
    }
} else {
    // Redirect to the contact form if accessed directly
    header("Location: index.html");
    exit();
}
?>
