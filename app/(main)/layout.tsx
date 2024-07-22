import Navbar from "@/components/layouts/navbar";
import Sidebar from "@/components/layouts/sidebar";
import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = async ({children}:MainLayoutProps) => {
    const supabase = supabaseServer ()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/auth')
    }

    return ( 
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar/>
        <div className="flex flex-col">
          <Navbar/>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
     );
}
 
export default MainLayout;