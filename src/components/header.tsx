import { Link, useLocation } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import {
  AlignJustifyIcon,
  CarIcon
} from "lucide-react";
import { HEADER_LINKS } from "@/lib/consts";

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <div className="container mx-auto px-4 min-h-16 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-x-2" title="dashboard">
          <Button size={"icon"} variant={"default"}>
            <CarIcon />
          </Button>
          <div className="flex flex-col">
            <span className="font-medium leading-5">LAVERRAP</span>
            <span className="text-xs text-muted-foreground">
              Sistema de gestión
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-x-4">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              title={link.title}
              className={`${
                pathname === link.path
                  ? "bg-primary text-slate-100 hover:bg-primary/95 hover:text-slate-100"
                  : "bg-inherit"
              } ${buttonVariants({ size: "lg", variant: "outline" })}`}
            >
              <link.icon /> {link.title}
            </Link>
          ))}
        </div>
        <Button size={"icon"} variant={"outline"} className="flex md:hidden">
          <AlignJustifyIcon />
        </Button>
      </div>
    </header>
  );
};
