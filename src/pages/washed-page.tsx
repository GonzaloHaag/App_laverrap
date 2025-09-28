import { CardPage } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BubblesIcon, DollarSignIcon, PlusCircleIcon, ShredderIcon } from "lucide-react";

export function WashedPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <section className="grid grid-cols-4 gap-6">
        <CardPage
          title="Lavados en progreso"
          Icon={ShredderIcon}
          description={6}
          colorIcon="text-green-600"
        />
        <CardPage
          title="Lavados completados"
          Icon={BubblesIcon}
          description={6}
          colorIcon="text-green-600"
        />
        <CardPage
          title="Total recaudado"
          Icon={DollarSignIcon}
          description="45600"
          colorIcon="text-yellow-500"
        />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Lavados</CardTitle>
          <CardDescription>Administra tus lavados</CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"default"}
                  title="Nuevo lavado"
                >
                  <PlusCircleIcon /> Nuevo lavado
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nuevo lavado</DialogTitle>
                  <DialogDescription>
                    Aquí puedes crear un nuevo lavado para un cliente
                  </DialogDescription>
                </DialogHeader>
               
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
  );
}
