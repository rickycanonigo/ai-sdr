'use client';
import { useState } from "react";
import { LeadDetails, Others, Persona } from "./types";
import PersonaSelector from "./components/PersonaSelector";
import LeadSelector from "./components/LeadSelector";
import TenantSelector from "./components/TenantSelector"; // Import TenantSelector
import EmailGenerator from "./components/EmailGenerator";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@radix-ui/react-dropdown-menu";

function CampaignBuilder() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>();
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<LeadDetails[]>([]);
  const [selectedCampaignEmail, setSelectedCampaignEmail] = useState<string>(''); // State for selected campaign email
  const [others, setOthers] = useState<Others>({ calendly_link: '' });

  const handleCalendlyLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOthers({ ...others, calendly_link: e.target.value });
  };

  const handleEmailSelect = (email: string) => {
    setSelectedCampaignEmail(email);
  };

  return (
    <div className="flex">
      <div className="w-full">
        <h5 className="font-bold mb-4">Campaign Builder</h5>
        <Card className="mb-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>AI Personas</Label>
            <PersonaSelector onSelect={setSelectedPersona} />
            <Label>Leads</Label>
            <LeadSelector onSelect={setSelectedLeadDetails} />
            <Label>Campaign Email</Label>
            <TenantSelector onSelect={handleEmailSelect} /> {/* Added TenantSelector */}
            <Label>Calendly Link</Label>
            <Input
              value={others.calendly_link}
              onChange={handleCalendlyLinkChange}
              placeholder="Enter Calendly Link"
              className="w-full"
            />
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Generate Email</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLeadDetails.length > 0 && selectedCampaignEmail && (
              <EmailGenerator
                persona={selectedPersona}
                leadDetails={selectedLeadDetails}
                others={others}
                from={selectedCampaignEmail} // Use the selected campaign email as the "from" address
                to={selectedLeadDetails[0].lead_email ?? ''}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CampaignBuilder;
