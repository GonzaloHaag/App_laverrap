import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import {
  AlignJustifyIcon,
  CarIcon,
  CogIcon,
  DropletsIcon,
  LayoutDashboardIcon,
  Users2Icon,
} from "lucide-react";

export const Header = () => {
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
          <Link
            to={"/"}
            title="dashboard"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <LayoutDashboardIcon /> Dashboard
          </Link>
          <Link
            to={"/lavados"}
            title="lavados"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <DropletsIcon /> Lavados
          </Link>
          <Link
            to={"/clientes"}
            title="clientes"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <Users2Icon /> Clientes
          </Link>
          <Link
            to={"/servicios"}
            title="servicios"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <CogIcon /> Servicios
          </Link>
        </div>
        <Button size={"icon"} variant={"outline"} className="flex md:hidden">
          <AlignJustifyIcon />
        </Button>
      </div>
    </header>
  );
};
