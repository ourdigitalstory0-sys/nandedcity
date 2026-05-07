import fs from 'fs/promises';
import path from 'path';

export interface Lead {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  project: string;
  message?: string;
  source: string;
  intent?: string;
  status: 'new' | 'contacted' | 'junk';
}

const LEDGER_PATH = path.join(process.cwd(), 'leads.json');

export async function saveLeadToVault(leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  const newLead: Lead = {
    ...leadData,
    id: `NC-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    status: 'new',
  };

  try {
    let leads: Lead[] = [];
    
    // Check if file exists
    try {
      const fileData = await fs.readFile(LEDGER_PATH, 'utf-8');
      leads = JSON.parse(fileData);
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    leads.push(newLead);
    
    // Atomic-ish write (though simple for this scale)
    await fs.writeFile(LEDGER_PATH, JSON.stringify(leads, null, 2), 'utf-8');
    
    return newLead;
  } catch (err) {
    console.error('VAULT CRITICAL: Failed to save lead to local ledger.', err);
    throw err;
  }
}

export async function getAllLeadsFromVault(): Promise<Lead[]> {
  try {
    const fileData = await fs.readFile(LEDGER_PATH, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    return [];
  }
}
