import useTenants from "@/hooks/useTenants";
import React, { useState, useEffect } from 'react';

interface EmailSelectorProps {
  onSelect: (email: string) => void;
}

const EmailSelector: React.FC<EmailSelectorProps> = ({ onSelect }) => {
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const { data: tenants, error, isLoading } = useTenants();

  useEffect(() => {
    if (tenants && tenants.length > 0) {
      setSelectedEmail(tenants[0].campaign_email??'');
      onSelect(tenants[0].campaign_email??'');
    }
  }, [tenants, onSelect]);

  if (isLoading) {
    return <p>Loading emails...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching tenant emails. Please try again later.</p>;
  }

  return (
    <select
      value={selectedEmail}
      onChange={(e) => setSelectedEmail(e.target.value)}
      className="w-full p-2 border rounded"
    >
      <option value="" disabled>Select Campaign Email...</option>
      {tenants?.map((tenant) => (
        <option key={tenant.campaign_email} value={tenant.campaign_email??''}>
          {tenant.campaign_email}
        </option>
      ))}
    </select>
  );
};

export default EmailSelector;
