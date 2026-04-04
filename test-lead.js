const { Resend } = require('resend');
const fs = require('fs');

// Path to .env.local
const envPath = '.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/RESEND_API_KEY="(.+)"/);

if (!apiKeyMatch) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  process.exit(1);
}

const resend = new Resend(apiKeyMatch[1]);

async function sendTestLead() {
  console.log('🚀 Sending Test Lead to propsmartrealty@gmail.com...');
  
  try {
    const data = await resend.emails.send({
      from: 'Nanded City Leads <onboarding@resend.dev>', // Note: This is the sandbox domain. 
      to: 'propsmartrealty@gmail.com',
      subject: '🔥 NEW HIGH-INTENT LEAD: Nanded City (Test Audit)',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a;">New Project Enquiry</h2>
          <p><strong>Name:</strong> Audit Specialist (Test)</p>
          <p><strong>Phone:</strong> +91 0000000000</p>
          <p><strong>Project:</strong> Production Verification</p>
          <p><strong>Source:</strong> AI Hardening Audit</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="font-size: 0.8rem; color: #64748b;">This is a verification lead to confirm the Resend API is active.</p>
        </div>
      `,
    });

    console.log('✅ Lead Sent Successfully!', data);
    console.log('\n--- VERIFICATION ACTION ---');
    console.log('Please check propsmartrealty@gmail.com (including Spam for sandbox domain).');
  } catch (error) {
    console.error('❌ Lead Delivery Failed:', error);
  }
}

sendTestLead();
