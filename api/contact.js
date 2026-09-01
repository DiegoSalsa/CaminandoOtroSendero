const { Resend } = require('resend');

const ALLOWED_SERVICES = [
    'Consultoría ambiental',
    'Línea base y monitoreo',
    'Identificación taxonómica',
    'Educación ambiental',
    'Otro',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function trimField(value, max) {
    return String(value || '').trim().slice(0, max);
}

function siteUrl() {
    return (process.env.SITE_URL || 'https://caminandootrosendero.cl').replace(/\/$/, '');
}

function fromAddress() {
    return process.env.RESEND_FROM
        || process.env.RESEND_FROM_EMAIL
        || process.env.FROM_EMAIL
        || 'Caminando Otro Sendero <contacto@caminandootrosendero.cl>';
}

function ownerEmail() {
    return process.env.CONTACT_TO_EMAIL
        || process.env.CONTACT_EMAIL
        || process.env.TO_EMAIL
        || 'luis.carrera.suarez@caminandootrosendero.cl';
}

function emailShell({ preheader, title, intro, body, footerNote }) {
    const url = siteUrl();
    const logo = `${url}/assets/client/logo-client-2026.png`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f3eb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3eb;margin:0;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(22,40,26,.13);">
          <tr>
            <td style="background:#203525;padding:28px 36px 24px;text-align:center;">
              <img src="${logo}" width="72" height="72" alt="Caminando Otro Sendero" style="display:block;margin:0 auto 14px;border:0;border-radius:50%;">
              <p style="margin:0;color:#f7a274;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Estamos en el ambiente</p>
              <h1 style="margin:10px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;font-weight:700;">Caminando Otro Sendero</h1>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:#c54e19;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 36px 12px;font-family:Arial,Helvetica,sans-serif;color:#172019;">
              <p style="margin:0 0 8px;color:#c95822;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">${escapeHtml(title)}</p>
              <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#5d675f;">${intro}</p>
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 36px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3eb;border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;color:#5d675f;font-size:13px;line-height:1.6;">
                    ${footerNote}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#203525;padding:22px 36px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 6px;color:#ffffff;font-size:13px;">Consultoría, investigación y educación ambiental</p>
              <p style="margin:0;color:#b8c592;font-size:12px;">Talcahuano, Región del Biobío, Chile</p>
              <p style="margin:12px 0 0;">
                <a href="${url}" style="color:#f7a274;font-size:12px;text-decoration:none;">caminandootrosendero.cl</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label, value) {
    return `<tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(23,32,25,.14);width:38%;color:#66753c;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(23,32,25,.14);color:#172019;font-size:15px;line-height:1.5;vertical-align:top;">${value}</td>
    </tr>`;
}

function ownerEmailHtml(fields) {
    const messageHtml = escapeHtml(fields.message).replace(/\n/g, '<br>');
    const body = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${detailRow('Nombre', escapeHtml(fields.name))}
        ${detailRow('Empresa', escapeHtml(fields.company || 'No indicada'))}
        ${detailRow('Correo', `<a href="mailto:${escapeHtml(fields.email)}" style="color:#c54e19;text-decoration:none;">${escapeHtml(fields.email)}</a>`)}
        ${detailRow('Servicio', escapeHtml(fields.service))}
      </table>
      <p style="margin:28px 0 8px;color:#c95822;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">Mensaje</p>
      <p style="margin:0;padding:18px 20px;background:#f6f3eb;border-radius:14px;color:#172019;font-size:15px;line-height:1.7;">${messageHtml}</p>
    `;

    return emailShell({
        preheader: `Nueva consulta de ${fields.name} sobre ${fields.service}.`,
        title: 'Nueva consulta web',
        intro: 'Llegó una nueva solicitud desde el formulario de contacto. Puedes responder directamente a este correo.',
        body,
        footerNote: `Responder este mensaje enviará la respuesta a <strong>${escapeHtml(fields.email)}</strong>.`,
    });
}

function clientEmailHtml(fields) {
    const body = `
      <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#172019;">Hola ${escapeHtml(fields.name)},</p>
      <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#5d675f;">Recibimos tu consulta sobre <strong style="color:#203525;">${escapeHtml(fields.service)}</strong>. El equipo la revisará y te contactaremos a la brevedad para evaluar el alcance y la mejor forma de trabajar juntos.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${detailRow('Servicio', escapeHtml(fields.service))}
        ${detailRow('Empresa', escapeHtml(fields.company || 'No indicada'))}
      </table>
    `;

    return emailShell({
        preheader: 'Recibimos tu consulta y te responderemos a la brevedad.',
        title: 'Consulta recibida',
        intro: 'Gracias por escribirnos. Este es un comprobante de que tu mensaje llegó correctamente.',
        body,
        footerNote: 'Si necesitas complementar información, responde este correo o escríbenos a <a href="mailto:luis.carrera.suarez@caminandootrosendero.cl" style="color:#c54e19;text-decoration:none;">luis.carrera.suarez@caminandootrosendero.cl</a>.',
    });
}

function parseBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch {
            return {};
        }
    }
    return {};
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const payload = parseBody(req);

    if (trimField(payload.website, 200)) {
        return res.status(200).json({ ok: true });
    }

    const fields = {
        name: trimField(payload.name, 120),
        company: trimField(payload.company, 160),
        email: trimField(payload.email, 160).toLowerCase(),
        service: trimField(payload.service, 80),
        message: trimField(payload.message, 4000),
    };

    if (!fields.name || !fields.email || !fields.message || !fields.service) {
        return res.status(400).json({ error: 'Completa nombre, correo, servicio y mensaje.' });
    }

    if (!EMAIL_REGEX.test(fields.email)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido.' });
    }

    if (!ALLOWED_SERVICES.includes(fields.service)) {
        return res.status(400).json({ error: 'Selecciona un servicio válido.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('Falta RESEND_API_KEY');
        return res.status(500).json({ error: 'El envío de correos no está configurado.' });
    }

    const resend = new Resend(apiKey);
    const from = fromAddress();
    const toOwner = ownerEmail();

    try {
        const ownerResult = await resend.emails.send({
            from,
            to: [toOwner],
            replyTo: fields.email,
            subject: `Nueva consulta web: ${fields.service} — ${fields.name}`,
            html: ownerEmailHtml(fields),
            text: [
                `Nombre: ${fields.name}`,
                `Empresa: ${fields.company || 'No indicada'}`,
                `Correo: ${fields.email}`,
                `Servicio: ${fields.service}`,
                '',
                'Mensaje:',
                fields.message,
            ].join('\n'),
        });

        if (ownerResult.error) {
            throw new Error(ownerResult.error.message || 'No se pudo notificar al equipo');
        }

        const clientResult = await resend.emails.send({
            from,
            to: [fields.email],
            replyTo: toOwner,
            subject: 'Recibimos tu consulta | Caminando Otro Sendero',
            html: clientEmailHtml(fields),
            text: [
                `Hola ${fields.name},`,
                '',
                `Recibimos tu consulta sobre ${fields.service}. Te responderemos a la brevedad.`,
                '',
                'Caminando Otro Sendero',
                'luis.carrera.suarez@caminandootrosendero.cl',
            ].join('\n'),
        });

        if (clientResult.error) {
            console.error('Confirmación al cliente no enviada:', clientResult.error);
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Error al enviar correos de contacto:', error);
        return res.status(500).json({ error: 'No pudimos enviar tu consulta. Inténtalo nuevamente o escríbenos por correo.' });
    }
};
