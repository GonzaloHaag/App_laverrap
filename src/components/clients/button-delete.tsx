import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClientById } from "@/services/client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
export const ButtonDelete = ({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) => {
  const { open, toggleModal } = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteClientById({ clientId: id, userId }),
    onSuccess: async (data) => {
      if (!data.status) throw new Error(data.message);
      await queryClient.invalidateQueries({ queryKey: ["clients", userId] });
      toast.warning("Cliente eliminado!");
      toggleModal();
    },
    onError: (error) => {
      console.log(error);
      return;
    },
  });

  const onClickDeleteClient = () => {
    mutation.mutate();
  };
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          title="Borrar"
          className="ml-2"
        >
          <TrashIcon size={16} className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Estás seguro?</DialogTitle>
          <DialogDescription>Esta acción es irreversible</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant={"outline"} title="Cancelar">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={mutation.isPending}
            className="min-w-24"
            title="Confirmar"
            variant={"destructive"}
            onClick={onClickDeleteClient}
          >
            {mutation.isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
