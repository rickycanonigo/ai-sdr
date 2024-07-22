import {LayoutDashboard,
Newspaper,
Notebook,
CreditCard,
Settings,
User,
PackageOpen,
Users,
Bell
} from 'lucide-react';
import { ReactNode } from "react";
  
export interface MenuItem {
    link: string;
    text: string;
    icon: ReactNode;
    shortcut?:string;
  }
  
export interface MenuGroup {
    group: string;
    items: MenuItem[];
  }
  
  export interface MenuListProps extends Array<MenuGroup> {}
  
  export const MenuList:MenuListProps = [
    {
        group:"General",
        items:[
            {
                link:"/dashboard",
                text:"Dashboard",
                icon: <LayoutDashboard className="mr-2 h-4 w-4"/>
            },
            {
                link:"/campaign-builder",
                text:"Campaign Builder",
                icon: <Newspaper className="mr-2 h-4 w-4"/>
            },
            {
                link:"/campaigns",
                text:"Campaigns",
                icon: <Notebook className="mr-2 h-4 w-4"/>
            },
            {
                link:"/leads",
                text:"Leads",
                icon: <Users className="mr-2 h-4 w-4"/>
            },
            {
                link:"/notifications",
                text:"Notifications",
                icon: <Bell className="mr-2 h-4 w-4"/>
            },
        ]
    },
    {
        group:"Settings",
        items:[
            {
                link:"/profile",
                text:"Profile",
                icon: <User className="mr-2 h-4 w-4"/>,
                shortcut:"P"
            },
            {
                link:"/billing",
                text:"Billing",
                icon: <CreditCard className="mr-2 h-4 w-4"/>,
                shortcut:"B"
            },
            {
                link:"/settings",
                text:"Settings",
                icon: <Settings className="mr-2 h-4 w-4"/>,
                shortcut:"S"
            },
            {
                link:"/demo",
                text:"Demo",
                icon: <PackageOpen className="mr-2 h-4 w-4"/>,
                shortcut:"D"
            },
        ]
    }
  ];