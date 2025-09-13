import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search } from "../ui/search";

export const FiltersServices = () => {
  return (
    <form className="flex items-center gap-x-4 mb-4 w-full">
      <Search placeholder="Buscar servicio..." />
      <Select>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="basic">Básico</SelectItem>
            <SelectItem value="complete">Completo</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[240px]">
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
