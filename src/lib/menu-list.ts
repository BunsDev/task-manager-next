import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: SquarePen,
          submenus: [
            {
              href: "/projects",
              label: "All Projects",
              active: pathname === "/projects"
            },
            // {
            //   href: "/posts/new",
            //   label: "New Post",
            //   active: pathname === "/posts/new"
            // }
          ]
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: []
        },
        // {
        //   href: "/team",
        //   label: "Team",
        //   active: pathname.includes("/team"),
        //   icon: Team,
        //   submenus: []
        // }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
