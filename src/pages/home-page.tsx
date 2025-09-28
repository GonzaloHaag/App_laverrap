import { CardPage, CardRecentServices, ChartIncome } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BubblesIcon, CarIcon, DollarSignIcon, UsersIcon } from "lucide-react";

export function HomePage() {
  return (
    <section className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumen del día</CardTitle>
          <CardDescription>Visualiza el desempeño diario con métricas clave de servicios, clientes, ingresos y vehículos.</CardDescription>
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            <CardPage
              title="Servicios completados"
              Icon={BubblesIcon}
              description={4}
              colorIcon="text-primary"
            />
            <CardPage
              title="Clientes atendidos"
              Icon={UsersIcon}
              description={6}
              colorIcon="text-green-600"
            />
            <CardPage
              title="Total recaudado"
              Icon={DollarSignIcon}
              description="$ 485.000"
              colorIcon="text-yellow-500"
            />
            <CardPage
              title="Vehículos"
              Icon={CarIcon}
              description="$25.600"
              colorIcon="text-green-600"
            />
          </section>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-6">
        <ChartIncome />
        <CardRecentServices />
      </div>
    </section>
  );
}
