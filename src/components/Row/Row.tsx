import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Row({ children }: PropsWithChildren) {
  return <Box className="row">{children}</Box>;
}
