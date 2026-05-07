import { NextRequest, NextResponse } from 'next/server';
import { getAllLeadsFromVault } from '@/lib/ledger';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const passphrase = process.env.SOVEREIGN_PASSPHRASE || 'nc2026'; // Fallback for dev

  if (authHeader !== `Bearer ${passphrase}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const leads = await getAllLeadsFromVault();
    // Sort by newest first
    const sortedLeads = leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(sortedLeads);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch vault data' }, { status: 500 });
  }
}
