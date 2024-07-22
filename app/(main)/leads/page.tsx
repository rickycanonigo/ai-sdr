'use client';
import { useState } from 'react';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import useLeadsData from '@/hooks/useLeadsData';
import { Edit, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import useUser from '@/hooks/useUser';

const supabase = supabaseBrowserClient();

interface Lead {
  id?: number;
  lead_annual_revenue?: string | null;
  lead_company?: string | null;
  lead_company_description?: string | null;
  lead_current_company?: string | null;
  lead_email?: string | null;
  lead_employees?: string | null;
  lead_founded_year?: string | null;
  lead_industry?: string | null;
  lead_landline_number?: string | null;
  lead_mobile_number?: string | null;
  lead_name?: string | null;
  lead_social_media_accounts?: JSON | null;
  lead_title?: string | null;
  lead_websites?: JSON | null;
  user_id?: string | null;
}

function Leads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: user } = useUser();
  const [form, setForm] = useState<Partial<Lead>>({
    lead_name: '',
    lead_email: '',
    lead_company: '',
    lead_company_description: '',
  });
  const { leads, isLoading, error, triggerReload } = useLeadsData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'lead_name',
    direction: 'asc',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddLead = async () => {
    const newLead = { ...form };
    delete newLead.id; // Exclude id property

    const { error } = await supabase.from('leads').insert([{ ...newLead, user_id: user?.id }]);
    if (error) {
      console.error('Error adding lead:', error);
    } else {
      setForm({ lead_name: '', lead_email: '', lead_company: '', lead_company_description: '' });
      triggerReload(); // Trigger data reload
    }
  };

  const handleEditLead = async () => {
    setIsUpdating(true); // Set updating state to true
    const updatedLead = { ...form };
    delete updatedLead.id; // Exclude id property

    const { error } = await supabase
      .from('leads')
      .update(updatedLead)
      .eq('user_id', user?.id ??'')
      .eq('id', selectedLead?.id ??'');
    setIsUpdating(false); // Set updating state to false
    if (error) {
      console.error('Error editing lead:', error);
    } else {
      setForm({ lead_name: '', lead_email: '', lead_company: '', lead_company_description: '' });
      setIsEditing(false);
      setSelectedLead(null);
      triggerReload(); // Trigger data reload
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('user_id', user?.id ?? '')
      .eq('id', leadId);
    if (error) {
      console.error('Error deleting lead:', error);
    } else {
      triggerReload(); // Trigger data reload
    }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    if (lead) {
      setForm(lead);
    }
    setIsEditing(true);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredLeads = leads.filter((lead) =>
    lead.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lead_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lead_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lead_company_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Lead] ?? '';
    const bValue = b[sortConfig.key as keyof Lead] ?? '';
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className='w-full'>
          <h1 className="text-xl font-bold mb-4">Leads</h1>
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {isLoading && !isUpdating ? (
            <p>Loading leads...</p>
          ) : error ? (
            <p className="text-red-500">Error fetching leads: {error.message}</p>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('lead_name')} className="cursor-pointer">
                    Name
                    {sortConfig.key === 'lead_name' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="inline-block ml-2" /> : <ArrowDown className="inline-block ml-2" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('lead_email')} className="cursor-pointer">
                    Email
                    {sortConfig.key === 'lead_email' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="inline-block ml-2" /> : <ArrowDown className="inline-block ml-2" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('lead_company')} className="cursor-pointer">
                    Company
                    {sortConfig.key === 'lead_company' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="inline-block ml-2" /> : <ArrowDown className="inline-block ml-2" />
                    )}
                  </TableHead>
                  <TableHead onClick={() => handleSort('lead_company_description')} className="cursor-pointer">
                    Description
                    {sortConfig.key === 'lead_company_description' && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="inline-block ml-2" /> : <ArrowDown className="inline-block ml-2" />
                    )}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.lead_name}</TableCell>
                    <TableCell>{lead.lead_email}</TableCell>
                    <TableCell>{lead.lead_company}</TableCell>
                    <TableCell>{lead.lead_company_description}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleSelectLead(lead)}
                        className="p-2 mr-2 rounded hover:bg-gray-400"
                        variant="ghost"
                        aria-label="Edit"
                      >
                        <Edit className="text-blue-500" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteLead(lead.id ?? 0)}
                        className="p-2 rounded hover:bg-gray-400"
                        variant="ghost"
                        aria-label="Delete"
                      >
                        <Trash className="text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="w-full md:w-96">
          <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Lead' : 'Add Lead'}</h2>
          <Input
            name="lead_name"
            value={form.lead_name ?? ''}
            onChange={handleInputChange}
            placeholder="Name"
            className="mb-2 w-full"
          />
          <Input
            name="lead_email"
            value={form.lead_email ?? ''}
            onChange={handleInputChange}
            placeholder="Email"
            className="mb-2 w-full"
          />
          <Input
            name="lead_company"
            value={form.lead_company ?? ''}
            onChange={handleInputChange}
            placeholder="Company"
            className="mb-2 w-full"
          />
          <Textarea
            name="lead_company_description"
            value={form.lead_company_description ?? ''}
            onChange={handleInputChange}
            placeholder="Description"
            className="mb-2 w-full"
          />
          <Button onClick={isEditing ? handleEditLead : handleAddLead} className="w-full">
            {isEditing ? 'Update Lead' : 'Add Lead'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Leads;
