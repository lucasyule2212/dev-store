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

interface ConfirmationModalProps {
  title: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  title,
  description,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="secondary">{cancelButtonText}</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
