import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";

export function ClientsPage() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>Administra tus clientes</CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"default"}
                  title="Nuevo cliente"
                >
                  <PlusCircleIcon /> Nuevo cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuevo cliente</DialogTitle>
                  <DialogDescription>
                    Aquí puedes crear un nuevo cliente para tu lavadero
                  </DialogDescription>
                </DialogHeader>
               
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
        
        </CardContent>
      </Card>
    </section>
  );
}
