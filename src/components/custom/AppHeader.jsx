import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "@headlessui/react";
import Avatar from "react-avatar";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className=""></div>
      <div>
        <Menu>
          <MenuButton>
            <div className="header-avatar">
              <Avatar name="Jeet" size="32" className="rounded-full" />
            </div>
          </MenuButton>
          <MenuItems
            className="bg-white rounded-lg w-56 divide-y divide-cool-gray flex flex-col border border-cool-gray shadow-xl mt-1"
            anchor="bottom"
          >
            <MenuItem className="py-1.5 px-3 text-left text-sm text-onyx-black hover:bg-snow-white">
              <Button>Change password</Button>
            </MenuItem>
            <MenuItem className="py-1.5 px-3 text-left text-sm text-crimson-red hover:bg-snow-white">
              <Button>Log Out</Button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
