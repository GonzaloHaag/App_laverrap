import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const FiltersClients = () => {
  return (
    <form className="relative flex items-center gap-x-4 mb-4 w-full">
      <Input
        autoFocus
        type="search"
        placeholder="Buscar servicio..."
        className="pl-8 w-full md:max-w-xl"
      />
      <SearchIcon
        size={18}
        className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-300"
      />
      <Select>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="Seleccionar estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
             <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="Seleccionar estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activos">Activos</SelectItem>
            <SelectItem value="inactivos">Inactivos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
};
