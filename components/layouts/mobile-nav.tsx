import Link from "next/link";
import { Menu } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuList, MenuGroup } from "../@config/menu";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
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
        <footer className="mt-auto">
          <span>© AutoSDR</span>
        </footer>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
