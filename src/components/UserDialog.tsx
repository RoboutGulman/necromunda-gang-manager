import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserDialogProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export default function UserDialog({
  open,
  handleClose,
  children,
}: UserDialogProps) {
  return (
    <Dialog
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      {children}
    </Dialog>
  );
}
