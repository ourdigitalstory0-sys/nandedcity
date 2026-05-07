import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site';
import { saveLeadToVault } from '@/lib/ledger';


export async function POST(req: NextRequest) {
  let savedLead: any = null;
  try {
    const body = await req.json();
    const { name, phone, project, email, message, source, intent } = body;

    console.log(`[API Contact] New lead attempt: ${name} (${phone}) from ${source}`);

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    // STEP 1: Sovereign Vault Persistence (Local First)
    try {
      savedLead = await saveLeadToVault({
        name,
        phone,
        email,
        project: project || 'Nanded City General',
        message,
        source: source || 'Official Website',
        intent: intent || 'General'
      });
      console.log(`✅ [VAULT] Lead indexed successfully: ${savedLead.id}`);
    } catch (vaultErr) {
      console.error('❌ [VAULT] Critical failure saving lead locally.', vaultErr);
      // We continue to email attempt, but vault failure is serious
    }

    // STEP 2: Email Dispatch via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL: RESEND_API_KEY is missing from environment.');
      // If we saved to vault, we can still return success
      if (savedLead) {
        return NextResponse.json({ success: true, vaultId: savedLead.id, note: 'Email dispatch skipped (config missing)' });
      }
      return NextResponse.json({ error: 'System configuration error.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // Modern HTML Lead Template for Premium Real Estate
    const leadHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #0f172a; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">New ${SITE_CONFIG.name} Lead</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Source: ${source || 'Official Website'}</p>
        </div>

        <div style="padding: 40px; background-color: #ffffff;">
          <div style="margin-bottom: 30px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Prospect Name</p>
            <p style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0;">${name}</p>
          </div>
          
          <div style="margin-bottom: 30px; display: flex; gap: 20px;">
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Mobile Number</p>
              <a href="tel:${phone}" style="color: #0f172a; font-size: 18px; font-weight: 700; text-decoration: none;">${phone}</a>
            </div>
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Project Interest</p>
              <p style="color: #0f172a; font-size: 18px; font-weight: 700; margin: 0;">${project || 'General Township Enquiry'}</p>
            </div>
          </div>

          ${intent ? `
          <div style="margin-bottom: 30px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Prospect Intent</p>
            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${intent}</p>
          </div>
          ` : ''}

          ${email ? `
          <div style="margin-bottom: 30px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Email Address</p>
            <p style="color: #0f172a; font-size: 16px; margin: 0;">${email}</p>
          </div>
          ` : ''}

          ${message ? `
          <div style="margin-bottom: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Message / Notes</p>
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0;">${message}</p>
          </div>
          ` : ''}

          <div style="margin-top: 40px; display: flex; gap: 12px;">
            <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="flex: 1; text-align: center; background-color: #25D366; color: #ffffff; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
              📱 WhatsApp Now
            </a>
            <a href="tel:${phone}" style="flex: 1; text-align: center; background-color: #0f172a; color: #ffffff; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
              📞 Call Now
            </a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">${SITE_CONFIG.brand.organizationName} · Vault ID: ${savedLead?.id || 'LOCAL'}</p>
        </div>

      </div>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: `${SITE_CONFIG.name} Leads <onboarding@resend.dev>`,
        to: SITE_CONFIG.contact.email,
        subject: `New Lead: ${name} — ${project || SITE_CONFIG.name}`,
        html: leadHtml,
        replyTo: email || undefined,
      });

      if (error) {
        console.error('Resend Error:', error);
        // If we have a vault ID, we can still report success to the frontend
        if (savedLead) {
          return NextResponse.json({ success: true, vaultId: savedLead.id, warning: 'Email dispatch failed' });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, id: data?.id, vaultId: savedLead?.id });
    } catch (emailErr) {
      console.error('Email Dispatch Critical Error:', emailErr);
      if (savedLead) {
        return NextResponse.json({ success: true, vaultId: savedLead.id, warning: 'Email dispatch crashed' });
      }
      throw emailErr;
    }
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

