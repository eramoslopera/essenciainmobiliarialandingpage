<?php
// Configuración de visualización de errores solo para el desarrollo (puedes comentarlo en prod)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Permitir solicitudes CORS (útil para pruebas locales desde React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si es una solicitud OPTIONS (preflight CORS), salir temprano
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuración de correo
// ¡CORREO PRINCIPAL PARA RECIBIR LEADS!
$to_email = "santitorres@essenciainmobiliaria.com";

$response = array('success' => false, 'message' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario de manera segura
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $address = isset($_POST['address']) ? strip_tags(trim($_POST['address'])) : '';

    // Validaciones básicas
    if (empty($name) || empty($phone) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Por favor, completa todos los campos requeridos correctamente.';
        echo json_encode($response);
        exit;
    }

    // Ruta donde se guardarán los archivos
    $upload_dir = 'uploads/';

    // Crear el directorio si no existe
    if (!is_dir($upload_dir)) {
        if (!mkdir($upload_dir, 0755, true)) {
            $response['message'] = 'Error en el servidor: No se pudo crear el directorio de subidas. Verifica los permisos de escritura.';
            echo json_encode($response);
            exit;
        }
    }

    // Proteger el directorio uploads con un index.php vacío o .htaccess básico
    if (!file_exists($upload_dir . 'index.php')) {
        file_put_contents($upload_dir . 'index.php', '<?php // Silence is golden');
    }

    $uploaded_files_links = [];

    // Procesar archivos subidos
    if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
        $file_count = count($_FILES['files']['name']);

        for ($i = 0; $i < $file_count; $i++) {
            $tmp_name = $_FILES['files']['tmp_name'][$i];
            $original_name = basename($_FILES['files']['name'][$i]);
            $error = $_FILES['files']['error'][$i];

            if ($error === UPLOAD_ERR_OK) {
                // Generar un nombre único para evitar sobrescribir archivos y problemas de seguridad
                $file_ext = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));
                $new_file_name = uniqid('cliente_' . preg_replace('/[^a-zA-Z0-9]/', '', substr($name, 0, 10)) . '_') . '.' . $file_ext;
                $destination = $upload_dir . $new_file_name;

                if (move_uploaded_file($tmp_name, $destination)) {
                    // Obtener la URL base dinámicamente
                    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                    $domain = $_SERVER['HTTP_HOST'];
                    $script_dir = dirname($_SERVER['REQUEST_URI']);
                    // Limpiar barras extra en la URL
                    if ($script_dir === '/' || $script_dir === '\\') {
                        $script_dir = '';
                    }

                    $file_url = $protocol . '://' . $domain . $script_dir . '/' . $destination;
                    $uploaded_files_links[] = $file_url;
                }
            }
        }
    }

    // Construir el cuerpo del correo
    $subject = "Nuevo prospecto de venta (Landing Page): " . $name;

    $message_body = "Se ha recibido una nueva solicitud desde la Landing Page de 'Vende tu casa':\n\n";
    $message_body .= "--------------------------------------------------------\n";
    $message_body .= "Nombre: " . $name . "\n";
    $message_body .= "Teléfono: " . $phone . "\n";
    $message_body .= "Email: " . $email . "\n";
    $message_body .= "Dirección de la propiedad: " . $address . "\n";
    $message_body .= "--------------------------------------------------------\n\n";

    if (count($uploaded_files_links) > 0) {
        $message_body .= "Archivos adjuntos (Fotos/Videos) subidos al servidor:\n";
        foreach ($uploaded_files_links as $link) {
            $message_body .= "- " . $link . "\n";
        }
        $message_body .= "\nSi algún archivo es muy grande, puede tardar un poco en descargarse. Por favor, respalda estos archivos si los necesitas a largo plazo.";
    } else {
        $message_body .= "El cliente no subió archivos adjuntos.";
    }

    // Encabezados del correo
    $headers = "From: web@essenciainmobiliaria.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar el correo
    if (mail($to_email, $subject, $message_body, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Tus datos se enviaron correctamente. Nos pondremos en contacto contigo.';
    } else {
        $response['message'] = 'Ha ocurrido un error al intentar enviar tu información. Por favor, intenta usar otro medio de contacto.';
    }

} else {
    $response['message'] = 'Método no permitido.';
}

// Enviar respuesta JSON al frontend
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>