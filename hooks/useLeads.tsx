'use client'

import { supabaseBrowserClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query"

export default function useLeads() {
    return useQuery({
        queryKey: ["leads"],
        queryFn: async () => {
            const supabase = supabaseBrowserClient();
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                // fetch leads information profile
                const { data: leads, error } = await supabase
                    .from("leads")
                    .select("*")
                    .eq("user_id", data.session.user.id); // Assuming 'user_id' is the correct field
                if (error) {
                    throw new Error(error.message);
                }
                return leads;
            }
            return [];
        }
    });
}
