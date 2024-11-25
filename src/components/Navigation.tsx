import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink to="/user" className={navigationMenuTriggerStyle()}>
              使用者資訊展示
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/users" className={navigationMenuTriggerStyle()}>
              使用者列表展示
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/users/sort" className={navigationMenuTriggerStyle()}>
              使用者資訊排序
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/users/pagination"
              className={navigationMenuTriggerStyle()}
            >
              使用者資訊分頁
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
