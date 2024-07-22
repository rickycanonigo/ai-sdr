'use client'

import { supabaseBrowserClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query"

export default function useTenants() {
    return useQuery({
        queryKey: ["tenants"],
        queryFn: async () => {
            const supabase = supabaseBrowserClient();
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                // fetch tenants information
                const { data: tenants, error } = await supabase
                    .from("tenants")
                    .select("*")
                    .eq("profile_id", data.session.user.id); // Assuming 'profile_id' is the correct field
                if (error) {
                    throw new Error(error.message);
                }
                return tenants;
            }
            return [];
        }
    });
}
