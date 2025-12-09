// Cloudflare Worker para el Formulario de Contacto de SYNOTEC
// Este Worker recibe los datos del formulario y los envía por correo electrónico
// utilizando la API de SendGrid.

// IMPORTANTE: Debe configurar las siguientes variables de entorno (Secrets) en su Worker de Cloudflare:
// 1. SENDGRID_API_KEY: Su clave API de SendGrid.
// 2. SENDER_EMAIL: La dirección de correo electrónico verificada desde la que enviará (ej. no-reply@synotec.cl).

const RECIPIENT_EMAIL = 'nvidal@synotec.cl';
const SENDGRID_ENDPOINT = 'https://api.sendgrid.com/v3/mail/send';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Configuración de CORS para permitir solicitudes desde su dominio
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Cambie esto a su dominio de producción
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders })
  }

  // Asegurar que la solicitud es JSON o FormData
  let formData;
  try {
    formData = await request.formData();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid content type. Expected FormData.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  
  const nombre = formData.get('nombre');
  const email = formData.get('email');
  const mensaje = formData.get('mensaje');

  // Validación básica
  if (!nombre || !email || !mensaje) {
    return new Response(JSON.stringify({ success: false, message: 'Por favor, complete todos los campos requeridos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }

  // Construir el cuerpo del correo
  const emailBody = `
    Nuevo mensaje de contacto de SYNOTEC:
    
    Nombre: ${nombre}
    Email: ${email}
    Mensaje:
    ---
    ${mensaje}
    ---
  `;

  // Cargar variables de entorno (Secrets)
  const SENDGRID_API_KEY = globalThis.SENDGRID_API_KEY;
  const SENDER_EMAIL = globalThis.SENDER_EMAIL;

  if (!SENDGRID_API_KEY || !SENDER_EMAIL) {
      return new Response(JSON.stringify({ success: false, message: 'Error de configuración del Worker: Faltan claves API o email del remitente.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
  }

  // Payload para SendGrid
  const emailPayload = {
    personalizations: [
      {
        to: [{ email: RECIPIENT_EMAIL }],
        subject: `[SYNOTEC Contacto] Nuevo mensaje de ${nombre}`,
      },
    ],
    from: { email: SENDER_EMAIL, name: 'SYNOTEC Contacto' },
    content: [
      {
        type: 'text/plain',
        value: emailBody,
      },
    ],
    reply_to: { email: email, name: nombre }
  };

  try {
    const response = await fetch(SENDGRID_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    // SendGrid retorna 202 en caso de éxito
    if (response.status === 202) {
      return new Response(JSON.stringify({ success: true, message: '¡Gracias! Su mensaje ha sido enviado con éxito.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    } else {
      // Manejo de errores de SendGrid
      const errorText = await response.text();
      console.error('SendGrid Error:', response.status, errorText);
      return new Response(JSON.stringify({ success: false, message: 'Error al enviar el correo. Intente más tarde.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error de red al intentar enviar el correo.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
}
