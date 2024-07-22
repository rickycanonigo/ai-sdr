import { useState, useEffect, useCallback } from 'react';
import { supabaseBrowserClient } from '@/lib/supabase/client';
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

const useLeadsData = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [reload, setReload] = useState(false);
    const { data: user } = useUser();

    const fetchLeads = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id);
    if (error) {
        // setError(error);
        console.log(error);
    } else {
        setLeads(data);
    }
    setIsLoading(false);
    }, [user]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads, reload]);

    const triggerReload = () => {
        setReload(prev => !prev);
    };

    return { leads, isLoading, error, triggerReload };
};

export default useLeadsData;
