import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  Bell,
  Box
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuList, MenuGroup } from "../@config/menu";

const Sidebar = () => {
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 fixed">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Box className="h-6 w-6" />
            <span className="">AutoSDR</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Command className="bg-transparent rounded-none relative h-full">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {MenuList.map((menu: MenuGroup, key: number) => (
                  <div key={key}>
                    <CommandGroup heading={menu.group}>
                      {menu.items.map((option, optionKey) => (
                        <CommandItem key={optionKey}>
                          {option.icon}
                          <Link href={option.link}>{option.text}</Link>
                          {option.shortcut && (
                            <CommandShortcut>⌘{option.shortcut}</CommandShortcut>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </div>
                ))}
              </CommandList>
            </Command>
          </nav>
        </div>
        <footer className="mt-auto p-4">
          <span>© AutoSDR</span>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;
