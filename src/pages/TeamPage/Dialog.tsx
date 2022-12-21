import { Dialog, DialogTitle, Typography } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SimpleDialog({ onClose, open }: SimpleDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <Typography>This is simple dialog</Typography>
    </Dialog>
  );
}
