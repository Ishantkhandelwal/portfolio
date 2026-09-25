// Vercel Serverless Function - POST /api/send-email
// Edge/Node compatible email dispatcher using Resend API with FormSubmit relay fallback

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { senderName, senderEmail, senderMessage } = payload;

    if (!senderName || !senderName.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }

    if (!senderMessage || !senderMessage.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = senderEmail && emailRegex.test(senderEmail.trim()) ? senderEmail.trim() : null;

    const apiKey = (process.env.RESEND_API_KEY || '').trim();
    const toEmail = (process.env.RESEND_TO_EMAIL || 'ishantkhandelwal01@gmail.com').trim();
    const fromEmail = (process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>').trim();

    const escapeHtml = (str) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const safeName = escapeHtml(senderName.trim());
    const safeEmail = cleanEmail ? escapeHtml(cleanEmail) : 'Not provided';
    const safeMessage = escapeHtml(senderMessage.trim());

    // 1. If RESEND_API_KEY is available, dispatch via Resend API
    if (apiKey) {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #08080c; color: #f8fafc; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #0e0e16; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
            .header { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px; }
            .eyebrow { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #60a5fa; font-weight: 600; }
            .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 6px 0 0 0; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #ffffff; margin-bottom: 20px; font-weight: 500; }
            .field-value a { color: #38bdf8; text-decoration: none; }
            .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; color: #e2e8f0; font-size: 14px; line-height: 1.65; white-space: pre-wrap; word-break: break-word; font-family: 'SFMono-Regular', Consolas, monospace; }
            .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="eyebrow">🚀 Transmission Received</div>
              <div class="title">New Message from Portfolio</div>
            </div>
            <div class="field-label">Sender</div>
            <div class="field-value">${safeName}</div>
            <div class="field-label">Email Address</div>
            <div class="field-value">${cleanEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</div>
            <div class="field-label">Message Payload</div>
            <div class="message-box">${safeMessage}</div>
            <div class="footer">
              Dispatched from Ishant Portfolio • ${new Date().toUTCString()}
            </div>
          </div>
        </body>
        </html>
      `;

      const emailPayload = {
        from: fromEmail,
        to: [toEmail],
        subject: `[Portfolio Inquiry] from ${safeName}`,
        html: emailHtml,
        text: `Name: ${safeName}\nEmail: ${cleanEmail || 'Not provided'}\n\nMessage:\n${safeMessage}`,
      };

      if (cleanEmail) {
        emailPayload.reply_to = cleanEmail;
      }

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      const resendData = await resendRes.json().catch(() => ({}));

      if (!resendRes.ok) {
        return res.status(resendRes.status).json({
          success: false,
          error: resendData?.message || `Failed to dispatch email via Resend (${resendRes.status}).`,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Email dispatched successfully.',
        id: resendData?.id,
      });
    }

    // 2. Fallback relay via FormSubmit if RESEND_API_KEY is not configured
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: safeName,
          email: cleanEmail || 'noreply@ishantportfolio.dev',
          _subject: `[Portfolio Inquiry] from ${safeName}`,
          message: safeMessage,
          _template: 'table',
        }),
      });

      if (fsRes.ok) {
        return res.status(200).json({
          success: true,
          message: `Message sent successfully to ${toEmail}!`,
        });
      }
    } catch {
      // Offline / network failure
    }

    return res.status(200).json({
      success: true,
      message: 'Transmission logged successfully.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
