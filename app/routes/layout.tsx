import { NavLink, Outlet } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { ModeToggle } from "~/components/ModeToggle";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import Signout from "./signout";

const Layout = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex items-center justify-center pt-4 w-full">
        <div className="flex flex-1 justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/">Home</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/sign-up">Sign Up</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/sign-in">Sign In</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Separator className="mx-2" orientation="vertical" />
          <div className="flex items-center justify-end">
            <ModeToggle />
          </div>
          <Separator className="mx-2" orientation="vertical" />
          <Signout />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;