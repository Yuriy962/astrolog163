<?php 
// Файлы phpmailer
require $_SERVER['DOCUMENT_ROOT'].'/new/static/phpmailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'].'/new/static/phpmailer/SMTP.php';
require $_SERVER['DOCUMENT_ROOT'].'/new/static/phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'] ;
$email = $_POST['email'];
$phone = $_POST['tel'];
$text = $_POST['comment'];


// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
 try {   
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // Логин на почте
    $mail->Username   = 'Yuriy962Bur@yandex.ru'; // Логин на почте
    $mail->Password   = 'evtq962dthntnmcz'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('Yuriy962Bur@yandex.ru', 'Самарская школа астрологии'); // Адрес самой почты и имя отправителя
    
    // Получатель письма
    $mail->addAddress('Yuriy962Bur@yandex.ru');  
    // $mail->addAddress('poluchatel2@gmail.com'); // Ещё один, если нужен
    
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    
    
    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}
    
}  catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

echo json_encode(["result" => $result]);
?>