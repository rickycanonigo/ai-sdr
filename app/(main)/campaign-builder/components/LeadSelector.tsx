import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { LeadDetails } from '../types';
import useLeads from '@/hooks/useLeads';
import { useState, useEffect } from 'react';

interface LeadSelectorProps {
  onSelect: (leadDetails: LeadDetails[]) => void;
}

export default function LeadSelector({ onSelect }: LeadSelectorProps) {
  const [selectedLead, setSelectedLead] = useState<LeadDetails | null>(null);
  const { data: leads, error, isLoading } = useLeads();

  useEffect(() => {
    if (error) {
      console.error('Error fetching leads:', error);
    }
  }, [error]);

  const handleSelect = (lead: LeadDetails) => {
    setSelectedLead(lead);
    onSelect([lead]);
  };

  return (
    <>
      <Select
        value={selectedLead ? selectedLead.lead_email ?? '' : ''}
        onValueChange={(email) => {
          const lead = leads?.find((lead) => lead.lead_email === email);
          if (lead) {
            handleSelect(lead);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a lead..." />
        </SelectTrigger>
        <SelectContent>
          {leads?.map((lead) => (
            <SelectItem key={lead.lead_email} value={lead.lead_email ?? ''}>
              {lead.lead_name} - {lead.lead_title} - {lead.lead_industry} ({lead.lead_email})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLoading && <p>Loading leads...</p>}
    </>
  );
}
