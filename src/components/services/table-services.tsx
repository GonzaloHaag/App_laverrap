import type { Service } from "@/types/service";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { statusColors, statusLabels } from "@/lib/consts";

interface TableServicesProps {
  isLoading: boolean;
  isError: boolean;
  services: Service[];
}
export const TableServices = ({
  isLoading,
  isError,
  services,
}: TableServicesProps) => {
  if (isLoading) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-muted-foreground text-center"
          >
            Cargando...
          </td>
        </tr>
      </tbody>
    );
  }
  if (isError) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td colSpan={6} className="px-6 py-4 text-red-600 text-center">
            Ocurrió un error al obtener los servicios
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {services.length > 0 ? (
        services.map((service) => (
          <tr
            key={service.id}
            className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {service.name}
            </th>
            <td className="px-6 py-4">
              <Badge className={statusColors[service.category]}>
                {statusLabels[service.category]}
              </Badge>
            </td>
            <td className="px-6 py-4">{service.duration} min</td>
            <td className="px-6 py-4">{formatMoney(Number(service.price))}</td>
            <td className="px-6 py-4">
              <Badge className={statusColors[service.status]}>
                {statusLabels[service.status]}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <Button size={"icon"} variant={"outline"} title="Editar">
                <PencilIcon size={16} className="text-green-600" />
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                title="Borrar"
                className="ml-2"
              >
                <TrashIcon size={16} className="text-red-600" />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-muted-foreground text-center"
          >
            No se encontraron resultados
          </td>
        </tr>
      )}
    </tbody>
  );
};
