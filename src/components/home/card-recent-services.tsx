import { CarIcon, ClockIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatMoney } from "@/lib/utils";

export const CardRecentServices = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <ClockIcon size={20} className="text-primary" />
          Servicios recientes
        </CardTitle>
        <CardDescription>Últimos servicios realizados</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
          <div className="flex items-start justify-between">
              <div className="flex gap-x-2 items-center">
                  <div className="bg-primary/40 size-10 rounded-full flex items-center justify-center">
                    <CarIcon size={24} className="text-primary" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <h6 className="font-semibold">Carlos rodriguez</h6>
                    <span className="text-xs text-muted-foreground">Lavado completo</span>
                  </div>
              </div>
              <div className="flex flex-col items-center">
                 <Badge className="bg-gray-200 text-green-600">
                    Completado
                 </Badge>
                 <span className="text-sm text-green-700 font-bold">
                   {formatMoney(25000)}
                 </span>
              </div>
          </div>
      </CardContent>
    </Card>
  );
};
