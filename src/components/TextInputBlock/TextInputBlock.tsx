import { Box, InputLabel, TextareaAutosize, TextField } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Row from "../Row/Row";
import { NumberField } from "@base-ui-components/react";

export default function TextInputBlock({
  id,
  name,
  type,
  label,
  value,
  error,
  errorId,
  cols,
  required = true,
  placeholder = "",
  handleChange,
}: {
  id: string;
  name: string;
  type: "text" | "number" | "textarea" | "select" | "date" | "url" | "email";
  value: any;
  label: string;
  error?: string;
  errorId: string;
  cols?: number;
  required?: boolean;
  placeholder?: string;
  handleChange: (e: any) => void;
}) {
  return (
    <Row>
      {type !== "number" && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Box className={`input-container ${required ? "required" : ""}`.trim()}>
        {type === "textarea" ? (
          <TextareaAutosize
            required={required}
            aria-required={required}
            id={id}
            name={name}
            value={value.toString()}
            onChange={handleChange}
            className={error ? "error" : ""}
            cols={cols ?? 40}
            placeholder={placeholder}
            aria-invalid={!!value}
            aria-describedby={error ? errorId : undefined}
          />
        ) : type === "number" ? (
          <NumberField.Root>
            <NumberField.ScrubArea>{label}</NumberField.ScrubArea>
            <NumberField.Input
              required={required}
              aria-required={required}
              id={id}
              name={name}
              type={type}
              value={value.toString()}
              onChange={handleChange}
              placeholder={placeholder}
              className={error ? "error" : ""}
              aria-invalid={!!value}
              aria-describedby={error ? errorId : undefined}
            />
          </NumberField.Root>
        ) : (
          <TextField
            required={required}
            aria-required={required}
            id={id}
            name={name}
            type={type}
            value={value.toString()}
            onChange={handleChange}
            placeholder={placeholder}
            className={error ? "error" : ""}
            aria-invalid={!!value}
            aria-describedby={error ? errorId : undefined}
          />
        )}

        {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      </Box>
    </Row>
  );
}
