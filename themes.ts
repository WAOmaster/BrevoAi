export interface EmailTheme {
  id: string;
  name: string;
  accentColor: string;
  wrap: (bodyHtml: string, photoUrl?: string) => string;
}

export const EMAIL_THEMES: EmailTheme[] = [
  {
    id: 'none',
    name: 'None',
    accentColor: '#e2e8f0',
    wrap: (body) => body,
  },

  {
    id: 'sashi-classic',
    name: 'Sashi Classic',
    accentColor: '#0d1b2a',
    wrap: (body, photoUrl) => `
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f5f9; font-family:'Segoe UI',Arial,sans-serif;">
<tr><td align="center" style="padding:24px 16px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr>
    <td style="background:#0d1b2a; padding:28px 32px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          ${photoUrl ? `<td width="76" style="padding-right:18px; vertical-align:middle;">
            <img src="${photoUrl}" width="64" height="64" alt="Sashi Perera"
              style="border-radius:50%; border:2px solid #38bdf8; display:block; object-fit:cover;" />
          </td>` : ''}
          <td style="vertical-align:middle;">
            <div style="font-size:22px; font-weight:800; color:#ffffff; letter-spacing:3px; line-height:1;">
              SASHI <span style="color:#38bdf8;">PERERA</span>
            </div>
            <div style="font-size:10px; color:#94a3b8; letter-spacing:2px; text-transform:uppercase; margin-top:6px;">
              SENIOR BUSINESS ANALYST&nbsp;&nbsp;|&nbsp;&nbsp;SRI LANKA
            </div>
          </td>
          <td style="vertical-align:middle; text-align:right;">
            <div style="font-size:12px; color:#94a3b8; line-height:1.8;">
              <a href="mailto:hello@iamsashi.com" style="color:#94a3b8; text-decoration:none;">hello@iamsashi.com</a><br/>
              +94 71 944 4060
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Accent bar -->
  <tr><td style="background:#38bdf8; height:3px; font-size:0; line-height:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px; background:#ffffff; color:#1e293b; font-size:15px; line-height:1.75;">
      ${body}
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#0d1b2a; padding:20px 32px; text-align:center;">
      <div style="font-size:12px; color:#94a3b8; margin-bottom:10px;">
        <a href="mailto:hello@iamsashi.com" style="color:#94a3b8; text-decoration:none; margin:0 8px;">✉ hello@iamsashi.com</a>
        &nbsp;·&nbsp;
        <span style="margin:0 8px;">📱 +94 71 944 4060</span>
        &nbsp;·&nbsp;
        <span style="margin:0 8px;">📍 Panadura, Sri Lanka</span>
      </div>
      <div style="font-size:12px; margin-bottom:12px;">
        <a href="https://www.linkedin.com/in/sashiperera/" style="color:#38bdf8; text-decoration:none; margin:0 6px;">LinkedIn</a>
        <span style="color:#475569;">&nbsp;•&nbsp;</span>
        <a href="https://iamsashi.com" style="color:#38bdf8; text-decoration:none; margin:0 6px;">iamsashi.com</a>
        <span style="color:#475569;">&nbsp;•&nbsp;</span>
        <a href="https://www.credly.com/users/sashi-perera" style="color:#38bdf8; text-decoration:none; margin:0 6px;">Credly Badges</a>
      </div>
      <div style="border-top:1px solid #1e293b; padding-top:12px; font-size:11px; color:#475569;">
        CV available upon request&nbsp;&nbsp;•&nbsp;&nbsp;References available upon request
      </div>
    </td>
  </tr>

</table>
</td></tr>
</table>`,
  },

  {
    id: 'appcloudpro',
    name: 'App Cloud Pro',
    accentColor: '#2563eb',
    wrap: (body, photoUrl) => `
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f5f9; font-family:'Segoe UI',Arial,sans-serif;">
<tr><td align="center" style="padding:24px 16px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 100%); padding:28px 32px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          ${photoUrl ? `<td width="76" style="padding-right:18px; vertical-align:middle;">
            <img src="${photoUrl}" width="60" height="60" alt="Sashi Perera"
              style="border-radius:50%; border:2px solid rgba(255,255,255,0.6); display:block; object-fit:cover;" />
          </td>` : ''}
          <td style="vertical-align:middle;">
            <div style="font-size:20px; font-weight:800; color:#ffffff; letter-spacing:1px;">App Cloud Pro</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.7); margin-top:4px;">
              Sashi Perera&nbsp;&nbsp;|&nbsp;&nbsp;Cloud Architect &amp; Developer
            </div>
          </td>
          <td style="vertical-align:middle; text-align:right;">
            <div style="font-size:12px; color:rgba(255,255,255,0.7); line-height:1.8;">
              <a href="mailto:hello@appcloudpro.com" style="color:rgba(255,255,255,0.8); text-decoration:none;">hello@appcloudpro.com</a><br/>
              <a href="https://www.appcloudpro.com" style="color:rgba(255,255,255,0.8); text-decoration:none;">appcloudpro.com</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Accent bar -->
  <tr><td style="background:#60a5fa; height:3px; font-size:0; line-height:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px; background:#ffffff; color:#1e293b; font-size:15px; line-height:1.75;">
      ${body}
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#1e3a8a; padding:20px 32px; text-align:center;">
      <div style="font-size:12px; margin-bottom:10px;">
        <a href="https://www.appcloudpro.com" style="color:#93c5fd; text-decoration:none; margin:0 8px;">appcloudpro.com</a>
        <span style="color:#3b82f6;">&nbsp;•&nbsp;</span>
        <a href="https://www.linkedin.com/in/sashiperera/" style="color:#93c5fd; text-decoration:none; margin:0 8px;">LinkedIn</a>
        <span style="color:#3b82f6;">&nbsp;•&nbsp;</span>
        <a href="https://github.com/WAOmaster" style="color:#93c5fd; text-decoration:none; margin:0 8px;">GitHub</a>
      </div>
      <div style="font-size:11px; color:#3b82f6;">
        © ${new Date().getFullYear()} App Cloud Pro. All rights reserved.
      </div>
    </td>
  </tr>

</table>
</td></tr>
</table>`,
  },

  {
    id: 'minimal',
    name: 'Minimal',
    accentColor: '#6366f1',
    wrap: (body, photoUrl) => `
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc; font-family:'Segoe UI',Arial,sans-serif;">
<tr><td align="center" style="padding:32px 16px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.06);">

  <!-- Accent top bar -->
  <tr><td style="background:#6366f1; height:4px; font-size:0; line-height:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px 36px; background:#ffffff; color:#1e293b; font-size:15px; line-height:1.8;">
      ${body}
    </td>
  </tr>

  <!-- Signature divider -->
  <tr><td style="padding:0 36px;"><div style="border-top:1px solid #e2e8f0;"></div></td></tr>

  <!-- Signature -->
  <tr>
    <td style="padding:24px 36px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${photoUrl ? `<td style="padding-right:14px; vertical-align:middle;">
            <img src="${photoUrl}" width="48" height="48" alt="Sashi Perera"
              style="border-radius:50%; display:block; object-fit:cover;" />
          </td>` : ''}
          <td style="vertical-align:middle;">
            <div style="font-size:14px; font-weight:700; color:#0f172a;">Sashi Perera</div>
            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Cloud Architect &amp; Developer</div>
            <div style="font-size:12px; margin-top:4px;">
              <a href="https://iamsashi.com" style="color:#6366f1; text-decoration:none;">iamsashi.com</a>
              &nbsp;·&nbsp;
              <a href="mailto:hello@iamsashi.com" style="color:#6366f1; text-decoration:none;">hello@iamsashi.com</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
</td></tr>
</table>`,
  },
];

export const getTheme = (id: string): EmailTheme =>
  EMAIL_THEMES.find(t => t.id === id) ?? EMAIL_THEMES[0];
