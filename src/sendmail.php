<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('someEmail@gmail.com', 'Vlad'); // From whom
$mail->addAddress('someEmail@yandex.ru'); // To whom
$mail->Subject = "Спасибо за сообщение!";

$body = '<h1>Встречайте супер письмо!</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p>Имя: ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p>email: ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['text']))) {
    $body .= '<p>Текст: ' . $_POST['text'] . '</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}
$response = ['message' => $message];

header('Content-type: application/json');
?>
<?php
echo json_encode($response);
?>