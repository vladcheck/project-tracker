import { PropsWithChildren } from "react";
import "./Modal.css";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function Modal({
  isOpen,
  onClose,
  name,
  children,
}: PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}) {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Box className="modal-background" onClick={handleBackgroundClick}>
      <Box className="modal-window">
        <Box className="modal-header">
          <Typography variant="h1" component="h2" gutterBottom>
            {name}
          </Typography>
          <IconButton className="close-button" onClick={onClose}>
            <Delete />
          </IconButton>
        </Box>

        <Box className="modal-content">{children}</Box>
      </Box>
    </Box>
  );
}
