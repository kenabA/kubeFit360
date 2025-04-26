import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TNavItem } from "./type";
import { NavLink, useNavigate } from "react-router";
import { Button } from "@/components";

export default function NavbarMenu({ items }: { items: TNavItem[] }) {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="stroke-gray-tertiary hover:stroke-gray-primary transition-colors duration-300" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <ul className="flex flex-col items-start gap-6 mb-6">
              {items.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `para-xl cursor-pointer ${
                        isActive
                          ? "text-primary"
                          : "text-gray-tertiary hover:text-gray-secondary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="items-center gap-2 flex flex-col">
              <Button
                variant={"ghost"}
                className="hover:text-primary border border-slate-200 w-full"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full"
                variant={"primary"}
                onClick={() => handleNavigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
