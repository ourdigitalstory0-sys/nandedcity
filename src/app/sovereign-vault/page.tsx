"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/config/site';

interface Lead {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  project: string;
  message?: string;
  source: string;
  intent?: string;
  status: string;
}

export default function SovereignVault() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/vault', {
        headers: { 'Authorization': `Bearer ${passphrase}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        setIsAuthenticated(true);
        localStorage.setItem('nc_vault_key', passphrase);
      } else {
        setError('Invalid Passphrase');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('nc_vault_key');
    if (saved) {
      setPassphrase(saved);
      // Auto-login logic could go here if desired
    }
  }, []);

  const downloadCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Project', 'Intent', 'Source', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.timestamp).toLocaleString(),
      l.name,
      l.phone,
      l.email || '',
      l.project,
      l.intent || '',
      l.source,
      (l.message || '').replace(/,/g, ';')
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `nanded_city_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e293b', padding: '40px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '8px' }}>Sovereign Vault</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Nanded City Sales Intelligence Hub</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="System Passphrase" 
              required
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>}
            <button 
              type="submit" 
              disabled={isLoading}
              style={{ padding: '14px', backgroundColor: 'var(--accent-gold)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              {isLoading ? 'Decrypting...' : 'Enter Vault →'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px' }}>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '4px' }}>Sovereign Vault</h1>
            <p style={{ color: '#64748b' }}>{leads.length} Verified Leads Logged</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={downloadCSV} style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
              Export CSV
            </button>
            <button onClick={() => { localStorage.removeItem('nc_vault_key'); setIsAuthenticated(false); }} style={{ padding: '12px 20px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
              Lock
            </button>
          </div>
        </header>

        <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Date / ID</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Prospect</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Project / Intent</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Source</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>{new Date(lead.timestamp).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{lead.id}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '700' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{lead.phone}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>{lead.project}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: '700' }}>{lead.intent}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontWeight: '700' }}>{lead.source}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" style={{ color: '#25d366', fontSize: '1.2rem', textDecoration: 'none' }}>📱</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
