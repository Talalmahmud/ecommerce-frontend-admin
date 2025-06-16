"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  LayoutDashboard,
  List,
  ListTree,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5 shrink-0"/> },
  { name: "Users", href: "/users", icon: <Users className="h-5 w-5 shrink-0"/> },
  { name: "Categories", href: "/categories", icon: <ListTree className="h-5 w-5 shrink-0"/> },
  { name: "Subcategories", href: "/subcategories", icon:<List className="h-5 w-5 shrink-0"/>},
  { name: "Products", href: "/products", icon:<Package className="h-5 w-5 shrink-0"/>  },
  { name: "Orders", href: "/orders", icon:<ShoppingCart className="h-5 w-5 shrink-0"/> },
  { name: "Payments", href: "/payments", icon:<CreditCard className="h-5 w-5 shrink-0"/>  },
  { name: "Settings", href: "/settings", icon:<Settings className="h-5 w-5 shrink-0"/>  },
];

export default function MobileSidebarContent() {
  const pathName = usePathname();
  return (
    <div className="flex h-full flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                      pathName === item.href
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
