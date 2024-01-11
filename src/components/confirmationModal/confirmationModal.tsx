'use client';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '../ui/use-toast';

interface ConfirmationModalProps {
  title: string;
  description?: string;
  toastConfirmMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export default function ConfirmationModal({
  title,
  description,
  toastConfirmMessage = 'Your action has been confirmed!',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  children,
}: ConfirmationModalProps) {
  const { toast } = useToast();

  function handleConfirm() {
    toast({
      title: toastConfirmMessage,
      variant: 'default',
    });
    onConfirm();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="ring-none border-none bg-zinc-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 sm:justify-between">
          <DialogClose asChild>
            <Button variant="default" className="font-semibold">
              {cancelButtonText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="font-semibold"
              onClick={handleConfirm}
            >
              {confirmButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
