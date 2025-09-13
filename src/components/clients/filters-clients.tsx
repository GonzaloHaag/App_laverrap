import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search } from "../ui/search";

export const FiltersClients = () => {
  return (
    <form className="relative flex items-center gap-x-4 mb-4 w-full">
      <Search placeholder="Buscar por nombre o placa..." />
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
