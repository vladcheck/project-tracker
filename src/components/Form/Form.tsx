import { Box, Typography } from "@mui/material";
import { ComponentProps } from "react";

interface FormProps extends ComponentProps<"form"> {
  isSubmitting: boolean;
  submitSuccess: boolean;
}

export default function Form(props: FormProps) {
  return (
    <Box className="accessible-form-container">
      {/* область для скринридера - объявляет статус отправки */}
      <Box
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {props.isSubmitting && "Отправка формы..."}
        {props.submitSuccess && "Форма успешно отправлена!"}
      </Box>

      {/* визуальное сообщение об успехе */}
      {props.submitSuccess && (
        <Box className="success-message" role="alert">
          Спасибо! Ваше сообщение успешно отправлено.
        </Box>
      )}
      {/* @ts-ignore */}
      <form {...props} className="form">
        <Typography
          variant="h2"
          component="h2"
          color="textPrimary"
          gutterBottom
        >
          {props.title}
        </Typography>
        {props.children}
      </form>
    </Box>
  );
}
