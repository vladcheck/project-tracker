import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { Fragment, SyntheticEvent, useState } from "react";

export type Severity = "info" | "success" | "warning" | "error";

export interface NotificationBoxProps {
  message: string;
  severity: Severity;
  duration?: number;
}

const DEFAULT_SEVERITY: Severity = "info";
const DEFAULT_DURATION_MS = 3000;

export default function NotificationBox({
  message,
  severity = DEFAULT_SEVERITY,
  duration = DEFAULT_DURATION_MS,
}: NotificationBoxProps) {
  const [open, setOpen] = useState(true);

  return (
    <Fragment>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slotProps={{
          clickAwayListener: {
            onClickAway: (e: any) => {
              e.defaultMuiPrevented = true;
            },
          },
        }}
        onClose={(
          e: Event | SyntheticEvent<any, Event>,
          reason: SnackbarCloseReason,
        ) => {
          console.debug(reason);
          setOpen(false);
          e.preventDefault();
        }}
      >
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
