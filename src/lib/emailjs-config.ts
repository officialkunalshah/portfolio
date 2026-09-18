/**
 * EmailJS configuration.
 *
 * Replace the four placeholder values below with the credentials from your
 * EmailJS dashboard (https://dashboard.emailjs.com/admin).
 *
 * PUBLIC_KEY          → Account > General > Public Key
 * SERVICE_ID          → Email Services > (your service) > Service ID
 * ADMIN_TEMPLATE_ID   → Email Templates > (template that emails YOU) > Template ID
 * AUTOREPLY_TEMPLATE_ID → Email Templates > (template that emails the VISITOR) > Template ID
 *
 * The public key is safe to expose in frontend code — that's how EmailJS is
 * designed to be used from a static site with no backend.
 *
 * Template setup requirement (set in the EmailJS dashboard, not in code):
 *  - ADMIN_TEMPLATE's "To email" field must be your own inbox address
 *    (e.g. officialkunalshah@gmail.com), or {{to_email}} if you prefer to
 *    pass it dynamically — this project sends it as {{to_email}} already.
 *  - AUTOREPLY_TEMPLATE's "To email" field must be set to {{to_email}} so
 *    the confirmation goes to the VISITOR who filled out the form, not to you.
 */
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'BaVWXevYX8MMryUYW',
  SERVICE_ID: 'service_0rxpyag',
  ADMIN_TEMPLATE_ID: 'template_h1z1wgp',
  AUTOREPLY_TEMPLATE_ID: 'template_8rea1lq',
};

// Where admin notifications are sent — reuses the email already on the site.
export const OWNER_EMAIL = 'officialkunalshah@gmail.com';

// Used as the sender name in the auto-reply's closing line.
export const SITE_OWNER_NAME = 'Kunal Shah';
