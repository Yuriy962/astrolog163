<?php 
// Файлы phpmailer
require '/home/s/seotest/art-volga/public_html/phpmailer/PHPMailer.php';
require '/home/s/seotest/art-volga/public_html/phpmailer/SMTP.php';
require '/home/s/seotest/art-volga/public_html/phpmailer/Exception.php';

$name = $_POST['name'];
$phone = $_POST['tel'];
$doctor = $_POST['doctor'];

// Формирование самого письма
$title = "Новая заявка с формы сайта ART VOGLA - Клинка Вспомогательных Репродуктивных Технологий";
$body = "
<h2>Новая заявка с формы сайта  ART VOGLA - Клинка Вспомогательных Репродуктивных Технологий</h2>
<b>Имя:</b> ".$name."<br>
<b>Телефон:</b> ".$phone."<br>
";
if(empty($doctor)){
    $body = $body."<b>Записан(а) к:".$doctor."</b>";
}


$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    
    $mail->Host       = 'smtp.yandex.ru'; // Логин на почте
    $mail->Username   = 'Yuriy962Bur@yandex.ru'; // Логин на почте
    $mail->Password   = 'evtq962dthntnmcz'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('Yuriy962Bur@yandex.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    
    // $mail->addAddress('director@seoprostor.ru');
    $mail->addAddress('Yuriy962Bur@yandex.ru');
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если надо
    
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
