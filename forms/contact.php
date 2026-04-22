<?php
//session_start();
//PHP Mailer Headers
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

$name = $_POST['name'];
$email = $_POST['email'];
$service = $_POST['subject'];
$cellphone = $_POST['cellphone'];
$message = $_POST['message'];
$mail = new PHPMailer(true);
try{
    $mail->isSMTP();                                             
    $mail->Host       = 'mail.blaqueorchidsgroup.co.za';
    //$mail->SMTPDebug = 2;                    
    $mail->SMTPAuth   = true;                             
    $mail->Username   = 'hello@blaqueorchidsgroup.co.za';                 
    $mail->Password   = 'Blaque$Group@#';
    $mail->SMTPSecure = 'tls';                              
    $mail->Port       = 587;
    $mail->setFrom('hello@blaqueorchidsgroup.co.za','Blaque Orchids Group');           
    $mail->addAddress('hello@blaqueorchidsgroup.co.za');
    $message = '<!DOCTYPE html> 
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Quicksand, sans-serif:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="http://getbootstrap.com.vn/examples/equal-height-columns/equal-height-columns.css"/>
<style type="text/css">
<style type="text/css">
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>

</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
<table>
<tr>
<td>Subject: '.$service.'<br><br>Name: '.$name.'<br>Email: '.$email.'<br>Cellphone: '.$cellphone.'<br>Message: '.$message.'<td>
</tr>
</table>
</body>
</html>';
//end of html    
    $mail->isHTML(true);                                  
    $mail->Subject = 'Blaque Orchids Group Contact form';
    $mail->Body    = $message;
    //$mail->AltBody = 'Body in plain text for non-HTML mail clients';
    $mail->send();
    echo "OK";
   
} catch (Exception $e) {
    echo "{$mail->ErrorInfo}";
}

?>