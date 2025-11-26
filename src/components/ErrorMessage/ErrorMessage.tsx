import { PropsWithChildren } from "react";
import "./ErrorMessage.css";
import { Typography } from "@mui/material";

export default function ErrorMessage({
  children,
  id,
}: PropsWithChildren & { id: string }) {
  return (
    <Typography
      className="error-message"
      role="alert"
      id={id}
      color="error"
      sx={{ fontSize: "0.8rem" }}
    >
      {children}
    </Typography>
  );
}
