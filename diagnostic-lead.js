const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

async function runDiagnostic() {
  console.log('🔍 STARTING LEAD DELIVERY DIAGNOSTIC...\n');

  // 1. Check for .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ ERROR: .env.local file missing in current directory.');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/RESEND_API_KEY="(.+)"/);

  if (!apiKeyMatch || !apiKeyMatch[1]) {
    console.error('❌ ERROR: RESEND_API_KEY not found in .env.local or is empty.');
    return;
  }

  const apiKey = apiKeyMatch[1];
  console.log(`✅ API Key detected (Suffix: ...${apiKey.slice(-6)})`);

  // 2. Attempt Send via Resend
  const resend = new Resend(apiKey);
  
  console.log('📡 Attempting to send diagnostic lead to propsmartrealty@gmail.com...');
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Nanded City Diagnostic <onboarding@resend.dev>',
      to: 'propsmartrealty@gmail.com',
      subject: `🛠️ DIAGNOSTIC: Lead System Test (${new Date().toLocaleTimeString()})`,
      html: `
        <div style="font-family: sans-serif; padding: 30px; border: 2px solid #0f172a; border-radius: 12px;">
          <h2 style="color: #0f172a;">Diagnostic Lead Report</h2>
          <p>This is a low-level server diagnostic to verify your <strong>RESEND_API_KEY</strong> integration.</p>
          <ul style="line-height: 2;">
            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
            <li><strong>Status:</strong> Server-Side Execution</li>
            <li><strong>Verified Recipient:</strong> propsmartrealty@gmail.com</li>
          </ul>
          <p style="color: #64748b; font-size: 0.85rem; margin-top: 20px;">If you see this, the API key in your .env.local is 100% functional.</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ RESEND API ERROR:', error.name, error.message);
      if (error.message.includes('To address not verified')) {
        console.log('\n💡 SOLUTION: Your Resend account is still in Sandbox mode. You must go to the Resend Dashboard and either:');
        console.log('   1. Verify your domain (nanded-city.in)');
        console.log('   2. OR add propsmartrealty@gmail.com to your "Verified Senders" list.');
      }
    } else {
      console.log('\n✅ SUCCESS! Resend accepted the email.');
      console.log('Message ID:', data.id);
      console.log('\n📢 FINAL STEP: If you still do not see it in Gmail, it is being filtered by Google. Please check "Promotions", "Social", or "All Mail".');
    }
  } catch (err) {
    console.error('❌ UNEXPECTED CRASH:', err.message);
  }
}

runDiagnostic();
