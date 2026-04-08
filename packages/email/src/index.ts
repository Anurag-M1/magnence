type LeadAlertEmailProps = {
  leadName: string;
  leadEmail: string;
  service: string;
  message: string;
};

export function renderLeadAlertEmail(props: LeadAlertEmailProps): string {
  return `
    <html>
      <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="background:#ffffff;border-radius:12px;padding:24px;">
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(props.leadName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(props.leadEmail)}</p>
          <p><strong>Service:</strong> ${escapeHtml(props.service)}</p>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#f8fafc;">
            ${escapeHtml(props.message)}
          </div>
        </div>
      </body>
    </html>
  `;
}

type AppointmentConfirmationProps = {
  recipientName: string;
  startTime: string;
  timezone: string;
  meetingLink?: string;
};

export function renderAppointmentConfirmationEmail(props: AppointmentConfirmationProps): string {
  return `
    <html>
      <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="background:#ffffff;border-radius:12px;padding:24px;">
          <h2>Appointment Confirmed</h2>
          <p>Hi ${escapeHtml(props.recipientName)}, your booking is confirmed.</p>
          <p><strong>Time:</strong> ${escapeHtml(props.startTime)} (${escapeHtml(props.timezone)})</p>
          ${
            props.meetingLink
              ? `<p><strong>Meeting Link:</strong> <a href="${escapeAttr(props.meetingLink)}">${escapeHtml(props.meetingLink)}</a></p>`
              : ""
          }
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value: string): string {
  return value.replaceAll("\"", "&quot;");
}
